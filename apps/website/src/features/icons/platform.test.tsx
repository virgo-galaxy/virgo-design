import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { iconCategories } from '@virgo-design/icons/metadata';
import { validateIconSvg } from '@virgo-design/icons/tooling';
import { MemoryRouter, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { setAppLocale } from '@/i18n';
import { copyTextToClipboard } from '@/shared/lib/clipboard';
import { AppearanceContext } from '@/shared/theme/appearance-context';

import { getIconSvg, iconManifest, iconSvgSources } from './catalogue';
import { IconCatalogue } from './IconCatalogue';
import { IconDetail } from './IconDetail';
import { IconStudio } from './IconStudio';
import { iconAnimationIdeaKey, searchWebsiteIcons, sortCatalogueIcons } from './search';

vi.mock('@/shared/lib/clipboard', () => ({
  copyTextToClipboard: vi.fn().mockResolvedValue(undefined),
}));
const mount = (element: React.ReactNode, initialEntries = ['/']) =>
  render(
    <AppearanceContext.Provider value={{ appearance: 'light', setAppearance: () => {} }}>
      <MemoryRouter initialEntries={initialEntries}>{element}</MemoryRouter>
    </AppearanceContext.Provider>,
  );
const selectFormat = async (label: string, trigger = 'Code format') => {
  await userEvent.click(screen.getByRole('button', { name: trigger }));
  await userEvent.click(screen.getByRole('option', { name: label }));
};
describe('Icons platform', () => {
  it('lists the silver Grok bot with its public import and original SVG export', async () => {
    expect(searchWebsiteIcons('亮银 机器人').map((icon) => icon.id)).toEqual(['grok-bot']);
    mount(<IconDetail id="grok-bot" />);
    expect(screen.getByTestId('large-icon-glyph')).toHaveAttribute(
      'viewBox',
      '8.25 8.25 112.1 113.5',
    );
    expect(screen.getByRole('button', { name: 'Choose icon color' })).toBeDisabled();
    expect(document.querySelector('.icon-code-panel code')).toHaveTextContent(
      "import { GrokBotIcon } from '@virgo-design/icons'",
    );
    await selectFormat('SVG');
    expect(document.querySelector('.icon-code-panel code')).toHaveTextContent('radialGradient');
    expect(getIconSvg('grok-bot')).toContain('width="24" height="24"');
  });
  it('shows monochrome and full-color Virgo marks together in the brands catalogue', () => {
    mount(<IconCatalogue />, ['/foundations/icons?category=brands']);
    const mono = screen.getByRole('link', { name: 'virgo-design Outline' });
    const colored = screen.getByRole('link', { name: 'virgo-design-color Color' });
    expect(mono).toHaveAttribute('href', '/foundations/icons/virgo-design');
    expect(colored).toHaveAttribute('href', '/foundations/icons/virgo-design-color');
    expect(mono.querySelector('linearGradient')).toBeNull();
    expect(colored.querySelectorAll('linearGradient')).toHaveLength(3);
    expect(searchWebsiteIcons('Virgo 彩色').map((icon) => icon.id)).toEqual(['virgo-design-color']);
  });

  it('previews the colorful mark and offers its brand import and original SVG', async () => {
    mount(<IconDetail id="virgo-design-color" />);
    expect(screen.getByTestId('large-icon-glyph').querySelectorAll('linearGradient')).toHaveLength(
      3,
    );
    expect(screen.getByRole('button', { name: 'Choose icon color' })).toBeDisabled();
    expect(document.querySelector('.icon-code-panel code')).toHaveTextContent(
      "import { VirgoDesignLogo } from '@virgo-design/icons/brands'",
    );
    await selectFormat('SVG');
    expect(document.querySelector('.icon-code-panel code')).toHaveTextContent('linearGradient');
    expect(document.querySelector('.icon-code-panel code')).toHaveTextContent('0 0 590 470');
    expect(getIconSvg('virgo-design-color')).toContain('#FF5F56');
  });
  it('places every export directly in one flat grid and sorts family siblings consecutively', () => {
    mount(<IconCatalogue />);
    const grid = document.querySelector('.icon-platform-grid')!;
    const cards = Array.from(grid.children);
    const sorted = sortCatalogueIcons(iconManifest);
    expect(cards).toHaveLength(iconManifest.length);
    expect(document.querySelector('.icon-family, .icon-family-variants')).toBeNull();
    expect(cards.map((card) => card.getAttribute('href'))).toEqual(
      sorted.map((icon) => `/foundations/icons/${icon.id}`),
    );
    cards.forEach((card, index) => {
      expect(card).toHaveClass('icon-platform-card');
      const icon = sorted[index]!;
      expect(card.querySelector('small')).toHaveTextContent(
        `Family: ${icon.family} · ${icon.variant === 'color' ? 'Color' : icon.variant === 'filled' ? 'Filled' : 'Outline'}`,
      );
      if (icon.variant === 'filled') {
        expect(sorted[index - 1]?.family).toBe(icon.family);
        expect(sorted[index - 1]?.variant).toBe('outline');
      }
    });
  });
  it('finds localized variants and selects a family member with its explicit TSX / SVG exports', async () => {
    expect(searchWebsiteIcons('太阳 实心').map((icon) => icon.id)).toEqual(['sun-filled']);
    expect(searchWebsiteIcons('太阳 轮廓').map((icon) => icon.id)).toEqual(['sun']);
    function DetailRoute() {
      const { id } = useParams();
      return <IconDetail id={id ?? ''} />;
    }
    mount(
      <Routes>
        <Route path="/foundations/icons/:id" element={<DetailRoute />} />
      </Routes>,
      ['/foundations/icons/sun'],
    );
    await userEvent.click(screen.getByRole('link', { name: 'SunFilledIcon Filled' }));
    expect(screen.getByRole('heading', { name: 'sun-filled' })).toBeInTheDocument();
    expect(document.querySelector('.icon-code-panel pre')).toHaveTextContent(
      '<SunFilledIcon size={24} />',
    );
    expect(screen.getByRole('button', { name: 'Animation playback' })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Animation playback' }));
    await userEvent.click(screen.getByRole('option', { name: '3 times' }));
    expect(document.querySelector('.icon-code-panel pre')).toHaveTextContent(
      '<SunFilledIcon size={24} animated={3} />',
    );
    await selectFormat('SVG');
    expect(
      document.querySelector('.icon-code-panel pre')?.textContent?.replace(/>\s+</g, '><'),
    ).toBe(getIconSvg('sun-filled', 3));
  });
  it.each([
    ['编辑', 'edit'],
    ['详情', 'file-text'],
    ['公文包', 'briefcase'],
    ['数据库', 'database'],
    ['输入框', 'form'],
    ['回执单', 'receipt'],
    ['result', 'receipt'],
    ['显示器', 'monitor'],
    ['system', 'monitor'],
    ['铃铛', 'bell'],
    ['notification', 'bell'],
  ])('finds the product navigation icon for %s', (query, id) => {
    expect(searchWebsiteIcons(query).map((icon) => icon.id)).toContain(id);
  });
  it('filters the implemented animations together with search and category', () => {
    const candidates = searchWebsiteIcons('', undefined, true);
    const staticIcons = searchWebsiteIcons('', undefined, false);
    expect(candidates).toHaveLength(46);
    expect(staticIcons).toHaveLength(iconManifest.length - 46);
    expect([...candidates, ...staticIcons].map((icon) => icon.id).sort()).toEqual(
      iconManifest.map((icon) => icon.id).sort(),
    );
    expect(searchWebsiteIcons('', 'navigation', true)).toHaveLength(14);
    expect(searchWebsiteIcons('齿轮', 'system', true).map((icon) => icon.id)).toEqual([
      'settings',
      'settings-filled',
    ]);
    expect(searchWebsiteIcons('gear', 'system', false)).toEqual([]);
    expect(searchWebsiteIcons('github', undefined, true)).toEqual([]);
    for (const icon of candidates) {
      expect(icon.animated).toBe(true);
      expect(iconAnimationIdeaKey(icon.id)).toMatch(/^icons\.animationIdeas\./);
    }
  });
  it('previews supported animations and preserves URL filters across locale changes', async () => {
    function FilterLocation() {
      return <output data-testid="filter-location">{useLocation().search}</output>;
    }
    mount(
      <>
        <IconCatalogue />
        <FilterLocation />
      </>,
      ['/foundations/icons'],
    );
    const cards = () => document.querySelectorAll('.icon-platform-card');
    expect(cards()).toHaveLength(iconManifest.length);
    await userEvent.click(screen.getByRole('button', { name: 'Animated' }));
    expect(screen.getByRole('button', { name: 'Animated' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByTestId('filter-location')).toHaveTextContent('animation=true');
    expect(cards()).toHaveLength(46);
    expect(
      screen.getByText(
        'Each family shares its motion across variants. Preview playback can be paused.',
      ),
    ).toBeInTheDocument();
    expect(document.querySelectorAll('.icon-animation-idea')).toHaveLength(46);
    expect(document.querySelector('animate, animateTransform')).not.toBeNull();
    const pause = screen.getByRole('button', { name: 'Pause' });
    expect(pause.textContent).toBe('');
    expect(pause.querySelector('svg')).toHaveAttribute('width', '20');
    expect(pause.querySelector('animate, animateTransform')).toBeNull();
    await userEvent.hover(pause);
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Pause');
    await userEvent.click(pause);
    expect(
      document.querySelector('.icon-platform-card animate, .icon-platform-card animateTransform'),
    ).toBeNull();
    const play = screen.getByRole('button', { name: 'Play' });
    expect(play.textContent).toBe('');
    await userEvent.click(play);
    expect(
      document.querySelector('.icon-platform-card animate, .icon-platform-card animateTransform'),
    ).not.toBeNull();
    await userEvent.click(screen.getByRole('button', { name: 'Navigation' }));
    expect(cards()).toHaveLength(14);
    expect(screen.getByTestId('filter-location')).toHaveTextContent('category=navigation');
    await act(() => setAppLocale('zh-CN'));
    expect(screen.getByRole('button', { name: '动画' })).toHaveAttribute('data-variant', 'primary');
    expect(cards()).toHaveLength(14);
    expect(screen.getByText('同一图标家族的变体共享动效，可暂停预览播放。')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: '非动画' }));
    expect(screen.getByTestId('filter-location')).toHaveTextContent('animation=false');
    expect(
      screen.queryByText('同一图标家族的变体共享动效，可暂停预览播放。'),
    ).not.toBeInTheDocument();
    expect(cards()).toHaveLength(searchWebsiteIcons('', 'navigation', false).length);
    expect(document.querySelectorAll('.icon-animation-idea')).toHaveLength(0);
    await userEvent.click(screen.getByRole('button', { name: '非动画' }));
    expect(screen.getByTestId('filter-location')).not.toHaveTextContent('animation=');
    expect(cards()).toHaveLength(searchWebsiteIcons('', 'navigation').length);
  });
  it('restores animation filtering from deep links and ignores unknown animation values', () => {
    const { unmount } = mount(<IconCatalogue />, [
      '/foundations/icons?animation=true&category=development&q=代码',
    ]);
    expect(document.querySelectorAll('.icon-platform-card')).toHaveLength(1);
    expect(screen.getByRole('link', { name: /code/ })).toHaveAttribute(
      'href',
      '/foundations/icons/code',
    );
    expect(screen.getByRole('button', { name: 'Animated' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    unmount();
    mount(<IconCatalogue />, ['/foundations/icons?animation=unknown']);
    expect(document.querySelectorAll('.icon-platform-card')).toHaveLength(iconManifest.length);
    expect(screen.getByRole('button', { name: 'Animated' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
    expect(screen.getByRole('button', { name: 'Non-animated' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });
  it('keeps TSX and standalone SVG exports aligned with preview animation', async () => {
    mount(<IconDetail id="code" />);
    const selectPlayback = async (name: string) => {
      await userEvent.click(screen.getByRole('button', { name: 'Animation playback' }));
      await userEvent.click(screen.getByRole('option', { name }));
    };
    const playback = screen.getByRole('button', { name: 'Animation playback' });
    expect(playback.closest('aside')).toHaveAttribute('aria-label', 'Review controls');
    expect(document.querySelector('.icon-specimen .animation-control')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Replay' })).toBeNull();
    expect(screen.getByTestId('large-icon-glyph').querySelector('animate')).toBeNull();
    await selectPlayback('Once');
    expect(screen.getByTestId('large-icon-glyph').querySelector('animate')).toHaveAttribute(
      'repeatCount',
      '1',
    );
    expect(document.querySelector('.icon-code-panel pre')).toHaveTextContent(
      '<CodeIcon size={24} animated />',
    );
    await selectPlayback('3 times');
    expect(screen.getByTestId('large-icon-glyph').querySelector('animate')).toHaveAttribute(
      'repeatCount',
      '3',
    );
    await userEvent.click(screen.getByRole('button', { name: 'Copy code' }));
    expect(copyTextToClipboard).toHaveBeenLastCalledWith(expect.stringContaining('animated={3}'));
    await selectPlayback('Always');
    expect(screen.getByTestId('large-icon-glyph').querySelector('animate')).toHaveAttribute(
      'repeatCount',
      'indefinite',
    );
    expect(document.querySelector('.icon-code-panel pre')).toHaveTextContent('animated="always"');
    await selectFormat('SVG');
    expect(document.querySelector('.icon-code-panel pre')).toHaveTextContent('<animate');
    expect(document.querySelector('.icon-code-panel pre')).toHaveTextContent('begin="0s"');
    await userEvent.click(screen.getByRole('button', { name: 'Copy code' }));
    expect(copyTextToClipboard).toHaveBeenLastCalledWith(
      expect.stringContaining('repeatCount="indefinite"'),
    );
    await selectPlayback('3 times');
    expect(document.querySelector('.icon-code-panel pre')).toHaveTextContent('repeatCount="3"');
    await selectPlayback('Non-animated');
    expect(document.querySelector('.icon-code-panel pre')).not.toHaveTextContent('<animate');
    expect(screen.getByTestId('large-icon-glyph').querySelector('animate')).toBeNull();
    await act(() => setAppLocale('zh-CN'));
    expect(screen.getByRole('button', { name: '动画播放' })).toHaveTextContent('非动画');
  });
  it('keeps catalogue, categories and English / Chinese results in canonical A–Z order', () => {
    const assertOrder = (records: readonly { id: string }[]) => {
      const ids = records.map((icon) => icon.id);
      expect(ids).toEqual(
        [...ids].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base', numeric: true })),
      );
    };
    assertOrder(searchWebsiteIcons(''));
    for (const category of iconCategories) assertOrder(searchWebsiteIcons('', category));
    for (const query of ['arrow', '箭头', 'navigation', '导航']) {
      const results = searchWebsiteIcons(query);
      expect(results.length).toBeGreaterThan(1);
      assertOrder(results);
    }
    mount(<IconCatalogue />);
    const ids = Array.from(
      document.querySelectorAll('.icon-platform-card > span'),
      (item) => item.textContent,
    );
    expect(ids).toEqual(sortCatalogueIcons(iconManifest).map((icon) => icon.id));
  });
  it.each(['check', 'circle-check', 'studio-tools'])(
    'orders related cards for %s alphabetically in both locales',
    async (id) => {
      mount(<IconDetail id={id} />);
      const names = () =>
        Array.from(
          document.querySelectorAll('.icon-related-card > span:last-child'),
          (item) => item.textContent!,
        );
      const english = names();
      expect(english.length).toBeGreaterThan(1);
      expect(english).toEqual(
        [...english].sort((a, b) =>
          a.localeCompare(b, 'en', { sensitivity: 'base', numeric: true }),
        ),
      );
      await act(() => setAppLocale('zh-CN'));
      expect(names()).toEqual(english);
    },
  );
  it.each(['gear', '设置', '齿轮', '系统 偏好'])('searches English and Chinese: %s', (query) => {
    expect(searchWebsiteIcons(query).map((icon) => icon.id)).toContain('settings');
  });
  it.each([
    ['date-picker', 'calendar'],
    ['日历', 'calendar'],
    ['日期', 'calendar'],
    ['time-picker', 'clock'],
    ['时钟', 'clock'],
    ['时间', 'clock'],
  ])('searches date and time icons: %s', (query, id) => {
    expect(searchWebsiteIcons(query).map((icon) => icon.id)).toContain(id);
  });
  it.each([
    ['studio', 'studio-tools'],
    ['图标工作室', 'studio-tools'],
    ['return', 'arrow-return'],
    ['返回', 'arrow-return'],
    ['弯折', 'arrow-return'],
    ['arrow-left', 'arrow-left'],
    ['left-arrow', 'arrow-left'],
    ['上箭头', 'arrow-up'],
    ['下箭头', 'arrow-down'],
    ['右箭头', 'arrow-right'],
  ])('searches the new link icons: %s', (query, id) => {
    expect(searchWebsiteIcons(query).map((icon) => icon.id)).toContain(id);
  });
  it.each(['left', 'right', 'up', 'down'])(
    'searches a real %s arrow separately from its chevron',
    (direction) => {
      const results = searchWebsiteIcons(`arrow-${direction}`).map((icon) => icon.id);
      expect(results).toContain(`arrow-${direction}`);
      expect(results).not.toContain(`chevron-${direction}`);
    },
  );
  it('uses package icons beside Studio and back links', () => {
    const { unmount } = mount(<IconCatalogue />);
    const studio = screen.getByRole('link', { name: 'Icon Studio' });
    expect(studio.querySelector('svg')).toHaveAttribute('viewBox', '0 0 24 24');
    expect(studio.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('link', { name: 'studio-tools Outline' })).toHaveAttribute(
      'href',
      '/foundations/icons/studio-tools',
    );
    unmount();
    mount(<IconDetail id="studio-tools" />);
    const back = screen.getByRole('link', { name: 'Back to catalogue' });
    expect(back.querySelector('svg')).toHaveAttribute('width', '20');
    expect(back.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(back.querySelector('path')).toHaveAttribute(
      'd',
      validateIconSvg(iconSvgSources['arrow-return']).paths[0]!.d,
    );
  });
  it('filters categories, gives no-results feedback and enters a detail route', async () => {
    render(
      <MemoryRouter initialEntries={['/foundations/icons']}>
        <Routes>
          <Route path="/foundations/icons" element={<IconCatalogue />} />
          <Route path="/foundations/icons/:iconId" element={<p>detail route</p>} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('data-variant', 'primary');
    const search = screen.getByRole('combobox', { name: 'Search icons…' });
    await userEvent.type(search, 'gear');
    expect(screen.getByRole('link', { name: 'settings Outline' })).toHaveAttribute(
      'href',
      '/foundations/icons/settings',
    );
    await userEvent.click(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.getByText('No icons match your search.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Actions' })).toHaveAttribute(
      'data-variant',
      'primary',
    );
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('data-variant', 'outline');
    await userEvent.click(screen.getByRole('button', { name: 'All' }));
    await userEvent.click(screen.getByRole('link', { name: 'settings Outline' }));
    expect(screen.getByText('detail route')).toBeInTheDocument();
  });
  it('keeps one action bar and the current icon when repeatedly following related links', async () => {
    vi.mocked(copyTextToClipboard).mockResolvedValue(undefined);
    function DetailRoute() {
      const { id } = useParams();
      return <IconDetail id={id ?? ''} />;
    }
    mount(
      <Routes>
        <Route path="/foundations/icons/:id" element={<DetailRoute />} />
      </Routes>,
      ['/foundations/icons/settings'],
    );
    await userEvent.click(screen.getByRole('button', { name: 'Copy code' }));
    expect(document.querySelector('.icon-code-feedback')).toHaveTextContent('Copied');
    for (let step = 0; step < 8; step++) {
      const links = [...document.querySelectorAll<HTMLAnchorElement>('.icon-related-card')];
      const link = links[step % 2 ? links.length - 1 : 0]!;
      const id = link.getAttribute('href')!.split('/').at(-1)!;
      await userEvent.click(link);
      expect(screen.getByRole('heading', { name: id })).toBeInTheDocument();
      expect(document.querySelectorAll('.icon-code-panel')).toHaveLength(1);
      expect(screen.getAllByRole('button', { name: 'Copy code' })).toHaveLength(1);
      expect(screen.queryByRole('button', { name: 'Download SVG' })).not.toBeInTheDocument();
      expect(screen.getAllByTestId('icon-canvas')).toHaveLength(1);
      expect(screen.getByTestId('icon-canvas')).toHaveAttribute('data-icon', id);
      expect(document.querySelector('.icon-code-feedback')).toHaveTextContent('');
      await userEvent.click(screen.getByRole('button', { name: 'Copy code' }));
      expect(copyTextToClipboard).toHaveBeenLastCalledWith(
        expect.stringContaining(
          `<${iconManifest.find((icon) => icon.id === id)!.componentName} size={24} />`,
        ),
      );
    }
  });
  it('renders metadata, canonical sizes, external background state and related icons', () => {
    mount(<IconDetail id="settings" />);
    expect(screen.getByText('SettingsIcon', { selector: 'code' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'gear' })).toHaveAttribute(
      'href',
      '/foundations/icons?q=gear',
    );
    for (const size of [16, 20, 24, 32])
      expect(
        screen.getByTestId(size === 24 ? 'actual-icon-glyph' : `actual-${size}`),
      ).toHaveAttribute('width', String(size));
    expect(document.querySelector('.background-sample')).toBeNull();
    expect(screen.getByLabelText('Current background')).toHaveTextContent('Light');
    expect(screen.getByRole('heading', { name: 'Related icons' })).toBeInTheDocument();
    expect(document.querySelectorAll('.icon-related-card svg')).toHaveLength(6);
    const titles = Array.from(document.querySelectorAll('.icon-platform-section-title'));
    expect(titles.map((title) => title.textContent)).toEqual([
      'Icon preview',
      'Code example',
      'Related icons',
    ]);
    const preview = screen.getByTestId('icon-canvas');
    const code = document.querySelector('.icon-code-panel')!;
    expect(preview.compareDocumentPosition(code) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Code format' })).toHaveTextContent('TSX');
  });
  it('switches visible TSX usage and SVG without copying, then copies exactly the displayed source with tooltip feedback', async () => {
    vi.mocked(copyTextToClipboard).mockClear().mockResolvedValue(undefined);
    mount(<IconDetail id="settings" />);
    const preview = () => screen.getByLabelText('Icon code example', { selector: 'pre' });
    expect(preview()).toHaveTextContent("import { SettingsIcon } from '@virgo-design/icons';");
    expect(preview()).toHaveTextContent('export default function Example()');
    expect(preview()).toHaveTextContent('<SettingsIcon size={24} />');
    expect(preview().querySelector('code')).toHaveAttribute('data-language', 'tsx');
    expect(screen.queryByRole('button', { name: 'Download SVG' })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Copy code' }));
    expect(copyTextToClipboard).toHaveBeenLastCalledWith(preview().textContent);
    expect(document.querySelector('.icon-code-feedback')).toHaveTextContent('Copied');
    expect(document.querySelector('[data-toast-root]')).toBeNull();
    await selectFormat('SVG');
    expect(copyTextToClipboard).toHaveBeenCalledTimes(1);
    expect(preview().querySelector('code')).toHaveAttribute('data-language', 'svg');
    expect(preview()).toHaveTextContent('<svg');
    await userEvent.click(screen.getByRole('button', { name: 'Copy code' }));
    expect(copyTextToClipboard).toHaveBeenLastCalledWith(preview().textContent);
    await userEvent.click(screen.getByRole('button', { name: 'Copy code' }));
    expect(copyTextToClipboard).toHaveBeenCalledTimes(3);
    await act(() => setAppLocale('zh-CN'));
    expect(document.querySelector('.icon-code-feedback')).toHaveTextContent('已复制');
    vi.mocked(copyTextToClipboard).mockRejectedValueOnce(new Error('denied'));
    const button = screen.getByRole('button', { name: '复制代码' });
    await userEvent.hover(button);
    await userEvent.click(button);
    expect(document.querySelector('.icon-code-feedback')).toHaveTextContent('复制失败');
    expect(screen.getByRole('tooltip')).toHaveTextContent('复制失败');
    expect(button).toHaveAttribute('data-copy-state', 'error');
  });
  it('uses keyboard selection to change the code mode without copying and translates state', async () => {
    const user = userEvent.setup();
    vi.mocked(copyTextToClipboard).mockClear().mockResolvedValue(undefined);
    mount(<IconDetail id="settings" />);
    const trigger = screen.getByRole('button', { name: 'Code format' });
    trigger.focus();
    await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');
    expect(trigger).toHaveTextContent('SVG');
    expect(copyTextToClipboard).not.toHaveBeenCalled();
    await user.click(screen.getByRole('button', { name: 'Copy code' }));
    expect(copyTextToClipboard).toHaveBeenCalledOnce();
    await act(() => setAppLocale('zh-CN'));
    expect(screen.getByRole('button', { name: '代码格式' })).toHaveTextContent('SVG');
    expect(screen.getByText('网格（开）')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '图标预览' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '代码示例' })).toBeInTheDocument();
    await user.click(screen.getByRole('switch', { name: '切换网格' }));
    expect(screen.getByText('网格（关）')).toBeInTheDocument();
  });
  it('deduplicates pending writes and discards stale feedback after changing source mode', async () => {
    let finish!: () => void;
    vi.mocked(copyTextToClipboard)
      .mockClear()
      .mockImplementationOnce(
        () =>
          new Promise<void>((resolve) => {
            finish = resolve;
          }),
      );
    mount(<IconDetail id="settings" />);
    const button = screen.getByRole('button', { name: 'Copy code' });
    fireEvent.click(button);
    fireEvent.click(button);
    expect(copyTextToClipboard).toHaveBeenCalledOnce();
    expect(button).toHaveAttribute('aria-disabled', 'true');
    await selectFormat('SVG');
    await act(async () => finish());
    expect(button).toHaveAttribute('data-copy-state', 'idle');
    expect(document.querySelector('.icon-code-feedback')?.textContent).toBe('');
    vi.mocked(copyTextToClipboard).mockResolvedValue(undefined);
    await userEvent.click(button);
    expect(copyTextToClipboard).toHaveBeenLastCalledWith(
      screen.getByLabelText('Icon code example', { selector: 'pre' }).textContent,
    );
  });
  it.each([false, 'always'] as const)(
    'downloads SVG in playback mode %s and revokes the temporary object URL',
    async (animated) => {
      vi.stubGlobal(
        'URL',
        class extends URL {
          static createObjectURL = vi.fn();
          static revokeObjectURL = vi.fn();
        },
      );
      const create = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:icon');
      const revoke = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
      let filename = '';
      const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (
        this: HTMLAnchorElement,
      ) {
        filename = this.download;
      });
      mount(<IconDetail id="settings" />);
      if (animated) {
        await userEvent.click(screen.getByRole('button', { name: 'Animation playback' }));
        await userEvent.click(screen.getByRole('option', { name: 'Always' }));
      }
      await selectFormat('SVG');
      await userEvent.click(screen.getByRole('button', { name: 'Download SVG' }));
      expect(create).toHaveBeenCalledWith(expect.any(Blob));
      const content = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(reader.error);
        reader.readAsText(create.mock.calls[0]![0] as Blob);
      });
      expect(content).toBe(getIconSvg('settings', animated));
      expect(filename).toBe('settings.svg');
      expect(document.querySelector('.icon-code-feedback')).toHaveTextContent('Download prepared');
      await vi.waitFor(() => expect(revoke).toHaveBeenCalledWith('blob:icon'));
      create.mockRestore();
      revoke.mockRestore();
      click.mockRestore();
      vi.unstubAllGlobals();
    },
  );
  it('validates custom SVG before preview/export and invalidates edits', async () => {
    mount(<IconStudio />);
    await userEvent.click(screen.getByRole('button', { name: 'Validate SVG' }));
    expect(screen.getByText('Valid Virgo icon')).toBeInTheDocument();
    expect(screen.getByTestId('actual-20')).toHaveAttribute('width', '20');
    expect(screen.getByText(/export const CustomSquareIcon/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Copy code' }));
    expect(copyTextToClipboard).toHaveBeenLastCalledWith(
      expect.stringContaining('CustomSquareIcon'),
    );
    fireEvent.change(screen.getByRole('textbox', { name: 'Paste SVG' }), {
      target: { value: '<svg viewBox="0 0 20 20" fill="#fff"><script /></svg>' },
    });
    expect(screen.queryByTestId('large-icon-glyph')).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Validate SVG' }));
    expect(screen.getByRole('alert')).toHaveTextContent('fixed colors');
    expect(screen.queryByRole('button', { name: 'Code format' })).not.toBeInTheDocument();
  });
  it('translates catalogue and validation UI live while keeping canonical names', async () => {
    mount(<IconCatalogue />);
    await act(() => setAppLocale('zh-CN'));
    expect(screen.getByRole('combobox', { name: '搜索图标…' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '系统' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'settings Outline / 轮廓' })).toBeInTheDocument();
  });
});
