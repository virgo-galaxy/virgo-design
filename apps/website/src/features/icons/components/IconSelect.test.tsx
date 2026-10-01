import '@/i18n/runtime';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalendarIcon, ClockIcon } from '@virgo-design/icons';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';

import { IconSelect } from './IconSelect';

describe('Icon selector', () => {
  it('supports keyboard selection, typeahead and Escape with trigger focus restoration', async () => {
    function Harness() {
      const [value, setValue] = useState('calendar');
      return (
        <IconSelect
          value={value}
          onChange={setValue}
          options={[
            { id: 'calendar', label: 'Calendar', Icon: CalendarIcon },
            { id: 'clock', label: 'Clock', Icon: ClockIcon },
          ]}
        />
      );
    }
    const user = userEvent.setup();
    render(<Harness />);
    const trigger = screen.getByRole('button', { name: 'Icon Calendar' });
    await user.tab();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('listbox', { name: 'Calendar' })).toBeVisible();
    await user.keyboard('cl');
    expect(screen.getByRole('option', { name: 'Clock' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(trigger).toHaveAccessibleName('Icon Clock');
    expect(trigger).toHaveFocus();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    await user.keyboard('{ArrowUp}{Escape}');
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAccessibleName('Icon Clock');
  });
});
