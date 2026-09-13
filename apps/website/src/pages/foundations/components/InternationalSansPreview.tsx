import type { InternationalSansId } from '@virgo-design/tokens';
import { fontFamily, internationalSans, internationalSansOrder } from '@virgo-design/tokens';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './international-sans-preview.module.scss';

const localeSpecimens: Record<
  InternationalSansId,
  { language: string; mixed: string; lang: string }
> = {
  latin: {
    language: 'Virgo Design is a personal workspace.',
    mixed: 'Virgo Design · International Sans V1',
    lang: 'en',
  },
  zhHans: {
    language: 'Virgo 是一个个人工作台。',
    mixed: 'Virgo Design 设计系统 V1',
    lang: 'zh-Hans',
  },
  zhHantTW: {
    language: 'Virgo 是一個個人工作臺。',
    mixed: 'Virgo Design 設計系統 V1 · 台灣',
    lang: 'zh-Hant-TW',
  },
  zhHantHK: {
    language: 'Virgo 是一個個人工作臺。',
    mixed: 'Virgo Design 設計系統 V1 · 香港',
    lang: 'zh-Hant-HK',
  },
  ja: {
    language: 'Virgo はパーソナルワークスペースです。',
    mixed: 'Virgo Design デザインシステム V1',
    lang: 'ja',
  },
  ko: {
    language: 'Virgo는 개인 작업 공간입니다.',
    mixed: 'Virgo Design 디자인 시스템 V1',
    lang: 'ko',
  },
};

export function InternationalSansPreview() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState<InternationalSansId>('latin');
  const definition = internationalSans[activeId];
  const specimen = localeSpecimens[activeId];
  const previewStyle = {
    '--international-preview-font-family': definition.family,
    '--international-preview-code-family': fontFamily.mono,
  } as CSSProperties;

  return (
    <div className={styles.preview} style={previewStyle}>
      <div
        className={styles.localeOptions}
        role="tablist"
        aria-label={t('foundationPages.typography.internationalSans.localeSelector')}
      >
        {internationalSansOrder.map((id) => {
          const option = internationalSans[id];

          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={activeId === id}
              title={option.name}
              onClick={() => setActiveId(id)}
            >
              <strong>{t(`foundationPages.typography.internationalSans.locales.${id}`)}</strong>
              <span>{option.locale}</span>
            </button>
          );
        })}
      </div>

      <section className={styles.specimen} lang={specimen.lang}>
        <header className={styles.specimenHeader}>
          <div>
            <span>{t('foundationPages.typography.internationalSans.activeStack')}</span>
            <h3>{definition.name}</h3>
          </div>
        </header>

        <div className={styles.languageSample}>
          <span>{t(`foundationPages.typography.internationalSans.locales.${activeId}`)}</span>
          <strong>{specimen.language}</strong>
          <p>{specimen.mixed}</p>
        </div>

        <dl className={styles.stackDetails}>
          <div>
            <dt>{t('foundationPages.typography.internationalSans.locale')}</dt>
            <dd>{definition.locale}</dd>
          </div>
          <div>
            <dt>{t('foundationPages.typography.internationalSans.latin')}</dt>
            <dd>{internationalSans.latin.name}</dd>
          </div>
          <div>
            <dt>{t('foundationPages.typography.internationalSans.script')}</dt>
            <dd>{definition.name}</dd>
          </div>
        </dl>

        <div className={styles.stackValue}>
          <span>{t('foundationPages.typography.internationalSans.stack')}</span>
          <code>{definition.family}</code>
        </div>
      </section>
    </div>
  );
}
