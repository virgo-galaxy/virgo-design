import { spawnSync } from 'node:child_process';
import { chmod, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import { exportTemplates } from './export-templates.mjs';

const directory = fileURLToPath(new URL('../', import.meta.url));
await rm(new URL('../dist/', import.meta.url), { recursive: true, force: true });
const compiled = spawnSync('tsc', ['-p', 'tsconfig.build.json'], {
  cwd: directory,
  stdio: 'inherit',
  shell: process.platform === 'win32',
});
if (compiled.error) throw compiled.error;
if (compiled.status !== 0) process.exit(compiled.status ?? 1);
await exportTemplates();
await chmod(new URL('../dist/index.js', import.meta.url), 0o755);
await cp(new URL('../../LICENSE', import.meta.url), new URL('../LICENSE', import.meta.url));
