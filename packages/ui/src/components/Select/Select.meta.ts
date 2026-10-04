import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const selectMetadata = {
  name: 'Select',
  package: '@virgo-design/ui',
  category: 'Forms',
  description:
    'Chooses one or several values through a keyboard-accessible dropdown; Select.Multiple shows checkbox options and removable tags.',
  import: "import { Select } from '@virgo-design/ui';",
  sizes: [
    { name: 'mini', description: '24px trigger height for compact interfaces.' },
    { name: 'small', description: '28px trigger height for dense interfaces.' },
    { name: 'medium', description: '36px trigger height and the default size.' },
    { name: 'large', description: '44px trigger height for prominent controls.' },
  ],
  states: ['default', 'hover', 'focus-visible', 'open', 'disabled', 'invalid'],
  anatomy: [
    { name: 'root', description: 'Owns value, open state, and dropdown coordination.' },
    {
      name: 'Select.Multiple',
      description: 'Owns array selection and keeps the list open while toggling values.',
    },
    {
      name: 'selected-tag',
      description: 'Selected label with an accessible remove button beside the trigger.',
    },
    {
      name: 'trigger',
      description: 'Button that displays the current value and opens the listbox.',
    },
    { name: 'value', description: 'Selected option label or placeholder.' },
    { name: 'indicator', description: 'Chevron that communicates disclosure state.' },
    { name: 'content', description: 'Popup listbox containing available options.' },
    { name: 'option', description: 'Selectable item with a checkbox in multiple mode.' },
    { name: 'check', description: 'Selected-option indicator.' },
  ],
  capabilities: {
    placeholder: true,
    controlledValue: true,
    controlledOpen: true,
    disabledOptions: true,
    keyboardNavigation: true,
    typeahead: true,
    formValue: true,
    multiSelect: true,
    searchable: false,
  },
  accessibility: [
    'Uses a native button trigger with aria-haspopup="listbox" and aria-expanded state.',
    'Moves keyboard focus through enabled options with ArrowUp, ArrowDown, Home, and End.',
    'Toggles the focused option with Enter or Space; multiple mode stays open until Escape or dismissal.',
    'Returns focus to the trigger after selection or Escape.',
    'Marks selected and disabled options with listbox semantics.',
    'Supports an accessible label through aria-label or aria-labelledby on the trigger.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
