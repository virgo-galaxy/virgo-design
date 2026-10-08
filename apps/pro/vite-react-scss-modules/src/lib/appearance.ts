// A shared appearance for the current tab; it is not an account preference.
let appearance: 'light' | 'dark' | undefined;
export const currentAppearance = () => appearance;
export const rememberAppearance = (theme: 'light' | 'dark') => {
  appearance = theme;
};
export const clearAppearance = () => {
  appearance = undefined;
};
