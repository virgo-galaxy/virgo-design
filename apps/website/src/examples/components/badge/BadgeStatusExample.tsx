import { Avatar, Badge, type BadgeIntent } from '@virgo-design/ui';

import styles from './BadgeStatusExample.module.scss';

const intents = [
  'default',
  'success',
  'warning',
  'danger',
  'info',
] as const satisfies readonly BadgeIntent[];

export default function App() {
  return (
    <div className={styles.root!}>
      {intents.map((intent) => (
        <Badge key={intent} dot intent={intent} aria-label={`${intent} status`}>
          <Avatar fallback={intent.slice(0, 1).toUpperCase()} aria-label={`${intent} member`} />
        </Badge>
      ))}
    </div>
  );
}
