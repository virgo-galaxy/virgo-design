import { Select, type SelectProps } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { selectExamples } from '@/examples/components/select/examples';
import { translateExampleText } from '@/i18n/translate-example-text';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

type DemoOption = {
  value: string;
  label: string;
  disabled?: boolean;
};
const projectOptions = [
  { value: 'design', label: 'Virgo Design' },
  { value: 'docs', label: 'Virgo Cloud Docs' },
  { value: 'nsh', label: 'Neural Semantic Highlighting' },
  { value: 'retro', label: 'Virgo Retro' },
] as const satisfies ReadonlyArray<DemoOption>;
type DemoSelectProps = Omit<SelectProps, 'children'> & {
  'aria-label': string;
  options: readonly DemoOption[];
  placeholder?: string;
};
function DemoSelect({ options, placeholder, 'aria-label': ariaLabel, ...props }: DemoSelectProps) {
  const { t } = useTranslation();

  return (
    <Select {...props}>
      <Select.Trigger aria-label={ariaLabel} placeholder={placeholder} />
      <Select.Content>
        {options.map((option) => (
          <Select.Option disabled={option.disabled} key={option.value} value={option.value}>
            {translateExampleText(t, 'select', option.label)}
          </Select.Option>
        ))}
      </Select.Content>
    </Select>
  );
}

export function SelectPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="component-page" id="select-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Select</h1>
            <p>{t('components.select.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.select.facts.mode')}</dt>
                <dd>01</dd>
              </div>
              <div>
                <dt>{t('components.select.facts.sizes')}</dt>
                <dd>04</dd>
              </div>
              <div>
                <dt>{t('components.select.facts.states')}</dt>
                <dd>06</dd>
              </div>
            </dl>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.select.specimen.referenceSpecimen')}</span>
              <code>select · medium</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage>
              <div className="select-demo-width select-demo-width--hero">
                <DemoSelect
                  aria-label={t('examples.select.copy.referenceProject')}
                  defaultValue="design"
                  options={projectOptions}
                />
              </div>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.select.specimen.36pxTrigger')}</span>
              <span>{t('examples.select.copy.bodyMedium')}</span>
              <span>{t('components.select.specimen.radius8')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>
        <ArticleSection
          id={'select-sizes'}
          index={'01'}
          title={t('components.select.sizes.title')}
          description={t('components.select.sizes.description')}
        >
          <ComponentExample example={selectExamples.selectSizes} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'select-content'}
          index={'02'}
          title={t('components.select.content.title')}
          description={t('components.select.content.description')}
        >
          <ComponentExample example={selectExamples.selectContent} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'select-states'}
          index={'03'}
          title={t('components.select.states.title')}
          description={t('components.select.states.description')}
        >
          <ComponentExample example={selectExamples.selectStates} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'select-options'}
          index={'04'}
          title={t('components.select.options.title')}
          description={t('components.select.options.description')}
        >
          <ComponentExample example={selectExamples.selectDisabledOption} />
          <ComponentExample example={selectExamples.selectLongContent} />
          <ComponentExample example={selectExamples.selectKeyboard} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
