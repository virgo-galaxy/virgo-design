import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import type { AccordionSize, AccordionVariant } from './Accordion.types';
import { Accordion } from './index';

function Example({
  size,
  variant,
  icon,
}: {
  size?: AccordionSize;
  variant?: AccordionVariant;
  icon?: boolean;
}) {
  return (
    <Accordion.Root
      type="single"
      data-testid="accordion"
      {...(size ? { size } : {})}
      {...(variant ? { variant } : {})}
    >
      <Accordion.Item value="one">
        <Accordion.Trigger {...(icon === undefined ? {} : { icon })}>
          Design system
        </Accordion.Trigger>
        <Accordion.Content>Virgo Design</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}

describe('Accordion UI', () => {
  it('uses the medium size and default variant', () => {
    render(<Example />);

    expect(screen.getByTestId('accordion')).toHaveAttribute('data-size', 'md');
    expect(screen.getByTestId('accordion')).toHaveAttribute('data-variant', 'default');
  });

  it.each<AccordionSize>(['sm', 'md', 'lg'])('supports the %s size', (size) => {
    render(<Example size={size} />);

    expect(screen.getByTestId('accordion')).toHaveAttribute('data-size', size);
  });

  it.each<AccordionVariant>(['default', 'bordered', 'ghost'])(
    'supports the %s variant',
    (variant) => {
      render(<Example variant={variant} />);

      expect(screen.getByTestId('accordion')).toHaveAttribute('data-variant', variant);
    },
  );

  it('renders the Virgo chevron as a decorative indicator when requested', async () => {
    const user = userEvent.setup();
    render(<Example icon />);

    const trigger = screen.getByRole('button', { name: 'Design system' });
    const indicator = trigger.querySelector('[data-slot="indicator"]');
    expect(indicator).toHaveAttribute('aria-hidden', 'true');
    expect(trigger).toHaveAttribute('data-state', 'closed');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('data-state', 'open');
    expect(indicator).toBeInTheDocument();
  });

  it('keeps the icon optional', () => {
    render(<Example />);

    expect(screen.getByRole('button', { name: 'Design system' })).not.toContainElement(
      document.querySelector('[data-slot="indicator"]'),
    );
  });

  it('merges consumer classes and forwards refs through every primitive part', () => {
    const rootRef = createRef<HTMLDivElement>();
    const itemRef = createRef<HTMLDivElement>();
    const triggerRef = createRef<HTMLButtonElement>();
    const contentRef = createRef<HTMLDivElement>();

    render(
      <Accordion.Root
        ref={rootRef}
        type="single"
        defaultValue="one"
        className="consumer-root"
        data-testid="accordion"
      >
        <Accordion.Item ref={itemRef} className="consumer-item" value="one">
          <Accordion.Trigger ref={triggerRef} className="consumer-trigger">
            Design system
          </Accordion.Trigger>
          <Accordion.Content ref={contentRef} className="consumer-content">
            Virgo Design
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );

    expect(rootRef.current).toBe(screen.getByTestId('accordion'));
    expect(rootRef.current).toHaveClass('consumer-root');
    expect(itemRef.current).toHaveClass('consumer-item');
    expect(triggerRef.current).toHaveClass('consumer-trigger');
    expect(contentRef.current).toHaveClass('consumer-content');
  });

  it('preserves primitive open behavior and ARIA relationships', async () => {
    const user = userEvent.setup();
    render(<Example icon />);

    const trigger = screen.getByRole('button', { name: 'Design system' });
    const content = screen.getByText('Virgo Design').parentElement;
    expect(content).toHaveAttribute('hidden');
    expect(trigger).toHaveAttribute('aria-controls', content?.id);

    await user.click(trigger);
    expect(content).not.toHaveAttribute('hidden');
    expect(content).toHaveAttribute('aria-labelledby', trigger.id);
  });
});
