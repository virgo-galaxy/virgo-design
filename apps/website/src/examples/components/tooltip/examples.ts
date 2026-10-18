import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import TooltipActionExample from './TooltipActionExample';
import tooltipActionSource from './TooltipActionExample.tsx?raw';
import TooltipActivationExample from './TooltipActivationExample';
import tooltipActivationSource from './TooltipActivationExample.tsx?raw';
import TooltipBasicExample from './TooltipBasicExample';
import tooltipBasicSource from './TooltipBasicExample.tsx?raw';
import TooltipCursorExample from './TooltipCursorExample';
import tooltipCursorSource from './TooltipCursorExample.tsx?raw';
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

import tooltipActionStyles from './TooltipActionExample.module.scss?virgo-raw';
import tooltipActivationStyles from './TooltipActivationExample.module.scss?virgo-raw';
import tooltipBasicStyles from './TooltipBasicExample.module.scss?virgo-raw';
import tooltipCursorStyles from './TooltipCursorExample.module.scss?virgo-raw';
import tooltipCustomColorStyles from './TooltipCustomColorExample.module.scss?virgo-raw';
import tooltipDirectionStyles from './TooltipDirectionExample.module.scss?virgo-raw';
import tooltipDisabledStyles from './TooltipDisabledExample.module.scss?virgo-raw';
import tooltipDynamicStyles from './TooltipDynamicExample.module.scss?virgo-raw';
import tooltipInstantStyles from './TooltipInstantExample.module.scss?virgo-raw';
import tooltipPlacementStyles from './TooltipPlacementExample.module.scss?virgo-raw';
import tooltipSizesStyles from './TooltipSizesExample.module.scss?virgo-raw';
import tooltipSmoothStyles from './TooltipSmoothExample.module.scss?virgo-raw';
import tooltipTonesStyles from './TooltipTonesExample.module.scss?virgo-raw';

