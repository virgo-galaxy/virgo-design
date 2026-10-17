import './AlertPage.scss';

import { Alert } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { alertExamples } from '@/examples/components/alert/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function AlertPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="component-page alert-page" id="alert-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Alert</h1>
            <p>{t('components.alert.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.alert.facts.intents')}</dt>
                <dd>5</dd>
              </div>
              <div>
                <dt>{t('components.alert.facts.variants')}</dt>
                <dd>2</dd>
              </div>
              <div>
                <dt>{t('components.alert.facts.default')}</dt>
                <dd>{t('components.alert.facts.soft')}</dd>
              </div>
            </dl>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.alert.specimen.referenceSpecimen')}</span>
              <code>intent=&quot;warning&quot;</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage className="alert-hero-stage">
              <Alert intent="warning">
                <Alert.Icon />
                <Alert.Content>
                  <Alert.Title>{t('examples.alert.copy.configurationProblem')}</Alert.Title>
                  <Alert.Description>
                    {t('examples.alert.copy.updateTheSettingsBeforeDeploy')}
                  </Alert.Description>
                </Alert.Content>
              </Alert>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.alert.specimen.persistent')}</span>
              <span>{t('components.alert.specimen.inline')}</span>
              <span>{t('components.alert.specimen.themeAware')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>
        <ArticleSection
          id="alert-intents"
          index="01"
          title={t('components.alert.intents.title')}
          description={t('components.alert.intents.description')}
        >
          <ComponentExample example={alertExamples.alertIntents} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="alert-content"
          index="02"
          title={t('components.alert.content.title')}
          description={t('components.alert.content.description')}
        >
          <ComponentExample example={alertExamples.alertContent} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="alert-action"
          index="03"
          title={t('components.alert.action.title')}
          description={t('components.alert.action.description')}
        >
          <ComponentExample example={alertExamples.alertAction} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="alert-close"
          index="04"
          title={t('components.alert.close.title')}
          description={t('components.alert.close.description')}
        >
          <ComponentExample example={alertExamples.alertClosable} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="alert-custom-icon"
          index="05"
          title={t('components.alert.customIcon.title')}
          description={t('components.alert.customIcon.description')}
        >
          <ComponentExample example={alertExamples.alertCustomIcon} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
