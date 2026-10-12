import './SurfacePage.scss';

import { Button, Layout, Surface } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { surfaceExamples } from '@/examples/components/surface/examples';
import { surfaceImageFixture } from '@/examples/components/surface/fixtures';
import { translateExampleText } from '@/i18n/translate-example-text';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function SurfacePage() {
  const { t } = useTranslation();

  const [actions, setActions] = useState(0);
  return (
    <ComponentExampleRuntimeProvider>
      <div className="component-page" id="surface-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Surface</h1>
            <p>{t('components.surface.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.surface.facts.tones')}</dt>
                <dd>04</dd>
              </div>
              <div>
                <dt>{t('components.surface.facts.materials')}</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>{t('components.surface.facts.elevation')}</dt>
                <dd>0–5</dd>
              </div>
            </dl>
          </div>
          <ReferenceSpecimen className="surface-hero-specimen">
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.surface.specimen.referenceSpecimen')}</span>
              <code>glass · elevated</code>
            </ReferenceSpecimen.Toolbar>
            <div
              className="surface-backdrop surface-hero-stage"
              style={{ backgroundImage: `url("${surfaceImageFixture}")` }}
            >
              <Layout>
                <Layout.Header>
                  <Surface
                    material="glass"
                    tone="elevated"
                    radius={16}
                    elevation={2}
                    className="surface-demo-content"
                  >
                    <span className="surface-demo-eyebrow">
                      {t('examples.surface.copy.aSharedMaterialLanguage')}
                    </span>
                    <strong className="surface-demo-title">
                      {t('examples.surface.copy.spaceDressed')}
                    </strong>
                    <p>{t('components.surface.overview.note')}</p>
                    <Button size="small" onClick={() => setActions((count) => count + 1)}>
                      {t('examples.surface.copy.tryTheContent')}
                    </Button>
                    <span className="surface-demo-feedback" aria-live="polite">
                      {actions === 0
                        ? t('examples.surface.details.contentStaysInteractive')
                        : t('examples.surface.details.valueSuccessfulInteractions', {
                            v0: translateExampleText(t, 'surface', String(actions)),
                          })}
                    </span>
                  </Surface>
                </Layout.Header>
              </Layout>
            </div>
            <ReferenceSpecimen.Caption>
              <span>{t('components.surface.specimen.themeAwareTint')}</span>
              <span>{t('components.surface.specimen.nativeContent')}</span>
              <span>{t('components.surface.specimen.cssMaterial')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>
        <ArticleSection
          id={'surface-semantic'}
          index={'01'}
          title={t('components.surface.semantic.title')}
          description={t('components.surface.semantic.description')}
        >
          <ComponentExample example={surfaceExamples.surfaceTones} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'surface-material'}
          index={'02'}
          title={t('components.surface.material.title')}
          description={t('components.surface.material.description')}
        >
          <ComponentExample example={surfaceExamples.surfaceMaterials} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'surface-background'}
          index={'03'}
          title={t('components.surface.background.title')}
          description={t('components.surface.background.description')}
        >
          <ComponentExample example={surfaceExamples.surfaceColorBackground} />
          <ComponentExample example={surfaceExamples.surfaceImageBackground} />
          <ComponentExample example={surfaceExamples.surfaceImageMaterial} />
          <ComponentExample example={surfaceExamples.surfaceImageContain} />
        </ArticleSection>
        <ArticleSection
          id={'surface-depth'}
          index={'04'}
          title={t('components.surface.depth.title')}
          description={t('components.surface.depth.description')}
        >
          <ComponentExample example={surfaceExamples.surfaceElevation} />
          <ComponentExample example={surfaceExamples.surfaceBorders} />
          <ComponentExample example={surfaceExamples.surfaceRadius} />
        </ArticleSection>
        <ArticleSection
          id={'surface-composition'}
          index={'05'}
          title={t('components.surface.composition.title')}
          description={t('components.surface.composition.description')}
        >
          <ComponentExample example={surfaceExamples.surfaceLayoutComposition} />
          <ComponentExample example={surfaceExamples.surfaceOverflow} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
