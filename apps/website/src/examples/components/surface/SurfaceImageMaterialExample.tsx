import { Surface } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { surfaceImageFixture } from './fixtures';
import styles from './SurfaceImageMaterialExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Surface
      background={{ type: 'image', src: surfaceImageFixture }}
      material="glass"
      border="strong"
      radius={12}
      className={styles.root!}
    >
      <strong>{t('examples.surface.copy.imageGlass')}</strong>
      <p>{t('examples.surface.copy.theDecorativeSceneIsSoftenedWithoutApplyingABlurTo')}</p>
    </Surface>
  );
}
