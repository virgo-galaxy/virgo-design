import { Calendar } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { calendarExamples } from '@/examples/components/calendar/examples';
import { useAppLocale } from '@/i18n';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';
import styles from './CalendarPage.module.scss';
export function CalendarPage() {
  const { t } = useTranslation();
  const locale = useAppLocale();
  return (
    <ComponentExampleRuntimeProvider>
      <div className={['component-page', styles.board].join(' ')}>
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Calendar</h1>
            <p>{t('components.calendar.overview.description')}</p>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.calendar.specimen.referenceSpecimen')}</span>
              <code>Calendar</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage>
              <div className={styles.specimen}>
                <Calendar locale={locale} defaultValue="2026-10-06" weekStartsOn={1} />
              </div>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.calendar.specimen.contract')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>
        <ArticleSection
          id="calendar-1"
          index="01"
          title={t('examples.calendar.copy.title2')}
          description={t('examples.calendar.copy.description2')}
        >
          <ComponentExample example={calendarExamples.example2} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id="calendar-2"
          index="02"
          title={t('examples.calendar.copy.title0')}
          description={t('examples.calendar.copy.description0')}
        >
          <ComponentExample example={calendarExamples.example0} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id="calendar-3"
          index="03"
          title={t('examples.calendar.copy.title1')}
          description={t('examples.calendar.copy.description1')}
        >
          <ComponentExample example={calendarExamples.example1} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
