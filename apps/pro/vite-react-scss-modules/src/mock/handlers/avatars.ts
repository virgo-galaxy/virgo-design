import { http, HttpResponse } from 'msw';

import { getMockAvatarPng, mockAvatarId } from '../avatar-images';
import { endpoint } from '../response';

export const avatarsHandlers = [
  http.get(endpoint('/avatars/:filename'), async ({ params }) => {
    const id = typeof params.filename === 'string' ? mockAvatarId(params.filename) : undefined;
    if (id === undefined) return new HttpResponse(null, { status: 404 });
    try {
      const png = await getMockAvatarPng(id);
      return HttpResponse.arrayBuffer(png, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=86400',
        },
      });
    } catch {
      return new HttpResponse(null, { status: 500, headers: { 'Cache-Control': 'no-store' } });
    }
  }),
];
