import { useLayoutEffect, useRef } from 'react';

import styles from './PopupMaterial.module.scss';

const pathTokens = /[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?|[a-z]/gi;
const round = (value: number) => Number(value.toFixed(4));

// Curves come from the same theme recipe as the standalone arrow. Only project
// its relative coordinates; the material never introduces its own profile.
function scaleCurve(curve: string, scaleX: number, scaleY: number) {
  let coordinate = 0;
  return curve.replace(pathTokens, (token) => {
    if (/^[a-z]$/i.test(token)) {
      coordinate = 0;
      return token;
    }
    return String(round(Number(token) * (coordinate++ % 2 === 0 ? scaleX : scaleY)));
  });
}

function materialMasks(panel: HTMLElement, arrow: HTMLElement, style: CSSStyleDeclaration) {
  const side = panel.dataset.side;
  if (!side || !['top', 'bottom', 'left', 'right'].includes(side)) return;
  const width = Number.parseFloat(style.width);
  const height = Number.parseFloat(style.height);
  if (!(width > 0 && height > 0)) return;
  const border = Number.parseFloat(style.borderTopWidth) || 0;
  const halfBorder = border / 2;
  const padding = Number.parseFloat(style.getPropertyValue('--vd-sizing-12')) || 12;
  const vertical = side === 'top' || side === 'bottom';
  const w = vertical ? width : height;
  const h = vertical ? height : width;
  const radius = Math.min(Number.parseFloat(style.borderTopLeftRadius) || 0, w / 2, h / 2);
  const r = Math.max(0, radius - halfBorder);
  const arrowStyle = getComputedStyle(arrow);
  const arrowWidth = Number.parseFloat(vertical ? arrowStyle.width : arrowStyle.height);
  const arrowHeight = Number.parseFloat(vertical ? arrowStyle.height : arrowStyle.width);
  const curve = style
    .getPropertyValue('--vd-overlay-arrow-curve')
    .trim()
    .replace(/^['"]|['"]$/g, '');
  if (!curve || curve === 'none') return;
  const profileWidth = Number(style.getPropertyValue('--vd-overlay-arrow-curve-width'));
  const profileHeight = Number(style.getPropertyValue('--vd-overlay-arrow-curve-height'));
  if (!(profileWidth > 0 && profileHeight > 0)) return;
  const projectedCurve = scaleCurve(curve, arrowWidth / profileWidth, arrowHeight / profileHeight);
  const arrowCoordinate =
    (Number.parseFloat(
      style.getPropertyValue(vertical ? '--overlay-arrow-x' : '--overlay-arrow-y'),
    ) || 0) + border;
  const center = side === 'top' || side === 'right' ? w - arrowCoordinate : arrowCoordinate;
  const base = Math.min(w - radius - arrowWidth, Math.max(radius, center - arrowWidth / 2));
  // One closed path includes every corner, straight edge and the shared curve.
  // Both material fill and border use it, so their edges coincide exactly.
  const path = [
    `M${round(radius)} ${round(halfBorder)}`,
    `H${round(base)} ${projectedCurve} H${round(w - radius)}`,
    `A${round(r)} ${round(r)} 0 0 1 ${round(w - halfBorder)} ${round(radius)}`,
    `V${round(h - radius)} A${round(r)} ${round(r)} 0 0 1 ${round(w - radius)} ${round(h - halfBorder)}`,
    `H${round(radius)} A${round(r)} ${round(r)} 0 0 1 ${round(halfBorder)} ${round(h - radius)}`,
    `V${round(radius)} A${round(r)} ${round(r)} 0 0 1 ${round(radius)} ${round(halfBorder)} Z`,
  ].join(' ');
  const transforms = {
    bottom: `translate(${padding} ${padding})`,
    top: `translate(${padding + width} ${padding + height}) rotate(180)`,
    left: `translate(${padding + width} ${padding}) rotate(90)`,
    right: `translate(${padding} ${padding + height}) rotate(-90)`,
  };
  const transform = transforms[side as keyof typeof transforms];
  const mask = (fill: string) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${round(width + padding * 2)} ${round(height + padding * 2)}"><path d="${path}" transform="${transform}" fill="${fill}" stroke="white" stroke-width="${border}" stroke-linejoin="round"/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  };
  return { fill: mask('white'), outline: mask('none') };
}

/** Decorative material only; positioning, focus and interaction remain in the primitive. */
export function PopupMaterial() {
  const ref = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const material = ref.current;
    const panel = material?.parentElement;
    const arrow = panel?.querySelector<HTMLElement>(':scope > [data-slot="arrow"]');
    if (!material || !panel || !arrow) return;
    let previous = '';
    const update = () => {
      const style = getComputedStyle(panel);
      if (style.getPropertyValue('--vd-popup-material-display').trim() !== 'block') return;
      const masks = materialMasks(panel, arrow, style);
      if (!masks || masks.fill === previous) return;
      previous = masks.fill;
      material.style.setProperty('--popup-material-fill-mask', masks.fill);
      material.style.setProperty('--popup-material-outline-mask', masks.outline);
    };
    update();
    const resize = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(update);
    resize?.observe(panel);
    const changes = new MutationObserver(update);
    changes.observe(panel, { attributes: true, attributeFilter: ['style', 'data-side', 'class'] });
    for (let ancestor = panel.parentElement; ancestor; ancestor = ancestor.parentElement) {
      changes.observe(ancestor, {
        attributes: true,
        attributeFilter: ['data-theme', 'data-virgo-theme', 'class', 'style'],
      });
    }
    return () => {
      resize?.disconnect();
      changes.disconnect();
    };
  }, []);
  return <span ref={ref} className={styles.root} data-slot="popup-material" aria-hidden="true" />;
}
