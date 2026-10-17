import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { toolbarExamples } from '@/examples/components/toolbar/examples';
import ToolbarActionsExample from '@/examples/components/toolbar/ToolbarActionsExample';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function ToolbarPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <article className="component-page" id="toolbar-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Toolbar</h1>
            <p>{t('components.toolbar.description')}</p>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.toolbar.referenceSpecimen')}</span>
              <code>small · horizontal</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage>
              <ToolbarActionsExample />
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.toolbar.keyboard')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>

        <ArticleSection
          id="actions"
          index="01"
          title={t('components.toolbar.actions')}
          description={t('components.toolbar.keyboard')}
        >
          <ComponentExample example={toolbarExamples.actions} showCaption={false} />
        </ArticleSection>
      </article>
    </ComponentExampleRuntimeProvider>
  );
}
