import './PopoverPage.scss';

import { Popover } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { popoverExamples } from '@/examples/components/popover/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function PopoverPage() {
  const { t } = useTranslation();

  const [name] = useState('Example value');
  const [savedName] = useState(name);
  return (
    <ComponentExampleRuntimeProvider>
      <div className="component-page popover-page" id="popover-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Popover</h1>
            <p>{t('components.popover.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.popover.facts.content')}</dt>
                <dd>{t('components.popover.facts.flexible')}</dd>
              </div>
              <div>
                <dt>{t('components.popover.facts.triggers')}</dt>
                <dd>{t('components.popover.facts.2Modes')}</dd>
              </div>
              <div>
                <dt>{t('components.popover.facts.focus')}</dt>
                <dd>{t('components.popover.facts.nonModal')}</dd>
              </div>
            </dl>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.popover.specimen.referenceSpecimen')}</span>
              <code>{t('components.popover.specimen.summary')}</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage className="popover-hero-stage">
              <Popover>
                <Popover.Trigger>{t('examples.popover.copy.workspaceDetails')}</Popover.Trigger>
                <Popover.Content arrow>
                  <div className="popover-demo-content">
                    <strong>{savedName}</strong>
                    <p>{t('examples.popover.copy.aSharedSpaceForYourTeamSDesignsComponentsAnd')}</p>
                    <Popover.Close>{t('examples.popover.copy.gotIt')}</Popover.Close>
                  </div>
                </Popover.Content>
              </Popover>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.popover.specimen.anyContent')}</span>
              <span>{t('components.popover.specimen.keyboardReady')}</span>
              <span>{t('components.popover.specimen.themeAware')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>
        <ArticleSection
          id={'popover-triggers'}
          index={'01'}
          title={t('components.popover.triggers.title')}
          description={t('components.popover.triggers.description')}
        >
          <ComponentExample example={popoverExamples.popoverClick} />
          <ComponentExample example={popoverExamples.popoverHover} />
          <ComponentExample example={popoverExamples.popoverDisabled} />
          <ComponentExample example={popoverExamples.popoverCustomTrigger} />
        </ArticleSection>
        <ArticleSection
          id={'popover-form'}
          index={'02'}
          title={t('components.popover.form.title')}
          description={t('components.popover.form.description')}
        >
          <ComponentExample example={popoverExamples.popoverForm} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'popover-placement'}
          index={'03'}
          title={t('components.popover.placement.title')}
          description={t('components.popover.placement.description')}
        >
          <ComponentExample example={popoverExamples.popoverPlacement} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'popover-nested'}
          index={'04'}
          title={t('components.popover.nested.title')}
          description={t('components.popover.nested.description')}
        >
          <ComponentExample example={popoverExamples.popoverNestedMenu} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
