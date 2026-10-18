import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { fieldExamples } from '@/examples/components/field/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

import styles from './FieldPage.module.scss';

export function FieldPage() {
  const { t } = useTranslation();
  const Reference = fieldExamples.example0.Component;

  return (
    <ComponentExampleRuntimeProvider>
      <div className={['component-page', styles.board].join(' ')}>
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Field</h1>
            <p>{t('components.field.overview.description')}</p>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.field.specimen.referenceSpecimen')}</span>
              <code>Field</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage>
              <div className={styles.specimen}>
                <Reference />
              </div>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.field.specimen.contract')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>
        <ArticleSection
          id="field-1"
          index="01"
          title={t('examples.field.copy.title0')}
          description={t('examples.field.copy.description0')}
        >
          <ComponentExample example={fieldExamples.example0} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="field-2"
          index="02"
          title={t('examples.field.copy.title1')}
          description={t('examples.field.copy.description1')}
        >
          <ComponentExample example={fieldExamples.example1} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="field-3"
          index="03"
          title={t('examples.field.copy.title2')}
          description={t('examples.field.copy.description2')}
        >
          <ComponentExample example={fieldExamples.example2} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
