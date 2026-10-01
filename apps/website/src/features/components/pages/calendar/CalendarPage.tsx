import { Calendar } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { calendarExamples } from '@/examples/components/calendar/examples';
import { useAppLocale } from '@/i18n';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';
import styles from './CalendarPage.module.scss';
export function CalendarPage() {
  const { t } = useTranslation();
  const locale = useAppLocale();
  return (
    <ComponentExampleRuntimeProvider>
      <div className={['review-board', styles.board].join(' ')}>
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Calendar</h1>
            <p>{t('components.calendar.overview.description')}</p>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>{t('components.calendar.specimen.referenceSpecimen')}</span>
              <code>Calendar</code>
            </div>
            <div className="hero-stage">
              <div className={styles.specimen}>
                <Calendar locale={locale} defaultValue="2026-10-06" weekStartsOn={1} />
              </div>
            </div>
            <div className="specimen-caption">
              <span>{t('components.calendar.specimen.contract')}</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id="calendar-1"
          index="01"
          title={t('examples.calendar.copy.title0')}
          description={t('examples.calendar.copy.description0')}
        >
          <ComponentExample example={calendarExamples.example0} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id="calendar-2"
          index="02"
          title={t('examples.calendar.copy.title1')}
          description={t('examples.calendar.copy.description1')}
        >
          <ComponentExample example={calendarExamples.example1} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
