import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import TooltipActionExample from './TooltipActionExample';
import tooltipActionStyles from './TooltipActionExample.module.scss?virgo-raw';
import tooltipActionSource from './TooltipActionExample.tsx?raw';
import TooltipActivationExample from './TooltipActivationExample';
import tooltipActivationStyles from './TooltipActivationExample.module.scss?virgo-raw';
import tooltipActivationSource from './TooltipActivationExample.tsx?raw';
import TooltipBasicExample from './TooltipBasicExample';
import tooltipBasicStyles from './TooltipBasicExample.module.scss?virgo-raw';
import tooltipBasicSource from './TooltipBasicExample.tsx?raw';
import TooltipCursorExample from './TooltipCursorExample';
import tooltipCursorStyles from './TooltipCursorExample.module.scss?virgo-raw';
import tooltipCursorSource from './TooltipCursorExample.tsx?raw';
import TooltipCustomColorExample from './TooltipCustomColorExample';
import tooltipCustomColorStyles from './TooltipCustomColorExample.module.scss?virgo-raw';
import tooltipCustomColorSource from './TooltipCustomColorExample.tsx?raw';
import TooltipDirectionExample from './TooltipDirectionExample';
import tooltipDirectionStyles from './TooltipDirectionExample.module.scss?virgo-raw';
import tooltipDirectionSource from './TooltipDirectionExample.tsx?raw';
import TooltipDisabledExample from './TooltipDisabledExample';
import tooltipDisabledStyles from './TooltipDisabledExample.module.scss?virgo-raw';
import tooltipDisabledSource from './TooltipDisabledExample.tsx?raw';
import TooltipDynamicExample from './TooltipDynamicExample';
import tooltipDynamicStyles from './TooltipDynamicExample.module.scss?virgo-raw';
import tooltipDynamicSource from './TooltipDynamicExample.tsx?raw';
import TooltipInstantExample from './TooltipInstantExample';
import tooltipInstantStyles from './TooltipInstantExample.module.scss?virgo-raw';
import tooltipInstantSource from './TooltipInstantExample.tsx?raw';
import TooltipPlacementExample from './TooltipPlacementExample';
import tooltipPlacementStyles from './TooltipPlacementExample.module.scss?virgo-raw';
import tooltipPlacementSource from './TooltipPlacementExample.tsx?raw';
import TooltipSizesExample from './TooltipSizesExample';
import tooltipSizesStyles from './TooltipSizesExample.module.scss?virgo-raw';
import tooltipSizesSource from './TooltipSizesExample.tsx?raw';
import TooltipSmoothExample from './TooltipSmoothExample';
import tooltipSmoothStyles from './TooltipSmoothExample.module.scss?virgo-raw';
import tooltipSmoothSource from './TooltipSmoothExample.tsx?raw';
import TooltipTonesExample from './TooltipTonesExample';
import tooltipTonesStyles from './TooltipTonesExample.module.scss?virgo-raw';
import tooltipTonesSource from './TooltipTonesExample.tsx?raw';

export const tooltipExamples = {
  tooltipCursor: {
    id: 'tooltip-cursor',
    title: 'Cursor integration',
    description:
      'The Cursor Provider owns the custom visual and enables pointer follow; Tooltip keeps its existing API.',
    Component: TooltipCursorExample,
    source: tooltipCursorSource,
    styleSource: tooltipCursorStyles,
  },
  tooltipBasic: {
    id: 'tooltip-basic',
    title: 'Hover and focus',
    description: 'Keyboard focus opens immediately; Escape dismisses the description.',
    Component: TooltipBasicExample,
    source: tooltipBasicSource,
    styleSource: tooltipBasicStyles,
  },
  tooltipInstant: {
    id: 'tooltip-instant',
    title: 'No hover delay',
    description: 'Opt into immediate pointer feedback.',
    Component: TooltipInstantExample,
    source: tooltipInstantSource,
    styleSource: tooltipInstantStyles,
  },
  tooltipDisabled: {
    id: 'tooltip-disabled',
    title: 'Disabled tooltip',
    description: 'Disable only the descriptive overlay.',
    Component: TooltipDisabledExample,
    source: tooltipDisabledSource,
    styleSource: tooltipDisabledStyles,
  },
  tooltipSmooth: {
    id: 'tooltip-smooth',
    title: 'Smooth handoff',
    description: 'Move between the buttons without a repeated hover delay.',
    Component: TooltipSmoothExample,
    source: tooltipSmoothSource,
    styleSource: tooltipSmoothStyles,
  },
  tooltipPlacement: {
    id: 'tooltip-placement',
    title: 'Placement and arrow',
    description: 'The public arrow option remains independent of placement.',
    Component: TooltipPlacementExample,
    source: tooltipPlacementSource,
    styleSource: tooltipPlacementStyles,
  },
  tooltipTones: {
    id: 'tooltip-tones',
    title: 'Semantic tones',
    description: 'Each semantic solid has a corresponding on-solid foreground.',
    Component: TooltipTonesExample,
    source: tooltipTonesSource,
    styleSource: tooltipTonesStyles,
  },
  tooltipCustomColor: {
    id: 'tooltip-custom-color',
    title: 'Custom tone',
    description: 'Set the background and foreground together using existing palette tokens.',
    Component: TooltipCustomColorExample,
    source: tooltipCustomColorSource,
    styleSource: tooltipCustomColorStyles,
  },
  tooltipAction: {
    id: 'tooltip-action',
    title: 'Real control',
    description: 'The tooltip describes an action without consuming it.',
    Component: TooltipActionExample,
    source: tooltipActionSource,
    styleSource: tooltipActionStyles,
  },
  tooltipDynamic: {
    id: 'tooltip-dynamic',
    title: 'Changing content',
    description:
      'The description grows while open; the timer is owned and cleaned up by this example.',
    Component: TooltipDynamicExample,
    source: tooltipDynamicSource,
    styleSource: tooltipDynamicStyles,
  },
  tooltipDirection: {
    id: 'tooltip-direction',
    title: 'Logical direction',
    description: 'A local RTL context resolves logical start alignment.',
    Component: TooltipDirectionExample,
    source: tooltipDirectionSource,
    styleSource: tooltipDirectionStyles,
  },
  tooltipSizes: {
    id: 'tooltip-sizes',
    title: 'Content sizes',
    description: 'Description size is independent of the trigger button size.',
    Component: TooltipSizesExample,
    source: tooltipSizesSource,
    styleSource: tooltipSizesStyles,
  },
  tooltipActivation: {
    id: 'tooltip-activation',
    title: 'Feedback on activation',
    description: 'Keep the description open while its action label changes.',
    Component: TooltipActivationExample,
    source: tooltipActivationSource,
    styleSource: tooltipActivationStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
