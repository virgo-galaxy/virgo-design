import { saveAgentMode } from '@/features/ai-workspace';
import { SessionContext, useSessionState } from '@/features/auth';
import { HandoffSessionProvider } from '@/features/handoff';
import { userDetailsCache } from '@/features/users';
import { resetAppLocale } from '@/i18n';
import { SessionLayout } from '@/layout';

import { ProResourcesProvider } from './ProResourcesProvider';

const endSession = () => {
  saveAgentMode(false);
  userDetailsCache.clear();
};
const startSession = () => userDetailsCache.clear();

/** Application composition owns identity-scoped resources and lifecycle coordination. */
export function SessionProvider() {
  const state = useSessionState({
    onSessionEnd: endSession,
    onSessionStart: startSession,
    onDemoReset: resetAppLocale,
  });
  const layout = <SessionLayout state={state} />;
  if (!state.current?.authenticated || !state.current.user) return layout;
  return (
    <SessionContext
      value={{ user: state.current.user, signOut: state.signOut, resetDemo: state.resetDemo }}
    >
      <ProResourcesProvider key={state.current.user.id}>
        <HandoffSessionProvider>{layout}</HandoffSessionProvider>
      </ProResourcesProvider>
    </SessionContext>
  );
}
