import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { datePickerExamples } from '@/examples/components/date-picker/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';
import styles from './DatePickerPage.module.scss';
export function DatePickerPage() {
  const { t } = useTranslation();
  const Reference = datePickerExamples.example0.Component;
  return (
    <ComponentExampleRuntimeProvider>
      <div className={['review-board', styles.board].join(' ')}>
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>DatePicker</h1>
            <p>{t('components.datePicker.overview.description')}</p>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>{t('components.datePicker.specimen.referenceSpecimen')}</span>
              <code>DatePicker</code>
            </div>
            <div className="hero-stage">
              <div className={styles.specimen}>
                <Reference />
              </div>
            </div>
            <div className="specimen-caption">
              <span>{t('components.datePicker.specimen.contract')}</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id="date-picker-1"
          index="01"
          title={t('examples.datePicker.copy.title0')}
          description={t('examples.datePicker.copy.description0')}
        >
          <ComponentExample example={datePickerExamples.example0} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id="date-picker-2"
          index="02"
          title={t('examples.datePicker.copy.title1')}
          description={t('examples.datePicker.copy.description1')}
        >
          <ComponentExample example={datePickerExamples.example1} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
