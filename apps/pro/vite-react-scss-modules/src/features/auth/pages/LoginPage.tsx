import {
  ArrowRightIcon,
  CheckIcon,
  LockIcon,
  MoonFilledIcon,
  SunFilledIcon,
  UserIcon,
  VirgoDesignIcon,
} from '@virgo-design/icons';
import virgoLogo from '@virgo-design/icons/brands/virgo-design.svg';
import { Button, Field, Form, Input, Progress, Select, Tag, Tooltip } from '@virgo-design/ui';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getDemoAccounts, login } from '@/api/auth';
import type { LoginDto } from '@/api/auth/types';
import { LanguageControl } from '@/components/language-control/LanguageControl';
import { useRemoteData } from '@/hooks/use-remote-data';
import { businessLabel } from '@/lib/demo/labels';
import { isHttpError } from '@/lib/http';
import { useAppPreferences } from '@/preferences';
import { routePaths } from '@/routes';

import styles from './LoginPage.module.scss';

const loadAccounts = (signal: AbortSignal) =>
  import.meta.env.VITE_API_MOCKING === 'true' ? getDemoAccounts(signal) : Promise.resolve(null);

export function LoginPage({
  onLogin,
  expired,
}: {
  onLogin: (session: LoginDto) => void;
  expired: boolean;
}) {
  const { t, i18n } = useTranslation();
  const { appearance, updatePreferences } = useAppPreferences(false);
  const demo = useRemoteData(loadAccounts);

  const [account, setAccount] = useState(
    import.meta.env.VITE_API_MOCKING === 'true' ? 'admin' : '',
  );
  const [password, setPassword] = useState(
    import.meta.env.VITE_API_MOCKING === 'true' ? 'virgo123' : '',
  );
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<'invalidCredentials' | 'failed' | ''>('');

  const selected = demo.data?.accounts.find((user) => user.account === account);

  useEffect(() => {
    document.title = `${t('auth.login.signIn')} · Virgo Design Pro`;
  }, [t]);

  return (
    <Tooltip.Provider>
      <main className={styles.page}>
        <header className={styles.header}>
          <a href={routePaths.root} className={styles.brand}>
            <img src={virgoLogo} alt="" />
            <strong>Virgo Design</strong>
            <Tag intent="brand" variant="soft">
              PRO
            </Tag>
          </a>
          <Button.Group size="medium" gap={8} aria-label={t('auth.login.pageControls')}>
            <LanguageControl />
            <Tooltip>
              <Tooltip.Trigger
                render={(props) => (
                  <Button
                    {...props}
                    iconOnly
                    variant="text"
                    aria-label={appearance === 'light' ? t('app.darkMode') : t('app.lightMode')}
                    onClick={() =>
                      updatePreferences({ appearance: appearance === 'light' ? 'dark' : 'light' })
                    }
                  >
                    {appearance === 'light' ? <MoonFilledIcon /> : <SunFilledIcon />}
                  </Button>
                )}
              />
              <Tooltip.Content>
                {appearance === 'light' ? t('app.darkMode') : t('app.lightMode')}
              </Tooltip.Content>
            </Tooltip>
          </Button.Group>
        </header>
        <div className={styles.layout}>
          <section className={styles.story} aria-labelledby="login-intro">
            <Tag intent="brand" variant="soft">
              {t('auth.login.workspace')}
            </Tag>
            <h2 id="login-intro">
              {t('auth.login.heroTitle')}
              <span>{t('auth.login.heroAccent')}</span>
            </h2>
            <p className={styles.intro}>{t('auth.login.heroDescription')}</p>
            <div className={styles.features}>
              {(['projects', 'collaboration', 'progress'] as const).map((feature) => (
                <div key={feature}>
                  <CheckIcon />
                  <strong>{t(`auth.login.features.${feature}.title`)}</strong>
                  <p>{t(`auth.login.features.${feature}.description`)}</p>
                </div>
              ))}
            </div>
            <div className={styles.preview} aria-hidden="true">
              <div className={styles.previewHeading}>
                <span className={styles.liveDot} />
                <strong>Virgo Studio</strong>
                <span>{t('auth.login.teamWorkspace')}</span>
              </div>
              <div className={styles.metrics}>
                {(
                  [
                    ['4', 'projects'],
                    ['24', 'people'],
                    ['240', 'tasks'],
                  ] as const
                ).map(([value, label]) => (
                  <div key={label}>
                    <strong>{value}</strong>
                    <span>{t(`auth.login.${label}`)}</span>
                  </div>
                ))}
              </div>
              <div className={styles.previewRow}>
                <span className={styles.projectIcon}>01</span>
                <div>
                  <strong>{t('auth.login.sampleTask')}</strong>
                  <span>{t('auth.login.sampleProject')}</span>
                </div>
                <Tag intent="brand" variant="soft">
                  {t('tasks.statusLabels.inProgress')}
                </Tag>
              </div>
              <Progress className={styles.progress} value={66} size="sm" />
              <p className={styles.previewNote}>{t('auth.login.previewNote')}</p>
            </div>
          </section>
          <section className={styles.card} aria-labelledby="login-title">
            <div className={styles.cardHeading}>
              <h1 id="login-title">{t('auth.login.welcome')}</h1>
              <p>{t('auth.login.description')}</p>
            </div>
            {expired ? (
              <p className={styles.notice} role="status">
                {t('auth.login.expired')}
              </p>
            ) : null}
            <Form
              size="large"
              onSubmit={(event) => {
                event.preventDefault();

                if (pending) return;

                setPending(true);
                setError('');

                void login({ account, password })
                  .then(onLogin)
                  .catch((failure) =>
                    setError(
                      isHttpError(failure) && failure.status === 401
                        ? 'invalidCredentials'
                        : 'failed',
                    ),
                  )
                  .finally(() => setPending(false));
              }}
            >
              <Field required>
                <Field.Label htmlFor="login-account">{t('auth.login.account')}</Field.Label>
                <Input
                  id="login-account"
                  name="username"
                  autoComplete="username"
                  prefix={<UserIcon />}
                  value={account}
                  onChange={(event) => {
                    setAccount(event.target.value);
                    setError('');
                  }}
                  disabled={pending}
                  required
                  placeholder={t('auth.login.accountPlaceholder')}
                  size="large"
                />
              </Field>
              <Field required>
                <Field.Label htmlFor="login-password">{t('auth.login.password')}</Field.Label>
                <Input.Password
                  id="login-password"
                  name="password"
                  autoComplete="current-password"
                  prefix={<LockIcon />}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError('');
                  }}
                  disabled={pending}
                  required
                  placeholder={t('auth.login.passwordPlaceholder')}
                  size="large"
                />
              </Field>
              {error ? (
                <p className={styles.error} role="alert">
                  {t(`auth.login.${error}`)}
                </p>
              ) : null}
              <Button
                type="submit"
                size="large"
                className={styles.submit}
                disabled={pending}
                aria-busy={pending}
                trailingIcon={<ArrowRightIcon />}
              >
                {t(pending ? 'auth.login.signingIn' : 'auth.login.signIn')}
              </Button>
            </Form>
            {import.meta.env.VITE_API_MOCKING === 'true' ? (
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
                            setAccount(user.account);
                            setPassword(demo.data!.password);
                            setError('');
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
                        onClick={() => setPassword(demo.data!.password)}
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
            ) : null}
          </section>
        </div>
        <footer className={styles.footer}>
          <span>{t('auth.login.footer')}</span>
          <span className={styles.footerBrand}>
            <VirgoDesignIcon size={16} />
            Virgo Design Pro
          </span>
        </footer>
      </main>
    </Tooltip.Provider>
  );
}
