import {
  borderColorTokens,
  brandColorTokens,
  type CategoricalDataColorRole,
  categoricalDataColorTokens,
  divergingDataColorTokens,
  type FillColorRole,
  fillColorTokens,
  type IconColorRole,
  iconColorTokens,
  type SequentialDataColorRole,
  sequentialDataColorTokens,
  surfaceColorTokens,
  textColorTokens,
  type VirgoTheme,
} from '@virgo-design/tokens';
import { type CSSProperties, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import styles from '../styles/color-semantic-preview.module.scss';
import { StatusColorReview } from './StatusColorReview';

interface SemanticThemePreviewProps {
  theme: VirgoTheme;
  title: string;
  description: string;
}

type SemanticStyle = CSSProperties & Record<`--semantic-${string}`, string>;

const chartHeights = [42, 68, 54, 86, 74, 48, 92, 62, 78, 58, 82, 70] as const;

function buildThemeStyle(theme: VirgoTheme): SemanticStyle {
  const { color } = theme;

  return {
    '--semantic-background': color.surface.background,
    '--semantic-surface': color.surface.default,
    '--semantic-surface-secondary': color.surface.secondary,
    '--semantic-surface-strong': color.surface.strong,
    '--semantic-surface-elevated': color.surface.elevated,
    '--semantic-overlay': color.surface.overlay,
    '--semantic-text-primary': color.text.primary,
    '--semantic-text-secondary': color.text.secondary,
    '--semantic-text-tertiary': color.text.tertiary,
    '--semantic-text-placeholder': color.text.placeholder,
    '--semantic-text-disabled': color.text.disabled,
    '--semantic-text-inverse': color.text.inverse,
    '--semantic-border-subtle': color.border.subtle,
    '--semantic-border': color.border.default,
    '--semantic-border-strong': color.border.strong,
    '--semantic-border-disabled': color.border.disabled,
    '--semantic-border-focus': color.border.focus,
    '--semantic-icon-primary': color.icon.primary,
    '--semantic-icon-secondary': color.icon.secondary,
    '--semantic-icon-tertiary': color.icon.tertiary,
    '--semantic-icon-disabled': color.icon.disabled,
    '--semantic-icon-inverse': color.icon.inverse,
    '--semantic-brand': color.brand.primary,
    '--semantic-brand-hover': color.brand['primary-hover'],
    '--semantic-brand-active': color.brand['primary-active'],
    '--semantic-brand-subtle': color.brand.subtle,
    '--semantic-brand-subtle-hover': color.brand['subtle-hover'],
    '--semantic-brand-foreground': color.brand.foreground,
    '--semantic-brand-link': color.brand.link,
    '--semantic-brand-link-hover': color.brand['link-hover'],
    '--semantic-brand-focus': color.brand.focus,
    '--semantic-fill-hover': color.fill.hover,
    '--semantic-fill-active': color.fill.active,
    '--semantic-fill-selected': color.fill.selected,
    '--semantic-fill-selected-hover': color.fill['selected-hover'],
    '--semantic-fill-disabled': color.fill.disabled,
    '--semantic-elevation': theme.elevation[3],
  };
}

function TokenTag({ children }: { children: ReactNode }) {
  return <code className={styles.tokenTag}>{children}</code>;
}

function Glyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3.5 5.5h13M3.5 10h13M3.5 14.5h8" />
      <circle cx="15" cy="14.5" r="1.5" />
    </svg>
  );
}

