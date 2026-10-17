import './PaginationPage.scss';

import { Pagination } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { paginationExamples } from '@/examples/components/pagination/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function PaginationPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="component-page pagination-page" id="pagination-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Pagination</h1>
            <p>{t('components.pagination.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.pagination.facts.alignment')}</dt>
                <dd>{t('components.pagination.facts.3Positions')}</dd>
              </div>
              <div>
                <dt>{t('components.pagination.facts.options')}</dt>
                <dd>{t('components.pagination.facts.3Controls')}</dd>
              </div>
              <div>
                <dt>{t('components.pagination.facts.state')}</dt>
                <dd>{t('components.pagination.facts.bothModes')}</dd>
              </div>
            </dl>
          </div>
          <ReferenceSpecimen className="pagination-hero">
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.pagination.specimen.referenceSpecimen')}</span>
              <code>{t('components.pagination.specimen.summary')}</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage className="pagination-hero-stage">
              <Pagination
                total={500}
                defaultPage={6}
                align="center"
                aria-label={t('examples.pagination.copy.referencePagination')}
              />
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.pagination.specimen.currentPage')}</span>
              <span>{t('components.pagination.specimen.boundedPages')}</span>
              <span>{t('components.pagination.specimen.quickNavigation')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>

        <ArticleSection
          id="pagination-basic"
          index="01"
          title={t('components.pagination.basic.title')}
          description={t('components.pagination.basic.description')}
        >
          <ComponentExample example={paginationExamples.paginationBasic} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="pagination-more"
          index="02"
          title={t('components.pagination.more.title')}
          description={t('components.pagination.more.description')}
        >
          <ComponentExample example={paginationExamples.paginationMore} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="pagination-size"
          index="03"
          title={t('components.pagination.size.title')}
          description={t('components.pagination.size.description')}
        >
          <ComponentExample example={paginationExamples.paginationPageSize} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="pagination-jump"
          index="04"
          title={t('components.pagination.jump.title')}
          description={t('components.pagination.jump.description')}
        >
          <ComponentExample example={paginationExamples.paginationQuickJump} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="pagination-total"
          index="05"
          title={t('components.pagination.total.title')}
          description={t('components.pagination.total.description')}
        >
          <ComponentExample example={paginationExamples.paginationTotal} />
          <ComponentExample example={paginationExamples.paginationRange} />
        </ArticleSection>

        <ArticleSection
          id="pagination-all"
          index="06"
          title={t('components.pagination.all.title')}
          description={t('components.pagination.all.description')}
        >
          <ComponentExample example={paginationExamples.paginationControlled} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="pagination-align"
          index="07"
          title={t('components.pagination.align.title')}
          description={t('components.pagination.align.description')}
        >
          <ComponentExample example={paginationExamples.paginationAlignment} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="pagination-labels"
          index="08"
          title={t('components.pagination.labels.title')}
          description={t('components.pagination.labels.description')}
        >
          <ComponentExample example={paginationExamples.paginationTextLabels} />
          <ComponentExample example={paginationExamples.paginationLocalization} />
        </ArticleSection>

        <ArticleSection
          id="pagination-states"
          index="09"
          title={t('components.pagination.states.title')}
          description={t('components.pagination.states.description')}
        >
          <ComponentExample example={paginationExamples.paginationDisabled} />
          <ComponentExample example={paginationExamples.paginationEmpty} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
