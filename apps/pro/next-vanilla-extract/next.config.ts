import { fileURLToPath } from 'node:url';

import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import type { NextConfig } from 'next';

const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: 'auto' },
});

const nextConfig: NextConfig = {
  agentRules: false,
  devIndicators: false,
  turbopack: {
    root: fileURLToPath(new URL('../../../', import.meta.url)),
  },
};

export default withVanillaExtract(nextConfig);
