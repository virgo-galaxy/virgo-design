import { render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { componentApiReference } from '@/generated/api-reference.generated';
import { i18nInstance } from '@/i18n/runtime';

import { RegistryApiReference } from './ApiReference';

const translatedDescriptionKey =
  'components.button.api.text-button-props.properties.children.description';

describe('ApiReference', () => {
  afterEach(async () => {
    i18nInstance.addResource('zh-CN', 'translation', translatedDescriptionKey, '');
    await i18nInstance.changeLanguage('en-US');
  });

  it('renders generated prop tables and public type aliases', () => {
    render(<RegistryApiReference registry={componentApiReference} slug="button" />);

    expect(screen.getByRole('heading', { level: 2, name: 'API' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'ButtonProps' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'ButtonProps properties' })).toBeInTheDocument();
    const publicTypes = screen.getByRole('region', { name: 'Public types' });
    expect(within(publicTypes).getByText('ButtonVariant')).toBeInTheDocument();
    expect(screen.getAllByText('variant').length).toBeGreaterThan(0);
  });

  it('composes Surface frames around declarations and aliases with Table-owned separators', () => {
    render(<RegistryApiReference registry={componentApiReference} slug="button" />);

    const declaration = screen.getByRole('region', { name: 'ButtonProps' });
    const aliases = screen.getByRole('region', { name: 'Public types' });
    expect(
      within(declaration)
        .getByText(
          componentApiReference.button!.declarations.find((entry) => entry.name === 'ButtonProps')!
            .kind,
        )
        .closest('[data-size]'),
    ).toHaveAttribute('data-variant', 'soft');
    for (const frame of [declaration, aliases]) {
      expect(frame).toHaveAttribute('data-tone', 'default');
      expect(frame).toHaveAttribute('data-border', 'subtle');
      expect(frame).toHaveAttribute('data-radius', '12');
      expect(frame).not.toHaveAttribute('tabindex');
    }

    const viewport = within(declaration).getByRole('region', { name: 'ButtonProps properties' });
    expect(viewport).toHaveAttribute('tabindex', '0');
    expect(within(viewport).getByRole('table')).toHaveAttribute('data-border', 'separators');
    expect(within(viewport).getByRole('columnheader', { name: 'Property' })).toHaveAttribute(
      'scope',
      'col',
    );
    expect(within(viewport).getByRole('rowheader', { name: 'variant' })).toHaveAttribute(
      'scope',
      'row',
    );
  });

  it('uses a locale override without replacing the generated English fallback', async () => {
    i18nInstance.addResource(
      'zh-CN',
      'translation',
      translatedDescriptionKey,
      '操作按钮的可见文本标签。',
    );
    await i18nInstance.changeLanguage('zh-CN');

    render(<RegistryApiReference registry={componentApiReference} slug="button" />);

    expect(screen.getByText('操作按钮的可见文本标签。')).toBeInTheDocument();
    const buttonPropsTable = screen.getByRole('region', { name: 'ButtonProps 属性' });
    expect(buttonPropsTable).toBeInTheDocument();
    expect(
      within(buttonPropsTable).getByRole('columnheader', { name: '属性' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: '公共类型' })).toBeInTheDocument();
    expect(componentApiReference.button?.declarations).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'TextButtonProps',
          properties: expect.arrayContaining([
            expect.objectContaining({
              name: 'children',
              description: 'Visible text label for the action.',
            }),
          ]),
        }),
      ]),
    );
  });
});
