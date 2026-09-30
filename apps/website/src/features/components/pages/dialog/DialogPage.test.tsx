import '@/i18n/runtime';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ComponentPageMetadataProvider } from '../../components/ComponentPageMetadata';
import { DialogPage } from './DialogPage';

describe('Dialog article documentation', () => {
  it('renders Sizes and Form dialog as articles with their own example frames', () => {
    const { container } = render(
      <ComponentPageMetadataProvider
        metadata={{ index: '26', status: 'stable', version: 'V1.0.0' }}
      >
        <DialogPage />
      </ComponentPageMetadataProvider>,
    );
    expect(screen.getByRole('heading', { level: 2, name: 'Sizes' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Form dialog' })).toBeInTheDocument();
    expect(container.querySelectorAll('[data-example-frame]')).toHaveLength(2);
    expect(container.querySelector('.review-section, .component-example-list')).toBeNull();
    expect(screen.queryByRole('heading', { name: 'Examples' })).not.toBeInTheDocument();
    expect(container.querySelector('.hero-stage')).toBeInTheDocument();
    const runtimeControl = screen.getByRole('button', { name: 'Expand all' });
    expect(runtimeControl.closest('.specimen-caption')).toBeInTheDocument();
    expect(runtimeControl.querySelector('svg')).toBeNull();
  });
});
