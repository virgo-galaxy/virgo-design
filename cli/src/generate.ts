import {
  cp,
  lstat,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  rename,
  rm,
  rmdir,
  writeFile,
} from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defaultPort, parsePort } from './port.js';

export interface Template {
  id: string;
  framework: 'vite' | 'next';
  style: 'scss-modules' | 'tailwind' | 'vanilla-extract';
}

const bundledTemplates = fileURLToPath(new URL('../templates/', import.meta.url));

export function projectName(target: string): string {
  const name = path.basename(path.resolve(target));
  if (!/^[a-z0-9][a-z0-9._-]*$/.test(name) || name.length > 214 || name === 'node_modules') {
    throw new Error(
      'Use a project directory name containing lowercase letters, numbers, dots, underscores or hyphens.',
    );
  }
  return name;
}

export async function listTemplates(directory = bundledTemplates): Promise<Template[]> {
  const manifest: { templates: Template[] } = JSON.parse(
    await readFile(path.join(directory, 'manifest.json'), 'utf8'),
  );
  return manifest.templates;
}

export async function generateProject({
  target,
  template,
  port = defaultPort,
  templatesDirectory = bundledTemplates,
}: {
  target: string;
  template: string;
  port?: number;
  templatesDirectory?: string;
}) {
  const templates = await listTemplates(templatesDirectory);
  const selected = templates.find((entry) => entry.id === template);
  if (!selected) {
    throw new Error(
      `Unknown template: ${template}. Available: ${templates.map((entry) => entry.id).join(', ')}`,
    );
  }
  parsePort(String(port));
  const destination = path.resolve(target);
  const name = projectName(target);
  let exists = false;
  try {
    const entry = await lstat(destination);
    exists = true;
    if (entry.isSymbolicLink() || !entry.isDirectory() || (await readdir(destination)).length > 0) {
      throw new Error(`Destination must be a new or empty directory: ${destination}`);
    }
  } catch (error) {
    if (!(error instanceof Error && 'code' in error && error.code === 'ENOENT')) throw error;
  }
  await mkdir(path.dirname(destination), { recursive: true });
  const staging = await mkdtemp(path.join(path.dirname(destination), '.create-virgo-'));
  try {
    await cp(path.join(templatesDirectory, template), staging, { recursive: true });
    await rename(path.join(staging, '_gitignore'), path.join(staging, '.gitignore'));
    const packagePath = path.join(staging, 'package.json');
    const manifest = JSON.parse(await readFile(packagePath, 'utf8'));
    manifest.name = name;
    manifest.scripts ??= {};
    if (selected.framework === 'vite') {
      manifest.scripts.dev = `vite --port ${port}`;
      manifest.scripts.preview = `vite preview --port ${port} --strictPort`;
    } else {
      manifest.scripts.dev = `next dev --port ${port}`;
      manifest.scripts.start = `next start --port ${port}`;
    }
    await writeFile(packagePath, `${JSON.stringify(manifest, null, 2)}\n`);
    await cp(path.join(staging, '.env.example'), path.join(staging, '.env'));
    if (exists) await rmdir(destination);
    await rename(staging, destination);
  } catch (error) {
    await rm(staging, { recursive: true, force: true });
    throw error;
  }
  return { directory: destination, name };
}
