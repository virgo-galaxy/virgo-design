// @vitest-environment jsdom
import { Blob as NodeBlob } from 'node:buffer';

import { getResponse } from 'msw';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const png = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
const decode = vi.fn(async () => {});
const drawImage = vi.fn();
const encode = vi.fn();

function imageRequest(filename: string) {
  return new Request(new URL(`/api/v1/avatars/${filename}`, window.location.href));
}

beforeEach(() => {
  vi.resetModules();
  decode.mockReset().mockResolvedValue(undefined);
  drawImage.mockClear();
  encode.mockReset().mockImplementation((callback: BlobCallback) => {
    callback(new NodeBlob([png], { type: 'image/png' }) as unknown as Blob);
  });
  vi.stubGlobal(
    'Image',
    class {
      src = '';
      naturalWidth = 1264;
      naturalHeight = 844;
      decode = decode;
    },
  );
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
    drawImage,
  } as unknown as CanvasRenderingContext2D);
  vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation(encode);
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('Mock avatar image responses', () => {
  it('crops by source coordinates, encodes PNG, and deduplicates repeated image requests', async () => {
    const { getMockAvatarPng } = await import('./avatar-images');
    const first = getMockAvatarPng(3);
    expect(getMockAvatarPng(3)).toBe(first);
    expect(new Uint8Array(await first)).toEqual(png);
    await getMockAvatarPng(24);
    await getMockAvatarPng(3);
    expect(decode).toHaveBeenCalledTimes(1);
    expect(drawImage.mock.calls[0]!.slice(1)).toEqual([421, 0, 210, 210, 0, 0, 210, 210]);
    expect(drawImage.mock.calls[1]!.slice(1)).toEqual([1054, 632, 210, 210, 0, 0, 210, 210]);
    expect(encode).toHaveBeenCalledTimes(2);
    expect(encode.mock.calls[0]![1]).toBe('image/png');
  });

  it('returns binary image/png directly without the JSON API envelope', async () => {
    const { avatarsHandlers } = await import('./handlers/avatars');
    const response = await getResponse(avatarsHandlers, imageRequest('user_3.png'));
    expect(response?.status).toBe(200);
    expect(response?.headers.get('Content-Type')).toBe('image/png');
    expect(response?.headers.get('Cache-Control')).toBe('public, max-age=86400');
    expect(new Uint8Array(await response!.arrayBuffer())).toEqual(png);
  });

  it('rejects unknown numbers and malformed names without loading the sheet', async () => {
    const { avatarsHandlers } = await import('./handlers/avatars');
    for (const filename of [
      'user_0.png',
      'user_25.png',
      'user_03.png',
      'user_3.webp',
      'unknown.png',
    ]) {
      const response = await getResponse(avatarsHandlers, imageRequest(filename));
      expect(response?.status).toBe(404);
    }
    expect(decode).not.toHaveBeenCalled();
  });

  it('does not retain a failed source load and retries on the next request', async () => {
    decode.mockRejectedValueOnce(new Error('Offline'));
    const { getMockAvatarPng } = await import('./avatar-images');
    await expect(getMockAvatarPng(3)).rejects.toThrow('Offline');
    expect(new Uint8Array(await getMockAvatarPng(3))).toEqual(png);
    expect(decode).toHaveBeenCalledTimes(2);
  });

  it('returns an uncached error if encoding fails and can recover', async () => {
    encode.mockImplementationOnce((callback: BlobCallback) => callback(null));
    const { avatarsHandlers } = await import('./handlers/avatars');
    const request = imageRequest('user_3.png');
    const failed = await getResponse(avatarsHandlers, request);
    expect(failed?.status).toBe(500);
    expect(failed?.headers.get('Cache-Control')).toBe('no-store');
    const recovered = await getResponse(avatarsHandlers, request);
    expect(recovered?.status).toBe(200);
  });
});
