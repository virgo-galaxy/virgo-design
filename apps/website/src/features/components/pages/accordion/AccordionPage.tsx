import './AccordionPage.scss';

import { Accordion } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { accordionExamples } from '@/examples/components/accordion/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

function DemoItems({ prefix }: { prefix: string }) {
  const { t } = useTranslation();

  return (
    <>
      <Accordion.Item value={`${prefix}-anatomy`}>
        <Accordion.Trigger icon>{t('examples.accordion.copy.anatomy')}</Accordion.Trigger>
        <Accordion.Content>
          {t(
            'examples.accordion.copy.rootCoordinatesItemTriggerAndContentWithoutOwningApplicationContent',
          )}
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value={`${prefix}-behavior`}>
        <Accordion.Trigger icon>{t('examples.accordion.copy.behavior')}</Accordion.Trigger>
        <Accordion.Content>
          {t('examples.accordion.copy.stateCanBeControlledOrUncontrolledWithOneOrSeveral')}
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value={`${prefix}-keyboard`}>
        <Accordion.Trigger icon>{t('examples.accordion.copy.keyboard')}</Accordion.Trigger>
        <Accordion.Content>
          {t('examples.accordion.copy.arrowKeysHomeAndEndMoveFocusBetweenEnabledHeadings')}
        </Accordion.Content>
      </Accordion.Item>
    </>
  );
}

export function AccordionPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="component-page accordion-page" id="accordion-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Accordion</h1>
            <p>{t('components.accordion.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.accordion.facts.modes')}</dt>
                <dd>02</dd>
              </div>
              <div>
                <dt>{t('components.accordion.facts.sizes')}</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>{t('components.accordion.facts.variants')}</dt>
                <dd>03</dd>
              </div>
            </dl>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.accordion.specimen.referenceSpecimen')}</span>
              <code>single · bordered · md</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage className="accordion-hero-stage">
              <Accordion.Root
                type="single"
                variant="bordered"
                defaultValue="hero-anatomy"
                className="accordion-demo"
              >
                <DemoItems prefix="hero" />
              </Accordion.Root>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.accordion.specimen.ariaHeadings')}</span>
              <span>{t('components.accordion.specimen.arrowNavigation')}</span>
              <span>{t('components.accordion.specimen.classicStyle')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>
        <ArticleSection
          id={'accordion-variants'}
          index={'01'}
          title={t('components.accordion.variants.title')}
          description={t('components.accordion.variants.description')}
        >
          <ComponentExample example={accordionExamples.accordionVariants} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'accordion-sizes'}
          index={'02'}
          title={t('components.accordion.sizes.title')}
          description={t('components.accordion.sizes.description')}
        >
          <ComponentExample example={accordionExamples.accordionSizes} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'accordion-modes'}
          index={'03'}
          title={t('components.accordion.modes.title')}
          description={t('components.accordion.modes.description')}
        >
          <ComponentExample example={accordionExamples.accordionSingle} />
          <ComponentExample example={accordionExamples.accordionMultiple} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
