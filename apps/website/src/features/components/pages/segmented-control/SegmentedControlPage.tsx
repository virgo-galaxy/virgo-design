import { SegmentedControl } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { segmentedControlExamples } from '@/examples/components/segmented-control/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function SegmentedControlPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="component-page" id="segmented-control-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Segmented Control</h1>
            <p>{t('components.segmentedControl.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.segmentedControl.facts.variants')}</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>{t('components.segmentedControl.facts.sizes')}</dt>
                <dd>04</dd>
              </div>
              <div>
                <dt>{t('components.segmentedControl.facts.motion')}</dt>
                <dd>02</dd>
              </div>
            </dl>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.segmentedControl.specimen.referenceSpecimen')}</span>
              <code>soft · small · slide</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage>
              <SegmentedControl
                variant="soft"
                size="small"
                motion="slide"
                defaultValue="light"
                aria-label={t('examples.segmentedControl.copy.theme')}
              >
                <SegmentedControl.Item value="light">
                  {t('examples.segmentedControl.copy.light')}
                </SegmentedControl.Item>
                <SegmentedControl.Item value="dark">
                  {t('examples.segmentedControl.copy.dark')}
                </SegmentedControl.Item>
              </SegmentedControl>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.segmentedControl.specimen.28pxHeight')}</span>
              <span>{t('examples.segmentedControl.copy.labelSmall')}</span>
              <span>{t('components.segmentedControl.specimen.slidingIndicator')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>

        <ArticleSection
          id="segmented-variants"
          index="01"
          title={t('components.segmentedControl.segmentedVariants.title')}
          description={t('components.segmentedControl.segmentedVariants.description')}
        >
          <ComponentExample
            example={segmentedControlExamples.segmentedVariants}
            showCaption={false}
          />
        </ArticleSection>

        <ArticleSection
          id="segmented-motion"
          index="02"
          title={t('components.segmentedControl.segmentedMotion.title')}
          description={t('components.segmentedControl.segmentedMotion.description')}
        >
          <ComponentExample
            example={segmentedControlExamples.segmentedMotion}
            showCaption={false}
          />
        </ArticleSection>

        <ArticleSection
          id="segmented-sizes"
          index="03"
          title={t('components.segmentedControl.segmentedSizes.title')}
          description={t('components.segmentedControl.segmentedSizes.description')}
        >
          <ComponentExample example={segmentedControlExamples.segmentedSizes} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="segmented-content"
          index="04"
          title={t('components.segmentedControl.segmentedContent.title')}
          description={t('components.segmentedControl.segmentedContent.description')}
        >
          <ComponentExample example={segmentedControlExamples.segmentedContent} />
          <ComponentExample example={segmentedControlExamples.segmentedDisabled} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
