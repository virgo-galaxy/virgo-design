import { SearchIcon } from '@virgo-design/icons';
import { Input } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { inputExamples } from '@/examples/components/input/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function InputPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board" id="input-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Input</h1>
            <p>{t('components.input.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.input.facts.controls')}</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>{t('components.input.facts.sizes')}</dt>
                <dd>04</dd>
              </div>
              <div>
                <dt>{t('components.input.facts.states')}</dt>
                <dd>06</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>{t('components.input.specimen.referenceSpecimen')}</span>
              <code>input · medium</code>
            </div>
            <div className="hero-stage">
              <div className="input-demo-width input-demo-width--hero">
                <Input
                  aria-label={t('examples.input.copy.searchComponents')}
                  prefix={<SearchIcon />}
                  placeholder={t('examples.input.copy.searchComponents')}
                  clearable
                />
              </div>
            </div>
            <div className="specimen-caption">
              <span>{t('components.input.specimen.36pxHeight')}</span>
              <span>{t('examples.input.copy.bodyMedium')}</span>
              <span>{t('components.input.specimen.radius8')}</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'input-sizes'}
          index={'01'}
          title={t('components.input.sizes.title')}
          description={t('components.input.sizes.description')}
        >
          <ComponentExample example={inputExamples.inputSizes} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'input-content'}
          index={'02'}
          title={t('components.input.content.title')}
          description={t('components.input.content.description')}
        >
          <ComponentExample example={inputExamples.inputContent} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'input-icons'}
          index={'03'}
          title={t('components.input.icons.title')}
          description={t('components.input.icons.description')}
        >
          <ComponentExample example={inputExamples.inputDecorations} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'input-actions'}
          index={'04'}
          title={t('components.input.actions.title')}
          description={t('components.input.actions.description')}
        >
          <ComponentExample example={inputExamples.inputClearable} />
          <ComponentExample example={inputExamples.inputPassword} />
        </ArticleSection>
        <ArticleSection
          id={'input-states'}
          index={'05'}
          title={t('components.input.states.title')}
          description={t('components.input.states.description')}
        >
          <ComponentExample example={inputExamples.inputStates} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'input-textarea'}
          index={'06'}
          title={t('components.input.textarea.title')}
          description={t('components.input.textarea.description')}
        >
          <ComponentExample example={inputExamples.textareaSizes} />
          <ComponentExample example={inputExamples.textareaStates} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