export function SemanticThemePreview({ theme, title, description }: SemanticThemePreviewProps) {
  const { t } = useTranslation();
  const { color } = theme;
  const iconEntries = Object.entries(iconColorTokens) as [IconColorRole, string][];
  const fillEntries = Object.entries(fillColorTokens) as [FillColorRole, string][];
  const categoricalEntries = Object.keys(categoricalDataColorTokens).map((key) => {
    const role = Number(key) as CategoricalDataColorRole;
    return {
      id: categoricalDataColorTokens[role],
      value: color.data.categorical[role],
    };
  });
  const sequentialEntries = Object.keys(sequentialDataColorTokens).map((key) => {
    const role = Number(key) as SequentialDataColorRole;
    return {
      id: sequentialDataColorTokens[role],
      value: color.data.sequential[role],
    };
  });
  const divergingEntries = [
    {
      id: divergingDataColorTokens.negative.strong,
      value: color.data.diverging.negative.strong,
    },
    {
      id: divergingDataColorTokens.negative.default,
      value: color.data.diverging.negative.default,
    },
    {
      id: divergingDataColorTokens.negative.subtle,
      value: color.data.diverging.negative.subtle,
    },
    { id: divergingDataColorTokens.neutral, value: color.data.diverging.neutral },
    {
      id: divergingDataColorTokens.positive.subtle,
      value: color.data.diverging.positive.subtle,
    },
    {
      id: divergingDataColorTokens.positive.default,
      value: color.data.diverging.positive.default,
    },
    {
      id: divergingDataColorTokens.positive.strong,
      value: color.data.diverging.positive.strong,
    },
  ];

  return (
    <article
      className={styles.themePreview}
      data-semantic-theme={theme.mode}
      style={buildThemeStyle(theme)}
    >
      <header className={styles.themeHeader}>
        <div className={styles.themeIdentity}>
          <span className={styles.themeMark} aria-hidden="true" />
          <div>
            <span>{t('tokens.colors.themeLabel')}</span>
            <h2>{title}</h2>
          </div>
        </div>
        <p>{description}</p>
      </header>

      <section className={styles.previewSection}>
        <div className={styles.sectionHeading}>
          <div>
            <span>01</span>
            <h3>{t('tokens.colors.groups.interface')}</h3>
          </div>
          <p>{t('tokens.colors.interfaceDescription')}</p>
        </div>

        <div className={styles.productShell}>
          <aside className={styles.sidebar}>
            <div className={styles.productBrand}>
              <span>V</span>
              <strong>Virgo</strong>
            </div>

            <div className={styles.fillList}>
              {fillEntries.map(([role, token]) => (
                <div
                  key={role}
                  className={styles.fillItem}
                  data-fill-role={role}
                  style={{ background: color.fill[role] }}
                >
                  <Glyph />
                  <span>{t(`tokens.colors.fill.${role}`)}</span>
                  <TokenTag>{token}</TokenTag>
                </div>
              ))}
            </div>
          </aside>

          <div className={styles.workspace}>
            <div className={styles.workspaceToolbar}>
              <div>
                <strong>{t('tokens.colors.workspaceTitle')}</strong>
                <span>{t('tokens.colors.workspaceMeta')}</span>
              </div>
              <div className={styles.iconRow}>
                {iconEntries.map(([role, token]) => (
                  <button
                    key={role}
                    type="button"
                    title={token}
                    aria-label={token}
                    data-icon-role={role}
                    style={{ color: color.icon[role] }}
                  >
                    <Glyph />
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.documentCard}>
              <span className={styles.documentEyebrow}>{textColorTokens.tertiary}</span>
              <h4>{t('tokens.colors.documentTitle')}</h4>
              <p>{t('tokens.colors.documentBody')}</p>
              <small>{t('tokens.colors.documentMeta')}</small>

              <div className={styles.inputRow}>
                <input
                  aria-label={t('tokens.colors.placeholder')}
                  placeholder={t('tokens.colors.placeholder')}
                />
                <button type="button">{t('tokens.colors.save')}</button>
              </div>

              <div className={styles.disabledRow}>
                <Glyph />
                <span>{t('tokens.colors.disabledContent')}</span>
                <TokenTag>{textColorTokens.disabled}</TokenTag>
              </div>
            </div>

            <div className={styles.surfaceScene}>
              <div className={styles.secondarySurface}>
                <TokenTag>{surfaceColorTokens.secondary}</TokenTag>
              </div>
              <div className={styles.strongSurface}>
                <TokenTag>{surfaceColorTokens.strong}</TokenTag>
              </div>
              <div className={styles.overlaySurface}>
                <span>{surfaceColorTokens.overlay}</span>
              </div>
              <div className={styles.popover}>
                <strong>{t('tokens.colors.quickActions')}</strong>
                <span>{surfaceColorTokens.elevated}</span>
                <button type="button">{t('tokens.colors.open')}</button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.roleLegend}>
          {[textColorTokens.primary, textColorTokens.secondary, textColorTokens.placeholder].map(
            (token) => (
              <TokenTag key={token}>{token}</TokenTag>
            ),
          )}
          {[borderColorTokens.subtle, borderColorTokens.default, borderColorTokens.strong].map(
            (token) => (
              <TokenTag key={token}>{token}</TokenTag>
            ),
          )}
        </div>
      </section>

      <section className={styles.previewSection}>
        <div className={styles.sectionHeading}>
          <div>
            <span>02</span>
            <h3>{t('tokens.colors.groups.brand')}</h3>
          </div>
          <p>{t('tokens.colors.brandDescription')}</p>
        </div>

        <div className={styles.brandScene}>
          <button className={styles.primaryButton} type="button">
            {t('tokens.colors.createProject')}
          </button>
          <button className={styles.hoverButton} type="button">
            {t('tokens.colors.hover')}
          </button>
          <button className={styles.activeButton} type="button">
            {t('tokens.colors.active')}
          </button>
          <button className={styles.subtleButton} type="button">
            {t('tokens.colors.selected')}
          </button>
          <a href={`#semantic-data-${theme.mode}`}>{t('tokens.colors.linkExample')}</a>
          <div className={styles.focusSample}>{brandColorTokens.focus}</div>
        </div>

        <div className={styles.roleLegend}>
          {Object.values(brandColorTokens).map((token) => (
            <TokenTag key={token}>{token}</TokenTag>
          ))}
        </div>
      </section>

      <section className={styles.previewSection}>
        <div className={styles.sectionHeading}>
          <div>
            <span>03</span>
            <h3>{t('tokens.colors.groups.status')}</h3>
          </div>
          <p>{t('tokens.colors.statusDescription')}</p>
        </div>

        <StatusColorReview theme={theme} />
      </section>

      <section id={`semantic-data-${theme.mode}`} className={styles.previewSection}>
        <div className={styles.sectionHeading}>
          <div>
            <span>04</span>
            <h3>{t('tokens.colors.groups.data')}</h3>
          </div>
          <p>{t('tokens.colors.dataDescription')}</p>
        </div>

        <div className={styles.dataGrid}>
          <div className={styles.chartCard}>
            <div className={styles.chartHeading}>
              <strong>{t('tokens.colors.data.categorical')}</strong>
              <span>12 {t('tokens.colors.data.series')}</span>
            </div>
            <div className={styles.barChart}>
              {categoricalEntries.map((entry, index) => (
                <span
                  key={entry.id}
                  title={entry.id}
                  style={{
                    height: `${chartHeights[index]}%`,
                    background: entry.value,
                  }}
                />
              ))}
            </div>
            <div className={styles.dataTokenLine}>
              {categoricalEntries.map((entry) => (
                <i key={entry.id} style={{ background: entry.value }} title={entry.id} />
              ))}
            </div>
          </div>

          <div className={styles.chartCard}>
            <div className={styles.chartHeading}>
              <strong>{t('tokens.colors.data.sequential')}</strong>
              <span>{t('tokens.colors.data.lowHigh')}</span>
            </div>
            <div className={styles.heatmap}>
              {sequentialEntries.map((entry) => (
                <span key={entry.id} title={entry.id} style={{ background: entry.value }} />
              ))}
            </div>
            <TokenTag>
              {sequentialDataColorTokens[1]} → {sequentialDataColorTokens[10]}
            </TokenTag>
          </div>

          <div className={`${styles.chartCard} ${styles.divergingCard}`}>
            <div className={styles.chartHeading}>
              <strong>{t('tokens.colors.data.diverging')}</strong>
              <span>{t('tokens.colors.data.negativePositive')}</span>
            </div>
            <div className={styles.divergingChart}>
              {divergingEntries.map((entry, index) => (
                <span
                  key={entry.id}
                  title={entry.id}
                  style={{
                    height: `${38 + Math.abs(index - 3) * 15}%`,
                    background: entry.value,
                  }}
                />
              ))}
            </div>
            <div className={styles.divergingLabels}>
              <span>{t('tokens.colors.data.loss')}</span>
              <span>0</span>
              <span>{t('tokens.colors.data.profit')}</span>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
