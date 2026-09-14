import '../../../i18n';

import { render } from '@testing-library/react';
import { fontFamily, fontSize, fontWeight, lineHeight } from '@virgo-design/tokens';
import { describe, expect, it } from 'vitest';

import { TypographyCompositionPreview } from './TypographyCompositionPreview';

const expectRecipe = (
  container: HTMLElement,
  role: string,
  size: string,
  weight: number,
  height: number,
) => {
  const sample = container.querySelector<HTMLElement>(`[data-typography-role="${role}"]`);

  expect(sample?.style.getPropertyValue('--evaluation-font-size')).toBe(size);
  expect(sample?.style.getPropertyValue('--evaluation-font-weight')).toBe(String(weight));
  expect(sample?.style.getPropertyValue('--evaluation-line-height')).toBe(String(height));
};

describe('TypographyCompositionPreview', () => {
  it('composes every Document candidate directly from Typography Foundation values', () => {
    const { container } = render(<TypographyCompositionPreview />);
    const preview = container.querySelector<HTMLElement>('[data-composition-locale="en"]');

    expect(preview?.style.getPropertyValue('--evaluation-font-family')).toBe(fontFamily.sans);

    expectRecipe(container, 'document-title-large', fontSize[64], fontWeight[700], lineHeight[1]);
    expectRecipe(container, 'document-title-medium', fontSize[56], fontWeight[700], lineHeight[1]);
    expectRecipe(container, 'document-heading-1', fontSize[48], fontWeight[600], lineHeight[1]);
    expectRecipe(container, 'document-heading-2', fontSize[40], fontWeight[600], lineHeight[1]);
    expectRecipe(container, 'document-heading-3', fontSize[32], fontWeight[600], lineHeight[2]);
    expectRecipe(container, 'document-heading-4', fontSize[28], fontWeight[600], lineHeight[2]);
    expectRecipe(container, 'document-heading-5', fontSize[24], fontWeight[600], lineHeight[2]);
    expectRecipe(container, 'document-heading-6', fontSize[20], fontWeight[600], lineHeight[2]);
    expectRecipe(container, 'document-body-large', fontSize[16], fontWeight[400], lineHeight[4]);
    expectRecipe(container, 'document-body-default', fontSize[14], fontWeight[400], lineHeight[4]);
    expectRecipe(container, 'document-body-small', fontSize[13], fontWeight[400], lineHeight[4]);
    expectRecipe(container, 'document-caption', fontSize[12], fontWeight[400], lineHeight[3]);
  });

  it('composes every UI candidate directly from Typography Foundation values', () => {
    const { container } = render(<TypographyCompositionPreview />);

    expectRecipe(container, 'ui-display-medium', fontSize[32], fontWeight[700], lineHeight[1]);
    expectRecipe(container, 'ui-display-small', fontSize[28], fontWeight[600], lineHeight[2]);
    expectRecipe(container, 'ui-page-title', fontSize[28], fontWeight[600], lineHeight[2]);
    expectRecipe(container, 'ui-title-large', fontSize[24], fontWeight[600], lineHeight[2]);
    expectRecipe(container, 'ui-title-medium', fontSize[20], fontWeight[600], lineHeight[2]);
    expectRecipe(container, 'ui-title-small', fontSize[16], fontWeight[600], lineHeight[2]);
    expectRecipe(container, 'ui-body-large', fontSize[16], fontWeight[400], lineHeight[3]);
    expectRecipe(container, 'ui-body-default', fontSize[14], fontWeight[400], lineHeight[3]);
    expectRecipe(container, 'ui-body-small', fontSize[13], fontWeight[400], lineHeight[3]);
    expectRecipe(container, 'ui-label-default', fontSize[14], fontWeight[500], lineHeight[2]);
    expectRecipe(container, 'ui-label-small', fontSize[13], fontWeight[500], lineHeight[2]);
    expectRecipe(container, 'ui-caption', fontSize[12], fontWeight[400], lineHeight[3]);
  });

  it('keeps the Document title distinct from Heading 1', () => {
    const { container } = render(<TypographyCompositionPreview />);
    const documentTitle = container.querySelector('[data-typography-role="document-title-medium"]');
    const heading1 = container.querySelector('[data-typography-role="document-heading-1"]');

    expect(documentTitle?.tagName).toBe('H2');
    expect(heading1?.tagName).toBe('H3');
    expect(documentTitle?.textContent).not.toBe(heading1?.textContent);
  });
});
