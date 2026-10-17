import { PlusIcon } from '@virgo-design/icons';
import { Button } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { buttonExamples } from '@/examples/components/button/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function ButtonPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <article className="component-page" id="button-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Button</h1>
            <p>{t('components.button.overview.description')}</p>

            <dl className="component-facts">
              <div>
                <dt>{t('components.button.facts.variants')}</dt>
                <dd>04</dd>
              </div>
              <div>
                <dt>{t('components.button.facts.sizes')}</dt>
                <dd>04</dd>
              </div>
              <div>
                <dt>{t('components.button.facts.states')}</dt>
                <dd>05</dd>
              </div>
            </dl>
          </div>

          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.button.specimen.referenceSpecimen')}</span>
              <code>primary · medium</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage>
              <Button leadingIcon={<PlusIcon />}>{t('examples.button.copy.createProject')}</Button>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.button.specimen.36pxHeight')}</span>
              <span>{t('components.button.specimen.14pxLabel')}</span>
              <span>{t('components.button.specimen.radius8')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>

        <ArticleSection
          id="variants"
          index="01"
          title={t('components.button.variants.title')}
          description={t('components.button.variants.description')}
        >
          <ComponentExample example={buttonExamples.variants} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="sizes"
          index="02"
          title={t('components.button.sizes.title')}
          description={t('components.button.sizes.description')}
        >
          <ComponentExample example={buttonExamples.sizes} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="icons"
          index="03"
          title={t('components.button.icons.title')}
          description={t('components.button.icons.description')}
        >
          <ComponentExample example={buttonExamples.icons} />
          <ComponentExample example={buttonExamples.iconOnly} />
        </ArticleSection>

        <ArticleSection
          id="states"
          index="04"
          title={t('components.button.states.title')}
          description={t('components.button.states.description')}
        >
          <ComponentExample example={buttonExamples.states} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="groups"
          index="05"
          title={t('components.button.groups.title')}
          description={t('components.button.groups.description')}
        >
          <ComponentExample example={buttonExamples.groups} showCaption={false} />
        </ArticleSection>
      </article>
    </ComponentExampleRuntimeProvider>
  );
}
