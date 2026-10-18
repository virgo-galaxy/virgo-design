import { bypass, http, HttpResponse } from 'msw';

import { getSystemPresetAvatar } from '../../avatars/preset-manifest';
import { endpoint } from '../../http/response';

export const avatarsHandlers = [
  http.get(endpoint('/avatars/:filename'), async ({ params, request }) => {
    const source =
      typeof params.filename === 'string' ? getSystemPresetAvatar(params.filename) : undefined;

    if (!source) return new HttpResponse(null, { status: 404 });

    try {
      const image = await fetch(bypass(new URL(source, request.url)));

      if (!image.ok) throw new Error('Preset avatar asset is unavailable');

      return HttpResponse.arrayBuffer(await image.arrayBuffer(), {
        headers: {
          'Content-Type': 'image/webp',
          'Cache-Control': 'public, max-age=86400',
        },
      });
    } catch {
      return new HttpResponse(null, { status: 500, headers: { 'Cache-Control': 'no-store' } });
    }
  }),
];
