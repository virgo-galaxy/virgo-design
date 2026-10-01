import './TagPage.scss';

import { CheckIcon, LayoutIcon } from '@virgo-design/icons';
import { Tag } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { tagExamples } from '@/examples/components/tag/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function TagPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="component-page tag-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Tag</h1>
            <p>{t('components.tag.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.tag.facts.variants')}</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>{t('components.tag.facts.sizes')}</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>{t('components.tag.facts.behaviors')}</dt>
                <dd>{t('components.tag.facts.closable')}</dd>
              </div>
            </dl>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.tag.specimen.referenceSpecimen')}</span>
              <code>semantic · icon · closable</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage>
              <div className="tag-stage">
                <Tag intent="brand">{t('examples.tag.copy.designSystem')}</Tag>
                <Tag icon={<CheckIcon />} intent="success" variant="outline">
                  {t('examples.tag.copy.stable')}
                </Tag>
                <Tag icon={<LayoutIcon />} intent="info">
                  {t('examples.tag.copy.workspace')}
                </Tag>
                <Tag closable closeLabel={t('examples.tag.copy.removePrototype')}>
                  {t('examples.tag.copy.prototype')}
                </Tag>
              </div>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.tag.specimen.classification')}</span>
              <span>{t('components.tag.specimen.semanticColor')}</span>
              <span>{t('components.tag.specimen.removableMetadata')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>
        <ArticleSection
          id={'tag-intents'}
          index={'01'}
          title={t('components.tag.intents.title')}
          description={t('components.tag.intents.description')}
        >
          <ComponentExample example={tagExamples.tagIntents} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'tag-variants'}
          index={'02'}
          title={t('components.tag.variants.title')}
          description={t('components.tag.variants.description')}
        >
          <ComponentExample example={tagExamples.tagVariants} />
          <ComponentExample example={tagExamples.tagSizes} />
        </ArticleSection>
        <ArticleSection
          id={'tag-composition'}
          index={'03'}
          title={t('components.tag.composition.title')}
          description={t('components.tag.composition.description')}
        >
          <ComponentExample example={tagExamples.tagIcons} />
          <ComponentExample example={tagExamples.tagClosable} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
