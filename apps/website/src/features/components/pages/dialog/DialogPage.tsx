import './DialogPage.scss';

import { Dialog } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { dialogExamples } from '@/examples/components/dialog/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function DialogPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <article className="review-board dialog-review" id="dialog-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Dialog</h1>
            <p>{t('components.dialog.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.dialog.facts.sizes')}</dt>
                <dd>3</dd>
              </div>
              <div>
                <dt>{t('components.dialog.facts.default')}</dt>
                <dd>{t('components.dialog.facts.modal')}</dd>
              </div>
              <div>
                <dt>{t('components.dialog.facts.style')}</dt>
                <dd>{t('components.dialog.facts.classic')}</dd>
              </div>
            </dl>
          </div>

          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>{t('components.dialog.specimen.referenceSpecimen')}</span>
              <code>size=&quot;md&quot;</code>
            </div>
            <div className="hero-stage dialog-hero-stage">
              <Dialog.Root>
                <Dialog.Trigger>{t('examples.dialog.copy.openDialog')}</Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay />
                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>{t('examples.dialog.copy.inviteCollaborators')}</Dialog.Title>
                      <Dialog.Description>
                        {t('examples.dialog.copy.shareThisWorkspaceWithPeopleOnYourTeam')}
                      </Dialog.Description>
                    </Dialog.Header>
                    <Dialog.Body>
                      {t(
                        'examples.dialog.copy.invitationsUseEachCollaboratorSWorkspaceEmailAddress',
                      )}
                    </Dialog.Body>
                    <Dialog.Footer>
                      <Dialog.Close>{t('examples.dialog.copy.cancel')}</Dialog.Close>
                      <Dialog.Close variant="primary">
                        {t('examples.dialog.copy.continue')}
                      </Dialog.Close>
                    </Dialog.Footer>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
            <div className="specimen-caption">
              <span>{t('components.dialog.specimen.focusTrapped')}</span>
              <span>{t('components.dialog.specimen.escapeReady')}</span>
              <span>{t('components.dialog.specimen.themeAware')}</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>

        <ArticleSection
          id="dialog-sizes"
          index="01"
          title={t('components.dialog.sizes.title')}
          description={t('components.dialog.sizes.description')}
        >
          <ComponentExample example={dialogExamples.sizes} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="dialog-form"
          index="02"
          title={t('components.dialog.form.title')}
          description={t('components.dialog.form.description')}
        >
          <ComponentExample example={dialogExamples.form} showCaption={false} />
        </ArticleSection>
      </article>
    </ComponentExampleRuntimeProvider>
  );
}
