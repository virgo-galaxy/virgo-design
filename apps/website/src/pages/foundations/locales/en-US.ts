export const foundationsEnUS = {
  navigation: {
    move: 'Move foundation navigation',
    label: 'Foundation categories',
    colors: 'Colors',
    typography: 'Typography',
    layout: 'Layout',
    shapeDepth: 'Shape & Depth',
    motion: 'Motion',
    icons: 'Icons',
  },
  eyebrow: 'FOUNDATIONS V1',
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
        description: 'These examples illustrate scale only and do not define component semantics.',
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
} as const;
