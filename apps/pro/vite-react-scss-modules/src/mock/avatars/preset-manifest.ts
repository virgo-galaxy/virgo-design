import afroCreamBlouse from '@/assets/avatars/presets/afro-cream-blouse.webp';
import auburnHairSageKnit from '@/assets/avatars/presets/auburn-hair-sage-knit.webp';
import blondeBobCreamShirt from '@/assets/avatars/presets/blonde-bob-cream-shirt.webp';
import bobBlueShirt from '@/assets/avatars/presets/bob-blue-shirt.webp';
import braidsOliveBlouse from '@/assets/avatars/presets/braids-olive-blouse.webp';
import centerPartTaupeShirt from '@/assets/avatars/presets/center-part-taupe-shirt.webp';
import croppedHairNavyKnit from '@/assets/avatars/presets/cropped-hair-navy-knit.webp';
import curlsCharcoalOvershirt from '@/assets/avatars/presets/curls-charcoal-overshirt.webp';
import curlsNavyShirt from '@/assets/avatars/presets/curls-navy-shirt.webp';
import curlsSlateKnit from '@/assets/avatars/presets/curls-slate-knit.webp';
import curlyBobBlueBlouse from '@/assets/avatars/presets/curly-bob-blue-blouse.webp';
import fringeSlateShirt from '@/assets/avatars/presets/fringe-slate-shirt.webp';
import ponytailCreamKnit from '@/assets/avatars/presets/ponytail-cream-knit.webp';
import ponytailCreamShirt from '@/assets/avatars/presets/ponytail-cream-shirt.webp';
import shortHairCharcoalPolo from '@/assets/avatars/presets/short-hair-charcoal-polo.webp';
import sidePartBlueShirt from '@/assets/avatars/presets/side-part-blue-shirt.webp';
import sidePartSandOvershirt from '@/assets/avatars/presets/side-part-sand-overshirt.webp';
import straightHairTerracottaKnit from '@/assets/avatars/presets/straight-hair-terracotta-knit.webp';
import texturedHairOliveOvershirt from '@/assets/avatars/presets/textured-hair-olive-overshirt.webp';
import twistsBlueShirt from '@/assets/avatars/presets/twists-blue-shirt.webp';
import wavesBeigeShirt from '@/assets/avatars/presets/waves-beige-shirt.webp';
import wavesRoseTop from '@/assets/avatars/presets/waves-rose-top.webp';
import wavesSageBlouse from '@/assets/avatars/presets/waves-sage-blouse.webp';
import wavesSagePolo from '@/assets/avatars/presets/waves-sage-polo.webp';

export const systemPresetAvatarManifest = {
  ava: { apiId: 'user_1', source: wavesSageBlouse },
  leo: { apiId: 'user_2', source: curlsCharcoalOvershirt },
  nina: { apiId: 'user_3', source: ponytailCreamKnit },
  eli: { apiId: 'user_4', source: texturedHairOliveOvershirt },
  mira: { apiId: 'user_5', source: bobBlueShirt },
  owen: { apiId: 'user_6', source: curlsNavyShirt },
  hana: { apiId: 'user_7', source: ponytailCreamShirt },
  noah: { apiId: 'user_8', source: fringeSlateShirt },
  sara: { apiId: 'user_9', source: straightHairTerracottaKnit },
  luca: { apiId: 'user_10', source: sidePartSandOvershirt },
  maya: { apiId: 'user_11', source: curlyBobBlueBlouse },
  theo: { apiId: 'user_12', source: wavesSagePolo },
  james: { apiId: 'user_13', source: centerPartTaupeShirt },
  emma: { apiId: 'user_14', source: croppedHairNavyKnit },
  oliver: { apiId: 'user_15', source: afroCreamBlouse },
  sophia: { apiId: 'user_16', source: twistsBlueShirt },
  daniel: { apiId: 'user_17', source: braidsOliveBlouse },
  grace: { apiId: 'user_18', source: sidePartBlueShirt },
  lucas: { apiId: 'user_19', source: auburnHairSageKnit },
  isla: { apiId: 'user_20', source: shortHairCharcoalPolo },
  ethan: { apiId: 'user_21', source: blondeBobCreamShirt },
  chloe: { apiId: 'user_22', source: wavesBeigeShirt },
  henry: { apiId: 'user_23', source: wavesRoseTop },
  zoe: { apiId: 'user_24', source: curlsSlateKnit },
} as const;

export type SystemPresetUserId = keyof typeof systemPresetAvatarManifest;

export function getSystemPresetAvatar(filename: string): string | undefined {
  const match = /^(user_[1-9]\d*)\.webp$/.exec(filename);
  const id = match?.[1];
  return Object.values(systemPresetAvatarManifest).find((preset) => preset.apiId === id)?.source;
}
