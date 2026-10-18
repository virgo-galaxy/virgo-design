import {
  ArrowRightIcon,
  CheckIcon,
  LockIcon,
  MoonFilledIcon,
  SunFilledIcon,
  UserIcon,
  VirgoDesignIcon,
} from '@virgo-design/icons';
import virgoLogoAsset from '@virgo-design/icons/brands/virgo-design.svg';
import { Button, Field, Form, Input, Progress, Tag, Tooltip } from '@virgo-design/ui';
import { type ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { login } from '@/api/auth';
import type { LoginDto, LoginRequest } from '@/api/auth/types';
import { LanguageControl } from '@/components/controls/language-control';
import { isHttpError } from '@/lib/http';
import { useAppPreferences } from '@/preferences';
import { proRouteConfig, routePath } from '@/routes';

import { LoginFormContext } from './login-form-context';

const virgoLogo = virgoLogoAsset.src;

export function LoginForm({
  onLogin,
  expired,
  defaultCredentials,
  children,
}: {
  onLogin: (session: LoginDto) => void;
  expired: boolean;
  defaultCredentials?: LoginRequest | undefined;
  children?: ReactNode;
}) {
  const { t } = useTranslation();
  const { appearance, updatePreferences } = useAppPreferences(false);

  const [account, setAccount] = useState(defaultCredentials?.account ?? '');
  const [password, setPassword] = useState(defaultCredentials?.password ?? '');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<'invalidCredentials' | 'failed' | ''>('');

  useEffect(() => {
    document.title = `${t('auth.login.signIn')} · Virgo Design Pro`;
  }, [t]);

  return (
    <Tooltip.Provider>
      <main
        className={[
          'bg-surface-background',
          "before:content-[''] before:absolute before:[z-index:-1] before:[width:800px] before:[height:800px] before:[border-radius:50%]",
          'before:[background:radial-gradient(_circle,_color-mix(in_srgb,_var(--vd-brand-primary)_7%,_transparent),_transparent_68%_)]',
          'before:[left:-260px] before:[top:120px] before:pointer-events-none',
          '[min-height:100dvh] flex flex-col text-text-primary relative [isolation:isolate] overflow-hidden',
        ].join(' ')}
      >
        <header className="viewport-max-720:[padding:20px] flex items-center justify-between [padding:28px_clamp(24px,_6vw,_104px)]">
          <a
            href={routePath(proRouteConfig.home)}
            className="[&_img]:[width:36px] [&_img]:[height:32px] [&_img]:object-contain flex items-center [gap:12px] no-underline [color:inherit] [font-size:18px]"
          >
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
        <div
          className={[
            'viewport-max-1000:[grid-template-columns:minmax(0,_1fr)_minmax(340px,_410px)] viewport-max-1000:[gap:32px]',
            'viewport-max-1000:[width:calc(100%_-_48px)] viewport-max-720:block viewport-max-720:[width:min(440px,_100%_-_32px)]',
            'viewport-max-720:[margin:20px_auto_40px]',
            '[flex:1] grid [grid-template-columns:minmax(0,_1fr)_minmax(360px,_440px)] items-center [gap:clamp(48px,_7vw,_120px)]',
            '[width:min(1180px,_100%_-_80px)] [margin:36px_auto_52px]',
          ].join(' ')}
        >
          <section
            className={[
              '[&_h2]:[font-size:clamp(38px,_3.5vw,_52px)] [&_h2]:leading-[1.22] [&_h2]:[letter-spacing:-1.5px] [&_h2]:[margin:24px_0_20px]',
              '[&_h2]:[font-weight:var(--vd-font-weight-600)] [&_h2_span]:block [&_h2_span]:text-brand-primary',
              'viewport-max-720:hidden',
            ].join(' ')}
            aria-labelledby="login-intro"
          >
            <Tag intent="brand" variant="soft">
              {t('auth.login.workspace')}
            </Tag>
            <h2 id="login-intro">
              {t('auth.login.heroTitle')}
              <span>{t('auth.login.heroAccent')}</span>
            </h2>
            <p className="text-text-secondary [font-size:16px] [line-height:1.8] [max-width:530px]">
              {t('auth.login.heroDescription')}
            </p>
            <div
              className={[
                '[&_svg]:block [&_svg]:text-brand-primary [&_svg]:[width:22px] [&_svg]:[height:22px] [&_svg]:[margin-bottom:12px]',
                '[&_strong]:[font-size:14px] [&_p]:text-text-secondary [&_p]:[font-size:13px] [&_p]:leading-[1.7] [&_p]:[margin-top:8px]',
                'viewport-max-1000:[grid-template-columns:1fr] viewport-max-1000:[gap:6px] viewport-max-1000:[&_>_div]:grid',
                'viewport-max-1000:[&_>_div]:[grid-template-columns:24px_1fr] viewport-max-1000:[&_>_div]:[gap:0_10px]',
                'viewport-max-1000:[&_p]:[grid-column:2] viewport-max-1000:[&_p]:m-0',
                'grid [grid-template-columns:repeat(3,_1fr)] [gap:20px] [margin:32px_0]',
              ].join(' ')}
            >
              {(['projects', 'collaboration', 'progress'] as const).map((feature) => (
                <div key={feature}>
                  <CheckIcon />
                  <strong>{t(`auth.login.features.${feature}.title`)}</strong>
                  <p>{t(`auth.login.features.${feature}.description`)}</p>
                </div>
              ))}
            </div>
            <div
              className={[
                '[border:1px_solid_var(--vd-border-subtle)] [border-radius:var(--vd-shape-radius-12,_var(--vd-radius-12))] bg-surface-default',
                '[box-shadow:var(--vd-elevation-1)]',
                'viewport-max-1000:hidden',
                '[padding:24px] [max-width:570px]',
              ].join(' ')}
              aria-hidden="true"
            >
              <div className="[&_>_span:last-child]:ml-auto [&_>_span:last-child]:text-text-secondary [&_>_span:last-child]:[font-size:12px] flex items-center [gap:9px] [font-size:13px]">
                <span className="bg-status-success-accent [border-radius:50%] [width:7px] [height:7px]" />
                <strong>Virgo Studio</strong>
                <span>{t('auth.login.teamWorkspace')}</span>
              </div>
              <div
                className={[
                  '[&_>_div]:grid [&_>_div]:[gap:5px] [&_>_div]:[padding-left:20px] [&_>_div]:[border-left:1px_solid_var(--vd-border-subtle)]',
                  '[&_>_div:first-child]:pl-0 [&_>_div:first-child]:[border-left:0] [&_strong]:[font-size:26px] [&_strong]:tabular-nums',
                  '[&_strong]:font-[600] [&_span]:text-text-secondary [&_span]:[font-size:12px]',
                  'grid [grid-template-columns:repeat(3,_1fr)] [margin:24px_0]',
                ].join(' ')}
              >
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
              <div className="[&_>_div]:[flex:1] [&_>_div]:grid [&_>_div]:[gap:6px] [&_>_div_>_span]:[font-size:12px] [&_>_div_>_span]:text-text-secondary flex [gap:12px] items-center [font-size:13px]">
                <span
                  className={[
                    '[border-radius:9px] [background:color-mix(in_srgb,_var(--vd-brand-primary)_9%,_transparent)] grid [place-items:center] [width:36px]',
                    '[height:36px] text-brand-primary [font-size:12px]',
                  ].join(' ')}
                >
                  01
                </span>
                <div>
                  <strong>{t('auth.login.sampleTask')}</strong>
                  <span>{t('auth.login.sampleProject')}</span>
                </div>
                <Tag intent="brand" variant="soft">
                  {t('tasks.statusLabels.inProgress')}
                </Tag>
              </div>
              <Progress className="mt-20" value={66} size="sm" />
              <p className="text-text-secondary [font-size:12px] [margin:12px_0_0]">
                {t('auth.login.previewNote')}
              </p>
            </div>
          </section>
          <section
            className={[
              'bg-surface-default [border:1px_solid_var(--vd-border-subtle)] [border-radius:var(--vd-shape-radius-12,_var(--vd-radius-12))]',
              '[box-shadow:var(--vd-elevation-2)]',
              '[&_form]:grid [&_form]:[gap:20px]',
              'viewport-max-1000:[padding:28px] viewport-max-720:[padding:28px_24px]',
              '[padding:36px]',
            ].join(' ')}
            aria-labelledby="login-title"
          >
            <div
              className={[
                '[&_h1]:[font-size:28px] [&_h1]:font-[600] [&_h1]:[margin:0_0_10px] [&_h1]:[letter-spacing:-0.6px] [&_p]:text-text-secondary',
                '[&_p]:[font-size:14px] [&_p]:leading-[1.6] [&_p]:[margin:0_0_28px]',
              ].join(' ')}
            >
              <h1 id="login-title">{t('auth.login.welcome')}</h1>
              <p>{t('auth.login.description')}</p>
            </div>
            {expired ? (
              <p
                className="bg-surface-background [border-radius:8px] [font-size:13px] text-text-secondary [padding:12px] [margin-bottom:20px]"
                role="status"
              >
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
                <p className="text-status-danger-text [font-size:13px] m-0" role="alert">
                  {t(`auth.login.${error}`)}
                </p>
              ) : null}
              <Button
                type="submit"
                size="large"
                className="w-full [margin-top:4px]"
                disabled={pending}
                aria-busy={pending}
                trailingIcon={<ArrowRightIcon />}
              >
                {t(pending ? 'auth.login.signingIn' : 'auth.login.signIn')}
              </Button>
            </Form>
            <LoginFormContext
              value={{
                credentials: { account, password },
                pending,
                setCredentials: (credentials) => {
                  setAccount(credentials.account);
                  setPassword(credentials.password);
                  setError('');
                },
              }}
            >
              {children}
            </LoginFormContext>
          </section>
        </div>
        <footer
          className={[
            'viewport-max-720:justify-center viewport-max-720:[padding:20px] viewport-max-720:[&_>_span:first-child]:hidden',
            'select-none [-webkit-user-select:none] flex justify-between [gap:20px] [padding:20px_clamp(24px,_6vw,_104px)] text-text-secondary',
            '[font-size:12px]',
          ].join(' ')}
        >
          <span>{t('auth.login.footer')}</span>
          <span className="inline-flex items-center [gap:6px]">
            <VirgoDesignIcon size={16} />
            Virgo Design Pro
          </span>
        </footer>
      </main>
    </Tooltip.Provider>
  );
}
