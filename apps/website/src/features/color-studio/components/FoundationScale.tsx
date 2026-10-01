import type { ColorScale, ColorScaleStep } from '@virgo-design/colors';
import { Button } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { useCopyToast } from '@/shared/hooks/use-copy-toast';
import { CopyToast } from '@/shared/ui/copy-toast/CopyToast';

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

    await copy(hex, 'foundations.colors.colorCopied', {
      token,
      value: hex,
    });
  };

  return (
    <>
      <CopyToast key={toast?.id} toast={toast} />

      <div className={styles.scale}>
        {STEPS.map((step) => (
          <Button
            variant="text"
            className={styles.scaleItem}
            key={step}
            type="button"
            aria-label={t('foundations.colors.copyStep', {
              family: tokenPrefix,
              step,
            })}
            onClick={() => void copyStep(step)}
          >
            <span
              className={styles.scaleColor}
              style={{
                backgroundColor: scale[step],
              }}
            >
              {step === baseStep ? (
                <span className={styles.baseBadge}>{t('foundations.colorStudio.baseLabel')}</span>
              ) : null}
            </span>

            <span className={styles.scaleMeta}>
              <strong>{step}</strong>
              <code>{scale[step].toUpperCase()}</code>
            </span>
          </Button>
        ))}
      </div>
    </>
  );
}
