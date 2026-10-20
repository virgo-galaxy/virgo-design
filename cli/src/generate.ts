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

export interface Template {
  id: string;
  framework: 'vite' | 'next';
  style: 'scss-modules' | 'tailwind' | 'vanilla-extract';
  port: number;
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
  templatesDirectory = bundledTemplates,
}: {
  target: string;
  template: string;
  templatesDirectory?: string;
}) {
  const templates = await listTemplates(templatesDirectory);
  if (!templates.some((entry) => entry.id === template)) {
    throw new Error(
      `Unknown template: ${template}. Available: ${templates.map((entry) => entry.id).join(', ')}`,
    );
  }
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
