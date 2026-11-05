import { themePresets } from '@virgo-design/themes';
import { Button } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { OverviewDemo } from './OverviewDemo';

import styles from '../home-page.module.scss';

export function ThemeShowcase() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState('virgo');

  return (
    <section className={styles.themes} aria-labelledby="home-themes-title">
      <div className={styles.themeInner}>
        <div className={styles.themeCopy}>
          <h2 id="home-themes-title">
            {t('home.themes.firstLine')}
            <br />
            {t('home.themes.secondLine')}
          </h2>
          <p>{t('home.themes.description')}</p>
          <Button.Group
            className={styles.themeChoices}
            layout="custom"
            aria-label={t('home.themes.choices')}
          >
            {themePresets.map((preset) => (
              <Button
                key={preset.id}
                variant={theme === preset.id ? 'primary' : 'text'}
                aria-pressed={theme === preset.id}
                onClick={() => setTheme(preset.id)}
              >
                {preset.name}
              </Button>
            ))}
          </Button.Group>
        </div>
        <div className={styles.themePreviews}>
          <div
            className={styles.themeScope}
            data-virgo-theme={theme}
            data-theme="light"
            role="region"
            aria-label={t('home.themes.light')}
          >
            <OverviewDemo detailed appearance="light" />
          </div>
          <div
            className={styles.themeScope}
            data-virgo-theme={theme}
            data-theme="dark"
            role="region"
            aria-label={t('home.themes.dark')}
          >
            <OverviewDemo detailed appearance="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}
