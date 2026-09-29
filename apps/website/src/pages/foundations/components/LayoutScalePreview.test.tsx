import { render, within } from '@testing-library/react';
import { sizing, spacing } from '@virgo-design/tokens';
import { I18nextProvider } from 'react-i18next';
import { describe, expect, it } from 'vitest';

import { i18nInstance } from '@/i18n/runtime';

import { LayoutScalePreview } from './LayoutScalePreview';

describe('LayoutScalePreview', () => {
  it('resolves every spacing preview value from the current Foundation', () => {
    const { container } = render(<LayoutScalePreview />);

    for (const sample of container.querySelectorAll<HTMLElement>('[data-spacing-token]')) {
      const token = Number(sample.dataset.spacingToken) as keyof typeof spacing;

      expect(sample.style.getPropertyValue('--preview-space')).toBe(spacing[token]);
    }

    for (const sample of container.querySelectorAll<HTMLElement>('[data-spacing-combination]')) {
      const gap = Number(sample.dataset.gapToken) as keyof typeof spacing;
      const padding = Number(sample.dataset.paddingToken) as keyof typeof spacing;

      expect(sample.style.getPropertyValue('--preview-gap')).toBe(spacing[gap]);
      expect(sample.style.getPropertyValue('--preview-padding')).toBe(spacing[padding]);
    }
  });

  it('resolves every object size preview from the current Foundation', () => {
    const { container } = render(<LayoutScalePreview />);
    const samples = container.querySelectorAll<HTMLElement>('[data-sizing-token]');

    expect(samples.length).toBeGreaterThan(0);

    for (const sample of samples) {
      const token = Number(sample.dataset.sizingToken) as keyof typeof sizing;

      expect(sample.style.getPropertyValue('--preview-size')).toBe(sizing[token]);
    }
  });

  it('identifies the height comparison using neutral scale names', () => {
    const { container } = render(<LayoutScalePreview />);
    const samples = [...container.querySelectorAll<HTMLElement>('[data-sizing-use="height"]')];

    expect(samples.map((sample) => Number(sample.dataset.sizingToken))).toEqual([32, 36, 40, 44]);

    for (const sample of samples) {
      const token = Number(sample.dataset.sizingToken) as keyof typeof sizing;

      expect(sample.style.getPropertyValue('--preview-size')).toBe(sizing[token]);
    }
  });

  it('shows the medium and large object progression without local size values', () => {
    const { container } = render(<LayoutScalePreview />);
    const samples = [
      ...container.querySelectorAll<HTMLElement>('[data-sizing-use="medium-large-object"]'),
    ];

    expect(samples.map((sample) => Number(sample.dataset.sizingToken))).toEqual([
      24, 32, 40, 48, 56, 64,
    ]);

    for (const sample of samples) {
      const token = Number(sample.dataset.sizingToken) as keyof typeof sizing;

      expect(sample.style.getPropertyValue('--preview-size')).toBe(sizing[token]);
    }
  });

  it.each([
    {
      locale: 'en-US',
      title: 'Scale preview',
      combinations: 'Spacing combinations',
      disclaimer: 'These examples illustrate scale only and do not define component semantics.',
    },
    {
      locale: 'zh-CN',
      title: '尺度预览',
      combinations: '间距组合',
      disclaimer: '以下示例仅用于展示尺度关系，不定义正式组件语义。',
    },
  ])(
    'uses neutral documentation language in $locale',
    ({ locale, title, combinations, disclaimer }) => {
      const localizedI18n = i18nInstance.cloneInstance({ lng: locale });
      const { container } = render(
        <I18nextProvider i18n={localizedI18n}>
          <LayoutScalePreview />
        </I18nextProvider>,
      );

      expect(localizedI18n.t('foundations.layout.preview.eyebrow')).toBe('SCALE PREVIEW');
      expect(localizedI18n.t('foundations.layout.preview.title')).toBe(title);
      expect(within(container).getByRole('heading', { level: 4, name: combinations })).toBeTruthy();
      expect(within(container).getByText(disclaimer)).toBeTruthy();

      const samples = [...container.querySelectorAll<HTMLElement>('[data-spacing-combination]')];

      expect(samples.map((sample) => sample.dataset.spacingCombination)).toEqual([
        '8-4',
        '16-12',
        '24-20',
      ]);

      for (const sample of samples) {
        const padding = Number(sample.dataset.paddingToken) as keyof typeof spacing;
        const gap = Number(sample.dataset.gapToken) as keyof typeof spacing;

        expect(sample.querySelector('strong')?.textContent).toBe(
          `Padding ${spacing[padding]} · Gap ${spacing[gap]}`,
        );
      }

      const documentationText = [
        localizedI18n.t('foundations.layout.preview.eyebrow'),
        localizedI18n.t('foundations.layout.preview.title'),
        localizedI18n.t('foundations.layout.preview.description'),
        container.textContent,
      ].join(' ');

      expect(documentationText).not.toMatch(
        /\bevaluation\b|\bexperiment\b|\bcandidate\b|\btemporary\b|\bcompact\b|\bregular\b|\bspacious\b|评估|实验|候选|临时|紧凑|常规|宽松/i,
      );
    },
  );
});
