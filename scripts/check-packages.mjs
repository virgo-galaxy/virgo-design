import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { spawn } from 'node:child_process';
import {
  cp,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  realpath,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { x as extract } from 'tar';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, '.artifacts/packages');
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const pnpm = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
const packOnly = process.argv.includes('--pack-only');

async function run(args, cwd = root) {
  console.log(`\n> pnpm ${args.join(' ')}`);
  return new Promise((resolve, reject) => {
    const child = spawn(pnpm, args, {
      cwd,
      stdio: 'inherit',
      env: { ...process.env, HUSKY: '0' },
    });
    child.on('error', reject);
    child.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`pnpm ${args.join(' ')} exited with ${code}`)),
    );
  });
}

function targets(value) {
  if (typeof value === 'string') return [value];
  return Object.values(value ?? {}).flatMap(targets);
}

const packages = [];
for (const entry of await readdir(path.join(root, 'packages'), { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const directory = path.join(root, 'packages', entry.name);
  const manifest = await readJson(path.join(directory, 'package.json'));
  if (!manifest.private) packages.push({ directory, manifest });
}
packages.sort((a, b) => a.manifest.name.localeCompare(b.manifest.name));
const config = await readJson(path.join(root, '.changeset/config.json'));
assert.deepEqual(
  packages.map(({ manifest }) => manifest.name),
  [...config.fixed[0]].sort(),
);
assert.equal(packages.length, 8, 'Expected exactly the eight public libraries');
const versions = new Map(packages.map(({ manifest }) => [manifest.name, manifest.version]));
const report = { packages: [], consumers: [] };
await mkdir(output, { recursive: true });

for (const { directory, manifest } of packages) {
  const archive = path.join(
    output,
    `${manifest.name.replace('@', '').replace('/', '-')}-${manifest.version}.tgz`,
  );
  await run(['pack', '--out', archive], directory);
  const unpacked = path.join(output, 'contents', path.basename(directory));
  await rm(unpacked, { recursive: true, force: true });
  await mkdir(unpacked, { recursive: true });
  const files = [];
  await extract({
    file: archive,
    cwd: unpacked,
    onReadEntry: (entry) => {
      files.push(entry.path);
    },
  });
  const published = path.join(unpacked, 'package');
  const packed = await readJson(path.join(published, 'package.json'));
  assert.equal(packed.name, manifest.name);
  assert.equal(packed.version, manifest.version);
  assert(packed.license, `${packed.name}: license is required`);
  assert(
    files.some((file) => /^package\/LICENSE(?:\.\w+)?$/i.test(file)),
    `${packed.name}: license missing from archive`,
  );
  assert(
    files.some((file) => /^package\/README(?:\.\w+)?$/i.test(file)),
    `${packed.name}: README missing from archive`,
  );
  assert(
    !files.some((file) =>
      /(?:^|\/)(?:node_modules|\.git|\.env)(?:\/|$)|\.(?:test|spec)\.(?:d\.)?[cm]?[jt]sx?(?:\.map)?$/.test(
        file,
      ),
    ),
    `${packed.name}: development files leaked into archive`,
  );
  for (const field of ['dependencies', 'optionalDependencies', 'peerDependencies']) {
    for (const [name, range] of Object.entries(packed[field] ?? {})) {
      assert(
        !/^(workspace:|file:|link:)/.test(range),
        `${packed.name}: unresolved ${field}.${name}`,
      );
      if (versions.has(name))
        assert.equal(
          range,
          versions.get(name),
          `${packed.name}: unexpected internal dependency version`,
        );
    }
  }
  for (const target of targets(packed.exports)) {
    if (target.includes('*')) {
      const [prefix, suffix] = target.slice(2).split('*');
      assert(
        files.some((file) => file.startsWith(`package/${prefix}`) && file.endsWith(suffix)),
        `${packed.name}: empty wildcard export ${target}`,
      );
    } else {
      assert(
        (await stat(path.join(published, target))).isFile(),
        `${packed.name}: missing export ${target}`,
      );
    }
  }
  if (!packOnly) {
    await run(['exec', 'publint', published, '--strict']);
    const javascriptEntries = Object.entries(packed.exports)
      .filter(([, value]) => targets(value).some((file) => file.endsWith('.js')))
      .map(([entry]) => entry);
    await run([
      'exec',
      'attw',
      archive,
      '--profile',
      'esm-only',
      '--no-definitely-typed',
      '--entrypoints',
      ...javascriptEntries,
    ]);
  }
  report.packages.push({
    name: packed.name,
    version: packed.version,
    archive,
    files: files.length,
    sha256: createHash('sha256')
      .update(await readFile(archive))
      .digest('hex'),
  });
  await writeFile(path.join(output, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
}

if (!packOnly) {
  const installedVersion = async (directory, name) =>
    (await readJson(path.join(directory, 'node_modules', name, 'package.json'))).version;
  const vanilla = path.join(root, 'apps/pro/vite-react-vanilla-extract');
  const tailwind = path.join(root, 'apps/pro/vite-react-tailwind');
  const tools = {};
  for (const name of ['vite', 'typescript', 'sass', '@types/node'])
    tools[name] = await installedVersion(root, name);
  for (const name of ['tailwindcss', '@tailwindcss/vite'])
    tools[name] = await installedVersion(tailwind, name);
  for (const name of ['@vanilla-extract/css', '@vanilla-extract/vite-plugin'])
    tools[name] = await installedVersion(vanilla, name);
  const overrides = Object.fromEntries(
    report.packages.map(({ name, archive }) => [name, `file:${archive}`]),
  );
  const current = await installedVersion(root, 'react');
  for (const reactVersion of ['18.0.0', current]) {
    const directory = await mkdtemp(path.join(os.tmpdir(), 'virgo-package-consumer-'));
    try {
      await cp(path.join(root, 'test/package-consumer'), directory, { recursive: true });
      const manifest = await readJson(path.join(directory, 'package.json'));
      manifest.dependencies = { ...overrides, react: reactVersion, 'react-dom': reactVersion };
      manifest.devDependencies = {
        ...tools,
        '@types/react': reactVersion.startsWith('18.')
          ? '18.3.31'
          : await installedVersion(root, '@types/react'),
        '@types/react-dom': reactVersion.startsWith('18.')
          ? '18.3.7'
          : await installedVersion(root, '@types/react-dom'),
      };
      await writeFile(
        path.join(directory, 'package.json'),
        `${JSON.stringify(manifest, null, 2)}\n`,
      );
      await writeFile(
        path.join(directory, 'pnpm-workspace.yaml'),
        JSON.stringify({ packages: [], overrides }),
      );
      const styles = [];
      const entries = [];
      for (const { manifest: pkg } of packages) {
        for (const [entry, value] of Object.entries(pkg.exports)) {
          const name = entry === '.' ? pkg.name : `${pkg.name}${entry.slice(1)}`;
          const files = targets(value);
          if (entry.includes('*')) continue;
          if (files.some((file) => file.endsWith('.js'))) entries.push(name);
          if (entry.endsWith('.css') && name !== '@virgo-design/tokens/tailwind.css')
            styles.push(`@import '${name}';`);
        }
      }
      await writeFile(path.join(directory, 'export-styles.css'), `${styles.join('\n')}\n`);
      await writeFile(path.join(directory, 'entries.json'), JSON.stringify(entries));
      await run(
        ['install', '--ignore-scripts', '--no-frozen-lockfile', '--strict-peer-dependencies'],
        directory,
      );
      for (const { manifest: pkg } of packages) {
        const resolved = await realpath(path.join(directory, 'node_modules', pkg.name));
        assert(!resolved.startsWith(root), `${pkg.name}: resolved back into workspace`);
      }
      await run(['exec', 'tsc', '-p', 'tsconfig.json'], directory);
      await run(['exec', 'tsc', '-p', 'tsconfig.node.json'], directory);
      await run(['exec', 'node', 'ssr.mjs'], directory);
      await run(['exec', 'vite', 'build'], directory);
      const assets = await readdir(path.join(directory, 'dist/assets'));
      assert(
        assets.some((name) => name.endsWith('.css')),
        'No consumer CSS emitted',
      );
      assert(
        assets.some((name) => name.endsWith('.woff2')),
        'No self-hosted fonts emitted',
      );
      assert(
        assets.some((name) => name.endsWith('.svg')),
        'No icon SVG asset emitted',
      );
      report.consumers.push({
        react: reactVersion,
        passed: true,
        javascriptEntries: entries.length,
        styleEntries: styles.length,
        assets: assets.length,
      });
      await rm(directory, { recursive: true, force: true });
    } catch (error) {
      report.consumers.push({
        react: reactVersion,
        passed: false,
        directory,
        error: error.message,
      });
      throw error;
    } finally {
      await writeFile(path.join(output, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
    }
  }
}
console.log(
  `\nVerified ${report.packages.length} package archives and ${report.consumers.length} isolated consumers. Report: ${path.join(output, 'report.json')}`,
);
