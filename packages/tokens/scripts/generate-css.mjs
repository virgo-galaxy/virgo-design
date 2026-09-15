import { URL } from 'node:url';

import { writeCssFiles } from '../dist/css/write-css.js';

await writeCssFiles(new URL('../dist/css/', import.meta.url));
