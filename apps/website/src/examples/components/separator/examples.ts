import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import SeparatorDecorativeExample from './SeparatorDecorativeExample';
import separatorDecorativeSource from './SeparatorDecorativeExample.tsx?raw';
import SeparatorHorizontalExample from './SeparatorHorizontalExample';
import separatorHorizontalSource from './SeparatorHorizontalExample.tsx?raw';
import SeparatorVerticalExample from './SeparatorVerticalExample';
import separatorVerticalSource from './SeparatorVerticalExample.tsx?raw';

export const separatorExamples = {
  separatorHorizontal: {
    id: 'separator-horizontal',
    title: 'Horizontal separator',
    description: 'Separate stacked content with explicit semantics.',
    Component: SeparatorHorizontalExample,
    source: separatorHorizontalSource,
  },
  separatorVertical: {
    id: 'separator-vertical',
    title: 'Vertical separator',
    description: 'Use a flex row to give vertical rules a natural block extent.',
    Component: SeparatorVerticalExample,
    source: separatorVerticalSource,
  },
  separatorDecorative: {
    id: 'separator-decorative',
    title: 'Decorative rule',
    description: 'A visual-only divider can complement existing document structure.',
    Component: SeparatorDecorativeExample,
    source: separatorDecorativeSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
