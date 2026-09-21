import type { ComponentMetadata } from '../metadata/ComponentMetadata';

export const selectMetadata = {
  name: 'Select',
  package: '@virgo-design/ui',
  category: 'Forms',
  description:
    'Chooses one value from a list of options through a keyboard-accessible Virgo dropdown control.',
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
      name: 'trigger',
      description: 'Button that displays the current value and opens the listbox.',
    },
    { name: 'value', description: 'Selected option label or placeholder.' },
    { name: 'indicator', description: 'Chevron that communicates disclosure state.' },
    { name: 'content', description: 'Popup listbox containing available options.' },
    { name: 'option', description: 'Selectable single-value item inside the listbox.' },
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
    multiSelect: false,
    searchable: false,
  },
  accessibility: [
    'Uses a native button trigger with aria-haspopup="listbox" and aria-expanded state.',
    'Moves keyboard focus through enabled options with ArrowUp, ArrowDown, Home, and End.',
    'Selects the focused option with Enter or Space and closes with Escape.',
    'Returns focus to the trigger after selection or Escape.',
    'Marks selected and disabled options with listbox semantics.',
    'Supports an accessible label through aria-label or aria-labelledby on the trigger.',
  ],
  examples: [
    {
      name: 'Basic selection',
      code: `<Select><Select.Trigger aria-label="Project" placeholder="Choose a project" /><Select.Content><Select.Option value="design">Virgo Design</Select.Option><Select.Option value="docs">Virgo Cloud Docs</Select.Option></Select.Content></Select>`,
    },
    {
      name: 'Default value',
      code: `<Select defaultValue="design"><Select.Trigger aria-label="Project" /><Select.Content><Select.Option value="design">Virgo Design</Select.Option><Select.Option value="docs">Virgo Cloud Docs</Select.Option></Select.Content></Select>`,
    },
    {
      name: 'Invalid selection',
      code: `<Select invalid><Select.Trigger aria-label="Environment" placeholder="Choose an environment" /><Select.Content><Select.Option value="preview">Preview</Select.Option></Select.Content></Select>`,
    },
  ],
} as const satisfies ComponentMetadata;
