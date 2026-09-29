import '@/i18n';

import { fireEvent, render, screen } from '@testing-library/react';
import { internationalSans, internationalSansOrder } from '@virgo-design/tokens';
import { describe, expect, it } from 'vitest';

import { InternationalSansPreview } from './InternationalSansPreview';

const localeLabels = {
  latin: 'Latin',
  zhHans: 'Simplified Chinese',
  zhHantTW: 'Traditional Chinese · TW',
  zhHantHK: 'Traditional Chinese · HK',
  ja: 'Japanese',
  ko: 'Korean',
} as const;

describe('InternationalSansPreview', () => {
  it('switches every locale preview using token-owned stacks', () => {
    const { container } = render(<InternationalSansPreview />);

    for (const id of internationalSansOrder) {
      fireEvent.click(screen.getByRole('tab', { name: new RegExp(localeLabels[id]) }));

      const specimen = container.querySelector('section[lang]');

      expect(specimen?.getAttribute('lang')).toBe(internationalSans[id].locale);
      expect((specimen as HTMLElement | null)?.style.fontFamily).toBe('');
      expect(
        (container.firstElementChild as HTMLElement).style.getPropertyValue(
          '--international-preview-font-family',
        ),
      ).toBe(internationalSans[id].family);
      expect(screen.getByText(internationalSans[id].family)).toBeTruthy();
    }
  });

  it('renders the required English and CJK mixed-script specimens', () => {
    render(<InternationalSansPreview />);

    expect(screen.getByText('Virgo Design is a personal workspace.')).toBeTruthy();

    fireEvent.click(screen.getByRole('tab', { name: /Simplified Chinese/ }));
    expect(screen.getByText('Virgo 是一个个人工作台。')).toBeTruthy();
    expect(screen.getByText('Virgo Design 设计系统 V1')).toBeTruthy();

    fireEvent.click(screen.getByRole('tab', { name: /Traditional Chinese · TW/ }));
    expect(screen.getByText('Virgo 是一個個人工作臺。')).toBeTruthy();
    expect(screen.getByText('Virgo Design 設計系統 V1 · 台灣')).toBeTruthy();

    fireEvent.click(screen.getByRole('tab', { name: /Japanese/ }));
    expect(screen.getByText('Virgo はパーソナルワークスペースです。')).toBeTruthy();
    expect(screen.getByText('Virgo Design デザインシステム V1')).toBeTruthy();

    fireEvent.click(screen.getByRole('tab', { name: /Korean/ }));
    expect(screen.getByText('Virgo는 개인 작업 공간입니다.')).toBeTruthy();
    expect(screen.getByText('Virgo Design 디자인 시스템 V1')).toBeTruthy();
  });
});
