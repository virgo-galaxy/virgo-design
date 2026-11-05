export const fontsEnUS = {
  title: 'Fonts',
  description:
    'Self-hosted sans-serif and monospace fonts for interfaces, multilingual content, and code.',
  catalogue: {
    title: 'Font preview',
    description: 'Choose a category, try your own text, and copy the CSS import for each family.',
    categories: 'Font categories',
    sans: 'Sans',
    mono: 'Mono',
    previewText: 'Preview text',
    placeholder: 'Type your own preview…',
    copyImport: 'Copy {{name}} import',
    copying: 'Copying…',
    copied: 'Import copied',
    copyFailed: 'Unable to copy. Try again.',
  },
  usage: {
    title: 'Installation and usage',
    description:
      'Import the font CSS, then apply its font-family. Font files are served by your application.',
    individual: 'Load individual families',
    metadata: 'Font metadata',
    metadataDescription:
      'The package exports family names for use in code. Importing metadata does not load the font CSS.',
    aggregate: 'Default font set',
    aggregateDescription:
      'default.css includes Inter, the five regional Noto Sans families, and JetBrains Mono. Use sans.css or mono.css to load every family in a category.',
  },
  internationalSans: {
    title: 'International Sans',
    description:
      'Locale-aware Sans stacks pair Inter for Latin glyphs with the corresponding Noto Sans family for CJK glyphs.',
    localeSelector: 'International sans locale',
    activeStack: 'Font family',
    locale: 'Locale',
    latin: 'Latin glyphs',
    script: 'Locale script',
    stack: 'Resolved font-family stack',
    locales: {
      latin: 'Latin',
      zhHans: 'Simplified Chinese',
      zhHantTW: 'Traditional Chinese · TW',
      zhHantHK: 'Traditional Chinese · HK',
      ja: 'Japanese',
      ko: 'Korean',
    },
  },
} as const;
