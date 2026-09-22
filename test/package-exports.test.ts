import { createRequire } from 'node:module';

import { describe, expect, it } from 'vitest';

describe('component package export boundaries', () => {
  it.each(['primitives', 'ui'])('keeps %s implementation subpaths private', (name) => {
    const require = createRequire(new URL(`../packages/${name}/package.json`, import.meta.url));
    for (const path of [
      'internal/overlay/Portal',
      'dist/internal/utils/composeRefs',
      'components/Popover',
    ]) {
      expect(() => require.resolve(`@virgo-design/${name}/${path}`)).toThrow(
        /not defined by "exports"/,
      );
    }
  });
});
