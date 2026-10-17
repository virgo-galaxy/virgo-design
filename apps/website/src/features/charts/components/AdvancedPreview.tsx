import { Surface } from '@virgo-design/ui';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from '../ChartsPage.module.scss';

const AdvancedExamples = lazy(() => import('../AdvancedExamples'));
export function AdvancedPreview() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const placeholder = (
    <div className={styles.grid}>
      {(['radar', 'heatmap'] as const).map((kind) => (
        <Surface
          key={kind}
          border="default"
          radius={8}
          className={[styles.preview, kind === 'heatmap' ? styles.heatmapPreview : ''].join(' ')}
        >
          <h3>{t(`charts.${kind}`)}</h3>
          <div className={styles.advancedLoading} role="status">
            {t('charts.loadingAdvanced')}
          </div>
        </Surface>
      ))}
    </div>
  );

  return (
    <div ref={ref} id="chart-advanced-previews">
      {visible ? (
        <Suspense fallback={placeholder}>
          <AdvancedExamples />
        </Suspense>
      ) : (
        placeholder
      )}
    </div>
  );
}
