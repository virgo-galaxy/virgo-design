import { mkdir, mkdtemp, readdir, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { afterEach, beforeEach, expect, it } from 'vitest';

import { generateProject } from './generate.js';

let directory: string;
let templatesDirectory: string;

beforeEach(async () => {
  directory = await mkdtemp(path.join(os.tmpdir(), 'virgo-generator-test-'));
  templatesDirectory = path.join(directory, 'templates');
  const template = path.join(templatesDirectory, 'vite-react-tailwind');
  await mkdir(template, { recursive: true });
  await writeFile(
    path.join(templatesDirectory, 'manifest.json'),
    JSON.stringify({
      templates: [{ id: 'vite-react-tailwind', framework: 'vite', style: 'tailwind', port: 6302 }],
    }),
  );
  await writeFile(
    path.join(template, 'package.json'),
    JSON.stringify({
      name: 'virgo-pro',
      private: true,
      dependencies: { '@virgo-design/ui': '0.1.0' },
    }),
  );
  await writeFile(path.join(template, '_gitignore'), 'node_modules/\n');
  await writeFile(path.join(template, '.env.example'), 'VITE_API_MOCKING=true\n');
});

afterEach(async () => {
  await rm(directory, { recursive: true, force: true });
});

it('creates a standalone project with its name, dotfiles and default environment', async () => {
  const target = path.join(directory, 'my-pro');
  const result = await generateProject({
    target,
    template: 'vite-react-tailwind',
    templatesDirectory,
  });
  expect(result).toEqual({ directory: target, name: 'my-pro' });
  expect(JSON.parse(await readFile(path.join(target, 'package.json'), 'utf8'))).toEqual({
    name: 'my-pro',
    private: true,
    dependencies: { '@virgo-design/ui': '0.1.0' },
  });
  expect(await readFile(path.join(target, '.env'), 'utf8')).toBe('VITE_API_MOCKING=true\n');
  expect(await readFile(path.join(target, '.gitignore'), 'utf8')).toBe('node_modules/\n');
  expect(await readdir(target)).not.toContain('_gitignore');
  expect(
    JSON.parse(
      await readFile(path.join(templatesDirectory, 'vite-react-tailwind/package.json'), 'utf8'),
    ).name,
  ).toBe('virgo-pro');
});

it('accepts an existing empty project directory', async () => {
  const target = path.join(directory, 'my-pro');
  await mkdir(target);
  await generateProject({ target, template: 'vite-react-tailwind', templatesDirectory });
  expect(await readFile(path.join(target, '.env'), 'utf8')).toContain('VITE_API_MOCKING=true');
});

it('refuses to overwrite a nonempty directory or an existing file', async () => {
  const target = path.join(directory, 'my-pro');
  await mkdir(target);
  await writeFile(path.join(target, 'notes.txt'), 'Keep this file');
  await expect(
    generateProject({ target, template: 'vite-react-tailwind', templatesDirectory }),
  ).rejects.toThrow('new or empty directory');
  expect(await readdir(target)).toEqual(['notes.txt']);
  expect(await readFile(path.join(target, 'notes.txt'), 'utf8')).toBe('Keep this file');
  const file = path.join(directory, 'existing-file');
  await writeFile(file, 'Keep this file');
  await expect(
    generateProject({ target: file, template: 'vite-react-tailwind', templatesDirectory }),
  ).rejects.toThrow('new or empty directory');
});

it('refuses to write through a destination symlink', async () => {
  const original = path.join(directory, 'original');
  await mkdir(original);
  const target = path.join(directory, 'my-pro');
  await symlink(original, target, 'dir');
  await expect(
    generateProject({ target, template: 'vite-react-tailwind', templatesDirectory }),
  ).rejects.toThrow('new or empty directory');
  expect(await readdir(original)).toEqual([]);
});

it('rejects unknown templates and invalid project names before creating files', async () => {
  const target = path.join(directory, 'my-pro');
  await expect(
    generateProject({ target, template: '../../outside', templatesDirectory }),
  ).rejects.toThrow('Unknown template');
  await expect(
    generateProject({
      target: path.join(directory, 'Bad Name'),
      template: 'vite-react-tailwind',
      templatesDirectory,
    }),
  ).rejects.toThrow('project directory name');
  expect(await readdir(directory)).toEqual(['templates']);
});

it('removes staging files when a bundled template is incomplete', async () => {
  await rm(path.join(templatesDirectory, 'vite-react-tailwind/_gitignore'));
  await expect(
    generateProject({
      target: path.join(directory, 'my-pro'),
      template: 'vite-react-tailwind',
      templatesDirectory,
    }),
  ).rejects.toThrow();
  expect(await readdir(directory)).toEqual(['templates']);
});
