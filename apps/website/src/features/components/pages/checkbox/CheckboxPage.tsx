import { Checkbox } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { checkboxExamples } from '@/examples/components/checkbox/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function CheckboxPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board" id="checkbox-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Checkbox</h1>
            <p>{t('components.checkbox.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.checkbox.facts.selection')}</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>{t('components.checkbox.facts.disabled')}</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>{t('components.checkbox.facts.group')}</dt>
                <dd>{t('components.checkbox.facts.yes')}</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>{t('components.checkbox.specimen.referenceSpecimen')}</span>
              <code>checked</code>
            </div>
            <div className="hero-stage">
              <Checkbox defaultChecked>{t('examples.checkbox.copy.syncChanges')}</Checkbox>
            </div>
            <div className="specimen-caption">
              <span>{t('components.checkbox.specimen.16pxControl')}</span>
              <span>{t('examples.checkbox.copy.bodyMedium')}</span>
              <span>{t('components.checkbox.specimen.radius4')}</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'checkbox-basic'}
          index={'01'}
          title={t('components.checkbox.basic.title')}
          description={t('components.checkbox.basic.description')}
        >
          <ComponentExample example={checkboxExamples.checkboxBasic} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'checkbox-disabled'}
          index={'02'}
          title={t('components.checkbox.disabled.title')}
          description={t('components.checkbox.disabled.description')}
        >
          <ComponentExample example={checkboxExamples.checkboxDisabled} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'checkbox-group'}
          index={'03'}
          title={t('components.checkbox.group.title')}
          description={t('components.checkbox.group.description')}
        >
          <ComponentExample example={checkboxExamples.checkboxGroup} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'checkbox-check-all'}
          index={'04'}
          title={t('components.checkbox.checkAll.title')}
          description={t('components.checkbox.checkAll.description')}
        >
          <ComponentExample example={checkboxExamples.checkboxCheckAll} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
