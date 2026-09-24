import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { AccordionPage } from './AccordionPage';

describe('AccordionPage', () => {
  it('shows interactive single and multiple examples', async () => {
    const user = userEvent.setup();
    render(<AccordionPage />);

    expect(screen.getByRole('heading', { name: 'Variants' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Sizes' })).toBeInTheDocument();

    const modes = document.querySelector('#accordion-modes');
    expect(modes).not.toBeNull();
    const modeQueries = within(modes as HTMLElement);
    const anatomyTriggers = modeQueries.getAllByRole('button', { name: 'Anatomy' });

    await user.click(anatomyTriggers[0]!);
    expect(anatomyTriggers[0]).toHaveAttribute('aria-expanded', 'true');
    await user.click(anatomyTriggers[1]!);
    expect(anatomyTriggers[1]).toHaveAttribute('aria-expanded', 'false');
  });
});
