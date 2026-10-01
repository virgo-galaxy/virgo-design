import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { colorPickerExamples } from '@/examples/components/color-picker/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';
import styles from './ColorPickerPage.module.scss';
export function ColorPickerPage() {
  const { t } = useTranslation();
  const Reference = colorPickerExamples.example0.Component;
  return (
    <ComponentExampleRuntimeProvider>
      <div className={['review-board', styles.board].join(' ')}>
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>ColorPicker</h1>
            <p>{t('components.colorPicker.overview.description')}</p>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>{t('components.colorPicker.specimen.referenceSpecimen')}</span>
              <code>ColorPicker</code>
            </div>
            <div className="hero-stage">
              <div className={styles.specimen}>
                <Reference />
              </div>
            </div>
            <div className="specimen-caption">
              <span>{t('components.colorPicker.specimen.contract')}</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id="color-picker-1"
          index="01"
          title={t('examples.colorPicker.copy.title0')}
          description={t('examples.colorPicker.copy.description0')}
        >
          <ComponentExample example={colorPickerExamples.example0} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id="color-picker-2"
          index="02"
          title={t('examples.colorPicker.copy.title1')}
          description={t('examples.colorPicker.copy.description1')}
        >
          <ComponentExample example={colorPickerExamples.example1} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
