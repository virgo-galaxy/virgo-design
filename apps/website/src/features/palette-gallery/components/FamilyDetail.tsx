import type { ColorScale, ColorScaleStep } from '@virgo-design/colors';
import { useTranslation } from 'react-i18next';

import { CopyToast } from '@/components/feedback/CopyToast';
import type { FoundationGroupKind } from '@/features/color-studio/lib/foundation-groups';
import type { FoundationGroupId } from '@/features/color-studio/model/types';
import { useCopyToast } from '@/hooks/use-copy-toast';

import styles from '../styles/palette-gallery.module.scss';

const STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const satisfies readonly ColorScaleStep[];
const clamp = (value: number) => Math.min(1, Math.max(0, value));

interface FamilyDetailProps {
  groupId: FoundationGroupId;
  kind: FoundationGroupKind;
  label: string;
  base: string;
  scale: ColorScale;
  progress: number;
  exitProgress: number;
}

export function FamilyDetail({
  groupId,
  kind,
  label,
  base,
  scale,
  progress,
  exitProgress,
}: FamilyDetailProps) {
  const { t } = useTranslation();
  const { toast, copy } = useCopyToast();
  const reveal = clamp((progress - 0.42) / 0.58);
  const opacity = reveal * (1 - exitProgress * 0.82);

  const entranceSwing = Math.sin(reveal * Math.PI * 4.25) * (1 - reveal) * 7.5;
  const exitSwing = Math.sin(exitProgress * Math.PI * 1.7) * exitProgress * 3.6;
  const swingAngle = entranceSwing + exitSwing;
  const translateX = entranceSwing * 0.9 + exitProgress * 26;
  const translateY = (1 - reveal) * 42 - exitProgress * 10;
  const scaleValue = 0.985 + reveal * 0.015 - exitProgress * 0.045;

  const copyStep = async (step: ColorScaleStep) => {
    const hex = scale[step].toUpperCase();
    const token = `@${groupId}-${step}`;

    await copy(
      hex,
      t('common.colorCopied', {
        token,
        value: hex,
      }),
    );
  };

  return (
    <aside
      className={styles.detailPanel}
      style={{
        opacity,
        transform: `translate3d(${translateX}px, ${translateY}px, 0) rotateZ(${swingAngle}deg) scale(${scaleValue})`,
      }}
    >
      <CopyToast key={toast?.id} toast={toast} />

      <div className={styles.detailEyebrow}>{t(`gallery.kinds.${kind}`)}</div>

      <div className={styles.detailTitleRow}>
        <div>
          <h3>{label}</h3>
          <code>{base.toUpperCase()}</code>
        </div>

        <span className={styles.detailDot} style={{ backgroundColor: base }} />
      </div>

      <div className={styles.detailBase}>
        <div className={styles.detailBaseColor} style={{ backgroundColor: base }} />

        <div>
          <span>{t('gallery.baseColor')}</span>
          <strong>{base.toUpperCase()}</strong>
          <small>STEP 6</small>
        </div>
      </div>

      <div className={styles.tonalHeading}>
        <strong>{t('gallery.tonalScale')}</strong>
        <span>1 — 10</span>
      </div>

      <div className={styles.detailScale} key={groupId}>
        {STEPS.map((step, index) => (
          <button
            className={styles.detailScaleItem}
            key={step}
            type="button"
            aria-label={t('preview.copyStep', {
              family: label,
              step,
            })}
            style={{
              animationDelay: `${index * 28}ms`,
            }}
            onClick={() => void copyStep(step)}
          >
            <span
              className={styles.detailScaleColor}
              style={{
                backgroundColor: scale[step],
              }}
            />
            <strong>{step}</strong>
          </button>
        ))}
      </div>

      <div className={styles.detailHexList}>
        {STEPS.map((step) => (
          <button
            className={styles.detailHexItem}
            key={step}
            type="button"
            onClick={() => void copyStep(step)}
          >
            <span>{step}</span>
            <code>{scale[step].toUpperCase()}</code>
          </button>
        ))}
      </div>
    </aside>
  );
}
