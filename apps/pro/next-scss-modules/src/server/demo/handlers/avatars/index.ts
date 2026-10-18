import 'server-only';

import { getSystemPresetAvatar } from '../../avatars/preset-manifest';
import type { DemoHandler } from '../../route';

export const getAvatarsFilename: DemoHandler = async ({ params, request }) => {
  const source = getSystemPresetAvatar(params.filename ?? '');
  if (!source) return new Response(null, { status: 404 });
  try {
    const image = await fetch(new URL(source, request.url), { cache: 'force-cache' });
    if (!image.ok) throw new Error('Preset avatar asset is unavailable');
    return new Response(await image.arrayBuffer(), {
      headers: { 'Content-Type': 'image/webp', 'Cache-Control': 'public, max-age=86400' },
    });
  } catch {
    return new Response(null, { status: 500, headers: { 'Cache-Control': 'no-store' } });
  }
};
