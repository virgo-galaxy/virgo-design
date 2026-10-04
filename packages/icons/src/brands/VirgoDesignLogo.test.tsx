import { readFile } from 'node:fs/promises';

import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { VirgoDesignLogo } from '../brands';
import { VirgoDesignIcon } from '../index';

describe('Virgo Design brand resources', () => {
  it('preserves the canonical colorful artwork and original aspect ratio', async () => {
    const source = await readFile('packages/icons/brands/virgo-design.svg', 'utf8');
    const { container } = render(<VirgoDesignLogo />);
    expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 590 470');
    const canonicalPaths = Array.from(source.matchAll(/<path d="([^"]+)"/g), (match) => match[1]);
    const renderedPaths = Array.from(container.querySelectorAll('[data-brand-track]'), (path) =>
      path.getAttribute('d'),
    );
    expect(renderedPaths).toEqual(canonicalPaths);
    expect(container.querySelector('ellipse')).toHaveAttribute('rx', '62.65');
    expect(container.querySelector('ellipse')).toHaveAttribute('ry', '65.24');
    expect(container.querySelectorAll('stop')).toHaveLength(8);
  });

  it('uses unique gradient references when more than one colored logo is rendered', () => {
    const { container } = render(
      <>
        <VirgoDesignLogo />
        <VirgoDesignLogo />
      </>,
    );
    const gradients = Array.from(container.querySelectorAll('linearGradient'), (node) => node.id);
    expect(new Set(gradients).size).toBe(6);
    for (const node of container.querySelectorAll('[fill^="url"]')) {
      expect(gradients).toContain(node.getAttribute('fill')!.slice(5, -1));
    }
  });

  it('supports native dimensions, labels, refs and the separate monochrome color API', () => {
    const ref = createRef<SVGSVGElement>();
    const { container } = render(
      <>
        <VirgoDesignLogo ref={ref} width={30} height={24} aria-label="Virgo Design" />
        <VirgoDesignIcon color="white" size={24} />
      </>,
    );
    expect(ref.current).toHaveAttribute('width', '30');
    expect(ref.current).toHaveAttribute('height', '24');
    expect(ref.current).not.toHaveAttribute('aria-hidden');
    const mono = container.querySelectorAll('svg')[1];
    expect(mono).toHaveAttribute('fill', 'currentColor');
    expect(mono).toHaveAttribute('color', 'white');
    expect(mono).toHaveAttribute('viewBox', '0 0 24 24');
    expect(mono?.querySelector('linearGradient')).toBeNull();
  });
});
