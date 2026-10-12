import { Button, Surface } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { surfaceImageFixture } from './fixtures';
import styles from './SurfaceMaterialsExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const [count, setCount] = useState(0);
  return (
    <div className={styles.root!}>
      <div className={styles.stage!}>
        {(['solid', 'translucent', 'glass'] as const).map((material) => (
          <Surface
            key={material}
            background={{ type: 'image', src: surfaceImageFixture }}
            radius={16}
            className={styles.stage2!}
          >
            <Surface material={material} radius={12} className={styles.surface!}>
              <strong>{material}</strong>
              <span>{t('examples.surface.copy.sameSceneDifferentMaterial')}</span>
              <Button size="small" variant="outline" onClick={() => setCount((value) => value + 1)}>
                {t('examples.surface.copy.interact')}
              </Button>
            </Surface>
          </Surface>
        ))}
      </div>
      <p role="status" className={styles.text!}>
        {t('examples.surface.copy.successfulInteractions')} {count}
      </p>
    </div>
  );
}
