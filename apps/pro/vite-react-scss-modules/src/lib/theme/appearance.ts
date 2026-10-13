// The selected appearance mode survives LoginPage / AppShell remounts, including denied storage.
let appearance: 'system' | 'light' | 'dark' | undefined;
export const currentAppearance = () => appearance;
export const rememberAppearance = (theme: 'system' | 'light' | 'dark') => {
  appearance = theme;
};
export const clearAppearance = () => {
  appearance = undefined;
};
