export function installNavigationBridge() {
  const target = window as Window & { __virgoNavigationBridge?: boolean };
  if (target.__virgoNavigationBridge) return;
  target.__virgoNavigationBridge = true;
  window.addEventListener(
    'popstate',
    (event) => {
      window.dispatchEvent(new CustomEvent('virgo-pro:before-traverse', { detail: event }));
    },
    true,
  );
}

export const navigationBootstrapScript = `(${installNavigationBridge.toString()})();`;
