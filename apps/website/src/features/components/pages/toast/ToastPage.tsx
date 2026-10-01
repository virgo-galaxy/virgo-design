import './ToastPage.scss';

import { Toast } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { toastExamples } from '@/examples/components/toast/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function ToastPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="component-page toast-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Toast</h1>
            <p>{t('components.toast.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.toast.facts.placement')}</dt>
                <dd>06</dd>
              </div>
              <div>
                <dt>{t('components.toast.facts.priority')}</dt>
                <dd>{t('components.toast.facts.politeAssertive')}</dd>
              </div>
              <div>
                <dt>{t('components.toast.facts.actions')}</dt>
                <dd>{t('components.toast.facts.optional')}</dd>
              </div>
            </dl>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.toast.specimen.referenceSpecimen')}</span>
              <code>status · action · dismiss</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage className="toast-hero-stage">
              <Toast.Provider hotkey={[]}>
                <Toast.Root intent="success" duration={0}>
                  <Toast.Title>{t('examples.toast.copy.documentArchived')}</Toast.Title>
                  <Toast.Description>
                    {t('examples.toast.copy.yourDocumentMovedToTheArchive')}
                  </Toast.Description>
                  <Toast.Action>{t('examples.toast.copy.undo')}</Toast.Action>
                  <Toast.Close aria-label={t('examples.toast.copy.dismissNotification')} />
                </Toast.Root>
                <Toast.Viewport placement="top-start" className="toast-hero-viewport" />
              </Toast.Provider>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.toast.specimen.nonBlockingFeedback')}</span>
              <span>{t('components.toast.specimen.semanticStatus')}</span>
              <span>{t('components.toast.specimen.actionableDismissal')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>
        <ArticleSection
          id={'toast-status'}
          index={'01'}
          title={t('components.toast.status.title')}
          description={t('components.toast.status.description')}
        >
          <ComponentExample example={toastExamples.toastIntents} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'toast-stack'}
          index={'02'}
          title={t('components.toast.stack.title')}
          description={t('components.toast.stack.description')}
        >
          <ComponentExample example={toastExamples.toastUndo} />
          <ComponentExample example={toastExamples.toastStack} />
        </ArticleSection>
        <ArticleSection
          id={'toast-placement'}
          index={'03'}
          title={t('components.toast.placement.title')}
          description={t('components.toast.placement.description')}
        >
          <ComponentExample example={toastExamples.toastPlacement} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
