import { Surface } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { surfaceImageFixture } from './fixtures';

import styles from './SurfaceImageBackgroundExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Surface
      background={{ type: 'image', src: surfaceImageFixture, fit: 'cover', position: 'center' }}
      radius={12}
      className={styles.root!}
    >
      <Surface material="glass" tone="elevated" radius={8} className={styles.surface!}>
        <strong>{t('examples.surface.copy.visualTestCard')}</strong>
        <p className={styles.text!}>
          {t('examples.surface.copy.useAnImgWithAltTextWhenThePictureCarries')}
        </p>
      </Surface>
    </Surface>
  );
}
