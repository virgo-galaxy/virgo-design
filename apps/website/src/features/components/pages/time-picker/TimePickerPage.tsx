import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { timePickerExamples } from '@/examples/components/time-picker/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';
import styles from './TimePickerPage.module.scss';
export function TimePickerPage() {
  const { t } = useTranslation();
  const Reference = timePickerExamples.example0.Component;
  return (
    <ComponentExampleRuntimeProvider>
      <div className={['component-page', styles.board].join(' ')}>
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>TimePicker</h1>
            <p>{t('components.timePicker.overview.description')}</p>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.timePicker.specimen.referenceSpecimen')}</span>
              <code>TimePicker</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage>
              <div className={styles.specimen}>
                <Reference />
              </div>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.timePicker.specimen.contract')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
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
