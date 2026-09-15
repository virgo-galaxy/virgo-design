import '../../../i18n';

import { render, within } from '@testing-library/react';
import { borderStyle, borderWidth, elevationLevels, radius, themes } from '@virgo-design/tokens';
import { I18nextProvider } from 'react-i18next';
import { describe, expect, it, vi } from 'vitest';

import i18n from '../../../i18n';
import { AppearanceContext } from '../../../shared/theme/appearance-context';
import type { Appearance } from '../../../shared/theme/types';
import { DepthScalePreview } from './DepthScalePreview';

function renderPreview(appearance: Appearance = 'light') {
  return render(
    <AppearanceContext.Provider value={{ appearance, setAppearance: vi.fn() }}>
      <DepthScalePreview />
    </AppearanceContext.Provider>,
  );
}

function samplesFor(container: HTMLElement, kind: string) {
  return [...container.querySelectorAll<HTMLElement>(`[data-depth-use="${kind}"]`)];
}

describe('DepthScalePreview', () => {
  it.each(['light', 'dark'] as const)(
    'renders the active theme for every stable elevation level in %s mode',
    (appearance) => {
      const { container } = renderPreview(appearance);
      const samples = samplesFor(container, 'elevation');

      expect(samples.map((sample) => Number(sample.dataset.depthLevel))).toEqual(elevationLevels);

      for (const sample of samples) {
        const level = Number(sample.dataset.depthLevel) as (typeof elevationLevels)[number];
        const surface = sample.querySelector<HTMLElement>('figure > div > div')!;

        expect(surface.style.boxShadow).toBe(themes[appearance].elevation[level]);
        expect(surface.style.borderWidth).toBe(borderWidth[1]);
        expect(surface.style.borderStyle).toBe(borderStyle.solid);
        expect(surface.style.borderRadius).toBe(radius[12]);
        expect(sample.querySelector('code')?.textContent).toBe(themes[appearance].elevation[level]);
      }
    },
  );

  it.each(['light', 'dark'] as const)(
    'uses only Elevation 1, 3, and 5 for the %s layered comparison',
    (appearance) => {
      const { container } = renderPreview(appearance);
      const surfaces = samplesFor(container, 'layered-elevation');

      expect(surfaces.map((surface) => surface.dataset.depthLevel)).toEqual(['1', '3', '5']);

      for (const surface of surfaces) {
        const level = Number(surface.dataset.depthLevel) as (typeof elevationLevels)[number];

        expect(surface.style.boxShadow).toBe(themes[appearance].elevation[level]);
        expect(surface.style.borderWidth).toBe(borderWidth[1]);
        expect(surface.style.borderStyle).toBe(borderStyle.solid);
        expect(surface.style.borderRadius).toBe(radius[12]);
        expect(surface.textContent).toBe(String(level));
      }
    },
  );

  it('sets the shared neutral frame from Foundation values', () => {
    const { container } = renderPreview();
    const frame = container.firstElementChild as HTMLElement;

    expect(frame.style.getPropertyValue('--depth-preview-border-width')).toBe(borderWidth[1]);
    expect(frame.style.getPropertyValue('--depth-preview-border-style')).toBe(borderStyle.solid);
    expect(frame.style.getPropertyValue('--depth-preview-radius')).toBe(radius[12]);
    expect(frame.style.getPropertyValue('--depth-preview-stage-radius')).toBe(radius[16]);
  });

  it.each([
    {
      locale: 'en',
      title: 'Depth',
      elevation: 'Elevation comparison',
      layered: 'Layered elevation comparison',
      disclaimer: 'These examples illustrate scale only and do not define component semantics.',
    },
    {
      locale: 'zh-CN',
      title: '层级',
      elevation: '层级对比',
      layered: '分层层级对比',
      disclaimer: '以下示例仅用于展示尺度关系，不定义正式组件语义。',
    },
  ])(
    'uses neutral documentation language in $locale',
    ({ locale, title, elevation, layered, disclaimer }) => {
      const localizedI18n = i18n.cloneInstance({ lng: locale });
      const { container } = render(
        <I18nextProvider i18n={localizedI18n}>
          <AppearanceContext.Provider value={{ appearance: 'light', setAppearance: vi.fn() }}>
            <DepthScalePreview />
          </AppearanceContext.Provider>
        </I18nextProvider>,
      );

      expect(localizedI18n.t('foundationPages.shapeDepth.depthPreview.title')).toBe(title);
      expect(within(container).getByText(disclaimer)).toBeTruthy();
      for (const name of [elevation, layered]) {
        expect(within(container).getByRole('heading', { level: 4, name })).toBeTruthy();
      }
      expect(container.textContent).not.toMatch(/Card|Dropdown|Modal|Popover|卡片|下拉|模态|弹窗/i);
    },
  );
});
