import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useControllableState } from './useControllableState';

describe('useControllableState', () => {
  it('updates uncontrolled state once for a changed value and supports silent lifecycle reset', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useControllableState<boolean>(undefined, false, onChange));
    act(() => result.current[1](true));
    expect(result.current[0]).toBe(true);
    act(() => result.current[1](true));
    expect(onChange).toHaveBeenCalledExactlyOnceWith(true);
    act(() => result.current[2](false));
    expect(result.current[0]).toBe(false);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
  it('reports controlled changes without mutating the owners value', () => {
    const onChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ value }) => useControllableState(value, 'default', onChange),
      { initialProps: { value: '' } },
    );
    act(() => result.current[1]('next'));
    expect(result.current[0]).toBe('');
    expect(onChange).toHaveBeenCalledExactlyOnceWith('next');
    rerender({ value: 'next' });
    expect(result.current[0]).toBe('next');
  });
});
