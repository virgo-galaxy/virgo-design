import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ElevationLevel, RadiusToken } from '@virgo-design/tokens';
import { createRef } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, expectTypeOf, it, vi } from 'vitest';

import { Surface } from './index';
import type { SurfaceElevation, SurfaceProps, SurfaceRadius, SurfaceTone } from './Surface.types';

function verifyTypeContract() {
  // @ts-expect-error Elevation must be an existing Foundation level.
  const elevation: SurfaceProps = { elevation: 6 };
  // @ts-expect-error Radius must be an existing Foundation token.
  const radius: SurfaceProps = { radius: 7 };
  // @ts-expect-error Decorative images do not accept content-image alt text.
  const background: SurfaceProps = { background: { type: 'image', src: '/a.svg', alt: 'Content' } };
  return [elevation, radius, background];
}

void verifyTypeContract;

describe('Surface', () => {
  it('keeps public depth and radius types aligned with the existing Foundations', () => {
    expectTypeOf<SurfaceRadius>().toEqualTypeOf<RadiusToken>();
    expectTypeOf<SurfaceElevation>().toEqualTypeOf<ElevationLevel>();
  });

  it('renders a plain div with accessible children and no empty decorative layers by default', () => {
    const { container } = render(
      <Surface>
        Hello <button type="button">Action</button>
      </Surface>,
    );
    const root = container.firstElementChild!;

    expect(root.tagName).toBe('DIV');
    expect(root).toHaveTextContent('Hello');
    expect(root).toHaveAttribute('data-tone', 'default');
    expect(root).toHaveAttribute('data-material', 'solid');
    expect(root).toHaveAttribute('data-elevation', '0');
    expect(root).toHaveAttribute('data-radius', '0');
    expect(root).toHaveAttribute('data-border', 'none');
    expect(root).not.toHaveAttribute('role');
    expect(root).not.toHaveAttribute('aria-label');
    expect(root).not.toHaveAttribute('tabindex');
    expect(root.children).toHaveLength(1);
    expect(screen.getByRole('button', { name: 'Action' }).parentElement).toBe(root);
  });

  it('forwards native props, className, style, events, and the root ref', () => {
    const ref = createRef<HTMLDivElement>();
    const onClick = vi.fn();
    render(
      <Surface
        ref={ref}
        id="panel"
        role="region"
        aria-label="Activity"
        aria-describedby="details"
        tabIndex={-1}
        title="Panel"
        className="consumer"
        style={{ display: 'grid', padding: 12, borderRadius: 20 }}
        onClick={onClick}
      />,
    );
    const root = screen.getByRole('region', { name: 'Activity' });
    expect(ref.current).toBe(root);
    expect(root).toHaveClass('consumer');
    expect(root).toHaveAttribute('id', 'panel');
    expect(root).toHaveAttribute('aria-describedby', 'details');
    expect(root).toHaveAttribute('tabindex', '-1');
    expect(root).toHaveAttribute('title', 'Panel');
    expect(root).toHaveStyle({ display: 'grid', padding: '12px', borderRadius: '20px' });
    fireEvent.click(root);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it.each<SurfaceTone>(['default', 'secondary', 'strong', 'elevated'])(
    'maps the %s tone to its existing semantic token',
    (tone) => {
      render(<Surface tone={tone} data-testid="surface" />);
      const root = screen.getByTestId('surface');
      expect(root).toHaveAttribute('data-tone', tone);
      expect(root.style.getPropertyValue('--surface-tone')).toBe(`var(--vd-surface-${tone})`);
      expect(root).not.toHaveAttribute('tone');
    },
  );

  it.each(['solid', 'translucent', 'glass'] as const)(
    'renders the %s material independently from tone and depth',
    (material) => {
      render(<Surface material={material} tone="secondary" elevation={2} data-testid="surface" />);
      const root = screen.getByTestId('surface');
      expect(root).toHaveAttribute('data-material', material);
      expect(root).toHaveAttribute('data-tone', 'secondary');
      expect(root).toHaveAttribute('data-elevation', '2');
      expect(root.querySelectorAll('[data-slot="material"]')).toHaveLength(
        material === 'solid' ? 0 : 1,
      );
      expect(root).toHaveAttribute('data-border', material === 'glass' ? 'subtle' : 'none');
    },
  );

  it.each([0, 1, 2, 3, 4, 5] as const)('uses the theme-aware elevation %s token', (elevation) => {
    render(<Surface elevation={elevation} data-testid="surface" />);
    expect(screen.getByTestId('surface').style.getPropertyValue('--surface-elevation')).toBe(
      `var(--vd-elevation-${elevation})`,
    );
  });

  it.each([0, 4, 6, 8, 10, 12, 16, 20, 24, 'full'] as const)(
    'uses the radius %s token',
    (radius) => {
      render(<Surface radius={radius} data-testid="surface" />);
      expect(screen.getByTestId('surface').style.getPropertyValue('--surface-radius')).toBe(
        `var(--vd-shape-radius-${radius}, var(--vd-radius-${radius}))`,
      );
    },
  );

  it.each(['none', 'subtle', 'default', 'strong'] as const)(
    'honors an explicit %s glass border',
    (border) => {
      render(<Surface material="glass" border={border} data-testid="surface" />);
      expect(screen.getByTestId('surface')).toHaveAttribute('data-border', border);
    },
  );

  it('places a custom color on its own decorative background', () => {
    const { container } = render(<Surface background={{ type: 'color', value: '#101114' }} />);
    expect(container.querySelector('[data-slot="background"]')).toHaveStyle({
      backgroundColor: '#101114',
    });
  });

  it('places a custom gradient on its own decorative background', () => {
    const value = 'linear-gradient(120deg, red, blue)';
    const { container } = render(<Surface background={{ type: 'gradient', value }} />);
    expect(container.querySelector('[data-slot="background"]')).toHaveStyle({
      backgroundImage: value,
    });
  });

  it.each(['/wallpaper.svg', 'https://example.com/wallpaper.jpg'])(
    'accepts decorative image URL %s with cover/center defaults and no repeat',
    (src) => {
      const { container } = render(<Surface background={{ type: 'image', src }} />);
      expect(container.querySelector('[data-slot="background"]')).toHaveStyle({
        backgroundImage: `url("${src}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      });
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    },
  );

  it('supports image fit and position overrides', () => {
    const { container } = render(
      <Surface
        background={{ type: 'image', src: '/wallpaper.svg', fit: 'contain', position: 'left top' }}
      />,
    );
    expect(container.querySelector('[data-slot="background"]')).toHaveStyle({
      backgroundSize: 'contain',
      backgroundPosition: 'left top',
    });
  });

  it('keeps decorative layers hidden from accessibility while nested content stays interactive', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Surface material="glass" background={{ type: 'color', value: 'red' }} data-testid="outer">
        <Surface tone="elevated" data-testid="inner">
          <button type="button" onClick={onClick}>
            Nested action
          </button>
        </Surface>
      </Surface>,
    );
    const outer = screen.getByTestId('outer');
    const layers = outer.querySelectorAll(':scope > [data-slot]');
    expect(layers).toHaveLength(2);
    layers.forEach((layer) => expect(layer).toHaveAttribute('aria-hidden', 'true'));
    expect(outer.children[0]).toHaveAttribute('data-slot', 'background');
    expect(outer.children[1]).toHaveAttribute('data-slot', 'material');
    const inner = screen.getByTestId('inner');
    expect(inner.parentElement).toBe(outer);
    const action = within(inner).getByRole('button', { name: 'Nested action' });
    await user.tab();
    expect(action).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('removes optional layers when returning to a plain surface', () => {
    const { container, rerender } = render(
      <Surface material="glass" background={{ type: 'color', value: 'red' }}>
        Content
      </Surface>,
    );
    rerender(<Surface>Content</Surface>);
    expect(container.firstElementChild?.children).toHaveLength(0);
    expect(container).toHaveTextContent('Content');
  });

  it('renders layered surfaces on the server without browser measurements', () => {
    const markup = renderToString(
      <Surface material="glass" background={{ type: 'image', src: '/wallpaper.svg' }}>
        Server content
      </Surface>,
    );
    expect(markup).toContain('Server content');
    expect(markup).toContain('data-slot="material"');
    expect(markup).toContain('aria-hidden="true"');
  });
});
