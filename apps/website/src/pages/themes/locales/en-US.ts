export const themesEnUS = {
  title: 'Themes',
  description:
    'Built on Virgo Design tokens and presentation contracts, providing unified interface and chart styling.',
  model: {
    title: 'Theme, Token and Appearance',
    description:
      'Themes implement the presentation contract. Components retain structure, semantics and interaction.',
    ownership:
      'Tokens define semantic colors and the versioned presentation contract. Themes supply the visual recipes. UI and Charts consume those variables; neither depends on an official preset.',
    appearance:
      'Theme Style and Appearance are independent. Soft + Light and Soft + Dark use the same components. Auto follows the system through the existing appearance state; Pro calls this preference System.',
    baseline:
      'Virgo preserves the existing Website and Golden Pro visual baseline. Foundation color, spacing, typography and radius scales remain reference data, while theme presentation uses separate semantic roles.',
  },
  experience: {
    title: 'Experience the official themes',
    description:
      'Switch themes in the header to explore components, charts and overlays in the same interface.',
  },
  install: {
    title: 'Install and switch',
    description:
      'Load Tokens first, official theme CSS next and component styles. Initialize the framework-neutral runtime before rendering.',
    persistence:
      'The runtime writes data-virgo-theme on html and saves the choice under virgo-design.theme-style.v1. Header and Settings share one subscription; other tabs synchronize through storage events. Blocked storage leaves in-memory switching available. The runtime never changes data-theme or the appearance preference.',
  },
  registry: {
    title: 'Theme Registry',
    description:
      'Stable official IDs, ThemePreset metadata, contract version and supported appearances. The default is virgo. Third-party presets register before initialization.',
    name: 'Name',
    direction: 'Visual direction',
  },
  directions: {
    virgo:
      'The original Virgo visual baseline: blue accent, balanced controls and established surfaces.',
    minimal:
      'Neutral surfaces, restrained corners, quiet hierarchy, light borders and minimal shadow.',
    soft: 'Gentle gray tones, rounder controls, relaxed control geometry and soft elevation.',
    glass:
      'Neutral translucent white or black, real backdrop lensing, light specular edges and soft floating depth. Blue belongs to actions and selection. Opaque fallback remains readable.',
    retro:
      'Compact controls, square corners, hard boundaries, inset/outset shadows and visible pressed movement.',
    contrast:
      'Strong foreground and background separation, explicit boundaries, clear focus, selected and disabled states, with less reliance on shadows and subtle gray tones.',
  },
  authoring: {
    title: 'Create a third-party theme',
    description:
      'Implement CSS variables and register metadata. Reuse every existing component and business layout.',
    contract:
      'Import themeContract and THEME_CONTRACT_VERSION from Tokens for the public presentation surface. Semantic color and elevation overrides use --vd-theme-light-* and --vd-theme-dark-*. Controls, shape, motion, overlays, navigation, tables, chrome and charts use their --vd-* presentation roles. Existing public component CSS variables still allow deliberate per-instance customization.',
    scopes:
      'A local data-virgo-theme scope resets presentation overrides to Virgo defaults; data-theme chooses its appearance. Use the public PortalProvider when rendering independent comparison scopes, so local Dialogs and tooltips inherit their own recipe. Normal applications inherit from html, including body portals.',
    audit:
      'Verify both appearances, keyboard focus, hover/pressed/disabled and selected states, long content, narrow viewports, reduced motion, chart updates and open portals. Glass uses a neutral translucent material, restrained optical depth and an opaque no-blur fallback. Contrast is an explicit preset, separate from the browser forced-colors accessibility mode.',
  },
  specimen: {
    title: 'Theme preview',
    description: 'Explore colors, borders, corners and depth in one set of examples.',
    controls: 'Controls',
    input: 'Text input',
    placeholder: 'Enter some text',
    select: 'Select',
    options: {
      one: 'Option one',
      two: 'Option two',
      three: 'Option three',
    },
    checkbox: 'Checkbox',
    disabled: 'Disabled button',
    table: 'Table example',
    name: 'Name',
    category: 'Category',
    value: 'Value',
    sampleName: 'Sample {{label}}',
    categories: {
      one: 'Category one',
      two: 'Category two',
    },
    chart: 'Chart example',
    series: 'Series A',
    materialTitle: 'Surface material',
    material: 'Explore the background, borders and shadows of layered surfaces.',
    openTooltip: 'Tooltip',
    tooltip: 'A short text hint shown on hover or keyboard focus.',
    openPopover: 'Popover',
    popoverTitle: 'Popover example',
    popoverDescription: 'A floating panel for a short title and supporting text.',
    openDialog: 'Dialog',
    dialogTitle: 'Dialog example',
    dialogDescription: 'A focused overlay with a title, content and actions.',
    dialogBody: 'Compare the surface, text, borders and shadows under the current theme.',
    close: 'Close',
  },
} as const;
