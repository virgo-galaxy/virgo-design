import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { argv } from 'node:process';
import { URL, fileURLToPath } from 'node:url';

const defaultDistDirectory = fileURLToPath(new URL('../dist', import.meta.url));
const outputDirectory = argv[2] ? resolve(argv[2]) : defaultDistDirectory;

await rm(outputDirectory, { force: true, recursive: true });
