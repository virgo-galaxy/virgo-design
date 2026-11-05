import { useTranslation } from 'react-i18next';

import { useSourceCopy } from '@/shared/hooks/use-source-copy';
import { SourceCopyButton } from '@/shared/ui/source-copy-button/SourceCopyButton';

import styles from '../home-page.module.scss';

export function CommandCopy({ command, dark = false }: { command: string; dark?: boolean }) {
  const { t } = useTranslation();
  const { state, copy } = useSourceCopy(command);
  const feedback = t(
    state === 'success'
      ? 'home.command.copied'
      : state === 'error'
        ? 'home.command.failed'
        : state === 'pending'
          ? 'home.command.copying'
          : 'home.command.copy',
  );

  return (
    <div className={styles.command} data-command-tone={dark ? 'dark' : 'light'}>
      <code>{command}</code>
      <SourceCopyButton
        label={t('home.command.copy')}
        hint={feedback}
        state={state}
        onCopy={copy}
      />
      <span className={styles.srOnly} role="status">
        {state === 'success' || state === 'error' ? feedback : ''}
      </span>
    </div>
  );
}
