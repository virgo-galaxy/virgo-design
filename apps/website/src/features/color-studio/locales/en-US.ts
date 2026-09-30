export const colorStudioEnUS = {
  colorStudio: {
    picker: { open: 'Open color picker', title: 'Color picker' },
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
      live: 'LIVE',
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
    actions: {
      reset: 'Reset',
      explorePalette: 'Explore full palette',
    },
  },
} as const;
