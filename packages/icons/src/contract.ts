export const iconCategories = [
  'actions',
  'navigation',
  'layout',
  'status',
  'system',
  'development',
  'design',
  'brands',
] as const;
export type IconCategory = (typeof iconCategories)[number];
export type IconMetadata = {
  id: string;
  category: IconCategory;
  tags: readonly string[];
  aliases: readonly string[];
  status: 'stable' | 'experimental' | 'deprecated';
  description: string;
  animated: boolean;
};
export type IconManifestEntry = IconMetadata & { componentName: string };
export function validateIconMetadata(
  records: readonly IconMetadata[],
  ids: readonly string[],
): void {
  if (
    !Array.isArray(records) ||
    !ids.length ||
    ids.some((id) => !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(id))
  )
    throw new Error('Expected metadata for lowercase kebab-case canonical names.');
  const names = new Set(ids);
  if (names.size !== ids.length) throw new Error('Duplicate canonical name.');
  const seen = new Set<string>();
  const terms = new Set(ids.map((id) => id.toLowerCase()));
  for (const record of records) {
    if (!record || !names.has(record.id) || seen.has(record.id))
      throw new Error(`Unknown or duplicate metadata: ${record?.id}.`);
    seen.add(record.id);
    if (
      !iconCategories.includes(record.category) ||
      !['stable', 'experimental', 'deprecated'].includes(record.status) ||
      !Array.isArray(record.tags) ||
      !Array.isArray(record.aliases) ||
      !record.tags.length ||
      typeof record.description !== 'string' ||
      !record.description.trim() ||
      typeof record.animated !== 'boolean'
    )
      throw new Error(`Invalid metadata: ${record.id}.`);
    const text = [record.id, ...record.tags, ...record.aliases, record.description ?? ''];
    if (
      text.some((term) => typeof term !== 'string' || /[^\x20-\x7E]/.test(term)) ||
      [...record.tags, ...record.aliases].some(
        (term) => !term.trim() || term !== term.trim() || term !== term.toLowerCase(),
      )
    )
      throw new Error(`Metadata must contain normalized English terms: ${record.id}.`);
    for (const alias of record.aliases) {
      if (terms.has(alias)) throw new Error(`Duplicate name / alias conflict: ${alias}.`);
      terms.add(alias);
    }
  }
  for (const id of ids) if (!seen.has(id)) throw new Error(`Missing metadata: ${id}.`);
}
export function searchIcons<T extends IconManifestEntry>(
  records: readonly T[],
  query: string,
  options: { category?: IconCategory; keywords?: Readonly<Record<string, readonly string[]>> } = {},
): T[] {
  const tokens = query.normalize('NFKC').trim().toLowerCase().split(/\s+/).filter(Boolean);
  return records
    .filter((icon) => {
      if (options.category && icon.category !== options.category) return false;
      const text = [
        icon.id,
        icon.id.replaceAll('-', ' '),
        icon.componentName,
        icon.category,
        ...icon.tags,
        ...icon.aliases,
        ...(options.keywords?.[icon.id] ?? []),
      ]
        .join(' ')
        .normalize('NFKC')
        .toLowerCase();
      return tokens.every((token) => text.includes(token));
    })
    .sort((a, b) => a.id.localeCompare(b.id, 'en', { sensitivity: 'base', numeric: true }));
}
