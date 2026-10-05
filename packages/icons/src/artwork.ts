import { GrokBotIcon } from './artwork/GrokBotIcon.js';
import type { IconManifestEntry } from './contract.js';

export { artworkIconSvgSources } from './artwork/assets.js';
export { GrokBotIcon, type GrokBotIconProps } from './artwork/GrokBotIcon.js';

/** Original illustrations retain their colors independently of currentColor icons. */
export const artworkIconManifest = [
  {
    id: 'grok-bot',
    family: 'grok-bot',
    variant: 'color',
    category: 'brands',
    tags: ['grok', 'bot', 'robot', 'avatar', 'silver', 'gradient'],
    aliases: ['grok-robot', 'silver-bot'],
    status: 'stable',
    description: 'The original silver bot artwork, scaled proportionally.',
    animated: false,
    componentName: 'GrokBotIcon',
  },
] as const satisfies readonly IconManifestEntry[];

export const artworkIconComponents = { 'grok-bot': GrokBotIcon } as const;
