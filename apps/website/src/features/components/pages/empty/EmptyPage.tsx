import './EmptyPage.scss';

import { LayoutIcon } from '@virgo-design/icons';
import { Button, Empty } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { emptyExamples } from '@/examples/components/empty/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function EmptyPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="component-page empty-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Empty</h1>
            <p>{t('components.empty.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.empty.facts.slots')}</dt>
                <dd>{t('examples.empty.copy.iconTitleDescriptionAction')}</dd>
              </div>
              <div>
                <dt>{t('components.empty.facts.sizes')}</dt>
                <dd>02</dd>
              </div>
              <div>
                <dt>{t('components.empty.facts.intent')}</dt>
                <dd>{t('components.empty.facts.neutral')}</dd>
              </div>
            </dl>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.empty.specimen.referenceSpecimen')}</span>
              <code>icon · message · action</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage>
              <div className="empty-hero-frame">
                <Empty aria-label={t('examples.empty.copy.emptyDocumentsHeroState')}>
                  <Empty.Icon>
                    <LayoutIcon />
                  </Empty.Icon>
                  <Empty.Title>{t('examples.empty.copy.noDocuments')}</Empty.Title>
                  <Empty.Description>
                    {t('examples.empty.copy.createYourFirstDocumentToGetStarted')}
                  </Empty.Description>
                  <Empty.Action>
                    <Button>{t('examples.empty.copy.createDocument')}</Button>
                  </Empty.Action>
                </Empty>
              </div>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.empty.specimen.consumerCopy')}</span>
              <span>{t('components.empty.specimen.composableSlots')}</span>
              <span>{t('components.empty.specimen.neutralGuidance')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>
        <ArticleSection
          id={'empty-basic'}
          index={'01'}
          title={t('components.empty.basic.title')}
          description={t('components.empty.basic.description')}
        >
          <ComponentExample example={emptyExamples.emptyBasic} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'empty-complete'}
          index={'02'}
          title={t('components.empty.complete.title')}
          description={t('components.empty.complete.description')}
        >
          <ComponentExample example={emptyExamples.emptyAction} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'empty-search-compact'}
          index={'03'}
          title={t('components.empty.searchCompact.title')}
          description={t('components.empty.searchCompact.description')}
        >
          <ComponentExample example={emptyExamples.emptySearch} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
