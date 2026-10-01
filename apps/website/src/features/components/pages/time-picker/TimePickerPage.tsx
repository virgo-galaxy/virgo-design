import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { timePickerExamples } from '@/examples/components/time-picker/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';
import styles from './TimePickerPage.module.scss';
export function TimePickerPage() {
  const { t } = useTranslation();
  const Reference = timePickerExamples.example0.Component;
  return (
    <ComponentExampleRuntimeProvider>
      <div className={['review-board', styles.board].join(' ')}>
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>TimePicker</h1>
            <p>{t('components.timePicker.overview.description')}</p>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>{t('components.timePicker.specimen.referenceSpecimen')}</span>
              <code>TimePicker</code>
            </div>
            <div className="hero-stage">
              <div className={styles.specimen}>
                <Reference />
              </div>
            </div>
            <div className="specimen-caption">
              <span>{t('components.timePicker.specimen.contract')}</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id="time-picker-1"
          index="01"
          title={t('examples.timePicker.copy.title0')}
          description={t('examples.timePicker.copy.description0')}
        >
          <ComponentExample example={timePickerExamples.example0} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id="time-picker-2"
          index="02"
          title={t('examples.timePicker.copy.title1')}
          description={t('examples.timePicker.copy.description1')}
        >
          <ComponentExample example={timePickerExamples.example1} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
