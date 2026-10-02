import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import { Carousel } from './index';
beforeEach(() =>
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
  ),
);
afterEach(() => vi.unstubAllGlobals());
it('hides arrows by default and allows explicit hover, always and none modes', () => {
  const example = (arrows?: 'hover' | 'always' | 'none') => (
    <Carousel count={2} {...(arrows ? { arrows } : {})}>
      <Carousel.Viewport>
        <Carousel.Track>
          <Carousel.Item index={0}>First</Carousel.Item>
          <Carousel.Item index={1}>Second</Carousel.Item>
        </Carousel.Track>
      </Carousel.Viewport>
      <Carousel.Indicators />
    </Carousel>
  );
  const { rerender } = render(example());
  expect(screen.getByRole('region')).toHaveAttribute('data-arrows', 'none');
  expect(screen.queryByRole('button', { name: 'Next slide' })).not.toBeInTheDocument();
  for (const arrows of ['hover', 'always'] as const) {
    rerender(example(arrows));
    expect(screen.getByRole('button', { name: 'Next slide' })).toBeInTheDocument();
  }
  rerender(example('none'));
  expect(screen.queryByRole('button', { name: 'Next slide' })).not.toBeInTheDocument();
  expect(document.querySelector('[data-slot="indicators"]')).toBeInTheDocument();
});
it('provides circular navigation, direct indicators and explicit playback controls', () => {
  render(
    <Carousel count={2} loop autoPlay arrows="hover" aria-label="Highlights">
      <Carousel.Viewport>
        <Carousel.Track>
          <Carousel.Item index={0}>First</Carousel.Item>
          <Carousel.Item index={1}>Second</Carousel.Item>
        </Carousel.Track>
      </Carousel.Viewport>
      <Carousel.Indicators
        variant="bar"
        placement="inside"
        getSlideLabel={(index) => `Workspace ${index + 1}`}
      />
      <Carousel.Playback />
    </Carousel>,
  );
  expect(screen.getByRole('region')).toHaveAttribute('data-arrows', 'hover');
  expect(document.querySelector('[data-slot="indicators"]')).toHaveAttribute(
    'data-placement',
    'inside',
  );
  expect(document.querySelector('[data-slot="indicator-thumb"]')).toBeInTheDocument();
  const next = screen.getByRole('button', { name: 'Next slide' });
  expect(next).toHaveAttribute('data-variant', 'outline');
  expect(next).toHaveAttribute('data-shape', 'circle');
  fireEvent.click(next);
  expect(screen.getByRole('button', { name: 'Workspace 2' })).toHaveAttribute(
    'aria-current',
    'step',
  );
  fireEvent.click(screen.getByRole('button', { name: 'Workspace 1' }));
  expect(screen.getByRole('button', { name: 'Workspace 1' })).toHaveAttribute(
    'aria-current',
    'step',
  );
  fireEvent.click(screen.getByRole('button', { name: 'Pause slideshow' }));
  expect(screen.getByRole('button', { name: 'Resume slideshow' })).toBeInTheDocument();
});
