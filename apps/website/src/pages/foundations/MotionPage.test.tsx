import { render, within } from '@testing-library/react';
import { duration, easing } from '@virgo-design/tokens';
import type { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { describe, expect, it, vi } from 'vitest';

import i18n from '@/i18n';

import { MotionPage } from './MotionPage';

vi.mock('./FoundationPage', () => ({
  FoundationPage: ({ children }: { children: ReactNode }) => <main>{children}</main>,
  FoundationSection: ({
    title,
    description,
    children,
  }: {
    title: string;
    description?: string;
    children: ReactNode;
  }) => (
    <section>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
      {children}
    </section>
  ),
}));

function renderMotionPage(locale = 'en') {
  const localizedI18n = i18n.cloneInstance({ lng: locale });

  return {
    localizedI18n,
    ...render(
      <I18nextProvider i18n={localizedI18n}>
        <MotionPage />
      </I18nextProvider>,
    ),
  };
}

describe('MotionPage', () => {
  it('renders every Foundation duration on one static time scale', () => {
    const { container } = renderMotionPage();
    const durationRows = [...container.querySelectorAll<HTMLElement>('[data-motion-duration]')];

    expect(durationRows.map((row) => row.dataset.motionDuration)).toEqual([
      '0',
      '120',
      '180',
      '240',
      '360',
      '560',
    ]);

    for (const [name, value] of Object.entries(duration)) {
      const row = durationRows.find((candidate) => candidate.dataset.motionDuration === name)!;

      expect(within(row).getByText(value)).toBeTruthy();
      expect(within(row).getByLabelText(`${name}: ${value}`)).toBeTruthy();
    }

    expect(
      durationRows.map((row) =>
        row
          .querySelector<HTMLElement>('[aria-label]')
          ?.style.getPropertyValue('--duration-scale-progress'),
      ),
    ).toEqual([
      '0%',
      '21.428571428571427%',
      '32.142857142857146%',
      '42.857142857142854%',
      '64.28571428571429%',
      '100%',
    ]);
    expect(container.textContent).not.toMatch(/instant|fast|normal|moderate|slow|slower/i);
  });

  it('renders every Foundation easing as a labeled curve on shared axes', () => {
    const { container } = renderMotionPage();
    const easingCards = [...container.querySelectorAll<HTMLElement>('[data-motion-easing]')];

    expect(easingCards.map((card) => card.dataset.motionEasing)).toEqual([
      'linear',
      'standard',
      'decelerate',
      'accelerate',
      'emphasized',
    ]);

    for (const [name, value] of Object.entries(easing)) {
      const card = easingCards.find((candidate) => candidate.dataset.motionEasing === name)!;
      const curve = card.querySelector<SVGPathElement>(`[data-motion-curve="${name}"]`)!;

      expect(card.querySelector('code')?.textContent).toBe(value);
      expect(within(card).getByRole('img', { name: `${name}: ${value}` })).toBeTruthy();
      expect(curve.getAttribute('d')).toMatch(/^M 12 88 C .*, .*?, 92 8$/);
    }

    expect(
      easingCards.map((card) => card.querySelector('[data-motion-curve]')?.getAttribute('d')),
    ).toHaveLength(Object.keys(easing).length);
    expect(easingCards.map((card) => card.dataset.motionEasing)).not.toContain('enter');
    expect(easingCards.map((card) => card.dataset.motionEasing)).not.toContain('exit');
  });

  it.each([
    {
      locale: 'en',
      duration: 'Duration scale',
      easing: 'Easing curves',
      disclaimer:
        'These examples illustrate timing scales and motion curves only and do not define interaction semantics.',
    },
    {
      locale: 'zh-CN',
      duration: '时长尺度',
      easing: '缓动曲线',
      disclaimer: '以下示例仅展示时间尺度和动效曲线，不定义交互语义。',
    },
  ])(
    'uses static Foundation-preview language in $locale',
    ({ locale, duration, easing, disclaimer }) => {
      const { localizedI18n, getByRole, getByText } = renderMotionPage(locale);

      expect(localizedI18n.t('foundationPages.motion.duration')).toBe(duration);
      expect(getByRole('heading', { level: 2, name: duration })).toBeTruthy();
      expect(getByRole('heading', { level: 2, name: easing })).toBeTruthy();
      expect(getByText(disclaimer)).toBeTruthy();
    },
  );
});
