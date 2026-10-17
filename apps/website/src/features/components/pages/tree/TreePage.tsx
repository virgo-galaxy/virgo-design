import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { treeExamples } from '@/examples/components/tree/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';
import styles from './TreePage.module.scss';
export function TreePage() {
  const { t } = useTranslation();
  const Reference = treeExamples.example0.Component;
  return (
    <ComponentExampleRuntimeProvider>
      <div className={['component-page', styles.board].join(' ')}>
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Tree</h1>
            <p>{t('components.tree.overview.description')}</p>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.tree.specimen.referenceSpecimen')}</span>
              <code>Tree</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage>
              <div className={styles.specimen}>
                <Reference />
              </div>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.tree.specimen.contract')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>

        <ArticleSection
          id="tree-1"
          index="01"
          title={t('examples.tree.copy.title0')}
          description={t('examples.tree.copy.description0')}
        >
          <ComponentExample example={treeExamples.example0} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="tree-2"
          index="02"
          title={t('examples.tree.copy.title1')}
          description={t('examples.tree.copy.description1')}
        >
          <ComponentExample example={treeExamples.example1} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="tree-3"
          index="03"
          title={t('examples.tree.copy.title2')}
          description={t('examples.tree.copy.description2')}
        >
          <ComponentExample example={treeExamples.example2} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
