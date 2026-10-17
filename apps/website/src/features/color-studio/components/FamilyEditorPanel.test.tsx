import '@/i18n/runtime';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VIRGO_CHROMATIC_BASES } from '@virgo-design/colors';
import { describe, expect, it, vi } from 'vitest';

import { FamilyEditorPanel } from './FamilyEditorPanel';

describe('Family editor', () => {
  it('names each color input and makes the hidden editor inert', async () => {
    const onChange = vi.fn();
    const view = (active: boolean) => (
      <FamilyEditorPanel
        active={active}
        bases={VIRGO_CHROMATIC_BASES}
        selectedFamily="red"
        onChange={onChange}
        onSelect={() => {}}
      />
    );
    const { rerender, container } = render(view(true));
    const red = screen.getByRole('textbox', { name: 'Red' });
    const user = userEvent.setup();
    await user.clear(red);
    await user.type(red, '#123456');
    await user.tab();
    expect(onChange).toHaveBeenCalledWith('red', '#123456');

    onChange.mockClear();
    await user.click(red);
    await user.clear(red);
    await user.type(red, '#ABCDEF{Escape}');
    expect(red).toHaveValue(VIRGO_CHROMATIC_BASES.red.toUpperCase());
    expect(red).toHaveFocus();
    expect(onChange).not.toHaveBeenCalled();

    rerender(view(false));
    expect(container.querySelector('aside')).toHaveAttribute('inert');
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });
});
