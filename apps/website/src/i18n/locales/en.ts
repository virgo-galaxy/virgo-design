export const en = {
  common: {
    reset: 'Reset',
    live: 'LIVE',
    lightMode: 'Light mode',
    darkMode: 'Dark mode',
    explorePalette: 'Explore full palette',
    buildTheme: 'Build theme',
    colorCopied: '{{token}} copied: {{value}}',
  },

  navigation: {
    label: 'Primary navigation',
    foundations: 'Foundations',
    tokens: 'Tokens',
    components: 'Components',
    resources: 'Resources',
  },

  foundationNavigation: {
    label: 'Foundation categories',
    colors: 'Colors',
    typography: 'Typography',
    layout: 'Layout',
    shapeDepth: 'Shape & Depth',
    motion: 'Motion',
  },

  foundationPages: {
    eyebrow: 'FOUNDATIONS V1',
    colors: {
      title: 'Colors',
      description:
        'A complete, systematic, and extensible color foundation with 140 colors across chromatic, brand, and neutral scales.',
      foundationColors: 'Foundation colors',
      chromaticFamilies: 'Chromatic families',
      brandScale: 'Brand scale',
      neutralScale: 'Neutral scale',
      journey: {
        create: 'Create',
        createDescription: 'Palette and color controls',
        explore: 'Explore',
        exploreDescription: 'Colors in motion',
        export: 'Export',
        exportDescription: 'Themes and production code',
        summary: 'Move from foundations to application through Virgo Design’s color system.',
        detail:
          'Create and inspect colors across three stages, then generate design tokens and code ready for products.',
      },
    },
    typography: {
      title: 'Typography',
      description:
        'Raw type materials for font family, size, weight, line height, and letter spacing. Semantic text styles are intentionally not defined here.',
      fontFamily: 'Font Family',
      fontFamilyDescription: 'The two platform-aware stacks used by Virgo Design.',
      fontSize: 'Font Size',
      fontWeight: 'Font Weight',
      lineHeight: 'Line Height',
      letterSpacing: 'Letter Spacing',
    },
    layout: {
      title: 'Layout',
      description:
        'Spacing controls the distance between elements. Sizing controls the dimensions of the elements themselves.',
      spacing: 'Spacing',
      spacingDescription: 'Foundation values for padding, margin, gap, and spatial rhythm.',
      sizing: 'Sizing',
      sizingDescription: 'Raw dimensions for future icons, controls, avatars, and handles.',
    },
    shapeDepth: {
      title: 'Shape & Depth',
      description:
        'Border, radius, elevation, and opacity primitives for constructing surfaces without assigning component meaning.',
      borderWidth: 'Border Width',
      borderStyle: 'Border Style',
      radius: 'Radius',
      elevation: 'Elevation',
      elevationDescription: 'Six raw depth levels. Components do not receive elevation roles here.',
      opacity: 'Opacity',
    },
    motion: {
      title: 'Motion',
      description:
        'A compact set of duration and easing materials. Choreographed product animations remain outside Foundations.',
      duration: 'Duration',
      durationDescription: 'Hover each track to compare the six duration values.',
      easing: 'Easing',
      easingDescription: 'Hover each card to compare the five timing curves.',
    },
  },

  tokensPage: {
    eyebrow: 'TOKENS · COLOR SEMANTIC V1',
    title: 'Color with meaning',
    description:
      'One semantic vocabulary resolved into two production themes. Inspect every role in real interface, interaction, status, and data-visualization contexts.',
    semanticRoles: 'semantic roles',
    colorGroups: 'color groups',
    resolvedThemes: 'resolved themes',
    validationTitle: 'Visual validation surface',
    validationDescription:
      'All values below come directly from @virgo-design/tokens. Use this page to validate contrast, hierarchy, state behavior, and data-series separation before V1 is frozen.',
    comparisonLabel: 'Light and dark Color Semantic comparison',
    themeLabel: 'Resolved theme',
    light: {
      title: 'Light',
      description:
        'Neutral daylight canvas with shadow-led elevation and deeper interaction colors.',
    },
    dark: {
      title: 'Dark',
      description:
        'Graphite canvas with brighter elevated surfaces and light-forward interactions.',
    },
    groups: {
      interface: 'Text · Surface · Border · Icon · Fill',
      brand: 'Brand interactions',
      status: 'Status communication',
      data: 'Data visualization',
    },
    interfaceDescription: 'A working product shell using five semantic groups together.',
    brandDescription: 'Primary, hover, active, subtle, link, foreground, and focus roles.',
    statusDescription: 'Alerts combine accent, foreground, subtle, border, and text roles.',
    dataDescription: 'Categorical, sequential, and diverging roles represent the data itself.',
    workspaceTitle: 'Design review',
    workspaceMeta: 'Shared with Product · Updated now',
    documentTitle: 'Semantic colors in practice',
    documentBody:
      'Roles stay stable while each theme resolves them to a different foundation color.',
    documentMeta: 'Metadata uses tertiary text · Body uses secondary text',
    placeholder: 'Invite a collaborator…',
    save: 'Invite',
    disabledContent: 'Archived projects are read only',
    quickActions: 'Quick actions',
    open: 'Open',
    createProject: 'Create project',
    hover: 'Hover',
    active: 'Active',
    selected: 'Selected',
    linkExample: 'View token source',
    fill: {
      default: 'Default',
      hover: 'Hover',
      active: 'Active',
      selected: 'Selected',
      'selected-hover': 'Selected hover',
      disabled: 'Disabled',
    },
    status: {
      success: 'Published',
      successMessage: 'Changes are live for everyone.',
      warning: 'Review needed',
      warningMessage: 'Two fields still need attention.',
      danger: 'Sync failed',
      dangerMessage: 'Reconnect before trying again.',
      info: 'New version',
      infoMessage: 'A semantic update is available.',
      live: 'Live',
    },
    data: {
      categorical: 'Acquisition channels',
      sequential: 'Weekly intensity',
      diverging: 'Net change',
      series: 'series',
      lowHigh: 'Low → High',
      negativePositive: 'Negative ← 0 → Positive',
      loss: 'Loss',
      profit: 'Profit',
    },
  },

  hero: {
    eyebrow: '01 · CREATE',
    title: 'Color Studio',
    description:
      '140 foundation colors. Twelve chromatic families, one brand scale, one neutral scale.',
  },

  settings: {
    eyebrow: 'SETTINGS',
    title: 'Palette Engine',

    paletteMode: 'Palette Mode',
    modeOfficial: 'Official',
    modeLinked: 'Generate',
    modeCustom: 'Custom',
    modeOfficialDescription: 'Use Virgo Design’s frozen twelve-family chromatic foundation.',
    modeLinkedDescription: 'Generate all twelve families from one temporary palette anchor.',
    modeCustomDescription: 'Edit all twelve family base colors independently.',

    modeOfficialNote: 'Virgo Chromatic Foundation V1',
    modeOfficialNoteDescription: '12 frozen base hues · OKLCH ten-step tonal scales',
    modeLinkedNote: 'Linked Generation',
    modeLinkedNoteDescription: 'One temporary anchor generates all twelve hue families.',
    modeCustomNote: 'Independent Families',
    modeCustomNoteDescription: 'Each family uses its own editable step-6 base color.',

    officialControlsHint:
      'Official mode uses the frozen Virgo palette. Switch to Generate to use hue distribution controls.',
    customControlsHint:
      'Custom mode edits each family directly. Hue distribution controls are not applied.',

    paletteAnchor: 'Palette Anchor',
    paletteAnchorHint:
      'Choose a temporary anchor when Linked Palette is enabled. Virgo Design Official keeps its frozen chromatic bases separately.',

    linkedPalette: 'Linked Palette',
    linkedOn: 'One anchor drives all families',
    linkedOff: 'Every family base is editable',

    colorModel: 'Color Model',
    recommended: 'OKLCH recommended',

    hueSpread: 'Hue Spread',
    distributionCurve: 'Distribution Curve',

    familyEditorEyebrow: 'INDEPENDENT',
    familyEditorTitle: 'Family Editor',
    familyEditorDescription:
      'Edit each family base independently. Every value remains step 6 of its tonal scale.',

    independentHint:
      'Linked palette is off. Hue spread and distribution no longer control the families.',

    independentMode: 'Independent Families',
    independentDescription: 'Each family now uses its own step-6 base color.',

    familyBases: 'Family Bases',
    step6: 'Step 6',

    official: 'Virgo Chromatic Foundation V1',
    officialDescription: '12 frozen base hues · individually editable · OKLCH tonal scales',
    linkedMode: 'Linked Generation',
    linkedModeDescription: 'One temporary anchor generates all twelve hue families.',
  },

  preview: {
    eyebrow: 'PREVIEW',
    title: 'Color Families',
    paletteAnchor: 'Palette Anchor',
    foundationEyebrow: 'OFFICIAL FOUNDATION',
    foundationTitle: 'Twelve frozen chromatic bases',
    foundationDescription: 'No brand color is embedded in this foundation palette.',
    customEyebrow: 'CUSTOM FOUNDATION',
    customTitle: 'Twelve independent chromatic bases',
    customDescription: 'Each family base is edited directly while tonal scales remain generated.',
    selectedFamily: 'Selected family',
    previousFamilies: 'Previous color families',
    nextFamilies: 'Next color families',
    copyStep: 'Copy {{family}} step {{step}}',
  },

  extensions: {
    swipeHint: 'SWIPE HORIZONTALLY',
    algorithm: 'Algorithm',
    brand: {
      eyebrow: 'BRAND FOUNDATION',
      title: 'Brand',
      description:
        'A dedicated ten-step brand scale. The official base is #1664F9; changing it regenerates the scale with the standard OKLCH algorithm.',
      base: 'Brand Base',
    },
    neutral: {
      eyebrow: 'NEUTRAL FOUNDATION',
      title: 'Neutral',
      description:
        'A ten-step cool graphite scale for backgrounds, surfaces, borders and text. The official base is #5E616D.',
      base: 'Neutral Base',
    },
  },

  foundations: {
    brand: 'Brand',
    neutral: 'Neutral',
  },

  gallery: {
    eyebrow: '02 · EXPLORE',
    title: 'Colors in Motion',
    description:
      'Twelve chromatic families, Brand and Neutral unfold into 140 foundation colors. Click any group to inspect its ten-step scale.',
    colorFamilies: 'Foundation color groups',
    selectedFamily: 'Foundation group',
    baseColor: 'Base color',
    tonalScale: '10-step tonal scale',
    kinds: {
      chromatic: 'CHROMATIC FAMILY',
      brand: 'BRAND FOUNDATION',
      neutral: 'NEUTRAL FOUNDATION',
    },
  },

  themeBuilder: {
    eyebrow: '03 · EXPORT',
    title: 'Theme Builder',
    description: 'Turn the 140-color foundation into semantic tokens and production-ready code.',
    staticExport: 'Static export',

    configureEyebrow: 'THEME',
    configureTitle: 'Semantic Mapping',
    themeName: 'Theme name',
    prefix: 'Token prefix',
    light: 'Light',
    dark: 'Dark',

    semanticColors: 'Semantic Colors',
    semanticDescription: 'Editing the {{theme}} semantic mapping.',
    family: 'Family',
    step: 'Step',

    roles: {
      primary: 'Primary',
      success: 'Success',
      warning: 'Warning',
      danger: 'Danger',
      info: 'Info',
      link: 'Link',
      focus: 'Focus',
    },

    exportEyebrow: 'EXPORT',
    exportTitle: 'Production Code',
    scaleNaming: 'Scale naming',
    copy: 'Copy',
    copied: 'Copied',
    staticNote:
      'Exports contain all 140 foundation colors plus light and dark semantic mappings. Production projects do not need the Virgo Design color engine at runtime.',
  },

  footer: {
    nextSections: 'Full palette and semantic themes will follow in the next sections.',
  },

  families: {
    red: 'Red',
    vermilion: 'Vermilion',
    orange: 'Orange',
    amber: 'Amber',
    yellow: 'Yellow',
    chartreuse: 'Chartreuse',
    green: 'Green',
    teal: 'Teal',
    blue: 'Blue',
    indigo: 'Indigo',
    violet: 'Violet',
    magenta: 'Magenta',
  },
} as const;
