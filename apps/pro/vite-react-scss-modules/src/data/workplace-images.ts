import beach from '@/assets/beach.jpg';
import glacier from '@/assets/glacier.jpg';
import ocean from '@/assets/ocean.jpg';
import starlight from '@/assets/starlight.jpg';
import volcano from '@/assets/volcano.jpg';

export const workplaceImages = [
  {
    id: 'starlight',
    src: starlight,
    alt: 'The Milky Way stretching over an open mountain landscape.',
  },
  {
    id: 'glacier',
    src: glacier,
    alt: 'Blue Icelandic icebergs reflected in still glacial water.',
  },
  {
    id: 'ocean',
    src: ocean,
    alt: 'Ocean waves reaching a wide blue horizon.',
  },
  {
    id: 'beach',
    src: beach,
    alt: 'An aerial view of white sand, palm trees and turquoise ocean.',
  },
  {
    id: 'volcano',
    src: volcano,
    alt: 'An erupting volcano illuminating the night with flowing lava.',
  },
] as const;
