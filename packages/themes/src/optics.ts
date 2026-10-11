/** A shared, optional SVG backdrop lens. CSS supplies a blur-only fallback. */
export function initializeThemeOptics(): void {
  if (typeof document === 'undefined' || !document.body) return;
  // SVG backdrop filters are available in Chromium. Other engines retain the CSS blur recipe.
  if (
    !('chrome' in globalThis) ||
    typeof CSS === 'undefined' ||
    !CSS.supports('backdrop-filter', 'url("#vd-glass-lens")')
  )
    return;
  if (!document.getElementById('vd-theme-optics')) {
    const map = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><defs><linearGradient id="x"><stop stop-color="#ff0000"/><stop offset="1" stop-color="#000000"/></linearGradient><linearGradient id="y" x2="0" y2="1"><stop stop-color="#00ff00"/><stop offset="1" stop-color="#000000"/></linearGradient></defs><rect width="256" height="256" fill="url(#x)"/><rect width="256" height="256" fill="url(#y)" style="mix-blend-mode:screen"/></svg>`;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'vd-theme-optics';
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.style.cssText = 'position:fixed;pointer-events:none;overflow:hidden';
    svg.innerHTML = `<defs><filter id="vd-glass-lens" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feImage href="data:image/svg+xml,${encodeURIComponent(map)}" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map"/><feDisplacementMap in="SourceGraphic" in2="map" scale="18" xChannelSelector="R" yChannelSelector="G"/></filter></defs>`;
    document.body.prepend(svg);
  }
  document.documentElement.style.setProperty('--vd-optical-refraction', 'url("#vd-glass-lens")');
}
