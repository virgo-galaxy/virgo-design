import { act, renderHook } from '@testing-library/react';
import { VIRGO_BRAND_BASE, VIRGO_NEUTRAL_BASE } from '@virgo-design/colors';
import { describe, expect, it } from 'vitest';

import { useColorStudio } from './use-color-studio';

describe('useColorStudio foundation editing', () => {
  it('freezes the official brand and neutral foundations while preserving editable drafts', () => {
    const { result } = renderHook(() => useColorStudio());

    act(() => {
      result.current.setBrandBase('#123456');
      result.current.setNeutralBase('#654321');
    });

    expect(result.current.brandBase).toBe(VIRGO_BRAND_BASE);
    expect(result.current.neutralBase).toBe(VIRGO_NEUTRAL_BASE);

    act(() => result.current.setChromaticMode('linked'));
    act(() => {
      result.current.setBrandBase('#123456');
      result.current.setNeutralBase('#654321');
    });

    expect(result.current.brandBase).toBe('#123456');
    expect(result.current.neutralBase).toBe('#654321');

    act(() => result.current.setChromaticMode('official'));

    expect(result.current.brandBase).toBe(VIRGO_BRAND_BASE);
    expect(result.current.neutralBase).toBe(VIRGO_NEUTRAL_BASE);

    act(() => result.current.setChromaticMode('linked'));

    expect(result.current.brandBase).toBe('#123456');
    expect(result.current.neutralBase).toBe('#654321');
  });
});
