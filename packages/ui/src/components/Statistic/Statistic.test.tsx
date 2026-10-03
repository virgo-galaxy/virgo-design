import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { Statistic } from './index';
describe('Statistic', () => {
  it('associates the metric label and value and exposes change separately', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <Statistic
        ref={ref}
        label="Revenue"
        value={0}
        prefix="$"
        suffix="USD"
        description="Last month"
        trend={
          <Statistic.Trend direction="down" intent="positive">
            12%
          </Statistic.Trend>
        }
      />,
    );
    expect(container.querySelector('dt')).toHaveTextContent('Revenue');
    expect(container.querySelector('dd')).toHaveTextContent('$0USD');
    expect(screen.getByText('12%')).toHaveAttribute('data-intent', 'positive');
    expect(screen.getByText('12%')).toHaveAttribute('data-direction', 'down');
    expect(ref.current).toContainElement(screen.getByText('Last month'));
  });
  it('keeps the label but hides the stale value while loading', () => {
    const { container } = render(<Statistic label="Revenue" value="stale" loading />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.queryByText('stale')).not.toBeInTheDocument();
    expect(container.firstChild).toHaveAttribute('aria-busy', 'true');
  });
});
