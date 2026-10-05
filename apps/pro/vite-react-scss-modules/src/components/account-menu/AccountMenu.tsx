import { AiIcon, ChevronDownIcon, LogOutIcon, UserIcon } from '@virgo-design/icons';
import { Avatar, Dropdown } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { useSession } from '@/application/session-context';
import {
  accountAvatarImage,
  avatarForeground,
  profileInitials,
  type ProfileState,
} from '@/data/pro-workflows';

import styles from './AccountMenu.module.scss';

export function AccountMenu({
  profile,
  agentMode,
  onAgentModeChange,
}: {
  profile: ProfileState;
  agentMode: boolean;
  onAgentModeChange: (active: boolean) => void;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signOut } = useSession();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState(false);
  const displayName = profile.displayName || profile.name;
  const avatarImage = accountAvatarImage(profile);
  const avatarProps = {
    shape: 'square' as const,
    fallback: profileInitials(profile.name).slice(0, 1),
    src: avatarImage,
    style: {
      background: avatarImage ? 'transparent' : profile.avatarColor,
      border: 'none',
      borderRadius: 0,
      color: avatarForeground(profile.avatarColor),
    },
  };

  return (
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
            <strong>{displayName}</strong>
            <p>{profile.headline}</p>
          </div>
        </div>
        <Dropdown.Separator />
        <Dropdown.Item
          icon={<UserIcon />}
          disabled={signingOut}
          onSelect={() => {
            setOpen(false);
            navigate('/profile');
          }}
        >
          {t('app.userCenter')}
        </Dropdown.Item>
        <Dropdown.Item
          icon={<AiIcon />}
          disabled={signingOut}
          onSelect={(event) => {
            event.preventDefault();
            setOpen(false);
            onAgentModeChange(!agentMode);
          }}
        >
          {t('app.agentMode')}
        </Dropdown.Item>
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
          {t(signingOut ? 'app.signingOut' : 'app.signOut')}
        </Dropdown.Item>
        {error ? (
          <p className={styles.error} role="alert">
            {t('app.signOutFailed')}
          </p>
        ) : null}
      </Dropdown.Content>
    </Dropdown>
  );
}
