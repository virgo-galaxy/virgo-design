import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { treeExamples } from '@/examples/components/tree/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';
import styles from './TreePage.module.scss';
export function TreePage() {
  const { t } = useTranslation();
  const Reference = treeExamples.example0.Component;
  return (
    <ComponentExampleRuntimeProvider>
      <div className={['review-board', styles.board].join(' ')}>
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Tree</h1>
            <p>{t('components.tree.overview.description')}</p>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>{t('components.tree.specimen.referenceSpecimen')}</span>
              <code>Tree</code>
            </div>
            <div className="hero-stage">
              <div className={styles.specimen}>
                <Reference />
              </div>
            </div>
            <div className="specimen-caption">
              <span>{t('components.tree.specimen.contract')}</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
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
