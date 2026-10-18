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
    resolveAlias: {
      '@virgo-design/icons/brands/virgo-design.svg': './packages/icons/brands/virgo-design.svg',
      '@virgo-design/icons/artwork/grok-bot.svg': './packages/icons/artwork/grok-bot.svg',
      '@virgo-design/charts/echarts': './packages/charts/dist/echarts.js',
      '@virgo-design/charts/sparkline': './packages/charts/dist/sparkline.js',
      '@virgo-design/charts': './packages/charts/dist/index.js',
      '@virgo-design/colors': './packages/colors/dist/index.js',
      '@virgo-design/icons/brands': './packages/icons/dist/brands.js',
      '@virgo-design/icons/metadata': './packages/icons/dist/metadata.js',
      '@virgo-design/icons/registry': './packages/icons/dist/registry.js',
      '@virgo-design/icons': './packages/icons/dist/index.js',
      '@virgo-design/primitives': './packages/primitives/dist/index.js',
      '@virgo-design/themes/styles.css': './packages/themes/dist/styles.css',
      '@virgo-design/themes': './packages/themes/dist/index.js',
      '@virgo-design/tokens/vanilla-extract': './packages/tokens/dist/vanilla-extract.js',
      '@virgo-design/tokens/styles.css': './packages/tokens/dist/css/styles.css',
      '@virgo-design/tokens': './packages/tokens/dist/index.js',
      '@virgo-design/ui/locale': './packages/ui/dist/locale/index.js',
      '@virgo-design/ui': './packages/ui/dist/index.js',
    },
  },
};

export default withVanillaExtract(nextConfig);
