import { AiIcon, ChevronDownIcon, LogOutIcon, UserIcon } from '@virgo-design/icons';
import { Avatar, Dropdown } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { UserGenderIcon } from '@/components/display/user-gender-icon';
import { useCurrentUser, useSession } from '@/features/auth';
import { avatarForeground, profileInitials, useProfileIdentityResource } from '@/features/profile';
import { isAdmin } from '@/lib/auth/permissions';
import { businessLabel } from '@/lib/formatting/business-labels';
import { routePath } from '@/routes';
import { useAppNavigation } from '@/routes/navigation';

export function AccountMenu({
  agentMode,
  onAgentModeChange,
}: {
  agentMode: boolean;
  onAgentModeChange: (active: boolean) => void;
}) {
  const { t, i18n } = useTranslation();
  const user = useCurrentUser();
  const admin = isAdmin(user);
  const navigate = useAppNavigation();
  const { signOut } = useSession();
  const { data: profile } = useProfileIdentityResource();

  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState(false);

  const name = profile?.name ?? user.name;
  const displayName = businessLabel(profile?.displayName || name, i18n.language);
  const avatarImage = profile?.avatarImage ?? user.avatarUrl;
  const avatarColor = profile?.avatarColor;
  const avatarProps = {
    shape: 'square' as const,
    fallback: profileInitials(name).slice(0, 1),
    ...(avatarImage ? { src: avatarImage } : {}),
    style:
      !avatarImage && avatarColor
        ? { background: avatarColor, color: avatarForeground(avatarColor) }
        : undefined,
  };

  return (
    <>
      <Dropdown
        open={open}
        onOpenChange={(next) => {
          setOpen(next);

          if (next) setError(false);
        }}
      >
        <Dropdown.Trigger
          data-ai-mode-trigger
          variant="text"
          className={[
            'pro-account-menu-trigger data-[variant=text]:[--button-padding-inline:var(--vd-spacing-8)]',
            'data-[variant=text]:[--button-font-size:var(--vd-font-size-13)] data-[variant=text]:[--button-foreground:var(--vd-text-primary)]',
            "[&[data-variant='text']_[data-slot='label']]:gap-8 [&[data-variant='text']_[data-slot='trailing-icon']]:[width:var(--vd-sizing-12)]",
            "[&[data-variant='text']_[data-slot='trailing-icon']]:[height:var(--vd-sizing-12)]",
            "[&[data-variant='text']_[data-slot='trailing-icon']]:text-icon-secondary [&[data-variant='text'][aria-expanded='true']]:bg-fill-hover",
          ].join(' ')}
          aria-label={t('app.accountLabel', { name: displayName })}
          indicator={
            <ChevronDownIcon
              className={[
                "[.pro-account-menu-trigger[data-variant='text'][aria-expanded='true']_&]:[transform:rotate(180deg)]",
                '[transition:transform_var(--vd-motion-interaction-duration,_var(--vd-duration-120))_var(--vd-motion-easing-standard,_var(--vd-easing-standard))]',
                'motion-reduce:[transition:none]',
              ].join(' ')}
            />
          }
        >
          <Avatar {...avatarProps} size="sm" />
          <span className="viewport-max-640:hidden [max-width:clamp(60px,_10vw,_140px)] overflow-hidden text-ellipsis whitespace-nowrap">
            {displayName}
          </span>
        </Dropdown.Trigger>
        <Dropdown.Content
          className="[width:260px] [max-width:calc(100vw_-_var(--vd-spacing-16))] p-6"
          placement="bottomRight"
          arrow={false}
        >
          <div
            className={[
              '[&_>_div]:min-w-0 [&_strong]:text-(length:--vd-font-size-14) [&_strong]:[font-weight:var(--vd-font-weight-600)]',
              '[&_p]:[margin:var(--vd-spacing-4)_0_0] [&_p]:text-(length:--vd-font-size-12) [&_p]:text-text-tertiary [&_p]:wrap-anywhere',
              'flex items-center gap-12 p-12',
            ].join(' ')}
          >
            <Avatar {...avatarProps} size="md" />
            <div>
              <strong>
                {displayName} <UserGenderIcon gender={user.gender} />
              </strong>
              <p>
                {t(`auth.login.roles.${user.role}`)} ·{' '}
                {businessLabel(user.department, i18n.language)}
              </p>
              <span className="text-text-tertiary [font:var(--vd-font-size-11)_var(--vd-font-family-mono)]">
                {user.account}
              </span>
            </div>
          </div>
          <Dropdown.Separator />
          <Dropdown.Item
            icon={<UserIcon />}
            disabled={signingOut}
            onSelect={() => {
              setOpen(false);
              navigate(routePath('profile'));
            }}
          >
            {t('app.userCenter')}
          </Dropdown.Item>
          {admin ? (
            <Dropdown.Item
              icon={<AiIcon />}
              disabled={signingOut}
              onSelect={(event) => {
                event.preventDefault();
                setOpen(false);
                onAgentModeChange(!agentMode);
              }}
            >
              {t('aiWorkspace.agentMode')}
            </Dropdown.Item>
          ) : null}
          <Dropdown.Item
            icon={<LogOutIcon />}
            danger
            disabled={signingOut}
            onSelect={(event) => {
              event.preventDefault();

              setSigningOut(true);
              setError(false);

              void signOut().catch(() => {
                setSigningOut(false);
                setError(true);
              });
            }}
          >
            {t(signingOut ? 'auth.signingOut' : 'auth.signOut')}
          </Dropdown.Item>
          {error ? (
            <p
              className="[margin:var(--vd-spacing-8)_var(--vd-spacing-12)] text-status-danger-accent [font-size:var(--vd-font-size-12)]"
              role="alert"
            >
              {t('auth.signOutFailed')}
            </p>
          ) : null}
        </Dropdown.Content>
      </Dropdown>
    </>
  );
}
