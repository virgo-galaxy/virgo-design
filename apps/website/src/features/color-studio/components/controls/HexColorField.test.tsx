import '@/i18n/runtime';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';

import { HexColorField } from './HexColorField';

describe('Color Studio color field', () => {
  it('labels each input and restores trigger focus on Escape while preserving HEX edits', async () => {
    function Harness() {
      const [color, setColor] = useState('#1664F9');
      return <HexColorField value={color} onChange={setColor} label="Brand color" />;
    }
    const user = userEvent.setup();
    render(<Harness />);
    const field = screen.getByRole('textbox', { name: 'Brand color' });
    expect(field).toHaveValue('#1664F9');
    const trigger = screen.getByRole('button', { name: 'Open color picker' });
    await user.click(trigger);
    const dialog = await screen.findByRole('dialog', { name: 'Color picker' });
    expect(trigger).toHaveAttribute('aria-controls', dialog.id);
    const hex = screen.getByRole('textbox', { name: 'HEX color' });
    await user.click(hex);
    await user.clear(hex);
    await user.type(hex, '#123456');
    await user.tab();
    expect(field).toHaveValue('#123456');
    await user.keyboard('{Escape}');
    expect(trigger).toHaveFocus();
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});
