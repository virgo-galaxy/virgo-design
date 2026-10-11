export const menuSystemEnUS = {
  facts: {
    items: 'Items',
    shared: 'Shared',
    input: 'Input',
    keyboard: 'Keyboard',
    composition: 'Composition',
    nestedMenus: 'Nested menus',
  },
  specimen: {
    referenceSpecimen: 'Reference specimen',
  },
  menu: {
    overview: {
      description:
        'Choose what to do. Button-triggered actions, nested submenus and persistent preferences share one menu protocol.',
    },
    specimen: {
      buttonTrigger: 'Button trigger',
      nestedSubmenu: 'Nested submenu',
      sharedMenuParts: 'Shared menu parts',
    },
  },
  menuActions: {
    title: 'Actions and submenus',
    description:
      'Click Actions. Hover Export → Image, or use arrow keys to navigate. Escape returns one level at a time.',
  },
  menuPreferences: {
    title: 'Checkbox and radio items',
    description: 'Preferences stay open after selection. Shortcut labels are display only.',
  },
  menuDensity: {
    title: 'Density',
    description: 'Themed menu rows inherit the root size and page theme.',
  },
  contextMenu: {
    overview: {
      description:
        'Actions for the object under the pointer. Right-click a target, or focus it and press Shift+F10 or the context-menu key.',
    },
    specimen: {
      objectScoped: 'Object-scoped',
      pointerAnchored: 'Pointer anchored',
      keyboardAccessible: 'Keyboard accessible',
    },
  },
  contextTarget: {
    title: 'Pointer and keyboard context',
    description:
      'The popup anchors to the pointer and adjusts at the viewport edges. Keyboard opening anchors to the focused target.',
  },
  contextSettings: {
    title: 'Shared item system',
    description: 'Context menus support the same persistent checkbox and grouped radio items.',
  },
  menubar: {
    overview: {
      description:
        'Application-level action groups. Arrow keys move between menus; an open menu follows the pointer across its neighboring triggers.',
    },
    specimen: {
      appLevelNavigation: 'App-level navigation',
      sharedMenuContent: 'Shared menu content',
      arrowKeyFlow: 'Arrow-key flow',
    },
  },
  menubarApplication: {
    title: 'Application menus',
    description:
      'Use File, Edit or View. Arrow Left/Right switches groups; Arrow Down opens a group; Tab leaves the menu bar.',
  },
} as const;
