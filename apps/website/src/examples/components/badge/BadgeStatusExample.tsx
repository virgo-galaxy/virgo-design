import { Avatar, Badge, type BadgeIntent } from '@virgo-design/ui';

const intents = [
  'default',
  'success',
  'warning',
  'danger',
  'info',
] as const satisfies readonly BadgeIntent[];

export default function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 32 }}>
      {intents.map((intent) => (
        <Badge key={intent} dot intent={intent} aria-label={`${intent} status`}>
          <Avatar fallback={intent.slice(0, 1).toUpperCase()} aria-label={`${intent} member`} />
        </Badge>
      ))}
    </div>
  );
}
