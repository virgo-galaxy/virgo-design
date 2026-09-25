import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const alertMetadata = {
  name: 'Alert',
  package: '@virgo-design/ui',
  category: 'Feedback',
  description:
    'Displays persistent, inline page or form feedback with semantic intent, structured content, and optional owner-controlled actions.',
  import: "import { Alert } from '@virgo-design/ui';",
  variants: [
    { name: 'soft', description: 'Default semantic tinted surface with a matching border.' },
    { name: 'outline', description: 'Transparent surface with a semantic border.' },
  ],
  intents: [
    { name: 'default', description: 'Neutral, non-urgent persistent information.' },
    { name: 'info', description: 'Informational guidance or system context.' },
    { name: 'success', description: 'Successful completion or healthy state.' },
    { name: 'warning', description: 'Important condition requiring attention.' },
    { name: 'error', description: 'Failure or invalid state requiring correction.' },
  ],
  states: ['default', 'with-action', 'closable', 'focus-visible', 'disabled-close'],
  anatomy: [
    { name: 'Alert.Root', description: 'Persistent inline semantic feedback container.' },
    {
      name: 'Alert.Icon',
      description: 'Decorative status icon resolved from Root intent or icon override.',
    },
    { name: 'Alert.Content', description: 'Flexible text content region.' },
    { name: 'Alert.Title', description: 'Primary feedback message.' },
    { name: 'Alert.Description', description: 'Optional supporting explanation.' },
    { name: 'Alert.Action', description: 'Slot for application-owned controls.' },
    { name: 'Alert.Close', description: 'Optional notification-only close control.' },
  ],
  capabilities: {
    persistent: true,
    inline: true,
    statusIcon: true,
    customIcon: true,
    hideIcon: true,
    actionSlot: true,
    closable: true,
    selfRemoving: false,
    portal: false,
    autoDismiss: false,
  },
  accessibility: [
    'Default, info, and success intents use role="status" for polite feedback.',
    'Warning and error intents use role="alert" for urgent feedback.',
    'Consumers can override role and native aria-live when urgency differs from the intent default.',
    'Status icons are decorative; intent is also communicated by visible content and live-region semantics.',
    'Alert.Close is a native button named “Close alert” by default and only notifies the owner.',
  ],
  examples: [
    {
      name: 'Warning',
      code: '<Alert intent="warning"><Alert.Icon /><Alert.Content><Alert.Title>Configuration problem</Alert.Title><Alert.Description>Update the settings before deploy.</Alert.Description></Alert.Content></Alert>',
    },
    {
      name: 'Action',
      code: '<Alert intent="error"><Alert.Icon /><Alert.Content><Alert.Title>Deployment failed</Alert.Title></Alert.Content><Alert.Action><Button size="small">Retry</Button></Alert.Action></Alert>',
    },
    {
      name: 'Closable',
      code: '<Alert><Alert.Content><Alert.Description>Persistent feedback</Alert.Description></Alert.Content><Alert.Close onClick={dismiss} /></Alert>',
    },
  ],
} as const satisfies ComponentMetadata;
