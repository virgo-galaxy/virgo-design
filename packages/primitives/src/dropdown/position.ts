import type { DropdownPlacement } from './Dropdown.types';

type Rect = { left: number; top: number; width: number; height: number };
type Side = 'top' | 'bottom' | 'left' | 'right';
const opposite = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' } as const;

export function positionDropdown(
  anchor: Rect,
  menu: Rect,
  viewport: { width: number; height: number },
  placement: DropdownPlacement,
  offset: number,
) {
  const margin = 8;
  const side = (['bottom', 'top', 'left', 'right'] as const).find((value) =>
    placement.startsWith(value),
  )!;
  const alignment = placement.slice(side.length);
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
  const arrowX = Math.max(12, Math.min(width - 12, anchor.left + anchor.width / 2 - left));
  const arrowY = Math.max(12, Math.min(height - 12, anchor.top + anchor.height / 2 - top));
  return {
    left,
    top,
    maxHeight,
    arrowX,
    arrowY,
    side: resolved,
    placement: `${resolved}${alignment}`,
  };
}
