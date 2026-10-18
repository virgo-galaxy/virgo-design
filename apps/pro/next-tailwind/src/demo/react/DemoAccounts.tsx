import { Button, Field, Select, Tag } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { useLoginForm } from '@/features/auth/view';
import { useRemoteData } from '@/hooks/async/use-remote-data';
import { businessLabel } from '@/lib/formatting/business-labels';

import { getDemoAccounts } from '../client';

export function DemoAccounts() {
  const { t, i18n } = useTranslation();
  const { credentials, pending, setCredentials } = useLoginForm();
  const demo = useRemoteData(getDemoAccounts);
  const selected = demo.data?.accounts.find((user) => user.account === credentials.account);

  return (
    <div
      className={[
        'pro-demo-accounts-demo [border-top:1px_solid_var(--vd-border-subtle)]',
        '[&_>_p]:text-text-secondary [&_>_p]:[font-size:12px] [&_>_p]:leading-[1.7] [&_>_p]:[margin:10px_0_16px]',
        '[margin-top:28px] [padding-top:24px]',
      ].join(' ')}
    >
      <div className="flex items-center [gap:10px] [font-size:13px]">
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
          <div
            className={[
              '[&_code]:text-text-primary [&_code]:bg-surface-background [&_code]:[padding:4px_6px] [&_code]:[border-radius:4px] [&_>_button]:ml-auto',
              'flex items-center [gap:8px] [margin-top:12px] flex-wrap [font-size:12px] text-text-secondary',
            ].join(' ')}
          >
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
            <p className="[.pro-demo-accounts-demo_&]:mb-0">
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
