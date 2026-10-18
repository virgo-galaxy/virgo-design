import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import InputClearableExample from './InputClearableExample';
import inputClearableSource from './InputClearableExample.tsx?raw';
import InputContentExample from './InputContentExample';
import inputContentSource from './InputContentExample.tsx?raw';
import InputDecorationsExample from './InputDecorationsExample';
import inputDecorationsSource from './InputDecorationsExample.tsx?raw';
import InputPasswordExample from './InputPasswordExample';
import inputPasswordSource from './InputPasswordExample.tsx?raw';
import InputSizesExample from './InputSizesExample';
import inputSizesSource from './InputSizesExample.tsx?raw';
import InputStatesExample from './InputStatesExample';
import inputStatesSource from './InputStatesExample.tsx?raw';
import TextareaSizesExample from './TextareaSizesExample';
import textareaSizesSource from './TextareaSizesExample.tsx?raw';
import TextareaStatesExample from './TextareaStatesExample';
import textareaStatesSource from './TextareaStatesExample.tsx?raw';

import inputClearableStyles from './InputClearableExample.module.scss?virgo-raw';
import inputContentStyles from './InputContentExample.module.scss?virgo-raw';
import inputDecorationsStyles from './InputDecorationsExample.module.scss?virgo-raw';
import inputPasswordStyles from './InputPasswordExample.module.scss?virgo-raw';
import inputSizesStyles from './InputSizesExample.module.scss?virgo-raw';
import inputStatesStyles from './InputStatesExample.module.scss?virgo-raw';
import textareaSizesStyles from './TextareaSizesExample.module.scss?virgo-raw';
import textareaStatesStyles from './TextareaStatesExample.module.scss?virgo-raw';

export const inputExamples = {
  inputSizes: {
    id: 'input-sizes',
    title: 'Input sizes',
    titleTranslationKey: 'examples.input.copy.inputSizes',
    description: 'Four control heights share one text-entry contract.',
    descriptionTranslationKey: 'examples.input.copy.fourControlHeightsShareOneTextEntryContract',
    Component: InputSizesExample,
    source: createExampleSource(inputSizesSource),
    styleSource: inputSizesStyles,
  },
  inputContent: {
    id: 'input-content',
    title: 'Placeholder and value',
    titleTranslationKey: 'examples.input.copy.placeholderAndValue',
    description: 'Empty hints and editable default values use native input semantics.',
    descriptionTranslationKey:
      'examples.input.copy.emptyHintsAndEditableDefaultValuesUseNativeInputSemantics',
    Component: InputContentExample,
    source: createExampleSource(inputContentSource),
    styleSource: inputContentStyles,
  },
  inputDecorations: {
    id: 'input-decorations',
    title: 'Prefix and suffix',
    titleTranslationKey: 'examples.input.copy.prefixAndSuffix',
    description:
      'Use text, units, or icons as decorative prefixes and suffixes. Include meaningful units in the accessible label.',
    descriptionTranslationKey: 'examples.input.copy.decorativeIconsStayOutsideTheTabOrder',
    Component: InputDecorationsExample,
    source: createExampleSource(inputDecorationsSource),
    styleSource: inputDecorationsStyles,
  },
  inputClearable: {
    id: 'input-clearable',
    title: 'Clearable input',
    titleTranslationKey: 'examples.input.copy.clearableInput',
    description: 'Clear the current value while retaining typing focus.',
    descriptionTranslationKey: 'examples.input.copy.clearTheCurrentValueWhileRetainingTypingFocus',
    Component: InputClearableExample,
    source: createExampleSource(inputClearableSource),
    styleSource: inputClearableStyles,
  },
  inputPassword: {
    id: 'input-password',
    title: 'Password reveal',
    titleTranslationKey: 'examples.input.copy.passwordReveal',
    description: 'Toggle visibility without replacing the entered value.',
    descriptionTranslationKey:
      'examples.input.copy.toggleVisibilityWithoutReplacingTheEnteredValue',
    Component: InputPasswordExample,
    source: createExampleSource(inputPasswordSource),
    styleSource: inputPasswordStyles,
  },
  inputStates: {
    id: 'input-states',
    title: 'Input states',
    titleTranslationKey: 'examples.input.copy.inputStates',
    description: 'Default, disabled, read-only, and invalid states share native text semantics.',
    descriptionTranslationKey:
      'examples.input.copy.defaultDisabledReadOnlyAndInvalidStatesShareNativeText',
    Component: InputStatesExample,
    source: createExampleSource(inputStatesSource),
    styleSource: inputStatesStyles,
  },
  textareaSizes: {
    id: 'textarea-sizes',
    title: 'Textarea sizes',
    titleTranslationKey: 'examples.input.copy.textareaSizes',
    description: 'Density and minimum height vary; rows still describe content.',
    descriptionTranslationKey:
      'examples.input.copy.densityAndMinimumHeightVaryRowsStillDescribeContent',
    Component: TextareaSizesExample,
    source: createExampleSource(textareaSizesSource),
    styleSource: textareaSizesStyles,
  },
  textareaStates: {
    id: 'textarea-states',
    title: 'Textarea states',
    titleTranslationKey: 'examples.input.copy.textareaStates',
    description: 'Multiline content reuses the Input family’s state language.',
    descriptionTranslationKey:
      'examples.input.copy.multilineContentReusesTheInputFamilySStateLanguage',
    Component: TextareaStatesExample,
    source: createExampleSource(textareaStatesSource),
    styleSource: textareaStatesStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
