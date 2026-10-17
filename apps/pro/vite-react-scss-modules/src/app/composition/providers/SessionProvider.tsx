import { SessionContext, useSessionState } from '@/features/auth';
import { userDetailsCache } from '@/features/users';
import { resetAppLocale } from '@/i18n';
import { SessionLayout } from '@/layout';
import { clearStoredSessionState, SessionStoreProvider } from '@/store';

import { ProResourcesProvider } from './ProResourcesProvider';

const clearSessionState = () => {
  clearStoredSessionState();
  userDetailsCache.clear();
};

export function SessionProvider() {
  const state = useSessionState({
    onSessionEnd: clearSessionState,
    onSessionStart: clearSessionState,
    onDemoReset: resetAppLocale,
  });

  const layout = <SessionLayout state={state} />;

  if (!state.current?.authenticated || !state.current.user) return layout;

  return (
    <SessionContext
      value={{ user: state.current.user, signOut: state.signOut, resetDemo: state.resetDemo }}
    >
      <ProResourcesProvider key={state.current.user.id}>
        <SessionStoreProvider user={state.current.user}>{layout}</SessionStoreProvider>
      </ProResourcesProvider>
    </SessionContext>
  );
}
