import assert from 'node:assert/strict';
import { execFileSync, spawn } from 'node:child_process';
import { mkdir, mkdtemp, readFile, realpath, writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const root = fileURLToPath(new URL('../../', import.meta.url));
const output = path.join(root, '.artifacts/cli');
const { values } = parseArgs({
  options: { template: { type: 'string' }, startup: { type: 'boolean' } },
});
const readJson = async (filename) => JSON.parse(await readFile(filename, 'utf8'));
const registry = await readJson(path.join(root, 'cli/templates/manifest.json'));
const templates = registry.templates.filter(
  (template) => !values.template || template.id === values.template,
);
assert(templates.length, `Unknown template: ${values.template}`);
await mkdir(output, { recursive: true });
const windows = process.platform === 'win32';
const pnpmEntry = process.env.npm_execpath;
if (windows) assert(pnpmEntry, 'Run the template check with pnpm check:cli on Windows.');

function runPnpm(args, cwd) {
  if (!windows) return run('pnpm', args, cwd);
  if (/\.exe$/i.test(pnpmEntry)) return run(pnpmEntry, args, cwd);
  return run(process.execPath, [pnpmEntry, ...args], cwd);
}

async function run(command, args, cwd) {
  console.log(`\n> ${command} ${args.join(' ')}`);
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      env: { ...process.env, HUSKY: '0' },
    });
    child.once('error', reject);
    child.once('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`${command} ${args.join(' ')} exited ${code}`)),
    );
  });
}

async function checkStartup(framework, cwd) {
  const listener = createServer();
  const port = await new Promise((resolve, reject) => {
    listener.once('error', reject);
    listener.listen(0, '127.0.0.1', () => {
      const { port } = listener.address();
      listener.close((error) => (error ? reject(error) : resolve(port)));
    });
  });
  const args =
    framework === 'vite'
      ? ['node_modules/vite/bin/vite.js', 'preview', '--strictPort']
      : ['node_modules/next/dist/bin/next', 'start'];
  const server = spawn(
    process.execPath,
    [...args, framework === 'vite' ? '--host' : '--hostname', '127.0.0.1', '--port', String(port)],
    {
      cwd,
      stdio: 'inherit',
    },
  );
  const closed = new Promise((resolve) => server.once('close', resolve));
  let error;
  server.once('error', (cause) => {
    error = cause;
  });
  try {
    const deadline = Date.now() + 20_000;
    while (!error && server.exitCode === null && Date.now() < deadline) {
      const response = await fetch(`http://127.0.0.1:${port}/login`, {
        signal: AbortSignal.timeout(1000),
      }).catch(() => undefined);
      if (response?.ok) {
        await response.body?.cancel();
        assert.equal(server.exitCode, null, 'The preview server exited unexpectedly.');
        return;
      }
      await delay(200);
    }
    throw error ?? new Error(`Generated project did not start on port ${port}.`);
  } finally {
    if (server.pid && server.exitCode === null) server.kill();
    await closed;
  }
}

const archive = path.join(output, 'virgo-design-create-0.0.0.tgz');
await runPnpm(['pack', '--out', archive], path.join(root, 'cli'));
const consumer = await mkdtemp(path.join(os.tmpdir(), 'virgo-cli-consumer-'));
await writeFile(
  path.join(consumer, 'package.json'),
  JSON.stringify({
    private: true,
    dependencies: { '@virgo-design/create': `file:${archive.split(path.sep).join('/')}` },
  }),
);
await runPnpm(
  ['install', '--ignore-scripts', '--no-frozen-lockfile', '--registry=https://registry.npmjs.org/'],
  consumer,
);
const executable = path.join(consumer, 'node_modules/@virgo-design/create/dist/index.js');
await run(process.execPath, [executable, '--help'], consumer);
const report = { archive, templates: [] };
try {
  for (const template of templates) {
    const parent = await mkdtemp(path.join(os.tmpdir(), 'virgo-pro-'));
    const relative = values.startup ? path.join('project space', 'my-pro') : 'my-pro';
    const directory = path.join(parent, relative);
    const result = { id: template.id, directory, passed: false };
    report.templates.push(result);
    const stdout = execFileSync(
      process.execPath,
      [executable, directory, '--template', template.id],
      {
        cwd: parent,
        encoding: 'utf8',
      },
    );
    console.log(stdout.trimEnd());
    if (values.startup) {
      const cd = windows ? `cd "${relative}"` : `cd '${relative}'`;
      assert(stdout.includes(cd), 'CLI did not quote the path with spaces.');
    }
    for (const [name, rule] of [
      ['.editorconfig', 'charset = utf-8'],
      ['.gitattributes', '* text=auto eol=lf'],
    ]) {
      const content = await readFile(path.join(directory, name), 'utf8');
      assert(
        content.includes(rule) && !content.includes('\r') && !content.startsWith('\uFEFF'),
        name,
      );
    }
    const manifest = await readJson(path.join(directory, 'package.json'));
    assert.equal(manifest.name, 'my-pro');
    assert(!JSON.stringify(manifest).includes('workspace:'));
    await runPnpm(
      [
        'install',
        '--no-frozen-lockfile',
        '--strict-peer-dependencies',
        '--registry=https://registry.npmjs.org/',
      ],
      directory,
    );
    for (const [name, version] of Object.entries(manifest.dependencies)) {
      if (!name.startsWith('@virgo-design/')) continue;
      const installed = await realpath(path.join(directory, 'node_modules', name));
      assert(!installed.startsWith(root), `${name}: linked back into repository`);
      assert.equal((await readJson(path.join(installed, 'package.json'))).version, version);
    }
    for (const command of ['typecheck', 'lint', 'format:check', 'test', 'build'])
      await runPnpm([command], directory);
    if (values.startup) await checkStartup(template.framework, directory);
    result.passed = true;
    await writeFile(
      path.join(output, `report-${values.template ?? 'all'}.json`),
      `${JSON.stringify(report, null, 2)}\n`,
    );
    console.log(`Verified standalone ${template.id}: ${directory}`);
  }
} finally {
  await writeFile(
    path.join(output, `report-${values.template ?? 'all'}.json`),
    `${JSON.stringify(report, null, 2)}\n`,
  );
}
