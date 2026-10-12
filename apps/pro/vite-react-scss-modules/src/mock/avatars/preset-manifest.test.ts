// @vitest-environment jsdom
import { readdirSync, readFileSync } from 'node:fs';

import { getResponse } from 'msw';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { users } from '../fixtures/team';
import { avatarsHandlers } from '../handlers/avatars';
import { systemPresetAvatarManifest } from './preset-manifest';

const moduleUrl = import.meta.url;
const presetsDirectory = new URL('../../assets/avatars/presets/', moduleUrl);
const fetchAsset = vi.fn(async (request: Request) => {
  const filename = new URL(request.url).pathname.split('/').at(-1)!;
  return new Response(readFileSync(new URL(filename, presetsDirectory)), {
    headers: { 'Content-Type': 'image/webp' },
  });
});

function avatarRequest(filename: string) {
  return new Request(new URL(`/api/v1/avatars/${filename}`, window.location.href));
}

beforeEach(() => {
  fetchAsset.mockClear();
  vi.stubGlobal('fetch', fetchAsset);
});
afterEach(() => vi.unstubAllGlobals());

describe('system preset avatars', () => {
  it('maps all 24 users to distinct, opaque 512 × 512 WebP files without metadata', () => {
    const entries = Object.entries(systemPresetAvatarManifest);
    const filenames = entries.map(([userId, { apiId, source }]) => {
      const filename = source.split('/').at(-1)!;
      expect(users.find((user) => user.id === userId)?.avatarUrl).toBe(
        `/api/v1/avatars/${apiId}.webp`,
      );

      const image = readFileSync(new URL(filename, presetsDirectory));
      expect(image.subarray(0, 4).toString()).toBe('RIFF');
      expect(image.subarray(8, 12).toString()).toBe('WEBP');
      // These opaque lossy assets need only a VP8 frame, with no EXIF/XMP/ICC/alpha chunks.
      expect(image.subarray(12, 16).toString()).toBe('VP8 ');
      expect(image.readUInt32LE(4) + 8).toBe(image.length);
      expect(image.readUInt32LE(16) + 20 + (image.readUInt32LE(16) % 2)).toBe(image.length);
      expect(image.subarray(23, 26)).toEqual(Buffer.from([0x9d, 0x01, 0x2a]));
      expect(image.readUInt16LE(26) & 0x3fff).toBe(512);
      expect(image.readUInt16LE(28) & 0x3fff).toBe(512);
      return filename;
    });
    expect(entries).toHaveLength(24);
    expect(new Set(entries.map(([, preset]) => preset.source)).size).toBe(24);
    expect(new Set(entries.map(([, preset]) => preset.apiId)).size).toBe(24);
    expect(
      readdirSync(presetsDirectory)
        .filter((name) => name.endsWith('.webp'))
        .sort(),
    ).toEqual(filenames.sort());
  });

  it('serves the original WebP bytes for every preset without a JSON envelope', async () => {
    for (const { apiId, source } of Object.values(systemPresetAvatarManifest)) {
      const response = await getResponse(avatarsHandlers, avatarRequest(`${apiId}.webp`));
      expect(response?.status).toBe(200);
      expect(response?.headers.get('Content-Type')).toBe('image/webp');
      expect(response?.headers.get('Cache-Control')).toBe('public, max-age=86400');
      const filename = source.split('/').at(-1)!;
      expect(Buffer.from(await response!.arrayBuffer())).toEqual(
        readFileSync(new URL(filename, presetsDirectory)),
      );
    }
    expect(fetchAsset).toHaveBeenCalledTimes(24);
  });

  it('rejects unknown and malformed preset names without fetching an asset', async () => {
    for (const filename of [
      'user_0.webp',
      'user_25.webp',
      'user_03.webp',
      'user_3.jpg',
      'user_3.png',
      'user_3.webp.png',
      'unknown.webp',
    ]) {
      expect((await getResponse(avatarsHandlers, avatarRequest(filename)))?.status).toBe(404);
    }
    expect(fetchAsset).not.toHaveBeenCalled();
  });

  it('does not cache unavailable assets and recovers on a later request', async () => {
    fetchAsset.mockResolvedValueOnce(new Response(null, { status: 404 }));
    const failed = await getResponse(avatarsHandlers, avatarRequest('user_3.webp'));
    expect(failed?.status).toBe(500);
    expect(failed?.headers.get('Cache-Control')).toBe('no-store');
    expect((await getResponse(avatarsHandlers, avatarRequest('user_3.webp')))?.status).toBe(200);
    fetchAsset.mockRejectedValueOnce(new Error('Offline'));
    expect((await getResponse(avatarsHandlers, avatarRequest('user_3.webp')))?.status).toBe(500);
  });
});
