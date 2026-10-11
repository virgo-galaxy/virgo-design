export type PortalEnvironment = {
  theme: string | undefined;
  themeStyle: string | undefined;
  direction: 'ltr' | 'rtl';
};

/** Preserve the nearest presentation scope when content moves to a portal. */
export function readPortalEnvironment(anchor: Element): PortalEnvironment {
  return {
    theme: anchor.closest('[data-theme]')?.getAttribute('data-theme') ?? undefined,
    themeStyle: anchor.closest('[data-virgo-theme]')?.getAttribute('data-virgo-theme') ?? undefined,
    direction:
      (anchor.ownerDocument.defaultView?.getComputedStyle(anchor).direction ||
        anchor.closest('[dir]')?.getAttribute('dir')) === 'rtl'
        ? 'rtl'
        : 'ltr',
  };
}

/** Imperative followers share the same environment as React-rendered portals. */
export function applyPortalEnvironment(element: HTMLElement, environment: PortalEnvironment) {
  for (const [attribute, value] of [
    ['data-theme', environment.theme],
    ['data-virgo-theme', environment.themeStyle],
  ] as const) {
    if (value === undefined) element.removeAttribute(attribute);
    else element.setAttribute(attribute, value);
  }
  element.dir = environment.direction;
}

export function samePortalEnvironment(previous: PortalEnvironment, next: PortalEnvironment) {
  return (
    previous.theme === next.theme &&
    previous.themeStyle === next.themeStyle &&
    previous.direction === next.direction
  );
}

/** Class/style mutations can change direction or geometry without changing data attributes. */
export function observePortalEnvironment(anchor: HTMLElement, update: () => void, subtree = false) {
  const observer = new MutationObserver(update);
  for (let node: HTMLElement | null = anchor; node; node = node.parentElement) {
    observer.observe(node, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-virgo-theme', 'dir', 'class', 'style'],
      ...(node === anchor && subtree ? { childList: true, subtree: true } : {}),
    });
  }
  return () => observer.disconnect();
}
