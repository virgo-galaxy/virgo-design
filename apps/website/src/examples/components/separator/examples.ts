import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import SeparatorDecorativeExample from './SeparatorDecorativeExample';
import separatorDecorativeStyles from './SeparatorDecorativeExample.module.scss?virgo-raw';
import separatorDecorativeSource from './SeparatorDecorativeExample.tsx?raw';
import SeparatorHorizontalExample from './SeparatorHorizontalExample';
import separatorHorizontalStyles from './SeparatorHorizontalExample.module.scss?virgo-raw';
import separatorHorizontalSource from './SeparatorHorizontalExample.tsx?raw';
import SeparatorLabelExample from './SeparatorLabelExample';
import separatorLabelStyles from './SeparatorLabelExample.module.scss?virgo-raw';
import separatorLabelSource from './SeparatorLabelExample.tsx?raw';
import SeparatorVerticalExample from './SeparatorVerticalExample';
import separatorVerticalStyles from './SeparatorVerticalExample.module.scss?virgo-raw';
import separatorVerticalSource from './SeparatorVerticalExample.tsx?raw';

export const separatorExamples = {
  separatorLabel: {
    id: 'separator-label',
    title: 'A pause with a purpose',
    description: 'Place a short milestone within a horizontal rule using labelAlign.',
    Component: SeparatorLabelExample,
    source: separatorLabelSource,
    styleSource: separatorLabelStyles,
  },
  separatorHorizontal: {
    id: 'separator-horizontal',
    title: 'Horizontal separator',
    description: 'Separate stacked content with explicit semantics.',
    Component: SeparatorHorizontalExample,
    source: separatorHorizontalSource,
    styleSource: separatorHorizontalStyles,
  },
  separatorVertical: {
    id: 'separator-vertical',
    title: 'Vertical separator',
    description: 'Use a flex row to give vertical rules a natural block extent.',
    Component: SeparatorVerticalExample,
    source: separatorVerticalSource,
    styleSource: separatorVerticalStyles,
  },
  separatorDecorative: {
    id: 'separator-decorative',
    title: 'Decorative rule',
    description: 'A visual-only divider can complement existing document structure.',
    Component: SeparatorDecorativeExample,
    source: separatorDecorativeSource,
    styleSource: separatorDecorativeStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
