import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { composeRefs } from './composeRefs';

describe('composeRefs', () => {
  it('releases both callback refs when each owns a resource', () => {
    const firstRelease = vi.fn();
    const secondRelease = vi.fn();
    const { unmount } = render(
      <button
        ref={composeRefs(
          () => firstRelease,
          () => secondRelease,
        )}
      >
        Action
      </button>,
    );

    unmount();

    expect(firstRelease).toHaveBeenCalledOnce();
    expect(secondRelease).toHaveBeenCalledOnce();
  });

  it('releases callback-owned resources and the internal ref on unmount', () => {
    const internal = createRef<HTMLButtonElement>();
    const cleanup = vi.fn();
    const forwarded = vi.fn(() => cleanup);
    const { unmount } = render(<button ref={composeRefs(forwarded, internal)}>Action</button>);

    expect(internal.current).not.toBeNull();

    unmount();

    expect(internal.current).toBeNull();
    expect(cleanup).toHaveBeenCalledOnce();
    expect(forwarded).toHaveBeenCalledOnce();
  });

  it('assigns and clears both the forwarded callback and internal ref', () => {
    const internal = createRef<HTMLButtonElement>();
    const forwarded = vi.fn();
    const { unmount, getByRole } = render(
      <button ref={composeRefs(forwarded, internal)}>Action</button>,
    );
    expect(internal.current).toBe(getByRole('button'));
    expect(forwarded).toHaveBeenLastCalledWith(internal.current);
    unmount();
    expect(internal.current).toBeNull();
    expect(forwarded).toHaveBeenLastCalledWith(null);
  });
});
