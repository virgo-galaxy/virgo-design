export const en = {
  common: {
    reset: 'Reset',
    live: 'LIVE',
    lightMode: 'Light mode',
    darkMode: 'Dark mode',
    explorePalette: 'Explore full palette',
    exportFoundationColors: 'Export foundation colors',
    colorCopied: '{{token}} copied: {{value}}',
  },

  navigation: {
    label: 'Primary navigation',
    foundations: 'Foundations',
    tokens: 'Tokens',
    components: 'Components',
    primitives: 'Primitives',
    resources: 'Resources',
  },

  foundationNavigation: {
    label: 'Foundation categories',
    colors: 'Colors',
    typography: 'Typography',
    layout: 'Layout',
    shapeDepth: 'Shape & Depth',
    motion: 'Motion',
    icons: 'Icons',
  },

  tokenNavigation: {
    label: 'Token categories',
    colors: 'Colors',
    typography: 'Typography',
  },

  tokenPages: {
    eyebrow: 'TOKENS V1',
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
        exportDescription: 'Foundation color code',
        summary: 'Explore Virgo Design’s Foundation color materials and their production export.',
        detail:
          'Create and inspect Foundation colors, then export the current scales for product implementation.',
      },
    },
    typography: {
      title: 'Typography',
      description:
        'Foundation specifications for font family, size, weight, and line height across Virgo Design.',
      fontFamily: 'Font Family',
      fontFamilyDescription:
        'The official Sans and Mono font roles and fallback stacks for Virgo Design.',
      fontFamilyRoles: {
        sans: 'Sans',
        mono: 'Mono',
      },
      fontFamilyStack: 'Font-family stack',
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
      fontSize: 'Font Size',
      fontWeight: 'Font Weight',
      lineHeight: 'Line Height',
      lineHeightDescription:
        'Foundation Scale · The four current Line Height tokens shown at their exact values.',
    },
    layout: {
      title: 'Layout',
      description:
        'Spacing controls the distance between elements. Sizing controls the dimensions of the elements themselves.',
      spacing: 'Spacing',
      spacingDescription: 'Foundation values for padding, margin, gap, and spatial rhythm.',
      sizing: 'Sizing',
      sizingDescription: 'Raw dimensions for future icons, controls, avatars, and handles.',
      preview: {
        eyebrow: 'SCALE PREVIEW',
        title: 'Scale preview',
        description:
          'Visualize the current Spacing and Sizing Foundation scales through neutral spacing and object-size examples.',
        sample: 'Content',
        spacing: {
          title: 'Spacing',
          description:
            'Padding and gap examples show individual Foundation values and their combinations.',
          padding: 'Padding comparison',
          gap: 'Gap comparison',
          combinations: 'Spacing combinations',
          combinationValues: 'Padding {{padding}} · Gap {{gap}}',
        },
        sizing: {
          title: 'Sizing',
          description:
            'These examples illustrate scale only and do not define component semantics.',
          heights: 'Height comparison',
          icons: 'Icon-like size comparison',
          objects: 'Small object size comparison',
          mediumLargeObjects: 'Medium and large object size comparison',
        },
      },
    },
    shapeDepth: {
      title: 'Shape & Depth',
      description:
        'Border, radius, and theme-aware elevation primitives for constructing surfaces without assigning component meaning.',
      borderWidth: 'Border Width',
      borderStyle: 'Border Style',
      radius: 'Radius',
      elevation: 'Elevation',
      elevationDescription:
        'Six stable elevation levels whose shadow rendering adapts to the active theme.',
      preview: {
        eyebrow: 'SCALE PREVIEW',
        title: 'Scale preview',
        description:
          'Visualize the current Border and Radius Foundation scales through neutral boundary and shape examples.',
        disclaimer: 'These examples illustrate scale only and do not define component semantics.',
        border: {
          title: 'Border',
          description: 'Compare boundary widths and styles on identical shapes.',
          widths: 'Border width comparison',
          styles: 'Border style comparison',
        },
        radius: {
          title: 'Radius',
          description:
            'Compare corner curvature at small and medium sizes, with full rounding shown separately.',
          small: 'Small shape radius',
          medium: 'Medium surface radius',
          full: 'Full radius',
        },
      },
      depthPreview: {
        eyebrow: 'SCALE PREVIEW',
        title: 'Depth',
        description: 'Visualize the active theme rendering for the six stable Elevation levels.',
        disclaimer: 'These examples illustrate scale only and do not define component semantics.',
        elevation: {
          title: 'Elevation',
          description:
            'Compare identical neutral surfaces with only their theme-aware elevation shadow changed.',
          scale: 'Elevation comparison',
          layered: 'Layered elevation comparison',
        },
      },
    },
    motion: {
      title: 'Motion',
      description:
        'A compact set of duration and easing materials. Choreographed product animations remain outside Foundations.',
      duration: 'Duration scale',
      durationDescription: 'A shared time scale makes the six duration values directly comparable.',
      easing: 'Easing curves',
      easingDescription: 'Each curve uses the same time and progress axes for direct comparison.',
      disclaimer:
        'These examples illustrate timing scales and motion curves only and do not define interaction semantics.',
    },
  },

  foundationColorExport: {
    eyebrow: '03 · EXPORT',
    title: 'Production Code',
    description: 'Export the current 140 Foundation colors without a Semantic Theme mapping.',
    format: 'Export format',
    scaleNaming: 'Scale naming',
    copy: 'Copy',
    copied: 'Copied',
    note: 'This export contains current Foundation colors only. Formal Color Semantic Tokens are documented under Tokens / Colors.',
  },

  tokensPage: {
    title: 'Color with meaning',
    description:
      'One semantic vocabulary resolved into two production themes. Inspect every role in real interface, interaction, status, and data-visualization contexts.',
    semanticRoles: 'semantic roles',
    colorGroups: 'color groups',
    resolvedThemes: 'resolved themes',
    sourceTitle: 'Token source',
    sourceDescription:
      'All values below resolve directly from @virgo-design/tokens across interface hierarchy, interaction states, status communication, and data visualization.',
    previewEyebrow: 'SEMANTIC COLOR',
    previewTitle: 'Resolved themes',
    previewDescription:
      'The same formal roles resolve from themes.light.color and themes.dark.color.',
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
    interfaceDescription: 'Five semantic color groups applied together in a product interface.',
    brandDescription: 'Primary, hover, active, subtle, link, foreground, and focus roles.',
    statusDescription:
      'Compare solid and subtle status pairs. Resolved colors come directly from tokens; solid text must meet WCAG AA 4.5:1.',
    statusReview: {
      families: { success: 'Success', warning: 'Warning', danger: 'Danger', info: 'Info' },
      contrast: 'Contrast',
      pass: 'AA pass',
      fail: 'AA fail',
      unavailable: 'Not evaluated',
      solidUsage: 'Strong surfaces · Tooltip, solid badge, status pill',
      subtleUsage: 'Low-emphasis surfaces · Alert, status card',
      indicator: 'Indicator pair · accent / foreground',
      indicatorUsage:
        'Accent highlights icons, indicators and validation borders. Foreground pairs with accent for compact filled markers; use solid / onSolid for text-bearing strong surfaces.',
    },
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
    export: {
      eyebrow: 'SEMANTIC EXPORT',
      title: 'Production Code',
      description:
        'CSS custom properties generated directly from the official Light and Dark Color Semantic themes.',
      copy: 'Copy',
      copied: 'Copied',
      note: 'This export is derived from @virgo-design/tokens themes. It does not create a Website-local semantic map.',
    },
  },

  tokensTypography: {
    title: 'Semantic Typography',
    description:
      'Formal Document and UI Typography roles resolved from @virgo-design/tokens for real content and interface hierarchy.',
    semanticTypography: {
      eyebrow: 'SEMANTIC TYPOGRAPHY',
      title: 'Document and UI semantic typography',
      description:
        'Formal Document and UI roles reference Typography Foundation values without duplicating the Foundation scale.',
      columns: {
        role: 'Semantic Token',
        fontFamily: 'Font Family',
        fontSize: 'Font Size',
        fontWeight: 'Font Weight',
        lineHeight: 'Line Height',
      },
      document: {
        title: 'Document Typography',
        description: 'Roles for editorial hierarchy, long-form reading, and supporting detail.',
      },
      ui: {
        title: 'UI Typography',
        description: 'Roles for product hierarchy, controls, labels, and dense interface content.',
      },
    },
    compositionPreview: {
      eyebrow: 'COMPOSITION PREVIEW',
      title: 'Typography in context',
      description:
        'Evaluate hierarchy, density, and reading rhythm in realistic document and product interface compositions.',
      document: {
        eyebrow: 'Document preview',
        title: 'Editorial hierarchy',
        description:
          'A continuous docs and article layout for comparing title, heading, body, and caption relationships in context.',
        kicker: 'Virgo Design · Tokens',
        titleLargeSample: 'Clear systems make ambitious work feel simple.',
        titleMediumSample: 'Typography foundations for durable interfaces',
        lead: 'A document needs more than a large title. Each level should guide attention without interrupting the flow of reading.',
        heading1: 'Build hierarchy before decoration',
        body1:
          'Typography gives structure to ideas before color, imagery, or motion enters the page. A dependable scale helps readers understand where they are and what deserves attention next.',
        heading2: 'Let the content set the rhythm',
        body2:
          'Headings create clear entry points while body text carries the argument. Their spacing and proportions should feel related, not mechanically repeated.',
        asideKicker: 'Reading principles',
        heading3: 'Clarity at every level',
        body3:
          'The same foundation should support a strong opening, a calm explanation, and the details readers return to later.',
        heading4: 'Make scanning effortless',
        body4: 'Distinct heading levels reveal the shape of a document at a glance.',
        heading5: 'Keep paragraphs comfortable',
        body5: 'Body text needs enough air to remain inviting through longer reading sessions.',
        heading6: 'Use captions with purpose',
        body6: 'Supporting details should stay legible without competing with the main narrative.',
        caption: 'Document typography · Resolved from Semantic Typography tokens.',
      },
      ui: {
        eyebrow: 'UI preview',
        title: 'Product interface hierarchy',
        description:
          'A workspace settings view for comparing display, title, body, label, meta, and control typography under real UI density.',
        workspace: 'Workspace',
        navigation: 'Workspace settings navigation',
        overview: 'Overview',
        members: 'Members',
        integrations: 'Integrations',
        billing: 'Billing',
        sidebarMeta: 'Virgo Design · Team plan',
        settings: 'Settings',
        pageTitle: 'Workspace settings',
        pageDescription: 'Manage identity, access, and collaboration defaults for your team.',
        save: 'Save changes',
        currentWorkspace: 'Current workspace',
        workspaceName: 'Virgo Design',
        workspaceMeta: 'Product Design · Updated moments ago',
        activeMembers: 'active members',
        general: 'General',
        generalDescription: 'The details teammates see throughout the workspace.',
        workspaceLabel: 'Workspace name',
        workspaceHint: 'Shown in navigation, invitations, and shared links.',
        slugLabel: 'Workspace URL',
        slugHint: 'virgo.design/workspaces/virgo-design',
        accessTitle: 'Member access',
        accessDescription: 'New members join with the permissions configured for their role.',
        private: 'Private',
        restricted: 'Invitation required',
      },
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
    modeOfficialDescription: 'Use Virgo Design’s official twelve-family chromatic foundation.',
    modeLinkedDescription: 'Generate all twelve families from one shared palette anchor.',
    modeCustomDescription: 'Edit all twelve family base colors independently.',

    modeOfficialNote: 'Virgo Chromatic Foundation V1',
    modeOfficialNoteDescription: '12 official base hues · OKLCH ten-step tonal scales',
    modeLinkedNote: 'Linked Generation',
    modeLinkedNoteDescription: 'One shared anchor generates all twelve hue families.',
    modeCustomNote: 'Independent Families',
    modeCustomNoteDescription: 'Each family uses its own editable step-6 base color.',

    officialControlsHint:
      'Official mode uses the Virgo foundation palette. Switch to Generate to use hue distribution controls.',
    customControlsHint:
      'Custom mode edits each family directly. Hue distribution controls are not applied.',

    paletteAnchor: 'Palette Anchor',
    paletteAnchorHint:
      'Choose an anchor when Linked Palette is enabled. Virgo Design Official keeps its chromatic bases unchanged.',

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
    officialDescription: '12 official base hues · individually editable · OKLCH tonal scales',
    linkedMode: 'Linked Generation',
    linkedModeDescription: 'One shared anchor generates all twelve hue families.',
  },

  preview: {
    eyebrow: 'PREVIEW',
    title: 'Color Families',
    paletteAnchor: 'Palette Anchor',
    foundationEyebrow: 'OFFICIAL FOUNDATION',
    foundationTitle: 'Twelve official chromatic bases',
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
