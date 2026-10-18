import { Button, Field, Select, Tag } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { useLoginForm } from '@/features/auth/view';
import { useRemoteData } from '@/hooks/async/use-remote-data';
import { businessLabel } from '@/lib/formatting/business-labels';

import { getDemoAccounts } from '../client';

import styles from './DemoAccounts.module.scss';

export function DemoAccounts() {
  const { t, i18n } = useTranslation();
  const { credentials, pending, setCredentials } = useLoginForm();
  const demo = useRemoteData(getDemoAccounts);
  const selected = demo.data?.accounts.find((user) => user.account === credentials.account);

  return (
    <div className={styles.demo}>
      <div className={styles.demoTitle}>
        <strong>{t('auth.login.demoTitle')}</strong>
        <Tag variant="soft">{t('auth.login.demoBadge')}</Tag>
      </div>
      <p>{t('auth.login.demoDescription')}</p>
      {demo.data ? (
        <>
          <Field>
            <Field.Label>{t('auth.login.chooseAccount')}</Field.Label>
            <Select
              value={selected?.id ?? ''}
              disabled={pending}
              onValueChange={(id) => {
                const user = demo.data!.accounts.find((user) => user.id === id);

                if (user) {
                  setCredentials({ account: user.account, password: demo.data!.password });
                }
              }}
            >
              <Select.Trigger placeholder={t('auth.login.chooseAccount')} />
              <Select.Content>
                {demo.data.accounts.map((user) => (
                  <Select.Option key={user.id} value={user.id}>
                    <span>
                      {businessLabel(user.name, i18n.language)} ·{' '}
                      {t(`auth.login.roles.${user.role}`)}
                    </span>
                  </Select.Option>
                ))}
              </Select.Content>
            </Select>
          </Field>
          <div className={styles.demoHint}>
            <code>{demo.data.password}</code>
            <span>{t('auth.login.sharedPassword')}</span>
            <Button
              type="button"
              variant="text"
              size="small"
              onClick={() => setCredentials({ ...credentials, password: demo.data!.password })}
              disabled={pending}
            >
              {t('auth.login.fillPassword')}
            </Button>
          </div>
          {selected ? (
            <p className={styles.identity}>
              {businessLabel(selected.jobTitle, i18n.language)} ·{' '}
              {selected.role === 'admin'
                ? t('auth.login.allProjects')
                : selected.projects
                    .map((project) => businessLabel(project, i18n.language))
                    .join(' / ')}
            </p>
          ) : null}
        </>
      ) : demo.error ? (
        <Button variant="text" onClick={demo.retry}>
          {t('auth.login.retryAccounts')}
        </Button>
      ) : (
        <p role="status">{t('auth.login.loadingAccounts')}</p>
      )}
    </div>
  );
}
