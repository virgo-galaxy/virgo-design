import '@/i18n/runtime';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ComponentPageMetadataProvider } from '../../components/ComponentPageMetadata';
import { ButtonPage } from './ButtonPage';

describe('Button article documentation', () => {
  it('keeps four article sections and five independent examples, without the PoC section', () => {
    const { container } = render(
      <ComponentPageMetadataProvider
        metadata={{ index: '01', status: 'stable', version: 'V1.0.0' }}
      >
        <ButtonPage />
      </ComponentPageMetadataProvider>,
    );
    expect(
      screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent),
    ).toEqual(['01Variants', '02Sizes', '03Icons', '04States']);
    expect(container.querySelectorAll('[data-article-section]')).toHaveLength(4);
    expect(container.querySelectorAll('[data-example-frame]')).toHaveLength(5);
    expect(container.querySelectorAll('[data-example-toolbar]')).toHaveLength(5);
    expect(container.querySelector('.review-section, .component-example-list')).toBeNull();
    expect(screen.queryByRole('heading', { name: 'Examples' })).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Buttons with icons' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Icon-only buttons' }),
    ).toBeInTheDocument();
    expect(container.querySelector('.hero-stage')).toBeInTheDocument();
    const runtimeControl = screen.getByRole('button', { name: 'Expand all' });
    expect(runtimeControl.closest('.specimen-caption')).toBeInTheDocument();
    expect(runtimeControl.querySelector('svg')).toBeNull();
  });
});
