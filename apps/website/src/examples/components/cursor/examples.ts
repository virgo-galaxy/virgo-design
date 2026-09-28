import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import CursorComparisonExample from './CursorComparisonExample';
import cursorComparisonStyles from './CursorComparisonExample.module.scss?virgo-raw';
import cursorComparisonSource from './CursorComparisonExample.tsx?raw';
import CursorCustomExample from './CursorCustomExample';
import cursorCustomStyles from './CursorCustomExample.module.scss?virgo-raw';
import cursorCustomSource from './CursorCustomExample.tsx?raw';
import CursorDefaultExample from './CursorDefaultExample';
import cursorDefaultStyles from './CursorDefaultExample.module.scss?virgo-raw';
import cursorDefaultSource from './CursorDefaultExample.tsx?raw';
import CursorFeedbackExample from './CursorFeedbackExample';
import cursorFeedbackStyles from './CursorFeedbackExample.module.scss?virgo-raw';
import cursorFeedbackSource from './CursorFeedbackExample.tsx?raw';
import CursorScopeExample from './CursorScopeExample';
import cursorScopeStyles from './CursorScopeExample.module.scss?virgo-raw';
import cursorScopeSource from './CursorScopeExample.tsx?raw';
import CursorSizesExample from './CursorSizesExample';
import cursorSizesStyles from './CursorSizesExample.module.scss?virgo-raw';
import cursorSizesSource from './CursorSizesExample.tsx?raw';
import CursorTooltipExample from './CursorTooltipExample';
import cursorTooltipStyles from './CursorTooltipExample.module.scss?virgo-raw';
import cursorTooltipSource from './CursorTooltipExample.tsx?raw';

export const cursorExamples = {
  cursorDefault: {
    id: 'cursor-default',
    title: 'Default Virgo Cursor',
    description: 'A soft glass pointer with native mouse targeting.',
    Component: CursorDefaultExample,
    source: cursorDefaultSource,
    styleSource: cursorDefaultStyles,
  },
  cursorSizes: {
    id: 'cursor-sizes',
    title: 'Three sizes',
    description:
      'Small 16px, medium 20px by default, and large 24px. Each keeps its pointer hotspot aligned.',
    Component: CursorSizesExample,
    source: cursorSizesSource,
    styleSource: cursorSizesStyles,
  },
  cursorCustom: {
    id: 'cursor-custom',
    title: 'Custom cursor',
    description: 'Replace the visual and set its pixel hotspot.',
    Component: CursorCustomExample,
    source: cursorCustomSource,
    styleSource: cursorCustomStyles,
  },
  cursorScope: {
    id: 'cursor-scope',
    title: 'Provider scope',
    description: 'Nested scopes own their pointer; disabled regions restore the native cursor.',
    Component: CursorScopeExample,
    source: cursorScopeSource,
    styleSource: cursorScopeStyles,
  },
  cursorTooltip: {
    id: 'cursor-tooltip',
    title: 'Cursor + Tooltip follow',
    description: 'The Tooltip consumes mouse coordinates; Tab still anchors to the button.',
    Component: CursorTooltipExample,
    source: cursorTooltipSource,
    styleSource: cursorTooltipStyles,
  },
  cursorComparison: {
    id: 'cursor-comparison',
    title: 'Element anchor vs pointer follow',
    description: 'The same Tooltip composition works in both modes.',
    Component: CursorComparisonExample,
    source: cursorComparisonSource,
    styleSource: cursorComparisonStyles,
  },
  cursorFeedback: {
    id: 'cursor-feedback',
    title: 'Reusable pointer feedback',
    description: 'Cursor.Follower and the pointer store also support canvas and editor feedback.',
    Component: CursorFeedbackExample,
    source: cursorFeedbackSource,
    styleSource: cursorFeedbackStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
