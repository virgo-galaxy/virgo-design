export type PreviewCorner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export const DEFAULT_PREVIEW_ZOOM = 1.1;

export function clampPreviewZoom(zoom: number) {
  return Math.max(0.7, Math.min(1.8, zoom));
}

export function workspacePreview(
  width: number,
  height: number,
  corner: PreviewCorner = 'top-right',
  zoom = DEFAULT_PREVIEW_ZOOM,
) {
  const inset = width < 640 ? 16 : 24;
  const baseScale = Math.min(280 / width, 180 / height);
  const scale = Math.min(
    baseScale * clampPreviewZoom(zoom),
    (width - inset * 2) / width,
    (height - inset * 2) / height,
  );
  const previewWidth = width * scale;
  const previewHeight = height * scale;
  return {
    x: corner.endsWith('left') ? inset : width - previewWidth - inset,
    y: corner.startsWith('top') ? inset : height - previewHeight - inset,
    scale,
    width: previewWidth,
    height: previewHeight,
    inset,
  };
}

export function nearestPreviewCorner(
  x: number,
  y: number,
  width: number,
  height: number,
  zoom = DEFAULT_PREVIEW_ZOOM,
): PreviewCorner {
  const preview = workspacePreview(width, height, 'top-right', zoom);
  return `${y + preview.height / 2 < height / 2 ? 'top' : 'bottom'}-${x + preview.width / 2 < width / 2 ? 'left' : 'right'}`;
}

export function resizePreviewZoom(
  zoom: number,
  width: number,
  height: number,
  dx: number,
  dy: number,
  corner: PreviewCorner,
) {
  const horizontal = corner.endsWith('left') ? 1 : -1;
  const vertical = corner.startsWith('top') ? 1 : -1;
  const change =
    (dx * horizontal * width + dy * vertical * height) / (width * width + height * height);
  return clampPreviewZoom(zoom * (1 + change));
}
