export type PortalEnvironment = {
  theme: string | undefined;
  themeStyle: string | undefined;
  direction: 'ltr' | 'rtl';
};

/** Preserve the nearest presentation scope when content moves to a portal. */
export function readPortalEnvironment(anchor: HTMLElement): PortalEnvironment {
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

export function samePortalEnvironment(previous: PortalEnvironment, next: PortalEnvironment) {
  return (
    previous.theme === next.theme &&
    previous.themeStyle === next.themeStyle &&
    previous.direction === next.direction
  );
}

/** Class/style mutations can change direction or geometry without changing data attributes. */
export function observePortalEnvironment(anchor: HTMLElement, update: () => void) {
  const observer = new MutationObserver(update);
  for (let node: HTMLElement | null = anchor; node; node = node.parentElement) {
    observer.observe(node, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-virgo-theme', 'dir', 'class', 'style'],
    });
  }
  return () => observer.disconnect();
}
