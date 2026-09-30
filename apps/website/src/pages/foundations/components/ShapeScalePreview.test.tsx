import { render, within } from '@testing-library/react';
import { borderStyle, borderWidth, radius, type RadiusToken } from '@virgo-design/tokens';
import { I18nextProvider } from 'react-i18next';
import { describe, expect, it } from 'vitest';

import { i18nInstance } from '@/i18n/runtime';

import { ShapeScalePreview } from './ShapeScalePreview';

function samplesFor(container: HTMLElement, kind: string) {
  return [...container.querySelectorAll<HTMLElement>(`[data-shape-use="${kind}"]`)];
}

function shapeFor(sample: HTMLElement) {
  return sample.querySelector<HTMLElement>('figure > div > div')!;
}

describe('ShapeScalePreview', () => {
  it('compares all Foundation border widths while keeping the other shape styles identical', () => {
    const { container } = render(<ShapeScalePreview />);
    const samples = samplesFor(container, 'width');

    expect(samples.map((sample) => sample.dataset.shapeToken)).toEqual(Object.keys(borderWidth));

    for (const sample of samples) {
      const token = Number(sample.dataset.shapeToken) as keyof typeof borderWidth;
      const shape = shapeFor(sample);

      expect(shape.style.borderWidth).toBe(token === 0 ? '0px' : borderWidth[token]);
      expect(shape.style.borderStyle).toBe(borderStyle.solid);
      expect(shape.style.borderRadius).toBe(radius[8]);
      expect(sample.querySelector('code')?.textContent).toBe(String(borderWidth[token]));
      expect(shape.className).toBe(shapeFor(samples[0]!).className);
    }
  });

  it('compares only existing border styles at the same width and radius', () => {
    const { container } = render(<ShapeScalePreview />);
    const samples = samplesFor(container, 'style');

    expect(samples.map((sample) => sample.dataset.shapeToken)).toEqual(Object.keys(borderStyle));

    for (const sample of samples) {
      const token = sample.dataset.shapeToken as keyof typeof borderStyle;
      const shape = shapeFor(sample);

      expect(shape.style.borderStyle).toBe(borderStyle[token]);
      expect(shape.style.borderWidth).toBe(borderWidth[2]);
      expect(shape.style.borderRadius).toBe(radius[8]);
      expect(sample.querySelector('code')?.textContent).toBe(borderStyle[token]);
    }
  });

  it.each([
    { kind: 'small-radius', tokens: [0, 4, 6, 8, 10, 12] },
    { kind: 'medium-radius', tokens: [8, 12, 16, 20, 24] },
    { kind: 'full-radius', tokens: ['full'] },
  ])('resolves $kind directly from Radius Foundation', ({ kind, tokens }) => {
    const { container } = render(<ShapeScalePreview />);
    const samples = samplesFor(container, kind);

    expect(samples.map((sample) => sample.dataset.shapeToken)).toEqual(tokens.map(String));

    for (const sample of samples) {
      const token =
        sample.dataset.shapeToken === 'full'
          ? 'full'
          : (Number(sample.dataset.shapeToken) as RadiusToken);
      const shape = shapeFor(sample);

      expect(shape.style.borderRadius).toBe(token === 0 ? '0px' : radius[token]);
      expect(shape.style.borderWidth).toBe(borderWidth[1]);
      expect(shape.style.borderStyle).toBe(borderStyle.solid);
      expect(sample.querySelector('code')?.textContent).toBe(String(radius[token]));
    }
  });

  it('uses Foundation values for the preview frame without adding a sample border', () => {
    const { container } = render(<ShapeScalePreview />);
    const frame = container.firstElementChild as HTMLElement;

    expect(frame.style.getPropertyValue('--shape-frame-width')).toBe(borderWidth[1]);
    expect(frame.style.getPropertyValue('--shape-frame-style')).toBe(borderStyle.solid);
    expect(frame.style.getPropertyValue('--shape-frame-radius')).toBe(radius[16]);
    expect(frame.style.getPropertyValue('--shape-stage-radius')).toBe(radius[12]);
    expect(shapeFor(samplesFor(container, 'width')[0]!).style.boxShadow).toBe('');
    expect(shapeFor(samplesFor(container, 'width')[0]!).style.outline).toBe('');
  });

  it.each([
    {
      locale: 'en-US',
      eyebrow: 'SCALE PREVIEW',
      title: 'Scale preview',
      small: 'Small shape radius',
      medium: 'Medium surface radius',
      full: 'Full radius',
      disclaimer: 'These examples illustrate scale only and do not define component semantics.',
    },
    {
      locale: 'zh-CN',
      eyebrow: '尺度预览',
      title: '尺度预览',
      small: '小型形状圆角',
      medium: '中型表面圆角',
      full: '完整圆角',
      disclaimer: '以下示例仅用于展示尺度关系，不定义正式组件语义。',
    },
  ])(
    'uses neutral documentation language in $locale',
    ({ locale, eyebrow, title, small, medium, full, disclaimer }) => {
      const localizedI18n = i18nInstance.cloneInstance({ lng: locale });
      const { container } = render(
        <I18nextProvider i18n={localizedI18n}>
          <ShapeScalePreview />
        </I18nextProvider>,
      );

      expect(localizedI18n.t('foundations.shapeDepth.preview.eyebrow')).toBe(eyebrow);
      expect(localizedI18n.t('foundations.shapeDepth.preview.title')).toBe(title);
      expect(within(container).getByText(disclaimer)).toBeTruthy();
      for (const name of [small, medium, full]) {
        expect(within(container).getByRole('heading', { level: 4, name })).toBeTruthy();
      }
      expect(container.textContent).not.toMatch(
        /candidate|temporary|evaluation|experiment|Button|Dialog|Popover|候选|临时|评估|实验|按钮|弹窗/i,
      );
    },
  );
});
