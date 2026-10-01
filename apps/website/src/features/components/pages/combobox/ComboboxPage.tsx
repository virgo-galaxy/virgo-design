import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { comboboxExamples } from '@/examples/components/combobox/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';
import styles from './ComboboxPage.module.scss';
export function ComboboxPage() {
  const { t } = useTranslation();
  const Reference = comboboxExamples.example0.Component;
  return (
    <ComponentExampleRuntimeProvider>
      <div className={['review-board', styles.board].join(' ')}>
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Combobox</h1>
            <p>{t('components.combobox.overview.description')}</p>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>{t('components.combobox.specimen.referenceSpecimen')}</span>
              <code>Combobox</code>
            </div>
            <div className="hero-stage">
              <div className={styles.specimen}>
                <Reference />
              </div>
            </div>
            <div className="specimen-caption">
              <span>{t('components.combobox.specimen.contract')}</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id="combobox-1"
          index="01"
          title={t('examples.combobox.copy.title0')}
          description={t('examples.combobox.copy.description0')}
        >
          <ComponentExample example={comboboxExamples.example0} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id="combobox-2"
          index="02"
          title={t('examples.combobox.copy.title1')}
          description={t('examples.combobox.copy.description1')}
        >
          <ComponentExample example={comboboxExamples.example1} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id="combobox-3"
          index="03"
          title={t('examples.combobox.copy.title2')}
          description={t('examples.combobox.copy.description2')}
        >
          <ComponentExample example={comboboxExamples.example2} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id="combobox-4"
          index="04"
          title={t('examples.combobox.copy.title3')}
          description={t('examples.combobox.copy.description3')}
        >
          <ComponentExample example={comboboxExamples.example3} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
