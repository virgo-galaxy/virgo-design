import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { composeRefs } from './composeRefs';

describe('composeRefs', () => {
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
