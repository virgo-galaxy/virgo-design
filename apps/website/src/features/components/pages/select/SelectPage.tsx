import { Select, type SelectProps } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { selectExamples } from '@/examples/components/select/examples';

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
  return (
    <Select {...props}>
      <Select.Trigger aria-label={ariaLabel} placeholder={placeholder} />
      <Select.Content>
        {options.map((option) => (
          <Select.Option disabled={option.disabled} key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select.Content>
    </Select>
  );
}

export function SelectPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board" id="select-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <div className="eyebrow-row">
              <span>Component 14</span>
              <span className="version-badge">STABLE · V1.0.0</span>
            </div>
            <h1>Select</h1>
            <p>
              Single-value selection through a custom Virgo listbox. The control keeps the Input
              family sizing and state language while owning disclosure, option, and keyboard
              behavior.
            </p>
            <dl className="component-facts">
              <div>
                <dt>Mode</dt>
                <dd>01</dd>
              </div>
              <div>
                <dt>Sizes</dt>
                <dd>04</dd>
              </div>
              <div>
                <dt>States</dt>
                <dd>06</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>select · medium</code>
            </div>
            <div className="hero-stage">
              <div className="select-demo-width select-demo-width--hero">
                <DemoSelect
                  aria-label="Reference project"
                  defaultValue="design"
                  options={projectOptions}
                />
              </div>
            </div>
            <div className="specimen-caption">
              <span>36px trigger</span>
              <span>Body Medium</span>
              <span>Radius 8</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'select-sizes'}
          index={'01'}
          title={'Sizes'}
          description={
            'Four trigger heights aligned with Input and Button while the dropdown follows the same density.'
          }
        >
          <ComponentExample example={selectExamples.selectSizes} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'select-content'}
          index={'02'}
          title={'Content'}
          description={
            'Placeholder and selected value share the trigger while the selected option remains the source of display text.'
          }
        >
          <ComponentExample example={selectExamples.selectContent} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'select-states'}
          index={'03'}
          title={'States'}
          description={
            'Hover and focus remain live; open keeps the trigger highlighted while disabled and invalid use semantic state colors.'
          }
        >
          <ComponentExample example={selectExamples.selectStates} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'select-options'}
          index={'04'}
          title={'Options & behavior'}
          description={
            'Options support selected, disabled, long-content, pointer, and keyboard interaction without changing the public single-value model.'
          }
        >
          <ComponentExample example={selectExamples.selectDisabledOption} />
          <ComponentExample example={selectExamples.selectLongContent} />
          <ComponentExample example={selectExamples.selectKeyboard} />
        </ArticleSection>
        <footer className="review-footer">
          <span>Virgo Design UI · Select V1.0.0</span>
          <span>Primitive · Tokens · Icons · Metadata</span>
        </footer>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
