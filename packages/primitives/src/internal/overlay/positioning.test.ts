import { describe, expect, it } from 'vitest';

import { type PhysicalPlacement, positionOverlay } from './positioning';

describe('Overlay positioning', () => {
  const anchor = { left: 400, top: 300, width: 100, height: 40 };
  const menu = { left: 0, top: 0, width: 160, height: 120 };
  const viewport = { width: 1000, height: 800 };
  it('mirrors logical Start/End in RTL while keeping physical placements unchanged', () => {
    expect(positionOverlay(anchor, menu, viewport, 'bottomStart', 8, 'ltr').left).toBe(400);
    expect(positionOverlay(anchor, menu, viewport, 'bottomStart', 8, 'rtl').left).toBe(340);
    expect(positionOverlay(anchor, menu, viewport, 'topEnd', 8, 'rtl').left).toBe(400);
    expect(positionOverlay(anchor, menu, viewport, 'bottomLeft', 8, 'rtl').left).toBe(400);
  });
  it.each<[PhysicalPlacement, number, number]>([
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
    expect(positionOverlay(anchor, menu, viewport, placement, 8)).toMatchObject({
      left,
      top,
      placement,
    });
  });
  it('flips at the bottom, shifts at the right and retains arrow alignment', () => {
    expect(
      positionOverlay(
        { left: 930, top: 750, width: 50, height: 30 },
        menu,
        viewport,
        'bottomLeft',
        8,
      ),
    ).toMatchObject({ placement: 'topLeft', top: 622, left: 832, arrowX: 123 });
  });
  it('constrains a tall menu and flips horizontal placements', () => {
    const tall = positionOverlay(anchor, { ...menu, height: 900 }, viewport, 'bottomLeft', 8);
    expect(tall.maxHeight).toBe(444);
    expect(tall.top).toBe(348);
    expect(positionOverlay({ ...anchor, left: 940 }, menu, viewport, 'rightTop', 8).placement).toBe(
      'leftTop',
    );
  });
  it.each<[PhysicalPlacement, 'arrowX' | 'arrowY', number]>([
    ['bottomLeft', 'arrowX', 20],
    ['bottomRight', 'arrowX', 140],
    ['rightTop', 'arrowY', 20],
    ['rightBottom', 'arrowY', 100],
  ])('keeps the arrow clear of rounded corners for %s', (placement, axis, expected) => {
    const smallTrigger = { ...anchor, width: 24, height: 24 };
    expect(positionOverlay(smallTrigger, menu, viewport, placement, 8)[axis]).toBe(expected);
  });
  it('centers the arrow when the panel is too small for corner insets', () => {
    const tiny = { ...menu, width: 24, height: 24 };
    expect(positionOverlay(anchor, tiny, viewport, 'bottomRight', 8).arrowX).toBe(12);
    expect(positionOverlay(anchor, tiny, viewport, 'rightBottom', 8).arrowY).toBe(12);
  });
  it.each([26, 28])('keeps a wider pointer clear of themed corners with a %ipx inset', (inset) => {
    const smallTrigger = { ...anchor, width: 24, height: 24 };
    for (const placement of ['bottomEnd', 'bottomStart', 'rightTop', 'rightBottom'] as const) {
      const result = positionOverlay(
        smallTrigger,
        menu,
        viewport,
        placement,
        8,
        'ltr',
        true,
        inset,
      );
      if (result.side === 'top' || result.side === 'bottom') {
        expect(result.left + result.arrowX).toBe(smallTrigger.left + smallTrigger.width / 2);
        expect(result.arrowX).toBeGreaterThanOrEqual(inset);
        expect(menu.width - result.arrowX).toBeGreaterThanOrEqual(inset);
      } else {
        expect(result.top + result.arrowY).toBe(smallTrigger.top + smallTrigger.height / 2);
        expect(result.arrowY).toBeGreaterThanOrEqual(inset);
        expect(menu.height - result.arrowY).toBeGreaterThanOrEqual(inset);
      }
    }
  });
  it.each<PhysicalPlacement>([
    'bottomLeft',
    'bottom',
    'bottomRight',
    'topLeft',
    'top',
    'topRight',
    'leftTop',
    'left',
    'leftBottom',
    'rightTop',
    'right',
    'rightBottom',
  ])('aligns the arrow to a small trigger center for %s', (placement) => {
    const smallTrigger = { ...anchor, width: 24, height: 24 };
    const result = positionOverlay(smallTrigger, menu, viewport, placement, 8, 'ltr', true);
    if (result.side === 'top' || result.side === 'bottom') {
      expect(result.left + result.arrowX).toBe(smallTrigger.left + smallTrigger.width / 2);
      expect(result.arrowX).toBeGreaterThanOrEqual(20);
      expect(menu.width - result.arrowX).toBeGreaterThanOrEqual(20);
    } else {
      expect(result.top + result.arrowY).toBe(smallTrigger.top + smallTrigger.height / 2);
      expect(result.arrowY).toBeGreaterThanOrEqual(20);
      expect(menu.height - result.arrowY).toBeGreaterThanOrEqual(20);
    }
  });
  it.each(['ltr', 'rtl'] as const)(
    'preserves trigger alignment for logical placements in %s',
    (dir) => {
      const smallTrigger = { ...anchor, width: 24, height: 24 };
      for (const placement of ['bottomStart', 'bottomEnd', 'topStart', 'topEnd'] as const) {
        const result = positionOverlay(smallTrigger, menu, viewport, placement, 8, dir, true);
        expect(result.left + result.arrowX).toBe(412);
      }
    },
  );
  it('keeps the panel within the viewport when exact arrow alignment is impossible', () => {
    const result = positionOverlay(
      { left: 976, top: 300, width: 24, height: 24 },
      menu,
      viewport,
      'bottomRight',
      8,
      'ltr',
      true,
    );
    expect(result.left + menu.width).toBe(viewport.width - 8);
    expect(result.arrowX).toBe(menu.width - 20);
  });
});
