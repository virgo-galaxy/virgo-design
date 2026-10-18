import { getProfile, patchProfile } from '@/server/demo/handlers/profile';
import { demoRoute } from '@/server/demo/route';

export const runtime = 'nodejs';

export const GET = demoRoute(getProfile('identity'));
export const PATCH = demoRoute(patchProfile('identity'));
