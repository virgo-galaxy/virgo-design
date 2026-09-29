import {
  statusColorFamilies,
  type StatusColorFamily,
  statusColorTokens,
  type VirgoTheme,
} from '@virgo-design/tokens';
import { useTranslation } from 'react-i18next';

import { contrastRatio } from '../contrast';
import styles from '../styles/color-semantic-preview.module.scss';

const marks: Record<StatusColorFamily, string> = {
  success: '✓',
  warning: '!',
  danger: '×',
  info: 'i',
};

function TokenValues({ entries }: { entries: Array<[string, string]> }) {
  return (
    <dl className={styles.statusTokenValues}>
      {entries.map(([name, value]) => (
        <div key={name}>
          <dt>
            <span
              className={styles.statusSwatch}
              style={{ background: value }}
              aria-hidden="true"
            />
            <code>{name}</code>
          </dt>
          <dd>
            <code>{value}</code>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function StatusColorReview({ theme }: { theme: VirgoTheme }) {
  const { t } = useTranslation();
  return (
    <div className={styles.statusGrid}>
      {statusColorFamilies.map((family) => {
        const status = theme.color.status[family];
        const tokens = statusColorTokens[family];
        const ratio = contrastRatio(status.solid, status.onSolid);
        const result = ratio === null ? 'unavailable' : ratio >= 4.5 ? 'pass' : 'fail';
        const label = t(`tokens.colors.statusReview.families.${family}`);
        return (
          <section
            className={styles.statusReview}
            key={family}
            aria-label={`${theme.mode} ${family}`}
            data-status-family={family}
          >
            <header className={styles.statusReviewHeader}>
              <h4>{label}</h4>
              <span>{t(`tokens.colors.${theme.mode}.title`)}</span>
            </header>
            <div className={styles.statusPairHeading}>
              <h5>Solid</h5>
              <span className={styles.statusContrast} data-contrast-result={result}>
                {t('tokens.colors.statusReview.contrast')}{' '}
                {ratio === null ? '—' : `${ratio.toFixed(2)}:1`} ·{' '}
                {t(`tokens.colors.statusReview.${result}`)}
              </span>
            </div>
            <div
              className={styles.statusSolid}
              data-status-sample="solid"
              style={{ background: status.solid, color: status.onSolid }}
            >
              <span aria-hidden="true">{marks[family]}</span>
              <span>{t(`tokens.colors.status.${family}`)}</span>
            </div>
            <p className={styles.statusUsage}>{t('tokens.colors.statusReview.solidUsage')}</p>
            <TokenValues
              entries={[
                [tokens.solid, status.solid],
                [tokens.onSolid, status.onSolid],
              ]}
            />
            <h5 className={styles.statusSubtleHeading}>Subtle</h5>
            <div
              className={styles.statusSubtle}
              data-status-sample="subtle"
              style={{ background: status.subtle, borderColor: status.border, color: status.text }}
            >
              <span aria-hidden="true">{marks[family]}</span>
              <div>
                <strong>{t(`tokens.colors.status.${family}`)}</strong>
                <p>{t(`tokens.colors.status.${family}Message`)}</p>
              </div>
            </div>
            <p className={styles.statusUsage}>{t('tokens.colors.statusReview.subtleUsage')}</p>
            <TokenValues
              entries={[
                [tokens.subtle, status.subtle],
                [tokens.border, status.border],
                [tokens.text, status.text],
              ]}
            />
            <details className={styles.statusIndicator}>
              <summary>{t('tokens.colors.statusReview.indicator')}</summary>
              <p className={styles.statusUsage}>{t('tokens.colors.statusReview.indicatorUsage')}</p>
              <TokenValues
                entries={[
                  [tokens.accent, status.accent],
                  [tokens.foreground, status.foreground],
                ]}
              />
            </details>
          </section>
        );
      })}
    </div>
  );
}
