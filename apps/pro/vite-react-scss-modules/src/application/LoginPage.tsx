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
import { Button, Field, Input, Select, Tag, Tooltip } from '@virgo-design/ui';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getDemoAccounts, login, type LoginDto } from '@/api/auth';
import { useProSettings } from '@/components/global-settings/useProSettings';
import { LanguageControl } from '@/components/language-control/LanguageControl';
import { rememberAppearance } from '@/lib/appearance';
import { businessLabel } from '@/lib/demo/labels';
import { isHttpError } from '@/lib/http/error';

import styles from './LoginPage.module.scss';
import { useRemoteData } from './use-remote-data';
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
  const { theme, updateSettings } = useProSettings(false);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    rememberAppearance(theme);
  }, [theme]);
  const demo = useRemoteData(loadAccounts);
  const [account, setAccount] = useState(
    import.meta.env.VITE_API_MOCKING === 'true' ? 'admin' : '',
  );
  const [password, setPassword] = useState(
    import.meta.env.VITE_API_MOCKING === 'true' ? 'virgo123' : '',
  );
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const selected = demo.data?.accounts.find((user) => user.account === account);
  useEffect(() => {
    document.title = `${t('app.login.signIn')} · Virgo Design Pro`;
  }, [t]);
  return (
    <Tooltip.Provider>
      <main className={styles.page}>
        <header className={styles.header}>
          <a href="/" className={styles.brand}>
            <img src={virgoLogo} alt="" />
            <strong>Virgo Design</strong>
            <Tag intent="brand" variant="soft">
              PRO
            </Tag>
          </a>
          <Button.Group size="medium" gap={8} aria-label={t('app.login.pageControls')}>
            <LanguageControl />
            <Tooltip>
              <Tooltip.Trigger
                render={(props) => (
                  <Button
                    {...props}
                    iconOnly
                    variant="text"
                    aria-label={theme === 'light' ? t('app.darkMode') : t('app.lightMode')}
                    onClick={() =>
                      updateSettings({ appearance: theme === 'light' ? 'dark' : 'light' })
                    }
                  >
                    {theme === 'light' ? <MoonFilledIcon /> : <SunFilledIcon />}
                  </Button>
                )}
              />
              <Tooltip.Content>
                {theme === 'light' ? t('app.darkMode') : t('app.lightMode')}
              </Tooltip.Content>
            </Tooltip>
          </Button.Group>
        </header>
        <div className={styles.layout}>
          <section className={styles.story} aria-labelledby="login-intro">
            <Tag intent="brand" variant="soft">
              {t('app.login.workspace')}
            </Tag>
            <h1 id="login-intro">
              {t('app.login.heroTitle')}
              <span>{t('app.login.heroAccent')}</span>
            </h1>
            <p className={styles.intro}>{t('app.login.heroDescription')}</p>
            <div className={styles.features}>
              {(['projects', 'collaboration', 'progress'] as const).map((feature) => (
                <div key={feature}>
                  <CheckIcon />
                  <strong>{t(`app.login.features.${feature}.title`)}</strong>
                  <p>{t(`app.login.features.${feature}.description`)}</p>
                </div>
              ))}
            </div>
            <div className={styles.preview} aria-hidden="true">
              <div className={styles.previewHeading}>
                <span className={styles.liveDot} />
                <strong>Virgo Studio</strong>
                <span>{t('app.login.teamWorkspace')}</span>
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
                    <span>{t(`app.login.${label}`)}</span>
                  </div>
                ))}
              </div>
              <div className={styles.previewRow}>
                <span className={styles.projectIcon}>01</span>
                <div>
                  <strong>{t('app.login.sampleTask')}</strong>
                  <span>{t('app.login.sampleProject')}</span>
                </div>
                <Tag intent="brand" variant="soft">
                  {t('tasks.statusLabels.inProgress')}
                </Tag>
              </div>
              <div className={styles.progress}>
                <span />
              </div>
              <p className={styles.previewNote}>{t('app.login.previewNote')}</p>
            </div>
          </section>
          <section className={styles.card} aria-labelledby="login-title">
            <div className={styles.cardHeading}>
              <h2 id="login-title">{t('app.login.welcome')}</h2>
              <p>{t('app.login.description')}</p>
            </div>
            {expired ? (
              <p className={styles.notice} role="status">
                {t('app.login.expired')}
              </p>
            ) : null}
            <form
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
                        ? t('app.login.invalidCredentials')
                        : t('app.login.failed'),
                    ),
                  )
                  .finally(() => setPending(false));
              }}
            >
              <Field required>
                <Field.Label htmlFor="login-account">{t('app.login.account')}</Field.Label>
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
                  placeholder={t('app.login.accountPlaceholder')}
                  size="large"
                />
              </Field>
              <Field required>
                <Field.Label htmlFor="login-password">{t('app.login.password')}</Field.Label>
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
                  placeholder={t('app.login.passwordPlaceholder')}
                  size="large"
                />
              </Field>
              {error ? (
                <p className={styles.error} role="alert">
                  {error}
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
                {t(pending ? 'app.login.signingIn' : 'app.login.signIn')}
              </Button>
            </form>
            {import.meta.env.VITE_API_MOCKING === 'true' ? (
              <div className={styles.demo}>
                <div className={styles.demoTitle}>
                  <strong>{t('app.login.demoTitle')}</strong>
                  <Tag variant="soft">{t('app.login.demoBadge')}</Tag>
                </div>
                <p>{t('app.login.demoDescription')}</p>
                {demo.data ? (
                  <>
                    <Field>
                      <Field.Label>{t('app.login.chooseAccount')}</Field.Label>
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
                        <Select.Trigger placeholder={t('app.login.chooseAccount')} />
                        <Select.Content>
                          {demo.data.accounts.map((user) => (
                            <Select.Option key={user.id} value={user.id}>
                              <span>
                                {businessLabel(user.name, i18n.language)} ·{' '}
                                {t(`app.login.roles.${user.role}`)}
                              </span>
                            </Select.Option>
                          ))}
                        </Select.Content>
                      </Select>
                    </Field>
                    <div className={styles.demoHint}>
                      <code>{demo.data.password}</code>
                      <span>{t('app.login.sharedPassword')}</span>
                      <Button
                        type="button"
                        variant="text"
                        size="small"
                        onClick={() => setPassword(demo.data!.password)}
                        disabled={pending}
                      >
                        {t('app.login.fillPassword')}
                      </Button>
                    </div>
                    {selected ? (
                      <p className={styles.identity}>
                        {businessLabel(selected.jobTitle, i18n.language)} ·{' '}
                        {selected.role === 'admin'
                          ? t('app.login.allProjects')
                          : selected.projects
                              .map((project) => businessLabel(project, i18n.language))
                              .join(' / ')}
                      </p>
                    ) : null}
                  </>
                ) : demo.error ? (
                  <Button variant="text" onClick={demo.retry}>
                    {t('app.login.retryAccounts')}
                  </Button>
                ) : (
                  <p role="status">{t('app.login.loadingAccounts')}</p>
                )}
              </div>
            ) : null}
          </section>
        </div>
        <footer className={styles.footer}>
          <span>{t('app.login.footer')}</span>
          <span className={styles.footerBrand}>
            <VirgoDesignIcon size={16} />
            Virgo Design Pro
          </span>
        </footer>
      </main>
    </Tooltip.Provider>
  );
}
