import afroCreamBlouseAsset from '@/assets/avatars/afro-cream-blouse.webp';
import auburnHairSageKnitAsset from '@/assets/avatars/auburn-hair-sage-knit.webp';
import blondeBobCreamShirtAsset from '@/assets/avatars/blonde-bob-cream-shirt.webp';
import bobBlueShirtAsset from '@/assets/avatars/bob-blue-shirt.webp';
import braidsOliveBlouseAsset from '@/assets/avatars/braids-olive-blouse.webp';
import centerPartTaupeShirtAsset from '@/assets/avatars/center-part-taupe-shirt.webp';
import croppedHairNavyKnitAsset from '@/assets/avatars/cropped-hair-navy-knit.webp';
import curlsCharcoalOvershirtAsset from '@/assets/avatars/curls-charcoal-overshirt.webp';
import curlsNavyShirtAsset from '@/assets/avatars/curls-navy-shirt.webp';
import curlsSlateKnitAsset from '@/assets/avatars/curls-slate-knit.webp';
import curlyBobBlueBlouseAsset from '@/assets/avatars/curly-bob-blue-blouse.webp';
import fringeSlateShirtAsset from '@/assets/avatars/fringe-slate-shirt.webp';
import ponytailCreamKnitAsset from '@/assets/avatars/ponytail-cream-knit.webp';
import ponytailCreamShirtAsset from '@/assets/avatars/ponytail-cream-shirt.webp';
import shortHairCharcoalPoloAsset from '@/assets/avatars/short-hair-charcoal-polo.webp';
import sidePartBlueShirtAsset from '@/assets/avatars/side-part-blue-shirt.webp';
import sidePartSandOvershirtAsset from '@/assets/avatars/side-part-sand-overshirt.webp';
import straightHairTerracottaKnitAsset from '@/assets/avatars/straight-hair-terracotta-knit.webp';
import texturedHairOliveOvershirtAsset from '@/assets/avatars/textured-hair-olive-overshirt.webp';
import twistsBlueShirtAsset from '@/assets/avatars/twists-blue-shirt.webp';
import wavesBeigeShirtAsset from '@/assets/avatars/waves-beige-shirt.webp';
import wavesRoseTopAsset from '@/assets/avatars/waves-rose-top.webp';
import wavesSageBlouseAsset from '@/assets/avatars/waves-sage-blouse.webp';
import wavesSagePoloAsset from '@/assets/avatars/waves-sage-polo.webp';

const afroCreamBlouse = afroCreamBlouseAsset.src;
const auburnHairSageKnit = auburnHairSageKnitAsset.src;
const blondeBobCreamShirt = blondeBobCreamShirtAsset.src;
const bobBlueShirt = bobBlueShirtAsset.src;
const braidsOliveBlouse = braidsOliveBlouseAsset.src;
const centerPartTaupeShirt = centerPartTaupeShirtAsset.src;
const croppedHairNavyKnit = croppedHairNavyKnitAsset.src;
const curlsCharcoalOvershirt = curlsCharcoalOvershirtAsset.src;
const curlsNavyShirt = curlsNavyShirtAsset.src;
const curlsSlateKnit = curlsSlateKnitAsset.src;
const curlyBobBlueBlouse = curlyBobBlueBlouseAsset.src;
const fringeSlateShirt = fringeSlateShirtAsset.src;
const ponytailCreamKnit = ponytailCreamKnitAsset.src;
const ponytailCreamShirt = ponytailCreamShirtAsset.src;
const shortHairCharcoalPolo = shortHairCharcoalPoloAsset.src;
const sidePartBlueShirt = sidePartBlueShirtAsset.src;
const sidePartSandOvershirt = sidePartSandOvershirtAsset.src;
const straightHairTerracottaKnit = straightHairTerracottaKnitAsset.src;
const texturedHairOliveOvershirt = texturedHairOliveOvershirtAsset.src;
const twistsBlueShirt = twistsBlueShirtAsset.src;
const wavesBeigeShirt = wavesBeigeShirtAsset.src;
const wavesRoseTop = wavesRoseTopAsset.src;
const wavesSageBlouse = wavesSageBlouseAsset.src;
const wavesSagePolo = wavesSagePoloAsset.src;

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
