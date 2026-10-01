import '@/i18n/runtime';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { SemanticColorExport } from './SemanticColorExport';

afterEach(() => vi.restoreAllMocks());

describe('Semantic color export', () => {
  it('reports clipboard failure and permits a successful retry', async () => {
    const user = userEvent.setup();
    const write = vi
      .spyOn(navigator.clipboard, 'writeText')
      .mockRejectedValueOnce(new Error('Denied'))
      .mockResolvedValueOnce(undefined);
    render(<SemanticColorExport />);
    await user.click(screen.getByRole('button', { name: 'Copy' }));
    expect(await screen.findByRole('status')).toHaveTextContent('Copy failed. Please try again.');
    expect(screen.getByRole('button', { name: 'Copy' })).toBeEnabled();
    await user.click(screen.getByRole('button', { name: 'Copy' }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Copied'));
    expect(write).toHaveBeenCalledTimes(2);
    expect(write.mock.calls[1]?.[0]).toContain('--vd-');
  });
});
