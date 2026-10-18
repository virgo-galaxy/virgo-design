import { Surface } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { surfaceImageFixture } from './fixtures';

import styles from './SurfaceImageContainExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Surface
      background={{
        type: 'image',
        src: surfaceImageFixture,
        fit: 'contain',
        position: 'right center',
      }}
      tone="secondary"
      radius={12}
      className={styles.root!}
    >
      <Surface tone="elevated" radius={6} className={styles.surface!}>
        {t('examples.surface.copy.containRightCenterNoRepeat')}
      </Surface>
    </Surface>
  );
}
