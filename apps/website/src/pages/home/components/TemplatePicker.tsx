import { ChevronDownIcon, DashboardIcon } from '@virgo-design/icons';
import { Button, Radio, Surface, Tag } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { VirgoMark } from '@/components/brand/VirgoBrand/VirgoMark';
import { AppearanceControl } from '@/layout/components/global-controls/AppearanceControl';
import { LanguageControl } from '@/layout/components/global-controls/LanguageControl';
import { useAppearance } from '@/shared/theme/use-appearance';

import {
  createProjectCommand,
  type TemplateFramework,
  templateFrameworks,
  type TemplateStyle,
  templateStyles,
  type TemplateTier,
  templateTiers,
} from '../model';
import { CommandCopy } from './CommandCopy';
import { OverviewDemo } from './OverviewDemo';
import { PixelMascot } from './PixelMascot';

import demoStyles from '../home-demo.module.scss';
import styles from '../home-page.module.scss';

function MinimalPreview() {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);

  return (
    <div className={styles.minimalPreview}>
      <h3>Hello Virgo</h3>
      <PixelMascot className={styles.minimalMascot} />
      <Button
        onClick={() => setCount((value) => value + 1)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (!event.repeat) setCount((value) => value + 1);
          }
        }}
      >
        {t('home.templates.count', { count })}
      </Button>
      <p>{t('home.templates.minimalHint')}</p>
    </div>
  );
}

function TemplatePreview({ tier }: { tier: TemplateTier }) {
  const { t } = useTranslation();
  const { appearance } = useAppearance();
  const [previewAppearance, setPreviewAppearance] = useState<'light' | 'dark' | null>(null);
  const mode = previewAppearance ?? appearance;

  return (
    <Surface
      className={styles.templatePreview!}
      border="subtle"
      tone="default"
      radius={16}
      data-theme={mode}
      aria-label={t('home.templates.preview', { name: t(`home.templates.${tier}.name`) })}
      role="region"
    >
      {tier === 'minimal' ? (
        <MinimalPreview />
      ) : (
        <>
          <div className={styles.previewTopbar}>
            <div className={demoStyles.appBrand}>
              <VirgoMark />
              <strong>Virgo Design</strong>
              <Tag size="sm" variant="outline">
                {t(`home.templates.${tier}.name`)}
              </Tag>
            </div>
            <div className={styles.previewControls}>
              <LanguageControl />
              <AppearanceControl value={mode} onChange={setPreviewAppearance} />
            </div>
          </div>
          <div className={styles.previewLayout}>
            <aside className={styles.previewSidebar}>
              <div>
                <DashboardIcon size={15} aria-hidden="true" />
                <strong>{t('home.templates.dashboard')}</strong>
                <ChevronDownIcon size={14} aria-hidden="true" />
              </div>
              <span>{t('home.templates.workspace')}</span>
            </aside>
            <div className={styles.previewMain}>
              <div className={styles.previewBreadcrumb}>
                <DashboardIcon size={14} aria-hidden="true" />
                <span>/</span>
                <span>{t('home.templates.dashboard')}</span>
                <span>/</span>
                <span>{t('home.templates.workspace')}</span>
              </div>
              {tier === 'starter' ? (
                <Surface className={styles.workspaceWelcome!} border="subtle" radius={12}>
                  <h3>{t('home.templates.workspace')}</h3>
                  <p>{t('home.templates.workspaceDescription')}</p>
                </Surface>
              ) : (
                <>
                  <div className={styles.previewMetrics}>
                    {(['projects', 'activeTasks', 'members'] as const).map((key, index) => (
                      <div key={key}>
                        <span>{t(`home.templates.${key}`)}</span>
                        <strong>{[12, 28, 8][index]}</strong>
                      </div>
                    ))}
                  </div>
                  <OverviewDemo height={120} />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </Surface>
  );
}

export function TemplatePicker({
  tier,
  onTierChange,
}: {
  tier: TemplateTier;
  onTierChange: (tier: TemplateTier) => void;
}) {
  const { t } = useTranslation();
  const [framework, setFramework] = useState<TemplateFramework>('vite-react');
  const [styling, setStyling] = useState<TemplateStyle>('tailwind');

  return (
    <div className={styles.templatePicker}>
      <Radio.Group
        value={tier}
        onValueChange={(value) => onTierChange(value as TemplateTier)}
        orientation="vertical"
        aria-label={t('home.templates.choices')}
        className={styles.tierList!}
      >
        {templateTiers.map((value) => (
          <Radio key={value} value={value} className={styles.tierTab!}>
            <span className={styles.tierLabel}>
              <span>
                <strong>{t(`home.templates.${value}.name`)}</strong>
                <small>{t(`home.templates.${value}.description`)}</small>
              </span>
              {value === 'minimal' ? <PixelMascot className={styles.tierMascot} /> : null}
            </span>
          </Radio>
        ))}
      </Radio.Group>
      <div className={styles.templateBody}>
        <TemplatePreview key={tier} tier={tier} />
        <div className={styles.templateOptions}>
          <div className={styles.optionRow}>
            <strong>{t('home.templates.framework')}</strong>
            <Radio.Group
              aria-label={t('home.templates.framework')}
              value={framework}
              onValueChange={(value) => setFramework(value as TemplateFramework)}
            >
              {templateFrameworks.map((value) => (
                <Radio key={value} value={value}>
                  {value === 'next' ? 'Next.js' : 'Vite + React'}
                </Radio>
              ))}
            </Radio.Group>
          </div>
          <div className={styles.optionRow}>
            <strong>{t('home.templates.styling')}</strong>
            <Radio.Group
              aria-label={t('home.templates.styling')}
              value={styling}
              onValueChange={(value) => setStyling(value as TemplateStyle)}
            >
              {templateStyles.map((value) => (
                <Radio key={value} value={value}>
                  {value === 'tailwind'
                    ? 'Tailwind CSS'
                    : value === 'scss-modules'
                      ? 'SCSS Modules'
                      : 'vanilla-extract'}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        </div>
        <CommandCopy command={createProjectCommand(tier, framework, styling)} dark />
        <p className={styles.combinations}>{t('home.templates.combinations')}</p>
      </div>
    </div>
  );
}
