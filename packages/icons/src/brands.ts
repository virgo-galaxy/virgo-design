import { VirgoDesignLogo } from './brands/VirgoDesignLogo.js';
import type { IconManifestEntry } from './contract.js';

export { brandIconSvgSources } from './brands/assets.js';
export { VirgoDesignLogo, type VirgoDesignLogoProps } from './brands/VirgoDesignLogo.js';

/** Colored brand resources share the catalogue while retaining their original artwork. */
export const brandIconManifest = [
  {
    id: 'virgo-design-color',
    family: 'virgo-design',
    variant: 'color',
    category: 'brands',
    tags: ['brand', 'logo', 'virgo', 'design', 'color', 'gradient'],
    aliases: ['virgo-color', 'virgo-logo-color'],
    status: 'stable',
    description: 'The original Virgo Design brand mark with its blue gradients and red dot.',
    animated: false,
    componentName: 'VirgoDesignLogo',
  },
] as const satisfies readonly IconManifestEntry[];

export const brandIconComponents = { 'virgo-design-color': VirgoDesignLogo } as const;
