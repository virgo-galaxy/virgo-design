import { AiIcon, ChevronDownIcon, LogOutIcon, ResetIcon, UserIcon } from '@virgo-design/icons';
import { Avatar, Button, Dialog, Dropdown } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { useCurrentUser, useSession } from '@/application/session-context';
import {
  accountAvatarImage,
  avatarForeground,
  profileInitials,
  type ProfileState,
} from '@/data/pro-workflows';
import { isAdmin } from '@/lib/auth/permissions';
import { businessLabel } from '@/lib/demo/labels';

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
  const { t, i18n } = useTranslation();
  const user = useCurrentUser()!;
  const admin = isAdmin(user);
  const navigate = useNavigate();
  const { signOut, resetDemo } = useSession();
  const [resetOpen, setResetOpen] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [resetError, setResetError] = useState(false);
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState(false);
  const displayName = businessLabel(profile.displayName || profile.name, i18n.language);
  const avatarImage = accountAvatarImage(profile);
  const avatarProps = {
    shape: 'square' as const,
    fallback: profileInitials(profile.name).slice(0, 1),
    src: avatarImage,
    style: {
      background: avatarImage ? 'transparent' : profile.avatarColor,
      border: 'none',
      color: avatarForeground(profile.avatarColor),
    },
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
              <strong>{displayName}</strong>
              <p>
                {t(`app.login.roles.${user.role}`)} ·{' '}
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
          {admin && import.meta.env.VITE_API_MOCKING === 'true' ? (
            <Dropdown.Item
              icon={<ResetIcon />}
              danger
              disabled={signingOut}
              onSelect={() => {
                setOpen(false);
                setResetError(false);
                setResetOpen(true);
              }}
            >
              {t('app.resetDemo')}
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
            {t(signingOut ? 'app.signingOut' : 'app.signOut')}
          </Dropdown.Item>
          {error ? (
            <p className={styles.error} role="alert">
              {t('app.signOutFailed')}
            </p>
          ) : null}
        </Dropdown.Content>
      </Dropdown>
      <Dialog.Root
        open={resetOpen}
        onOpenChange={(value) => {
          if (!resetting) setResetOpen(value);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content size="sm">
            <Dialog.Header>
              <Dialog.Title>{t('app.resetDemoTitle')}</Dialog.Title>
              <Dialog.Description>{t('app.resetDemoDescription')}</Dialog.Description>
            </Dialog.Header>
            {resetError ? (
              <Dialog.Body>
                <p role="alert">{t('app.resetDemoFailed')}</p>
              </Dialog.Body>
            ) : null}
            <Dialog.Footer>
              <Dialog.Close disabled={resetting}>{t('tasks.cancel')}</Dialog.Close>
              <Button
                disabled={resetting}
                aria-busy={resetting}
                onClick={() => {
                  setResetting(true);
                  setResetError(false);
                  void resetDemo().catch(() => {
                    setResetting(false);
                    setResetError(true);
                  });
                }}
              >
                {t(resetting ? 'app.resettingDemo' : 'app.resetDemo')}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
