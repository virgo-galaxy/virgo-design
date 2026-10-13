import { describe, expect, it } from 'vitest';

import {
  nearestPreviewCorner,
  type PreviewCorner,
  resizePreviewZoom,
  workspacePreview,
} from './preview';

const corners: PreviewCorner[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

describe('workspace preview resizing', () => {
  it.each(corners)('preserves the page aspect ratio and %s anchor at each size', (corner) => {
    for (const zoom of [0.7, 1, 1.8]) {
      const preview = workspacePreview(1440, 1000, corner, zoom);
      expect(preview.width / preview.height).toBeCloseTo(1.44);
      expect(corner.endsWith('left') ? preview.x : 1440 - preview.x - preview.width).toBeCloseTo(
        24,
      );
      expect(corner.startsWith('top') ? preview.y : 1000 - preview.y - preview.height).toBeCloseTo(
        24,
      );
    }
  });

  it.each(corners)('grows when the free corner moves away from the %s anchor', (corner) => {
    const x = corner.endsWith('left') ? 40 : -40;
    const y = corner.startsWith('top') ? 30 : -30;
    expect(resizePreviewZoom(1, 200, 150, x, y, corner)).toBeCloseTo(1.2);
    expect(resizePreviewZoom(1, 200, 150, -x * 100, -y * 100, corner)).toBe(0.7);
    expect(resizePreviewZoom(1, 200, 150, x * 100, y * 100, corner)).toBe(1.8);
  });

  it('uses the resized thumbnail center when finding its nearest dock corner', () => {
    expect(nearestPreviewCorner(520, 24, 1440, 1000, 1.8)).toBe('top-right');
  });

  it('keeps a large preview inside a small viewport without stretching it', () => {
    const preview = workspacePreview(320, 200, 'bottom-right', 1.8);
    expect(preview.x).toBeGreaterThanOrEqual(16);
    expect(preview.y).toBeGreaterThanOrEqual(16);
    expect(preview.x + preview.width).toBeLessThanOrEqual(304);
    expect(preview.y + preview.height).toBeLessThanOrEqual(184);
    expect(preview.width / preview.height).toBeCloseTo(1.6);
  });
});
