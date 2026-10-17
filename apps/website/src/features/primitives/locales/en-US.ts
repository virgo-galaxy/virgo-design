export const primitivesEnUS = {
  catalogue: {
    title: 'Primitives',
    description:
      'Headless building blocks for building custom interfaces with Virgo Design behavior, accessibility and interaction protocols.',
    headless: 'Headless',
    names: {
      carousel: 'Carousel',
      slider: 'Slider',
      'color-picker': 'Color picker',
      'time-picker': 'Time picker',
      'date-picker': 'Date picker',
      calendar: 'Calendar',
      timeline: 'Timeline',
      form: 'Form',
      field: 'Field',
      table: 'Table',
      tree: 'Tree',
      combobox: 'Combobox',
      cursor: 'Cursor',
      button: 'Button',
      command: 'Command',
      checkbox: 'Checkbox',
      input: 'Input',
      radio: 'Radio',
      select: 'Select',
      switch: 'Switch',
      textarea: 'Text area',
      accordion: 'Accordion',
      collapsible: 'Collapsible region',
      tabs: 'Tabs',
      breadcrumb: 'Breadcrumb',
      'navigation-menu': 'Navigation menu',
      pagination: 'Pagination',
      'context-menu': 'Context menu',
      dropdown: 'Dropdown',
      menu: 'Menu',
      menubar: 'Menu bar',
      dialog: 'Dialog',
      popover: 'Popover',
      tooltip: 'Tooltip',
      toast: 'Toast',
      layout: 'Layout',
      dock: 'Dock',
    },
  },
  categories: {
    'Actions & Commands': 'Actions & Commands',
    'Form Controls': 'Form Controls',
    Disclosure: 'Disclosure',
    Navigation: 'Navigation',
    Menus: 'Menus',
    Overlays: 'Overlays',
    Feedback: 'Feedback',
    Structure: 'Structure',
  },
  detail: {
    package: 'Package',
    importDescription: 'Import the public primitive directly from the package entry point.',
    anatomy: 'Anatomy',
    anatomyDescription: 'The public parts that compose this primitive.',
    parts: '{{name}} parts',
    behavior: 'Behavior',
    accessibility: 'Accessibility',
    typescriptApi: 'TypeScript API',
    publicApi: 'Public API',
  },
  docs: {
    carousel: {
      description: 'Paged navigation for arbitrary mounted content.',
      behavior:
        'Controlled index, looping, autoplay, pointer dragging and optional horizontal wheel navigation.',
      accessibility:
        'Inactive pages are inert. Keyboard navigation preserves embedded inputs. Playback pauses during interaction, reduced motion and hidden documents.',
    },
    slider: {
      description:
        'A native numeric slider with constrained values, keyboard editing and shared field semantics.',
      behavior:
        'A native numeric slider with constrained values, keyboard editing and shared field semantics.',
      accessibility:
        'A native numeric slider with constrained values, keyboard editing and shared field semantics.',
    },
    'color-picker': {
      description: 'Opaque sRGB color selection through native picking and reusable HEX swatches.',
      behavior: 'Opaque sRGB color selection through native picking and reusable HEX swatches.',
      accessibility:
        'Opaque sRGB color selection through native picking and reusable HEX swatches.',
    },
    'time-picker': {
      description:
        'Local time entry with native segmented editing, precision and browser constraint validation.',
      behavior:
        'Local time entry with native segmented editing, precision and browser constraint validation.',
      accessibility:
        'Local time entry with native segmented editing, precision and browser constraint validation.',
    },
    'date-picker': {
      description: 'Native date entry and a composed calendar popup sharing one civil date value.',
      behavior: 'Native date entry and a composed calendar popup sharing one civil date value.',
      accessibility:
        'Native date entry and a composed calendar popup sharing one civil date value.',
    },
    calendar: {
      description:
        'A localized month grid with independent selection and display, date constraints and keyboard navigation.',
      behavior:
        'A localized month grid with independent selection and display, date constraints and keyboard navigation.',
      accessibility:
        'A localized month grid with independent selection and display, date constraints and keyboard navigation.',
    },
    timeline: {
      description:
        'An ordered sequence of events with timestamps, descriptions and progress presentation.',
      behavior:
        'An ordered sequence of events with timestamps, descriptions and progress presentation.',
      accessibility:
        'An ordered sequence of events with timestamps, descriptions and progress presentation.',
    },

    form: {
      description:
        'Native form composition and shared field layout. Applications own data, validation and submit state.',
      behavior:
        'Native form composition and shared field layout. Applications own data, validation and submit state.',
      accessibility: 'Native form semantics with consumer-owned submission.',
    },
    field: {
      description:
        'A single-control field with automatic label, description, message and state association.',
      behavior:
        'A single-control field with automatic label, description, message and state association.',
      accessibility: 'One control per field; names and description IDs remain associated.',
    },
    table: {
      description:
        'Semantic tables with density, alignment, borders and overflow. Data operations belong to the application.',
      behavior:
        'Semantic tables with density, alignment, borders and overflow. Data operations belong to the application.',
      accessibility: 'Native table semantics with correct header scopes.',
    },
    tree: {
      description:
        'Accessible nested hierarchy with explicit selection, controlled expansion and keyboard navigation.',
      behavior:
        'Accessible nested hierarchy with explicit selection, controlled expansion and keyboard navigation.',
      accessibility: 'One visible tab stop, arrow navigation, independent selection and typeahead.',
    },
    combobox: {
      description:
        'Editable single-selection suggestions with filtering, IME-safe keyboard interaction and shared overlay positioning.',
      behavior:
        'Editable single-selection suggestions with filtering, IME-safe keyboard interaction and shared overlay positioning.',
      accessibility: 'Input owns focus; active descendants exclude disabled and filtered options.',
    },

    cursor: {
      description:
        'Scoped pointer state and non-interactive followers without prescribing a cursor visual.',
      behaviors: {
        item1: 'Coalesces mouse coordinates into a stable external store once per animation frame.',
        item2:
          'Scopes ownership to the nearest provider; resets on leave, blur, scroll, unmount and resetKey changes.',
        item3:
          'Positions decorative followers with viewport flip/shift; Tooltip can consume the same context.',
      },
      accessibility: {
        item1: 'Touch and keyboard never force a custom pointer.',
        item2:
          'Followers are inert and hidden from assistive technology; keep essential feedback in accessible content.',
      },
    },
    button: {
      description:
        'A native button that preserves platform semantics, events, and disabled behavior.',
      partNote: 'A single native button element; there are no compound parts.',
      behaviors: {
        item1: 'Defaults to type="button" while allowing an explicit native button type.',
        item2: 'Forwards native attributes, events, disabled state, and the element ref.',
      },
      accessibility: {
        item1: 'Uses native button semantics and native keyboard activation.',
      },
    },
    command: {
      description:
        'A searchable command collection with filtering, selection, and keyboard navigation.',
      behaviors: {
        item1: 'Filters item values, labels, and keywords with an overridable filter function.',
        item2:
          'Keeps focus in the input while Arrow keys, Home, End, and Enter navigate and select.',
        item3:
          'Supports controlled search and active-value state as well as dynamic item registration.',
      },
      accessibility: {
        item1: 'Connects a combobox input to a listbox and exposes active descendants.',
        item2: 'Items use option semantics, including selected and disabled states.',
      },
    },
    checkbox: {
      description: 'Native checkboxes with mixed state and optional controlled group coordination.',
      behaviors: {
        item1: 'Renders a native checkbox and supports the browser checked and disabled behavior.',
        item2:
          'Adds a persistent indeterminate state and optional controlled or uncontrolled group values.',
        item3: 'A group can supply a shared native name and disabled state.',
      },
      accessibility: {
        item1: 'Uses a native checkbox input.',
        item2: 'Indeterminate checkboxes expose aria-checked="mixed".',
      },
    },
    input: {
      description:
        'A transparent native input with ref forwarding and the full platform attribute surface.',
      partNote: 'A single native input element; there are no compound parts.',
      behaviors: {
        item1: 'Defaults to type="text" and accepts the complete native input attribute surface.',
        item2: 'Forwards change events, disabled and read-only state, and the element ref.',
      },
      accessibility: {
        item1: 'Retains native input semantics; consumers provide the accessible label.',
      },
    },
    radio: {
      description:
        'Native radio inputs with optional single-value group state and orientation semantics.',
      behaviors: {
        item1: 'Renders native radio inputs and optionally coordinates one selected group value.',
        item2:
          'Supports controlled or uncontrolled group state, shared names, and group-level disabling.',
      },
      accessibility: {
        item1: 'Uses native radio inputs inside a radiogroup.',
        item2: 'The group exposes horizontal or vertical orientation semantics.',
      },
    },
    select: {
      description:
        'A headless listbox supporting single and multiple selection, typeahead, keyboard navigation, and forms.',
      behaviors: {
        item1:
          'Coordinates controlled or uncontrolled selection and open state; Select.Multiple keeps options open while toggling.',
        item2: 'Supports Arrow keys, Home, End, Enter, Escape, and character typeahead.',
        item3:
          'Given a name, submits single values or repeated multi-values through hidden native inputs.',
      },
      accessibility: {
        item1:
          'The trigger controls a listbox and exposes expanded state; multiple selection sets aria-multiselectable.',
        item2: 'Options expose selected and disabled semantics and keyboard focus management.',
      },
    },
    switch: {
      description: 'A native checkbox enhanced with switch semantics and checked-state messages.',
      partNote:
        'A single native checkbox input with switch semantics; there are no compound parts.',
      behaviors: {
        item1: 'Supports native controlled and uncontrolled checked state.',
        item2: 'Calls onCheckedChange after uncancelled native change events.',
      },
      accessibility: {
        item1: 'Uses a native checkbox input with role="switch".',
      },
    },
    textarea: {
      description: 'A transparent native textarea with ref forwarding and native state behavior.',
      partNote: 'A single native textarea element; there are no compound parts.',
      behaviors: {
        item1: 'Accepts native textarea attributes and browser editing behavior.',
        item2: 'Forwards change events, disabled and read-only state, and the element ref.',
      },
      accessibility: {
        item1: 'Retains native textarea semantics; consumers provide the accessible label.',
      },
    },
    accordion: {
      description:
        'Single or multiple disclosure sections with coordinated state and roving focus.',
      behaviors: {
        item1: 'Supports controlled or uncontrolled single and multiple expansion modes.',
        item2: 'Arrow keys, Home, and End move focus between enabled triggers.',
        item3: 'Disabled items cannot toggle and are skipped by roving focus.',
      },
      accessibility: {
        item1: 'Each trigger and content region is connected with stable accessible ids.',
        item2: 'Item triggers sit inside configurable semantic heading levels.',
      },
    },
    collapsible: {
      description:
        'A controlled or uncontrolled disclosure region with connected trigger semantics.',
      behaviors: {
        item1: 'Supports controlled or uncontrolled open state.',
        item2: 'The trigger toggles content unless its native event is cancelled.',
      },
      accessibility: {
        item1:
          'Trigger and content are connected through aria-controls and labelled region semantics.',
        item2: 'The trigger exposes its current expanded state.',
      },
    },
    tabs: {
      description: 'An accessible tab set with automatic selection and arrow-key navigation.',
      behaviors: {
        item1:
          'Supports controlled or uncontrolled active values and chooses the first enabled tab by default.',
        item2:
          'ArrowLeft, ArrowRight, Home, and End move focus and selection while skipping disabled tabs.',
      },
      accessibility: {
        item1: 'Exposes tablist, tab, and tabpanel roles.',
        item2: 'Every tab and panel pair receives matching ids and control relationships.',
      },
    },
    breadcrumb: {
      description:
        'A labelled breadcrumb navigation with ordered items and current-page semantics.',
      behaviors: {
        item1: 'Renders items in path order and inserts an accessibility-hidden separator.',
        item2:
          'Items become native links when href is present or current-page spans when it is absent.',
      },
      accessibility: {
        item1: 'Uses a labelled navigation landmark with an ordered list.',
        item2: 'The current item defaults to aria-current="page".',
      },
    },
    'navigation-menu': {
      description:
        'Top-level links and disclosures coordinated across horizontal or vertical navigation.',
      behaviors: {
        item1: 'Coordinates active links and controlled or uncontrolled disclosure state.',
        item2:
          'Directional keys follow horizontal or vertical orientation and skip disabled controls.',
        item3: 'Nested content returns focus to its trigger when dismissed with Escape.',
      },
      accessibility: {
        item1: 'Uses a native navigation landmark and list structure.',
        item2:
          'Active links expose aria-current and disclosure triggers expose expanded relationships.',
      },
    },
    pagination: {
      description: 'Bounded page state and native page controls for finite result collections.',
      behaviors: {
        item1: 'Calculates bounded page ranges and a compact item sequence for large totals.',
        item2: 'Supports controlled or uncontrolled page and page-size state.',
        item3: 'Clamps invalid or stale pages when totals change.',
      },
      accessibility: {
        item1: 'Uses a labelled pagination navigation landmark.',
        item2: 'Numbered page buttons expose aria-current for the active page.',
      },
    },
    'context-menu': {
      description:
        'A menu opened at pointer coordinates or with the native context-menu keyboard gesture.',
      behaviors: {
        item1: 'Opens at pointer coordinates and repositions when invoked again.',
        item2: 'Also opens from Shift+F10 or the Context Menu key.',
        item3: 'Reuses Menu item, checked-state, selection, submenu, and dismissal behavior.',
      },
      accessibility: {
        item1: 'Moves focus into the opened menu and restores it to the context target on close.',
        item2:
          'Items expose menuitem, menuitemcheckbox, or menuitemradio semantics as appropriate.',
      },
    },
    dropdown: {
      description: 'A positioned action menu opened by click, keyboard, touch, or optional hover.',
      behaviors: {
        item1:
          'Supports click activation and optional hover activation without losing keyboard or touch support.',
        item2: 'Positions, flips, and shifts portalled content at viewport edges.',
        item3:
          'Supports wrapping keyboard navigation, typeahead, selection cancellation, and outside dismissal.',
      },
      accessibility: {
        item1: 'The trigger owns a labelled menu and exposes expanded state.',
        item2: 'Focus enters enabled menu items and returns to the trigger when appropriate.',
      },
    },
    menu: {
      description:
        'A composable action menu with selection, typeahead, checked items, and submenus.',
      behaviors: {
        item1:
          'Supports controlled or uncontrolled open state, typeahead, wrapping focus, and cancellable selection.',
        item2: 'Checkbox and radio items maintain selection without closing by default.',
        item3:
          'Nested submenus coordinate pointer travel, keyboard direction, and layered Escape dismissal.',
      },
      accessibility: {
        item1: 'Uses menu and menuitem roles with checked variants where applicable.',
        item2: 'Keyboard navigation supports Arrow keys, Home, End, Enter, Escape, and Tab exit.',
      },
    },
    menubar: {
      description:
        'A coordinated row of menus with roving focus and cross-menu keyboard navigation.',
      behaviors: {
        item1:
          'Coordinates one open top-level menu and shares the complete Menu item implementation.',
        item2: 'Horizontal keys, Home, and End move the single tab stop between menu triggers.',
        item3: 'Open menus switch from keys or hover while an idle menubar remains closed.',
      },
      accessibility: {
        item1: 'Uses menubar and menuitem semantics with one top-level tab stop.',
        item2: 'Escape closes the active menu and restores focus to its trigger.',
      },
    },
    dialog: {
      description:
        'A modal or non-modal dialog with focus management, dismissal, and layered isolation.',
      behaviors: {
        item1: 'Supports controlled or uncontrolled modal and non-modal open state.',
        item2:
          'Portals content, coordinates nested layers, handles outside and Escape dismissal, and restores focus.',
        item3: 'Modal dialogs isolate background interaction and trap Tab navigation.',
      },
      accessibility: {
        item1: 'Content uses dialog semantics and links mounted title and description ids.',
        item2:
          'Focus moves into the dialog on open and returns to the trigger on close unless cancelled.',
      },
    },
    popover: {
      description:
        'A non-modal positioned panel with click or hover activation and focus coordination.',
      behaviors: {
        item1:
          'Supports click or hover activation, controlled state, positioning, and outside dismissal.',
        item2: 'Coordinates nested portalled overlays and optional focus restoration.',
        item3:
          'Interactive hover content remains open across pointer gaps and while focus is inside.',
      },
      accessibility: {
        item1: 'Uses non-modal dialog semantics and derives a default name from the trigger.',
        item2: 'Keyboard focus enters interactive content and Escape restores trigger focus.',
      },
    },
    tooltip: {
      description:
        'A delayed hover or focus description with positioning and optional smooth handoff.',
      behaviors: {
        item1:
          'closeOnClick defaults to true; false keeps dynamic descriptions open during trigger activation.',
        item2: 'Opens after a configurable hover delay or immediately from keyboard focus.',
        item3:
          'Supports controlled state, viewport-aware positioning, gap crossing, and optional smooth handoff.',
        item4:
          'Dismisses with Escape, disabled state, unmount, or when the trigger leaves the viewport.',
      },
      accessibility: {
        item1: 'Connects tooltip content to the trigger description without moving focus.',
        item2: 'Ignores touch hover and preserves native trigger actions.',
      },
    },
    toast: {
      description:
        'Portalled live-region messages with timed dismissal, pause, and focus hotkey support.',
      behaviors: {
        item1:
          'Portals open toasts into a shared viewport and supports controlled or uncontrolled state.',
        item2: 'Auto-dismiss timing pauses while pointer or focus is inside.',
        item3: 'Multiple toasts stack and the provider hotkey moves focus into the viewport.',
      },
      accessibility: {
        item1: 'Uses polite status or assertive alert live-region semantics.',
        item2:
          'Mounted title and description parts provide accessible relationships without stealing focus.',
      },
    },
    layout: {
      description:
        'Semantic page regions with coordinated sidebar collapse state and structural ordering.',
      behaviors: {
        item1: 'Arranges structural regions vertically by default or horizontally when requested.',
        item2:
          'Provides a neutral Lane boundary whose composition direction stays independent from semantic Content sizing.',
        item3:
          'Coordinates controlled or uncontrolled sidebar collapse state and custom trigger rendering.',
        item4:
          'Supports multiple independent sidebars and render-function access to sidebar state.',
      },
      accessibility: {
        item1:
          'Renders header, aside, main, and footer regions with native semantic elements while Lane remains a neutral div.',
        item2:
          'The sidebar trigger exposes and changes its expanded state from keyboard activation.',
      },
    },
    dock: {
      description:
        'Edge-constrained movable regions with normalized snapped or continuous placement and orientation state.',
      behaviors: {
        item1:
          'Constrains placement to a configurable subset of the four edges of a local boundary.',
        item2:
          'Supports configurable equal snap divisions or continuous free positioning while deriving horizontal or vertical orientation.',
        item3:
          'Supports pointer dragging plus arrow, Home, End, and Alt+Arrow keyboard repositioning across enabled edges.',
        item4:
          'Can persist uncontrolled placement to localStorage or sessionStorage with an explicit consumer-owned key.',
        item5:
          'Places the dedicated movement handle at the logical start or end across horizontal and vertical orientations.',
        item6:
          'Exposes independent controlled or uncontrolled locked and pinned state: locking blocks movement, while pinning selects fixed positioning without blocking movement.',
      },
      accessibility: {
        item1:
          'Uses a native button as the dedicated movement handle so docked content remains independently interactive.',
        item2:
          'The handle exposes a default accessible name, logical start/end placement, and keyboard shortcuts for movement and edge changes.',
      },
    },
  },
  examples: {
    previousSlide: 'Previous slide',
    nextSlide: 'Next slide',
    previousMonth: 'Previous month',
    nextMonth: 'Next month',
    chooseDate: 'Choose date',
    overview: 'Overview',
    accordionContentIsDisclosedByItsTrigger: 'Accordion content is disclosed by its trigger.',
    details: 'Details',
    aSecondIndependentlyAddressableSection: 'A second independently addressable section.',
    primitives: 'Primitives',
    navigation: 'Navigation',
    breadcrumb: 'Breadcrumb',
    frequency: 'Frequency',
    daily: 'Daily',
    weekly: 'Weekly',
    projectDetails: 'Item details',
    createdWithATriggerAndADisclosureRegion: 'Created with a trigger and a disclosure region.',
    findACommand: 'Find a command',
    searchCommands: 'Search commands',
    noMatchingCommand: 'No matching command.',
    actions: 'Actions',
    newFile: 'New file',
    openSettings: 'Open settings',
    rightClickThisFile: 'Right-click this file',
    rename: 'Rename',
    duplicate: 'Duplicate',
    editProfile: 'Edit details',
    profile: 'Details',
    updateYourPublicDetails: 'Update your public details.',
    displayName: 'Display name',
    done: 'Done',
    archive: 'Archive',
    movePrimitiveDock: 'Move primitive dock',
    dock: 'dock',
    header: 'Header',
    toggleSidebar: 'Toggle sidebar',
    exampleSidebar: 'Example sidebar',
    sidebar: 'Sidebar',
    mainContent: 'Main content',
    footer: 'Footer',
    openMenu: 'Open menu',
    copy: 'Copy',
    paste: 'Paste',
    export: 'Export',
    exampleApplication: 'Example application',
    file: 'File',
    new: 'New',
    save: 'Save',
    edit: 'Edit',
    undo: 'Undo',
    redo: 'Redo',
    exampleNavigation: 'Example navigation',
    learn: 'Learn',
    guides: 'Guides',
    examples: 'Examples',
    previous: 'Previous',
    next: 'Next',
    openPopover: 'Open popover',
    thisPanelIsPositionedRelativeToItsTrigger: 'This panel is positioned relative to its trigger.',
    close: 'Close',
    density: 'Density',
    compact: 'Compact',
    comfortable: 'Comfortable',
    project: 'Item',
    chooseProject: 'Choose item',
    virgoDocs: 'Item A',
    primitiveInformation: 'Primitive information',
    aHeadlessTabPanel: 'A headless tab panel.',
    composableRootListTabAndPanelParts: 'Composable root, list, tab, and panel parts.',
    showToast: 'Show toast',
    saved: 'Saved',
    yourChangesAreReady: 'Your changes are ready.',
    dismiss: 'Dismiss',
    hoverOrFocus: 'Hover or focus',
    helpfulContext: 'Helpful context',
    nativeButton: 'Native button',
    projectName: 'Item name',
    notifications: 'Messages',
    notes: 'Notes',
    moveYourMouseHere: 'Move your mouse here',
    pointerFeedback: 'Pointer feedback',
    headlessByDefault: 'Headless by default.',
  },
} as const;
