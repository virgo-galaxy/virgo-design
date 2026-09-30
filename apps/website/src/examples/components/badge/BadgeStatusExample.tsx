import { Avatar, Badge, type BadgeIntent } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './BadgeStatusExample.module.scss';

const intents = [
  'default',
  'success',
  'warning',
  'danger',
  'info',
] as const satisfies readonly BadgeIntent[];

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      {intents.map((intent) => (
        <Badge
          key={intent}
          dot
          intent={intent}
          aria-label={t('examples.badge.details.valueStatus', {
            v0: translateExampleText(t, 'badge', String(intent)),
          })}
        >
          <Avatar
            fallback={intent.slice(0, 1).toUpperCase()}
            aria-label={t('examples.badge.details.valueMember', {
              v0: translateExampleText(t, 'badge', String(intent)),
            })}
          />
        </Badge>
      ))}
    </div>
  );
}
