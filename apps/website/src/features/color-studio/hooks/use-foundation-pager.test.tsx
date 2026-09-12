import { fireEvent, render, screen } from '@testing-library/react';
import { useRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import type { FoundationPage } from '../model/types';
import { useFoundationPager } from './use-foundation-pager';

interface PagerProps {
  onPageChange: (page: FoundationPage) => void;
}

function Pager({ onPageChange }: PagerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<FoundationPage>('chromatic');

  useFoundationPager({
    ref,
    page,
    onPageChange: (nextPage) => {
      onPageChange(nextPage);
      setPage(nextPage);
    },
  });

  return <div ref={ref} data-testid="pager" data-page={page} />;
}

describe('useFoundationPager', () => {
  it('requires a deliberate horizontal gesture before changing pages', () => {
    const onPageChange = vi.fn();

    render(<Pager onPageChange={onPageChange} />);

    const pager = screen.getByTestId('pager');

    fireEvent.wheel(pager, { deltaX: 71, deltaY: 0 });

    expect(onPageChange).not.toHaveBeenCalled();
    expect(pager.dataset.page).toBe('chromatic');

    fireEvent.wheel(pager, { deltaX: 4, deltaY: 0 });

    expect(onPageChange).toHaveBeenCalledOnce();
    expect(onPageChange).toHaveBeenCalledWith('brand-neutral');
    expect(pager.dataset.page).toBe('brand-neutral');
  });

  it('does not reverse pages during the same trackpad gesture', () => {
    const onPageChange = vi.fn();

    render(<Pager onPageChange={onPageChange} />);

    const pager = screen.getByTestId('pager');

    fireEvent.wheel(pager, { deltaX: 72, deltaY: 0 });
    fireEvent.wheel(pager, { deltaX: -72, deltaY: 0 });

    expect(onPageChange).toHaveBeenCalledOnce();
    expect(pager.dataset.page).toBe('brand-neutral');
  });
});
