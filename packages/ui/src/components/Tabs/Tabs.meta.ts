import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const tabsMetadata = {
  name: 'Tabs',
  package: '@virgo-design/ui',
  category: 'Navigation',
  description:
    'Switches between related content panels with standard tab semantics, keyboard navigation, and line, plain, or card visual treatments.',
  import: "import { Tabs } from '@virgo-design/ui';",
  variants: [
    {
      name: 'line',
      description: 'Default navigation tabs with a sliding brand underline and subtle divider.',
    },
    {
      name: 'plain',
      description:
        'Compact text tabs with separators, hover feedback, and a color-only active state.',
    },
    {
      name: 'card',
      description: 'Connected card surfaces for document-like and editable tab sets.',
    },
  ],
  states: ['inactive', 'active', 'focus-visible', 'disabled'],
  anatomy: [
    {
      name: 'root',
      description: 'Coordinates the controlled or uncontrolled active value.',
    },
    {
      name: 'list',
      description: 'Horizontal tablist containing only the available tabs and visual indicator.',
    },
    {
      name: 'tab',
      description: 'Keyboard-focusable control associated with one content panel.',
    },
    {
      name: 'indicator',
      description: 'Decorative line that tracks the active tab position and width.',
    },
    {
      name: 'separator',
      description: 'Decorative divider between adjacent plain tabs.',
    },
    {
      name: 'panel',
      description: 'Content region controlled by its matching tab.',
    },
    {
      name: 'closeAction',
      description:
        'Optional pointer action that closes one editable tab; the tab itself also supports Delete.',
    },
    {
      name: 'addAction',
      description: 'Optional independent action beside the tablist that adds an editable card tab.',
    },
  ],
  capabilities: {
    controlled: true,
    uncontrolled: true,
    disabledTab: true,
    keyboardNavigation: true,
    automaticActivation: true,
    startAlignment: true,
    centerAlignment: true,
    icons: true,
    slidingIndicator: true,
    plain: true,
    card: true,
    closable: true,
    addable: true,
    reducedMotion: true,
    vertical: false,
  },
  accessibility: [
    'Uses tablist, tab, and tabpanel roles with aria-selected, aria-controls, and aria-labelledby relationships.',
    'ArrowLeft and ArrowRight move focus and automatically activate the adjacent enabled tab.',
    'Home and End move to the first and last enabled tabs.',
    'Disabled tabs remain visible and are skipped by pointer and keyboard selection.',
    'A closable card tab exposes aria-keyshortcuts="Delete" and closes when Delete is pressed.',
    'The add action is an independent control beside the tablist rather than a tablist member.',
    'Only the active panel is displayed while inactive panels remain hidden.',
    'The sliding indicator and tab icons are decorative and hidden from assistive technology.',
    'Plain separators are decorative CSS and do not add extra tab stops or semantic elements.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
