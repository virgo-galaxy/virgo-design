import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import TooltipActionExample from './TooltipActionExample';
import tooltipActionSource from './TooltipActionExample.tsx?raw';
import TooltipActivationExample from './TooltipActivationExample';
import tooltipActivationSource from './TooltipActivationExample.tsx?raw';
import TooltipBasicExample from './TooltipBasicExample';
import tooltipBasicSource from './TooltipBasicExample.tsx?raw';
import TooltipCustomColorExample from './TooltipCustomColorExample';
import tooltipCustomColorSource from './TooltipCustomColorExample.tsx?raw';
import TooltipDirectionExample from './TooltipDirectionExample';
import tooltipDirectionSource from './TooltipDirectionExample.tsx?raw';
import TooltipDisabledExample from './TooltipDisabledExample';
import tooltipDisabledSource from './TooltipDisabledExample.tsx?raw';
import TooltipDynamicExample from './TooltipDynamicExample';
import tooltipDynamicSource from './TooltipDynamicExample.tsx?raw';
import TooltipInstantExample from './TooltipInstantExample';
import tooltipInstantSource from './TooltipInstantExample.tsx?raw';
import TooltipPlacementExample from './TooltipPlacementExample';
import tooltipPlacementSource from './TooltipPlacementExample.tsx?raw';
import TooltipSizesExample from './TooltipSizesExample';
import tooltipSizesSource from './TooltipSizesExample.tsx?raw';
import TooltipSmoothExample from './TooltipSmoothExample';
import tooltipSmoothSource from './TooltipSmoothExample.tsx?raw';
import TooltipTonesExample from './TooltipTonesExample';
import tooltipTonesSource from './TooltipTonesExample.tsx?raw';

export const tooltipExamples = {
  tooltipBasic: {
    id: 'tooltip-basic',
    title: 'Hover and focus',
    description: 'Keyboard focus opens immediately; Escape dismisses the description.',
    Component: TooltipBasicExample,
    source: tooltipBasicSource,
  },
  tooltipInstant: {
    id: 'tooltip-instant',
    title: 'No hover delay',
    description: 'Opt into immediate pointer feedback.',
    Component: TooltipInstantExample,
    source: tooltipInstantSource,
  },
  tooltipDisabled: {
    id: 'tooltip-disabled',
    title: 'Disabled tooltip',
    description: 'Disable only the descriptive overlay.',
    Component: TooltipDisabledExample,
    source: tooltipDisabledSource,
  },
  tooltipSmooth: {
    id: 'tooltip-smooth',
    title: 'Smooth handoff',
    description: 'Move between the buttons without a repeated hover delay.',
    Component: TooltipSmoothExample,
    source: tooltipSmoothSource,
  },
  tooltipPlacement: {
    id: 'tooltip-placement',
    title: 'Placement and arrow',
    description: 'The public arrow option remains independent of placement.',
    Component: TooltipPlacementExample,
    source: tooltipPlacementSource,
  },
  tooltipTones: {
    id: 'tooltip-tones',
    title: 'Semantic tones',
    description: 'Each semantic solid has a corresponding on-solid foreground.',
    Component: TooltipTonesExample,
    source: tooltipTonesSource,
  },
  tooltipCustomColor: {
    id: 'tooltip-custom-color',
    title: 'Custom tone',
    description: 'Set the background and foreground together using existing palette tokens.',
    Component: TooltipCustomColorExample,
    source: tooltipCustomColorSource,
  },
  tooltipAction: {
    id: 'tooltip-action',
    title: 'Real control',
    description: 'The tooltip describes an action without consuming it.',
    Component: TooltipActionExample,
    source: tooltipActionSource,
  },
  tooltipDynamic: {
    id: 'tooltip-dynamic',
    title: 'Changing content',
    description:
      'The description grows while open; the timer is owned and cleaned up by this example.',
    Component: TooltipDynamicExample,
    source: tooltipDynamicSource,
  },
  tooltipDirection: {
    id: 'tooltip-direction',
    title: 'Logical direction',
    description: 'A local RTL context resolves logical start alignment.',
    Component: TooltipDirectionExample,
    source: tooltipDirectionSource,
  },
  tooltipSizes: {
    id: 'tooltip-sizes',
    title: 'Content sizes',
    description: 'Description size is independent of the trigger button size.',
    Component: TooltipSizesExample,
    source: tooltipSizesSource,
  },
  tooltipActivation: {
    id: 'tooltip-activation',
    title: 'Feedback on activation',
    description: 'Keep the description open while its action label changes.',
    Component: TooltipActivationExample,
    source: tooltipActivationSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
