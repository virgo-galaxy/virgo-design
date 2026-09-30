import { Cursor, Tooltip } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { cursorExamples } from '@/examples/components/cursor/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';
import styles from './CursorPage.module.scss';

export function CursorPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board cursor-review" id="cursor-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Cursor</h1>
            <p>{t('components.cursor.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.cursor.facts.input')}</dt>
                <dd>{t('components.cursor.facts.mouseAware')}</dd>
              </div>
              <div>
                <dt>{t('components.cursor.facts.visual')}</dt>
                <dd>{t('components.cursor.facts.yoursOrVirgo')}</dd>
              </div>
              <div>
                <dt>{t('components.cursor.facts.feedback')}</dt>
                <dd>{t('components.cursor.facts.pointerFollow')}</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>{t('components.cursor.specimen.referenceSpecimen')}</span>
              <code>{t('components.cursor.specimen.summary')}</code>
            </div>
            <Cursor.Provider follow={{ tooltip: true }} className="hero-stage">
              <Tooltip>
                <Tooltip.Trigger>{t('examples.cursor.copy.followYourCuriosity')}</Tooltip.Trigger>
                <Tooltip.Content>
                  {t('examples.cursor.copy.aLittleContextCloseBehind')}
                </Tooltip.Content>
              </Tooltip>
            </Cursor.Provider>
            <div className="specimen-caption">
              <span>{t('components.cursor.specimen.scopedInput')}</span>
              <span>{t('components.cursor.specimen.customVisuals')}</span>
              <span>{t('components.cursor.specimen.keyboardReady')}</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        {Object.values(cursorExamples).map((example, index) => (
          <ArticleSection
            key={example.id}
            id={example.id}
            index={String(index + 1).padStart(2, '0')}
            title={t(example.titleTranslationKey)}
            description={t(example.descriptionTranslationKey)}
          >
            <ComponentExample example={example} showCaption={false} />
          </ArticleSection>
        ))}
        <ArticleSection
          id="cursor-lifecycle"
          index="08"
          title={t('components.cursor.lifecycle.title')}
          description={t('components.cursor.lifecycle.description')}
        >
          <p className={styles.lifecycleNote}>{t('components.cursor.lifecycle.note')}</p>
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
