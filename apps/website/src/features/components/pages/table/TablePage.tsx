import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { tableExamples } from '@/examples/components/table/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

import styles from './TablePage.module.scss';
export function TablePage() {
  const { t } = useTranslation();
  const Reference = tableExamples.example0.Component;
  return (
    <ComponentExampleRuntimeProvider>
      <div className={['component-page', styles.board].join(' ')}>
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Table</h1>
            <p>{t('components.table.overview.description')}</p>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.table.specimen.referenceSpecimen')}</span>
              <code>Table</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage>
              <div className={styles.specimen}>
                <Reference />
              </div>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.table.specimen.contract')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>

        <ArticleSection
          id="table-1"
          index="01"
          title={t('examples.table.copy.title0')}
          description={t('examples.table.copy.description0')}
        >
          <ComponentExample example={tableExamples.example0} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="table-2"
          index="02"
          title={t('examples.table.copy.title1')}
          description={t('examples.table.copy.description1')}
        >
          <ComponentExample example={tableExamples.example1} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="table-3"
          index="03"
          title={t('examples.table.copy.title2')}
          description={t('examples.table.copy.description2')}
        >
          <ComponentExample example={tableExamples.example2} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="table-sorting"
          index="04"
          title={t('examples.table.copy.title3')}
          description={t('examples.table.copy.description3')}
        >
          <ComponentExample example={tableExamples.sorting} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="table-filtering"
          index="05"
          title={t('examples.table.copy.filteringTitle')}
          description={t('examples.table.copy.filteringDescription')}
        >
          <ComponentExample example={tableExamples.filtering} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="table-selection"
          index="06"
          title={t('examples.table.copy.selectionTitle')}
          description={t('examples.table.copy.selectionDescription')}
        >
          <ComponentExample example={tableExamples.selection} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="table-composition"
          index="07"
          title={t('examples.table.copy.compositionTitle')}
          description={t('examples.table.copy.compositionDescription')}
        >
          <ComponentExample example={tableExamples.composition} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
