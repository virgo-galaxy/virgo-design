export type PhysicalPlacement =
  | 'bottomLeft'
  | 'bottom'
  | 'bottomRight'
  | 'topLeft'
  | 'top'
  | 'topRight'
  | 'leftTop'
  | 'left'
  | 'leftBottom'
  | 'rightTop'
  | 'right'
  | 'rightBottom';
export type OverlayPlacement =
  PhysicalPlacement | 'bottomStart' | 'bottomEnd' | 'topStart' | 'topEnd';

type Rect = { left: number; top: number; width: number; height: number };
type Side = 'top' | 'bottom' | 'left' | 'right';
const opposite = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' } as const;

export function positionOverlay(
  anchor: Rect,
  menu: Rect,
  viewport: { width: number; height: number },
  placement: OverlayPlacement,
  offset: number,
  direction: 'ltr' | 'rtl' = 'ltr',
  arrow = false,
  arrowInset = 20,
) {
  const margin = 8;
  const side = (['bottom', 'top', 'left', 'right'] as const).find((value) =>
    placement.startsWith(value),
  )!;
  const requestedAlignment = placement.slice(side.length);
  const alignment =
    requestedAlignment === 'Start'
      ? direction === 'rtl'
        ? 'Right'
        : 'Left'
      : requestedAlignment === 'End'
        ? direction === 'rtl'
          ? 'Left'
          : 'Right'
        : requestedAlignment;
  const space = {
    top: anchor.top - offset - margin,
    bottom: viewport.height - anchor.top - anchor.height - offset - margin,
    left: anchor.left - offset - margin,
    right: viewport.width - anchor.left - anchor.width - offset - margin,
  };
  const extent = side === 'top' || side === 'bottom' ? menu.height : menu.width;
  const resolved: Side =
    extent > space[side] && space[opposite[side]] > space[side] ? opposite[side] : side;
  const vertical = resolved === 'top' || resolved === 'bottom';
  const maxHeight = Math.max(0, vertical ? space[resolved] : viewport.height - margin * 2);
  const height = Math.min(menu.height, maxHeight);
  const width = Math.min(menu.width, viewport.width - margin * 2);
  let left = vertical
    ? alignment === 'Left'
      ? anchor.left
      : alignment === 'Right'
        ? anchor.left + anchor.width - width
        : anchor.left + (anchor.width - width) / 2
    : resolved === 'left'
      ? anchor.left - width - offset
      : anchor.left + anchor.width + offset;
  let top = vertical
    ? resolved === 'top'
      ? anchor.top - height - offset
      : anchor.top + anchor.height + offset
    : alignment === 'Top'
      ? anchor.top
      : alignment === 'Bottom'
        ? anchor.top + anchor.height - height
        : anchor.top + (anchor.height - height) / 2;
  left = Math.max(margin, Math.min(left, viewport.width - width - margin));
  top = Math.max(margin, Math.min(top, viewport.height - height - margin));
  // Leave room for the rotated arrow's base beside the panel's rounded corners.
  const arrowInsetX = Math.min(arrowInset, width / 2);
  const arrowInsetY = Math.min(arrowInset, height / 2);
  if (arrow) {
    // Shift the panel as well as its arrow so the tip still points at the trigger center.
    if (vertical) {
      const center = anchor.left + anchor.width / 2;
      left = Math.max(center - width + arrowInsetX, Math.min(left, center - arrowInsetX));
      left = Math.max(margin, Math.min(left, viewport.width - width - margin));
    } else {
      const center = anchor.top + anchor.height / 2;
      top = Math.max(center - height + arrowInsetY, Math.min(top, center - arrowInsetY));
      top = Math.max(margin, Math.min(top, viewport.height - height - margin));
    }
  }
  const arrowX = Math.max(
    arrowInsetX,
    Math.min(width - arrowInsetX, anchor.left + anchor.width / 2 - left),
  );
  const arrowY = Math.max(
    arrowInsetY,
    Math.min(height - arrowInsetY, anchor.top + anchor.height / 2 - top),
  );
  return {
    referenceHidden:
      anchor.top + anchor.height < 0 ||
      anchor.top > viewport.height ||
      anchor.left + anchor.width < 0 ||
      anchor.left > viewport.width,
    left,
    top,
    maxHeight,
    arrowX,
    arrowY,
    side: resolved,
    placement: `${resolved}${alignment}`,
  };
}
