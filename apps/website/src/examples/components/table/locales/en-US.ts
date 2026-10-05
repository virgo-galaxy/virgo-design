export const tableExamplesEnUS = {
  copy: {
    compositionTitle: 'Composable column controls',
    compositionDescription:
      'Sorting, filter and search keep a fixed order. Keep the title on the left or align it with the controls as one group. Single arrows toggle one direction; fixed edge columns stay visible. One resizing switch applies to the whole table.',
    selectionTitle: 'Selection menu',
    selectionDescription:
      'An optional hover menu beside the select-page checkbox, with built-in and custom selection actions.',
    showSelectionMenu: 'Show selection menu',
    selectOddRows: 'Select odd rows',
    selectEvenRows: 'Select even rows',

    filteringTitle: 'Column filters and resizing',
    filteringDescription:
      'Confirm checkbox filters from a column heading. Header dividers are visible by default; enable resizing to drag them or use arrow keys.',
    resizeColumns: 'Enable column resizing',
    headerDividers: 'Show header dividers',
    assignee: 'Assignee',

    title3: 'Three-state sorting',
    description3:
      'Click a heading to cycle ascending, descending and original order. Table.SortButton can also be composed independently.',
    colorLayers:
      'Header, striped, hover and selected rows use distinct theme-aware layers in light and dark appearances. Override their colors on Table through public CSS variables:',
    records: 'Project records',
    project: 'Project',
    count: 'Components',
    total: 'Total',
    empty: 'No projects',
    add: 'Create a project to populate this table.',
    title0: 'Records and summary',
    description0: 'Native headings, a caption and a summary footer.',
    title1: 'Density and borders',
    description1:
      'Compare compact, default and comfortable: density controls cell padding and minimum header/row heights. Surface frames internal row separators.',
    geometry:
      'Override geometry on Table through these public CSS variables. Wrapped content expands rows beyond the minimum height:',
    title2: 'Empty and sticky header',
    description2: 'Empty composes inside a spanning cell; scroll belongs to the viewport.',
  },
} as const;
