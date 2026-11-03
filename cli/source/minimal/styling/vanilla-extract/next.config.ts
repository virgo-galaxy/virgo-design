import { fileURLToPath } from 'node:url';

import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import type { NextConfig } from 'next';

const config: NextConfig = {
  agentRules: false,
  devIndicators: false,
  turbopack: { root: fileURLToPath(new URL('.', import.meta.url)) },
};
const withVanillaExtract = createVanillaExtractPlugin({ unstable_turbopack: { mode: 'auto' } });
export default withVanillaExtract(config);
