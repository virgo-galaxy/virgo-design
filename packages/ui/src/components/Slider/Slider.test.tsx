import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Slider } from './index';
describe('Slider visual contract', () => {
  it('keeps the fill synchronized with native uncontrolled changes and bounds', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Slider ref={ref} aria-label="Value" min={10} max={30} defaultValue={15} />);
    const input = screen.getByRole('slider');
    expect(ref.current).toBe(input);
    expect(input).toHaveStyle({ '--slider-progress': '25%' });
    fireEvent.change(input, { target: { value: '20' } });
    expect(input).toHaveStyle({ '--slider-progress': '50%' });
  });
  it('reflects accepted controlled values without painting rejected changes', () => {
    const change = vi.fn();
    const { rerender } = render(<Slider value={40} onValueChange={change} aria-label="Value" />);
    const input = screen.getByRole('slider');
    fireEvent.change(input, { target: { value: '80' } });
    expect(change).toHaveBeenCalledWith(80);
    expect(input).toHaveStyle({ '--slider-progress': '40%' });
    rerender(<Slider value={80} onValueChange={change} aria-label="Value" />);
    expect(input).toHaveStyle({ '--slider-progress': '80%' });
  });
  it.each(['small', 'medium', 'large'] as const)(
    'retains %s density and semantic composition',
    (size) => {
      render(<Slider size={size} aria-label="Value" defaultValue={40} className="custom" />);
      const root = screen.getByRole('slider');
      expect(root).toHaveClass('custom');
      expect(root).toHaveAttribute('data-size', size);
    },
  );
});
it('exports the styled range with normalized positions and forwards its root ref', () => {
  const ref = createRef<HTMLDivElement>();
  render(
    <Slider.Range
      ref={ref}
      aria-label="Width"
      value={[20, 50, 80]}
      thumbLabels={['Minimum', 'Current', 'Maximum']}
      size="small"
    />,
  );
  const group = screen.getByRole('group', { name: 'Width' });
  expect(ref.current).toBe(group);
  expect(group).toHaveAttribute('data-size', 'small');
  expect(group.querySelector('[data-slot="track"]')).toHaveStyle({
    '--slider-range-start': '20%',
    '--slider-range-end': '80%',
  });
  expect(screen.getByRole('slider', { name: 'Current' })).toHaveStyle({ insetInlineStart: '50%' });
});