export const tooltipExamples = {
  tooltipCursor: {
    id: 'tooltip-cursor',
    title: 'Cursor integration',
    titleTranslationKey: 'examples.tooltip.copy.cursorIntegration',
    description:
      'The Cursor Provider owns the custom visual and enables pointer follow; Tooltip keeps its existing API.',
    descriptionTranslationKey:
      'examples.tooltip.copy.theCursorProviderOwnsTheCustomVisualAndEnablesPointer',
    Component: TooltipCursorExample,
    source: createExampleSource(tooltipCursorSource),
    styleSource: tooltipCursorStyles,
  },
  tooltipBasic: {
    id: 'tooltip-basic',
    title: 'Hover and focus',
    titleTranslationKey: 'examples.tooltip.copy.hoverAndFocus',
    description: 'Keyboard focus opens immediately; Escape dismisses the description.',
    descriptionTranslationKey:
      'examples.tooltip.copy.keyboardFocusOpensImmediatelyEscapeDismissesTheDescription',
    Component: TooltipBasicExample,
    source: createExampleSource(tooltipBasicSource),
    styleSource: tooltipBasicStyles,
  },
  tooltipInstant: {
    id: 'tooltip-instant',
    title: 'No hover delay',
    titleTranslationKey: 'examples.tooltip.copy.noHoverDelay',
    description: 'Opt into immediate pointer feedback.',
    descriptionTranslationKey: 'examples.tooltip.copy.optIntoImmediatePointerFeedback',
    Component: TooltipInstantExample,
    source: createExampleSource(tooltipInstantSource),
    styleSource: tooltipInstantStyles,
  },
  tooltipDisabled: {
    id: 'tooltip-disabled',
    title: 'Disabled tooltip',
    titleTranslationKey: 'examples.tooltip.copy.disabledTooltip',
    description: 'Disable only the descriptive overlay.',
    descriptionTranslationKey: 'examples.tooltip.copy.disableOnlyTheDescriptiveOverlay',
    Component: TooltipDisabledExample,
    source: createExampleSource(tooltipDisabledSource),
    styleSource: tooltipDisabledStyles,
  },
  tooltipSmooth: {
    id: 'tooltip-smooth',
    title: 'Smooth handoff',
    titleTranslationKey: 'examples.tooltip.copy.smoothHandoff',
    description: 'Move between the buttons without a repeated hover delay.',
    descriptionTranslationKey:
      'examples.tooltip.copy.moveBetweenTheButtonsWithoutARepeatedHoverDelay',
    Component: TooltipSmoothExample,
    source: createExampleSource(tooltipSmoothSource),
    styleSource: tooltipSmoothStyles,
  },
  tooltipPlacement: {
    id: 'tooltip-placement',
    title: 'Placement and arrow',
    titleTranslationKey: 'examples.tooltip.copy.placementAndArrow',
    description: 'The public arrow option remains independent of placement.',
    descriptionTranslationKey:
      'examples.tooltip.copy.thePublicArrowOptionRemainsIndependentOfPlacement',
    Component: TooltipPlacementExample,
    source: createExampleSource(tooltipPlacementSource),
    styleSource: tooltipPlacementStyles,
  },
  tooltipTones: {
    id: 'tooltip-tones',
    title: 'Semantic tones',
    titleTranslationKey: 'examples.tooltip.copy.semanticTones',
    description: 'Each semantic solid has a corresponding on-solid foreground.',
    descriptionTranslationKey:
      'examples.tooltip.copy.eachSemanticSolidHasACorrespondingOnSolidForeground',
    Component: TooltipTonesExample,
    source: createExampleSource(tooltipTonesSource),
    styleSource: tooltipTonesStyles,
  },
  tooltipCustomColor: {
    id: 'tooltip-custom-color',
    title: 'Custom tone',
    titleTranslationKey: 'examples.tooltip.copy.customTone',
    description: 'Set the background and foreground together using existing palette tokens.',
    descriptionTranslationKey:
      'examples.tooltip.copy.setTheBackgroundAndForegroundTogetherUsingExistingPaletteTokens',
    Component: TooltipCustomColorExample,
    source: createExampleSource(tooltipCustomColorSource),
    styleSource: tooltipCustomColorStyles,
  },
  tooltipAction: {
    id: 'tooltip-action',
    title: 'Real control',
    titleTranslationKey: 'examples.tooltip.copy.realControl',
    description: 'The tooltip describes an action without consuming it.',
    descriptionTranslationKey:
      'examples.tooltip.copy.theTooltipDescribesAnActionWithoutConsumingIt',
    Component: TooltipActionExample,
    source: createExampleSource(tooltipActionSource),
    styleSource: tooltipActionStyles,
  },
  tooltipDynamic: {
    id: 'tooltip-dynamic',
    title: 'Changing content',
    titleTranslationKey: 'examples.tooltip.copy.changingContent',
    description:
      'The description grows while open; the timer is owned and cleaned up by this example.',
    descriptionTranslationKey:
      'examples.tooltip.copy.theDescriptionGrowsWhileOpenTheTimerIsOwnedAnd',
    Component: TooltipDynamicExample,
    source: createExampleSource(tooltipDynamicSource),
    styleSource: tooltipDynamicStyles,
  },
  tooltipDirection: {
    id: 'tooltip-direction',
    title: 'Logical direction',
    titleTranslationKey: 'examples.tooltip.copy.logicalDirection',
    description: 'A local RTL context resolves logical start alignment.',
    descriptionTranslationKey:
      'examples.tooltip.copy.aLocalRtlContextResolvesLogicalStartAlignment',
    Component: TooltipDirectionExample,
    source: createExampleSource(tooltipDirectionSource),
    styleSource: tooltipDirectionStyles,
  },
  tooltipSizes: {
    id: 'tooltip-sizes',
    title: 'Content sizes',
    titleTranslationKey: 'examples.tooltip.copy.contentSizes',
    description: 'Description size is independent of the trigger button size.',
    descriptionTranslationKey:
      'examples.tooltip.copy.descriptionSizeIsIndependentOfTheTriggerButtonSize',
    Component: TooltipSizesExample,
    source: createExampleSource(tooltipSizesSource),
    styleSource: tooltipSizesStyles,
  },
  tooltipActivation: {
    id: 'tooltip-activation',
    title: 'Feedback on activation',
    titleTranslationKey: 'examples.tooltip.copy.feedbackOnActivation',
    description: 'Keep the description open while its action label changes.',
    descriptionTranslationKey:
      'examples.tooltip.copy.keepTheDescriptionOpenWhileItsActionLabelChanges',
    Component: TooltipActivationExample,
    source: createExampleSource(tooltipActivationSource),
    styleSource: tooltipActivationStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
