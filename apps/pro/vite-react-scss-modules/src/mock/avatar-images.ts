import source from '@/assets/avatars/system_preset_avatars.png';

// Pixel boundaries in the original 1264 × 844 sheet, left-to-right, top-to-bottom.
const columnEdges = [0, 210, 421, 632, 843, 1054, 1264] as const;
const rowEdges = [0, 210, 420, 630, 844] as const;
const crops = Array.from({ length: 24 }, (_, index) => {
  const column = index % 6;
  const row = Math.floor(index / 6);
  const cellWidth = columnEdges[column + 1]! - columnEdges[column]!;
  const cellHeight = rowEdges[row + 1]! - rowEdges[row]!;
  const size = Math.min(cellWidth, cellHeight);
  return {
    x: columnEdges[column]! + Math.floor((cellWidth - size) / 2),
    y: rowEdges[row]! + Math.floor((cellHeight - size) / 2),
    width: size,
    height: size,
  };
});

export function mockAvatarId(filename: string): number | undefined {
  const match = /^user_([1-9]\d*)\.png$/.exec(filename);
  const id = match ? Number(match[1]) : 0;
  return id >= 1 && id <= crops.length ? id : undefined;
}

let sheet: Promise<HTMLImageElement> | undefined;
const images = new Map<number, Promise<ArrayBuffer>>();

function loadSheet() {
  sheet ??= (async () => {
    const image = new Image();
    image.src = source;
    await image.decode();
    if (image.naturalWidth !== 1264 || image.naturalHeight !== 844)
      throw new Error('Unexpected preset avatar sheet dimensions');
    return image;
  })().catch((error: unknown) => {
    sheet = undefined;
    throw error;
  });
  return sheet;
}

async function cropPng(id: number): Promise<ArrayBuffer> {
  const crop = crops[id - 1];
  if (!crop) throw new Error('Unknown avatar preset');
  const image = await loadSheet();
  const canvas = document.createElement('canvas');
  canvas.width = crop.width;
  canvas.height = crop.height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas is unavailable');
  context.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
  const png = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('PNG encoding failed'))),
      'image/png',
    );
  });
  return png.arrayBuffer();
}

export function getMockAvatarPng(id: number): Promise<ArrayBuffer> {
  const cached = images.get(id);
  if (cached) return cached;
  const request = cropPng(id).catch((error: unknown) => {
    images.delete(id);
    throw error;
  });
  images.set(id, request);
  return request;
}
