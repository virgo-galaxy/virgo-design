import './DockPage.scss';

import { Dock } from '@virgo-design/ui';
import { dockMetadata } from '@virgo-design/ui/metadata';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { dockExamples } from '@/examples/components/dock/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

function DockHero() {
  const { t } = useTranslation();

  return (
    <Dock.Boundary className="hero-stage dock-hero-stage">
      <Dock.Root defaultPlacement={{ edge: 'top', position: 0.5 }}>
        <Dock.Handle aria-label={t('examples.dock.copy.moveReferenceDock')} />
        <Dock.Content>
          <span className="dock-hero-chip">{t('examples.dock.copy.dock')}</span>
        </Dock.Content>
      </Dock.Root>
    </Dock.Boundary>
  );
}

export function DockPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="component-page dock-page" id="dock-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>{dockMetadata.name}</h1>
            <p>{t('components.dock.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.dock.facts.edges')}</dt>
                <dd>04</dd>
              </div>
              <div>
                <dt>{t('components.dock.facts.positioning')}</dt>
                <dd>02</dd>
              </div>
              <div>
                <dt>{t('components.dock.facts.orientations')}</dt>
                <dd>02</dd>
              </div>
              <div>
                <dt>{t('components.dock.facts.storage')}</dt>
                <dd>02</dd>
              </div>
            </dl>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.dock.specimen.referenceSpecimen')}</span>
              <code>{t('components.dock.specimen.summary')}</code>
            </ReferenceSpecimen.Toolbar>
            <DockHero />
            <ReferenceSpecimen.Caption>
              <span>{t('components.dock.specimen.interactionChrome')}</span>
              <span>{t('components.dock.specimen.snapFreePlacement')}</span>
              <span>{t('components.dock.specimen.keyboardRepositioning')}</span>
              <span>{t('components.dock.specimen.startEndHandle')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>
        <ArticleSection
          id="dock-controlled-placement"
          index="01"
          title={t('components.dock.controlledPlacement.title')}
          description={t('components.dock.controlledPlacement.description')}
        >
          <ComponentExample example={dockExamples.dockControlled} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="dock-free-positioning"
          index="02"
          title={t('components.dock.freePositioning.title')}
          description={t('components.dock.freePositioning.description')}
        >
          <ComponentExample example={dockExamples.dockFreePositioning} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="dock-persistent-placement"
          index="03"
          title={t('components.dock.persistentPlacement.title')}
          description={t('components.dock.persistentPlacement.description')}
        >
          <ComponentExample example={dockExamples.dockPersistence} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="dock-handle-position"
          index="04"
          title={t('components.dock.handlePosition.title')}
          description={t('components.dock.handlePosition.description')}
        >
          <ComponentExample example={dockExamples.dockHandlePosition} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="dock-lock-pin"
          index="05"
          title={t('components.dock.lockPin.title')}
          description={t('components.dock.lockPin.description')}
        >
          <ComponentExample example={dockExamples.dockLockPin} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
