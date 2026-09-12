import type { ColorScale, ColorScaleStep } from '@virgo-design/colors';
import { useTranslation } from 'react-i18next';

import { CopyToast } from '@/components/feedback/CopyToast';
import { useCopyToast } from '@/hooks/use-copy-toast';

import styles from '../styles/foundation-extensions.module.scss';

const STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const satisfies readonly ColorScaleStep[];

interface FoundationScaleProps {
  scale: ColorScale;
  tokenPrefix: string;
  baseStep?: ColorScaleStep;
}

export function FoundationScale({ scale, tokenPrefix, baseStep = 6 }: FoundationScaleProps) {
  const { t } = useTranslation();
  const { toast, copy } = useCopyToast();

  const copyStep = async (step: ColorScaleStep) => {
    const hex = scale[step].toUpperCase();
    const token = `@${tokenPrefix}-${step}`;

    await copy(
      hex,
      t('common.colorCopied', {
        token,
        value: hex,
      }),
    );
  };

  return (
    <>
      <CopyToast key={toast?.id} toast={toast} />

      <div className={styles.scale}>
        {STEPS.map((step) => (
          <button
            className={styles.scaleItem}
            key={step}
            type="button"
            aria-label={t('preview.copyStep', {
              family: tokenPrefix,
              step,
            })}
            onClick={() => void copyStep(step)}
          >
            <div
              className={styles.scaleColor}
              style={{
                backgroundColor: scale[step],
              }}
            >
              {step === baseStep ? <span className={styles.baseBadge}>BASE</span> : null}
            </div>

            <div className={styles.scaleMeta}>
              <strong>{step}</strong>
              <code>{scale[step].toUpperCase()}</code>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
