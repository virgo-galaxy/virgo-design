import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { artworkIconSvgSources } from './artwork';
import { GrokBotIcon } from './index';

describe('GrokBotIcon artwork', () => {
  it('keeps the original proportions and silver gradients at small sizes', () => {
    const ref = createRef<SVGSVGElement>();
    const { rerender } = render(<GrokBotIcon ref={ref} />);
    for (const size of [16, 20, 24, 32]) {
      rerender(<GrokBotIcon ref={ref} size={size} aria-label="Silver bot" />);
      const svg = ref.current!;
      expect(svg).toHaveAttribute('width', String(size));
      expect(svg).toHaveAttribute('height', String(size));
      expect(svg).toHaveAttribute('viewBox', '8.25 8.25 112.1 113.5');
      expect(svg).toHaveAttribute('preserveAspectRatio', 'xMidYMid meet');
      expect(svg).not.toHaveAttribute('aria-hidden');
      expect(svg.querySelectorAll('linearGradient, radialGradient')).toHaveLength(3);
      expect(artworkIconSvgSources['grok-bot']).toContain('stop-color="#d5d5d5"');
    }
  });

  it('isolates gradient references when multiple bots appear on the same page', () => {
    const { container } = render(
      <>
        <GrokBotIcon />
        <GrokBotIcon />
      </>,
    );
    const gradients = [...container.querySelectorAll('linearGradient, radialGradient')];
    expect(new Set(gradients.map((gradient) => gradient.id)).size).toBe(6);
    for (const svg of container.querySelectorAll('svg')) {
      const ids = new Set([...svg.querySelectorAll('[id]')].map((element) => element.id));
      for (const element of svg.querySelectorAll('[fill^="url("]')) {
        expect(ids.has(element.getAttribute('fill')!.slice(5, -1))).toBe(true);
      }
    }
  });
});
