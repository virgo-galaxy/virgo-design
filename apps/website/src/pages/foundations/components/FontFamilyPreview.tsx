import { fontFamilyRole } from '@virgo-design/tokens';
import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './font-family-preview.module.scss';

const familyRoles = ['sans', 'mono'] as const;

const specimens = {
  sans: 'Virgo Design\nBuild tools that feel inevitable.',
  mono: 'const virgo = "design";\n192.168.1.10:6300',
} as const;

export function FontFamilyPreview() {
  const { t } = useTranslation();

  return (
    <div className={styles.familyGrid}>
      {familyRoles.map((role) => {
        const definition = fontFamilyRole[role];

        return (
          <article
            key={role}
            className={styles.familyCard}
            style={{ '--family-preview-font': definition.family } as CSSProperties}
          >
            <header>
              <span>{t(`foundationPages.typography.fontFamilyRoles.${role}`)}</span>
              <h3>{definition.name}</h3>
            </header>
            <p>{specimens[role]}</p>
            <div className={styles.stack}>
              <span>{t('foundationPages.typography.fontFamilyStack')}</span>
              <code>{definition.family}</code>
            </div>
          </article>
        );
      })}
    </div>
  );
}
