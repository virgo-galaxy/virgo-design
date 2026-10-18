import beachAsset from '@/assets/landscapes/beach.webp';
import glacierAsset from '@/assets/landscapes/glacier.webp';
import oceanAsset from '@/assets/landscapes/ocean.webp';
import starlightAsset from '@/assets/landscapes/starlight.webp';
import volcanoAsset from '@/assets/landscapes/volcano.webp';

const beach = beachAsset.src;
const glacier = glacierAsset.src;
const ocean = oceanAsset.src;
const starlight = starlightAsset.src;
const volcano = volcanoAsset.src;

export const workplaceImages = [
  {
    id: 'starlight',
    src: starlight,
  },
  {
    id: 'glacier',
    src: glacier,
  },
  {
    id: 'ocean',
    src: ocean,
  },
  {
    id: 'beach',
    src: beach,
  },
  {
    id: 'volcano',
    src: volcano,
  },
] as const;
