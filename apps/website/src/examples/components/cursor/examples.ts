import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import CursorComparisonExample from './CursorComparisonExample';
import cursorComparisonSource from './CursorComparisonExample.tsx?raw';
import CursorCustomExample from './CursorCustomExample';
import cursorCustomSource from './CursorCustomExample.tsx?raw';
import CursorDefaultExample from './CursorDefaultExample';
import cursorDefaultSource from './CursorDefaultExample.tsx?raw';
import CursorFeedbackExample from './CursorFeedbackExample';
import cursorFeedbackSource from './CursorFeedbackExample.tsx?raw';
import CursorScopeExample from './CursorScopeExample';
import cursorScopeSource from './CursorScopeExample.tsx?raw';
import CursorSizesExample from './CursorSizesExample';
import cursorSizesSource from './CursorSizesExample.tsx?raw';
import CursorTooltipExample from './CursorTooltipExample';
import cursorTooltipSource from './CursorTooltipExample.tsx?raw';

import cursorComparisonStyles from './CursorComparisonExample.module.scss?virgo-raw';
import cursorCustomStyles from './CursorCustomExample.module.scss?virgo-raw';
import cursorDefaultStyles from './CursorDefaultExample.module.scss?virgo-raw';
import cursorFeedbackStyles from './CursorFeedbackExample.module.scss?virgo-raw';
import cursorScopeStyles from './CursorScopeExample.module.scss?virgo-raw';
import cursorSizesStyles from './CursorSizesExample.module.scss?virgo-raw';
import cursorTooltipStyles from './CursorTooltipExample.module.scss?virgo-raw';

export const cursorExamples = {
  cursorDefault: {
    id: 'cursor-default',
    title: 'Default Virgo Cursor',
    titleTranslationKey: 'examples.cursor.copy.defaultVirgoCursor',
    description: 'A soft glass pointer with native mouse targeting.',
    descriptionTranslationKey: 'examples.cursor.copy.aSoftGlassPointerWithNativeMouseTargeting',
    Component: CursorDefaultExample,
    source: createExampleSource(cursorDefaultSource),
    styleSource: cursorDefaultStyles,
  },
  cursorSizes: {
    id: 'cursor-sizes',
    title: 'Three sizes',
    titleTranslationKey: 'examples.cursor.copy.threeSizes',
    description:
      'Small 16px, medium 20px by default, and large 24px. Each keeps its pointer hotspot aligned.',
    descriptionTranslationKey: 'examples.cursor.copy.small16pxMedium20pxByDefaultAndLarge24pxEach',
    Component: CursorSizesExample,
    source: createExampleSource(cursorSizesSource),
    styleSource: cursorSizesStyles,
  },
  cursorCustom: {
    id: 'cursor-custom',
    title: 'Custom cursor',
    titleTranslationKey: 'examples.cursor.copy.customCursor',
    description: 'Replace the visual and set its pixel hotspot.',
    descriptionTranslationKey: 'examples.cursor.copy.replaceTheVisualAndSetItsPixelHotspot',
    Component: CursorCustomExample,
    source: createExampleSource(cursorCustomSource),
    styleSource: cursorCustomStyles,
  },
  cursorScope: {
    id: 'cursor-scope',
    title: 'Provider scope',
    titleTranslationKey: 'examples.cursor.copy.providerScope',
    description: 'Nested scopes own their pointer; disabled regions restore the native cursor.',
    descriptionTranslationKey:
      'examples.cursor.copy.nestedScopesOwnTheirPointerDisabledRegionsRestoreTheNative',
    Component: CursorScopeExample,
    source: createExampleSource(cursorScopeSource),
    styleSource: cursorScopeStyles,
  },
  cursorTooltip: {
    id: 'cursor-tooltip',
    title: 'Cursor + Tooltip follow',
    titleTranslationKey: 'examples.cursor.copy.cursorTooltipFollow',
    description: 'The Tooltip consumes mouse coordinates; Tab still anchors to the button.',
    descriptionTranslationKey:
      'examples.cursor.copy.theTooltipConsumesMouseCoordinatesTabStillAnchorsToThe',
    Component: CursorTooltipExample,
    source: createExampleSource(cursorTooltipSource),
    styleSource: cursorTooltipStyles,
  },
  cursorComparison: {
    id: 'cursor-comparison',
    title: 'Element anchor vs pointer follow',
    titleTranslationKey: 'examples.cursor.copy.elementAnchorVsPointerFollow',
    description: 'The same Tooltip composition works in both modes.',
    descriptionTranslationKey: 'examples.cursor.copy.theSameTooltipCompositionWorksInBothModes',
    Component: CursorComparisonExample,
    source: createExampleSource(cursorComparisonSource),
    styleSource: cursorComparisonStyles,
  },
  cursorFeedback: {
    id: 'cursor-feedback',
    title: 'Reusable pointer feedback',
    titleTranslationKey: 'examples.cursor.copy.reusablePointerFeedback',
    description: 'Cursor.Follower and the pointer store also support canvas and editor feedback.',
    descriptionTranslationKey:
      'examples.cursor.copy.cursorFollowerAndThePointerStoreAlsoSupportCanvasAnd',
    Component: CursorFeedbackExample,
    source: createExampleSource(cursorFeedbackSource),
    styleSource: cursorFeedbackStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
