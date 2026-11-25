import { iconManifest } from './catalogue';

type IconFamily = (typeof iconManifest)[number]['family'];

const relatedGroups: readonly (readonly IconFamily[])[] = [
  // Navigation and directions
  ['arrow-down', 'arrow-left', 'arrow-right', 'arrow-up'],
  ['chevron-down', 'chevron-left', 'chevron-right', 'chevron-up'],
  ['chevrons-down', 'chevrons-left', 'chevrons-right', 'chevrons-up'],
  ['arrow-down', 'chevron-down', 'chevrons-down'],
  ['arrow-left', 'chevron-left', 'chevrons-left'],
  ['arrow-right', 'chevron-right', 'chevrons-right'],
  ['arrow-up', 'chevron-up', 'chevrons-up'],
  ['arrow-enter', 'arrow-return'],
  ['arrow-return', 'arrow-left', 'chevron-left', 'home'],
  ['external-link', 'globe', 'home'],
  ['home', 'dashboard', 'layout'],

  // Layout and interaction
  ['align-center', 'align-left', 'align-right'],
  ['align-center', 'align-left', 'align-right', 'file-text'],
  ['dashboard', 'widgets', 'layout', 'layers'],
  ['sidebar-collapse', 'sidebar-expand', 'layout', 'maximize', 'window-move'],
  ['layout', 'sidebar-collapse', 'sidebar-expand'],
  ['sidebar-collapse', 'sidebar-expand', 'pin', 'unpin'],
  ['window-move', 'move', 'grip', 'cursor-arrow'],
  [
    'resize-corner-bottom-left',
    'resize-corner-bottom-right',
    'resize-corner-top-left',
    'resize-corner-top-right',
  ],
  [
    'resize-corner-bottom-left',
    'resize-corner-bottom-right',
    'resize-corner-top-left',
    'resize-corner-top-right',
    'window-move',
  ],
  ['ellipsis', 'ellipsis-vertical'],
  ['ellipsis', 'ellipsis-vertical', 'filter', 'sort', 'settings'],
  ['pin', 'unpin', 'window-move'],

  // Files, data, and tools
  ['file-text', 'receipt', 'form', 'folder'],
  ['file-text', 'folder', 'download', 'upload'],
  ['edit', 'file-text', 'form', 'copy'],
  ['upload', 'download', 'folder', 'cloud'],
  ['cloud', 'database', 'folder'],
  ['search', 'filter', 'reset', 'sort'],
  ['database', 'filter', 'sort'],
  ['chart-line', 'dashboard', 'gauge', 'widgets'],
  ['code', 'github', 'external-link'],
  ['code', 'file-text'],
  ['briefcase', 'folder'],
  ['briefcase', 'dashboard'],
  ['file-text', 'folder', 'trash'],
  ['file-text', 'edit'],
  ['file-text', 'folder'],

  // People, messages, and status
  ['user', 'users', 'gender-female', 'gender-male'],
  ['gender-female', 'gender-male'],
  ['user', 'users', 'log-out', 'lock', 'unlock'],
  ['lock', 'unlock', 'log-out'],
  ['mail', 'mail-open', 'bell'],
  ['bell', 'triangle-alert', 'circle-info'],
  ['circle-check', 'circle-info', 'circle-x', 'triangle-alert'],
  ['check', 'circle-check', 'receipt'],
  ['close', 'circle-x'],
  ['close', 'check'],
  ['plus', 'minus'],
  ['eye', 'eye-closed'],
  ['eye', 'eye-closed', 'lock', 'unlock'],
  ['calendar', 'clock'],
  ['calendar', 'clock', 'bell'],
  ['play', 'pause', 'stop'],
  ['play', 'pause', 'stop', 'microphone'],

  // Devices, languages, and appearance
  ['monitor', 'monitor-plug', 'network-neighborhood'],
  ['monitor', 'apple', 'linux', 'windows'],
  ['monitor-plug', 'network-neighborhood', 'cloud', 'database'],
  ['monitor', 'maximize', 'window-move'],
  ['monitor', 'sun', 'moon'],
  ['settings', 'monitor', 'palette', 'shirt', 'sun', 'moon'],
  ['settings', 'filter', 'reset', 'sort'],
  ['language', 'language-en', 'language-ja', 'language-ko', 'language-tw', 'language-zh'],
  ['language', 'globe'],
  ['language-tw', 'language-zh'],
  ['bot', 'grok-bot', 'ai', 'sparkles'],
  ['ai', 'sparkles', 'studio-tools'],
  ['studio-tools', 'shapes', 'spline', 'palette', 'type', 'layers'],
  ['virgo-design', 'studio-tools', 'palette', 'type', 'shapes'],
  ['cybertruck', 'gauge'],
  ['x-twitter', 'twitter'],
  ['monitor', 'settings'],
  ['settings', 'reset'],
  ['palette', 'shirt'],
  ['type', 'file-text'],
  ['studio-tools', 'shapes', 'spline'],
  ['moon', 'sun'],
];

const familyIcons = iconManifest.filter((icon) => icon.id === icon.family);
const collator = new Intl.Collator('en', { sensitivity: 'base', numeric: true });

export function getRelatedIcons(family: IconFamily) {
  const scores = new Map<IconFamily, number>();
  for (const group of relatedGroups) {
    if (!group.includes(family)) continue;
    // Small groups carry more weight so close matches survive the display limit.
    const weight = 1 / (group.length - 1);
    for (const related of group) {
      if (related !== family) scores.set(related, (scores.get(related) ?? 0) + weight);
    }
  }

  return familyIcons
    .flatMap((icon) => {
      const score = scores.get(icon.family);
      return score === undefined ? [] : [{ icon, score }];
    })
    .sort((a, b) => b.score - a.score || collator.compare(a.icon.id, b.icon.id))
    .slice(0, 6)
    .map(({ icon }) => icon)
    .sort((a, b) => collator.compare(a.id, b.id));
}
