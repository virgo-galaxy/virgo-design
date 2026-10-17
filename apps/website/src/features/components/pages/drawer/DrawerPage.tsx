import './DrawerPage.scss';

import { Button, Drawer, Switch } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { drawerExamples } from '@/examples/components/drawer/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function DrawerPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="component-page drawer-page" id="drawer-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Drawer</h1>
            <p>{t('components.drawer.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.drawer.facts.placements')}</dt>
                <dd>4</dd>
              </div>
              <div>
                <dt>{t('components.drawer.facts.sizes')}</dt>
                <dd>3</dd>
              </div>
              <div>
                <dt>{t('components.drawer.facts.default')}</dt>
                <dd>{t('components.drawer.facts.right')}</dd>
              </div>
            </dl>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.drawer.specimen.referenceSpecimen')}</span>
              <code>placement=&quot;right&quot;</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage className="drawer-hero-stage">
              <Drawer.Root>
                <Drawer.Trigger>{t('examples.drawer.copy.openSettings')}</Drawer.Trigger>
                <Drawer.Portal>
                  <Drawer.Overlay />
                  <Drawer.Content>
                    <Drawer.Header>
                      <Drawer.Title>{t('examples.drawer.copy.workspaceSettings')}</Drawer.Title>
                      <Drawer.Description>
                        {t('examples.drawer.copy.configurePreferencesForThisWorkspace')}
                      </Drawer.Description>
                    </Drawer.Header>
                    <Drawer.Body>
                      <div className="drawer-setting-row">
                        <span>
                          <strong>{t('examples.drawer.copy.compactNavigation')}</strong>
                          <small>
                            {t('examples.drawer.copy.useLessSpaceForPrimaryNavigation')}
                          </small>
                        </span>
                        <Switch aria-label={t('examples.drawer.copy.compactNavigation')} />
                      </div>
                    </Drawer.Body>
                    <Button.Group
                      layout="custom"
                      render={(groupProps) => <Drawer.Footer {...groupProps} />}
                    >
                      <Drawer.Close>{t('examples.drawer.copy.cancel')}</Drawer.Close>
                      <Drawer.Close variant="primary">
                        {t('examples.drawer.copy.save')}
                      </Drawer.Close>
                    </Button.Group>
                    <Drawer.Close aria-label={t('examples.drawer.copy.closeDrawer')} />
                  </Drawer.Content>
                </Drawer.Portal>
              </Drawer.Root>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.drawer.specimen.dialogBehavior')}</span>
              <span>{t('components.drawer.specimen.edgeMotion')}</span>
              <span>{t('components.drawer.specimen.scrollableBody')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>
        <ArticleSection
          id="drawer-placements"
          index="01"
          title={t('components.drawer.placements.title')}
          description={t('components.drawer.placements.description')}
        >
          <ComponentExample example={drawerExamples.drawerPlacements} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="drawer-sizes"
          index="02"
          title={t('components.drawer.sizes.title')}
          description={t('components.drawer.sizes.description')}
        >
          <ComponentExample example={drawerExamples.drawerSizes} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="drawer-anatomy"
          index="03"
          title={t('components.drawer.anatomy.title')}
          description={t('components.drawer.anatomy.description')}
        >
          <ComponentExample example={drawerExamples.drawerAnatomy} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="drawer-form"
          index="04"
          title={t('components.drawer.form.title')}
          description={t('components.drawer.form.description')}
        >
          <ComponentExample example={drawerExamples.drawerForm} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="drawer-non-modal"
          index="05"
          title={t('components.drawer.nonModal.title')}
          description={t('components.drawer.nonModal.description')}
        >
          <ComponentExample example={drawerExamples.drawerNonModal} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
