import './AlertPage.scss';

import { Alert } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { alertExamples } from '@/examples/components/alert/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function AlertPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board alert-review" id="alert-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Alert</h1>
            <p>
              Keep page-level feedback visible in context with semantic intent, structured content,
              and application-owned actions.
            </p>
            <dl className="component-facts">
              <div>
                <dt>Intents</dt>
                <dd>5</dd>
              </div>
              <div>
                <dt>Variants</dt>
                <dd>2</dd>
              </div>
              <div>
                <dt>Default</dt>
                <dd>Soft</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>intent=&quot;warning&quot;</code>
            </div>
            <div className="hero-stage alert-hero-stage">
              <Alert intent="warning">
                <Alert.Icon />
                <Alert.Content>
                  <Alert.Title>Configuration problem</Alert.Title>
                  <Alert.Description>Update the settings before deploy.</Alert.Description>
                </Alert.Content>
              </Alert>
            </div>
            <div className="specimen-caption">
              <span>Persistent</span>
              <span>Inline</span>
              <span>Theme aware</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'alert-intents'}
          index={'01'}
          title={'Semantic intents'}
          description={
            'Status icons reinforce each semantic treatment without making color the only signal.'
          }
        >
          <ComponentExample example={alertExamples.alertIntents} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'alert-content'}
          index={'02'}
          title={'Content structure'}
          description={
            'Use a concise title alone, or add a description when the user needs explanation or recovery guidance.'
          }
        >
          <ComponentExample example={alertExamples.alertContent} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'alert-action'}
          index={'03'}
          title={'Application action'}
          description={
            'Action is a layout slot; the application supplies the control and owns its behavior.'
          }
        >
          <ComponentExample example={alertExamples.alertAction} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'alert-close'}
          index={'04'}
          title={'Closable'}
          description={
            'Close only notifies the owner. This example removes the message in application state and can restore it.'
          }
        >
          <ComponentExample example={alertExamples.alertClosable} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'alert-custom-icon'}
          index={'05'}
          title={'Custom icon'}
          description={
            'Override the status shape for domain context while keeping intent responsible for color.'
          }
        >
          <ComponentExample example={alertExamples.alertCustomIcon} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
