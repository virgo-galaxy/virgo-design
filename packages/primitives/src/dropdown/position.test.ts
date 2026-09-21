import { describe, expect, it } from 'vitest';

import type { DropdownPlacement } from './Dropdown.types';
import { positionDropdown } from './position';

describe('Dropdown positioning', () => {
  const anchor = { left: 400, top: 300, width: 100, height: 40 };
  const menu = { left: 0, top: 0, width: 160, height: 120 };
  const viewport = { width: 1000, height: 800 };
  it.each<[DropdownPlacement, number, number]>([
    ['bottomLeft', 400, 348],
    ['bottom', 370, 348],
    ['bottomRight', 340, 348],
    ['topLeft', 400, 172],
    ['top', 370, 172],
    ['topRight', 340, 172],
    ['leftTop', 232, 300],
    ['left', 232, 260],
    ['leftBottom', 232, 220],
    ['rightTop', 508, 300],
    ['right', 508, 260],
    ['rightBottom', 508, 220],
  ])('positions %s', (placement, left, top) => {
    expect(positionDropdown(anchor, menu, viewport, placement, 8)).toMatchObject({
      left,
      top,
      placement,
    });
  });
  it('flips at the bottom, shifts at the right and retains arrow alignment', () => {
    expect(
      positionDropdown(
        { left: 930, top: 750, width: 50, height: 30 },
        menu,
        viewport,
        'bottomLeft',
        8,
      ),
    ).toMatchObject({ placement: 'topLeft', top: 622, left: 832, arrowX: 123 });
  });
  it('constrains a tall menu and flips horizontal placements', () => {
    const tall = positionDropdown(anchor, { ...menu, height: 900 }, viewport, 'bottomLeft', 8);
    expect(tall.maxHeight).toBe(444);
    expect(tall.top).toBe(348);
    expect(
      positionDropdown({ ...anchor, left: 940 }, menu, viewport, 'rightTop', 8).placement,
    ).toBe('leftTop');
  });
});
