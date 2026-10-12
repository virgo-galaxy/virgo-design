import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { ColorPicker } from './index';
describe('ColorPicker visual contract', () => {
  it.each(['swatch', 'value'] as const)(
    'opens the %s trigger and edits RGB with opacity',
    async (variant) => {
      const user = userEvent.setup();
      render(
        <ColorPicker defaultValue="#1664f9">
          <ColorPicker.Trigger variant={variant} aria-label="Choose color" />
          <ColorPicker.Panel
            aria-label="Color picker"
            labels={{
              saturation: 'Saturation',
              brightness: 'Brightness',
              hue: 'Hue',
              opacity: 'Opacity',
              format: 'Format',
              hex: 'HEX',
              red: 'Red',
              green: 'Green',
              blue: 'Blue',
            }}
          />
        </ColorPicker>,
      );
      const trigger = screen.getByRole('button', { name: 'Choose color' });
      expect(trigger).toHaveAttribute('data-variant', variant);
      if (variant === 'value') expect(trigger).toHaveTextContent('#1664F9');
      await user.click(trigger);
      expect(screen.getByRole('dialog', { name: 'Color picker' })).toBeInTheDocument();
      fireEvent.change(screen.getByRole('slider', { name: 'Opacity' }), {
        target: { value: '50' },
      });
      expect(screen.getByRole('spinbutton', { name: 'Opacity' })).toHaveValue(50);
      await user.click(screen.getByRole('button', { name: 'Format' }));
      await user.click(screen.getByRole('option', { name: 'RGB' }));
      fireEvent.change(screen.getByRole('spinbutton', { name: 'Red' }), {
        target: { value: '255' },
      });
      expect(trigger.querySelector('[data-slot="preview"]')).toHaveAttribute(
        'data-color',
        '#ff64f980',
      );
      await user.keyboard('{Escape}');
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    },
  );
  it('offers a simple HEX panel while preserving the selected opacity', async () => {
    const user = userEvent.setup();
    render(
      <ColorPicker defaultValue="#549c8980">
        <ColorPicker.Trigger aria-label="Choose color" />
        <ColorPicker.Panel
          variant="simple"
          aria-label="Color picker"
          labels={{
            saturation: 'Saturation',
            brightness: 'Brightness',
            hue: 'Hue',
            opacity: 'Opacity',
            format: 'Format',
            hex: 'HEX',
            red: 'Red',
            green: 'Green',
            blue: 'Blue',
          }}
        />
      </ColorPicker>,
    );
    await user.click(screen.getByRole('button', { name: 'Choose color' }));
    expect(screen.getByRole('dialog')).toHaveAttribute('data-variant', 'simple');
    expect(screen.getByRole('slider', { name: 'Hue' })).toBeInTheDocument();
    expect(screen.queryByRole('slider', { name: 'Opacity' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Format' })).not.toBeInTheDocument();
    const field = screen.getByRole('textbox', { name: 'HEX' });
    await user.clear(field);
    await user.type(field, '#123456');
    await user.tab();
    expect(
      screen.getByRole('button', { name: 'Choose color' }).querySelector('[data-slot="preview"]'),
    ).toHaveAttribute('data-color', '#12345680');
  });
  it.each(['small', 'medium', 'large'] as const)(
    'retains %s density and semantic composition',
    (size) => {
      render(
        <ColorPicker size={size} className="custom">
          <ColorPicker.Input aria-label="Color" />
          <ColorPicker.Swatch value="#1a5cff" />
        </ColorPicker>,
      );
      const root = screen.getByLabelText('Color').parentElement!;
      expect(root).toHaveClass('custom');
      expect(root).toHaveAttribute('data-size', size);
    },
  );
});
