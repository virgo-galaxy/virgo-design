import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, readFile, realpath, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const root = fileURLToPath(new URL('../../', import.meta.url));
const output = path.join(root, '.artifacts/cli');
const { values } = parseArgs({ options: { template: { type: 'string' } } });
const readJson = async (filename) => JSON.parse(await readFile(filename, 'utf8'));
const registry = await readJson(path.join(root, 'cli/templates/manifest.json'));
const templates = registry.templates.filter(
  (template) => !values.template || template.id === values.template,
);
assert(templates.length, `Unknown template: ${values.template}`);
await mkdir(output, { recursive: true });
const pnpm = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';

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

const archive = path.join(output, 'virgo-design-create-0.0.0.tgz');
await run(pnpm, ['pack', '--out', archive], path.join(root, 'cli'));
const consumer = await mkdtemp(path.join(os.tmpdir(), 'virgo-cli-consumer-'));
await writeFile(
  path.join(consumer, 'package.json'),
  JSON.stringify({ private: true, dependencies: { '@virgo-design/create': `file:${archive}` } }),
);
await run(
  pnpm,
  ['install', '--ignore-scripts', '--no-frozen-lockfile', '--registry=https://registry.npmjs.org/'],
  consumer,
);
const executable = path.join(consumer, 'node_modules/@virgo-design/create/dist/index.js');
await run(process.execPath, [executable, '--help'], consumer);
const report = { archive, templates: [] };
try {
  for (const template of templates) {
    const parent = await mkdtemp(path.join(os.tmpdir(), `virgo-generated-${template.id}-`));
    const directory = path.join(parent, 'my-pro');
    const result = { id: template.id, directory, passed: false };
    report.templates.push(result);
    await run(process.execPath, [executable, directory, '--template', template.id], parent);
    const manifest = await readJson(path.join(directory, 'package.json'));
    assert.equal(manifest.name, 'my-pro');
    assert(!JSON.stringify(manifest).includes('workspace:'));
    await run(
      pnpm,
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
      await run(pnpm, [command], directory);
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
