// @vitest-environment jsdom
import { readFileSync } from 'node:fs';

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
  it('maps each user to a unique avatar route and an available WebP asset', () => {
    const entries = Object.entries(systemPresetAvatarManifest);
    for (const [userId, { apiId, source }] of entries) {
      const filename = source.split('/').at(-1)!;
      expect(users.find((user) => user.id === userId)?.avatarUrl).toBe(
        `/api/v1/avatars/${apiId}.webp`,
      );

      const image = readFileSync(new URL(filename, presetsDirectory));
      expect(image.subarray(0, 4).toString()).toBe('RIFF');
      expect(image.subarray(8, 12).toString()).toBe('WEBP');
    }
    expect(new Set(entries.map(([userId]) => userId))).toEqual(
      new Set(users.map((user) => user.id)),
    );
    expect(new Set(entries.map(([, preset]) => preset.source)).size).toBe(users.length);
    expect(new Set(entries.map(([, preset]) => preset.apiId)).size).toBe(users.length);
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
    expect(fetchAsset).toHaveBeenCalledTimes(Object.keys(systemPresetAvatarManifest).length);
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
