import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const dialogMetadata = {
  name: 'Dialog',
  package: '@virgo-design/ui',
  category: 'Feedback',
  description:
    'Presents focused content or a short task in a modal or non-modal Virgo overlay panel.',
  import: "import { Dialog } from '@virgo-design/ui';",
  variants: [
    { name: 'modal', description: 'Isolates the background and traps focus; enabled by default.' },
    {
      name: 'non-modal',
      description: 'Allows background focus and closes when the user presses outside.',
    },
  ],
  sizes: [
    { name: 'sm', description: 'Compact panel for confirmations and short messages.' },
    { name: 'md', description: 'Default panel for ordinary forms and focused tasks.' },
    { name: 'lg', description: 'Wide panel for structured or information-dense content.' },
  ],
  states: ['closed', 'open', 'focus-visible'],
  anatomy: [
    { name: 'Dialog.Root', description: 'Owns controlled or uncontrolled open state.' },
    {
      name: 'Dialog.Trigger',
      description: 'Virgo Button that opens the dialog, or a custom render trigger.',
    },
    { name: 'Dialog.Portal', description: 'Moves the overlay and panel to the document body.' },
    { name: 'Dialog.Overlay', description: 'Theme-aware modal scrim behind the panel.' },
    { name: 'Dialog.Content', description: 'Accessible dialog panel with a visual size.' },
    { name: 'Dialog.Header', description: 'Header layout for the title and description.' },
    { name: 'Dialog.Title', description: 'Visible heading used as the accessible name.' },
    {
      name: 'Dialog.Description',
      description: 'Optional supporting text used as the accessible description.',
    },
    { name: 'Dialog.Body', description: 'Scrollable primary content region.' },
    { name: 'Dialog.Footer', description: 'Trailing action layout for buttons.' },
    { name: 'Dialog.Close', description: 'Virgo Button that closes and restores focus.' },
  ],
  capabilities: {
    controlled: true,
    uncontrolled: true,
    modal: true,
    nonModal: true,
    portal: true,
    focusTrap: true,
    focusReturn: true,
    outsideDismiss: true,
    escapeDismiss: true,
    customTrigger: true,
    customClose: true,
    animation: false,
  },
  accessibility: [
    'Content uses role="dialog" and modal content uses aria-modal="true".',
    'Title and Description automatically provide aria-labelledby and aria-describedby.',
    'Opening moves focus into the panel; modal Tab navigation remains inside the active dialog.',
    'Escape and outside pointer interaction dismiss the active layer unless their events are cancelled.',
    'Closing returns focus to the trigger, while non-modal outside interaction preserves its destination.',
    'Modal background content is inert while the dialog is open.',
    'Include a visible Dialog.Close or another clear closing action in every dialog.',
  ],
  examples: [
    {
      name: 'Default',
      code: '<Dialog.Root><Dialog.Trigger>Open</Dialog.Trigger><Dialog.Portal><Dialog.Overlay /><Dialog.Content><Dialog.Header><Dialog.Title>Title</Dialog.Title><Dialog.Description>Description</Dialog.Description></Dialog.Header><Dialog.Body>Content</Dialog.Body><Dialog.Footer><Dialog.Close>Cancel</Dialog.Close><Button>Continue</Button></Dialog.Footer></Dialog.Content></Dialog.Portal></Dialog.Root>',
    },
    {
      name: 'Large dialog',
      code: '<Dialog.Content size="lg"><Dialog.Header><Dialog.Title>Project settings</Dialog.Title></Dialog.Header><Dialog.Body>Settings form</Dialog.Body></Dialog.Content>',
    },
    {
      name: 'Controlled form',
      code: '<Dialog.Root open={open} onOpenChange={setOpen}><Dialog.Trigger>Edit profile</Dialog.Trigger><Dialog.Portal><Dialog.Overlay /><Dialog.Content><form onSubmit={save}>...</form></Dialog.Content></Dialog.Portal></Dialog.Root>',
    },
  ],
} as const satisfies ComponentMetadata;
