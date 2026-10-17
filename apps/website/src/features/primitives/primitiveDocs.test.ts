import * as primitives from '@virgo-design/primitives';
import { describe, expect, it } from 'vitest';

import { primitiveDocs } from './primitiveDocs';

describe('primitiveDocs', () => {
  it('catalogues every public component export from @virgo-design/primitives exactly once', () => {
    expect(primitiveDocs.map((doc) => doc.exportName).sort()).toEqual(
      Object.keys(primitives)
        .filter((name) => !['useCarouselState', 'useSelectState', 'PortalProvider'].includes(name))
        .sort(),
    );
    expect(new Set(primitiveDocs.map((doc) => doc.slug)).size).toBe(primitiveDocs.length);
  });
});
