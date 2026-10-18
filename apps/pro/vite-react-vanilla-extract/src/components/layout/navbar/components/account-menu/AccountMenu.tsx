import { AiIcon, ChevronDownIcon, LogOutIcon, UserIcon } from '@virgo-design/icons';
import { Avatar, Dropdown } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { UserGenderIcon } from '@/components/display/user-gender-icon';
import { useCurrentUser, useSession } from '@/features/auth';
import { avatarForeground, profileInitials, useProfileIdentityResource } from '@/features/profile';
import { isAdmin } from '@/lib/auth/permissions';
import { businessLabel } from '@/lib/formatting/business-labels';
import { routePath } from '@/routes';

import * as styles from './AccountMenu.css';

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
  const navigate = useNavigate();
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
          className={styles.trigger}
          aria-label={t('app.accountLabel', { name: displayName })}
          indicator={<ChevronDownIcon className={styles.chevron} />}
        >
          <Avatar {...avatarProps} size="sm" />
          <span className={styles.name}>{displayName}</span>
        </Dropdown.Trigger>
        <Dropdown.Content className={styles.menu} placement="bottomRight" arrow={false}>
          <div className={styles.identity}>
            <Avatar {...avatarProps} size="md" />
            <div>
              <strong>
                {displayName} <UserGenderIcon gender={user.gender} />
              </strong>
              <p>
                {t(`auth.login.roles.${user.role}`)} ·{' '}
                {businessLabel(user.department, i18n.language)}
              </p>
              <span className={styles.account}>{user.account}</span>
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
            <p className={styles.error} role="alert">
              {t('auth.signOutFailed')}
            </p>
          ) : null}
        </Dropdown.Content>
      </Dropdown>
    </>
  );
}
