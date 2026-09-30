import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { CopyToast } from '@/shared/ui/copy-toast/CopyToast';

import { FeedbackToast } from './FeedbackToast';

describe('Website feedback', () => {
  it('uses the same compact top-center Toast for Foundation copy messages', () => {
    const { rerender } = render(<CopyToast toast={{ id: 1, message: '@brand-5 copied' }} />);
    const toast = screen.getByRole('status', { name: '@brand-5 copied' });
    expect(toast).toHaveAttribute('data-appearance', 'compact');
    expect(toast.parentElement).toHaveAttribute('data-placement', 'top-center');
    expect(toast.parentElement?.parentElement).toBe(document.body);
    rerender(<CopyToast toast={{ id: 2, message: '@brand-6 copied' }} />);
    expect(screen.getAllByRole('status')).toHaveLength(1);
    expect(screen.queryByText('@brand-5 copied')).not.toBeInTheDocument();
    rerender(<CopyToast toast={null} />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('announces errors and dismisses short feedback automatically', () => {
    vi.useFakeTimers();
    try {
      const onOpenChange = vi.fn();
      render(<FeedbackToast message="Copy failed" intent="error" onOpenChange={onOpenChange} />);
      expect(screen.getByRole('status', { name: 'Copy failed' })).toHaveAttribute(
        'data-intent',
        'error',
      );
      act(() => vi.advanceTimersByTime(1800));
      expect(onOpenChange).toHaveBeenCalledWith(false);
    } finally {
      vi.useRealTimers();
    }
  });
});
