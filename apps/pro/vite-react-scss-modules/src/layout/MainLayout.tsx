import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router';

import { AiWorkspace } from '@/features/ai-workspace';
import { useAgentMode } from '@/features/ai-workspace/store';
import { useCurrentUser } from '@/features/auth';
import { NotificationControl } from '@/features/notifications';
import { isAdmin } from '@/lib/auth/permissions';
import { useAppPreferences } from '@/preferences';
import { canVisitRoute } from '@/routes';
import type { ResourceSubscriber } from '@/store/resources';

import { BusinessDataProvider } from './providers/BusinessDataProvider';
import { AppShell } from './shell/AppShell';
import { FooterBrand } from './shell/footer/brand/FooterBrand';
import { AccountMenu } from './shell/header/account-menu/AccountMenu';

export function MainLayout({
  settingsActions,
  subscribeToChanges,
}: {
  settingsActions?: ReactNode;
  subscribeToChanges?: ResourceSubscriber | undefined;
}) {
  const { t } = useTranslation();
  const user = useCurrentUser();
  const admin = isAdmin(user);
  const { agentMode, setAgentMode } = useAgentMode();
  const { preferences, appearance } = useAppPreferences(admin);

  return (
    <BusinessDataProvider subscribeToChanges={subscribeToChanges}>
      <AiWorkspace
        active={admin && agentMode}
        theme={appearance}
        onExit={() => setAgentMode(false)}
        footer={preferences.showFooter ? <FooterBrand /> : null}
      >
        <AppShell
          canCustomize={admin}
          canVisit={(key) => canVisitRoute(user, key)}
          workspaceLabel={t(`app.workspaces.${user.role}`)}
          settingsActions={settingsActions}
          headerActions={
            <NotificationControl
              showOverlayArrows={preferences.showOverlayArrows}
              indicator={preferences.notificationIndicator}
            />
          }
          accountMenu={<AccountMenu agentMode={agentMode} onAgentModeChange={setAgentMode} />}
        >
          <Outlet context={{ showOverlayArrows: preferences.showOverlayArrows }} />
        </AppShell>
      </AiWorkspace>
    </BusinessDataProvider>
  );
}
