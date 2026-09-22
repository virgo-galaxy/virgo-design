import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const paginationMetadata = {
  name: 'Pagination',
  package: '@virgo-design/ui',
  category: 'Navigation',
  description:
    'Navigates paged records with bounded page numbers, optional totals, page-size selection and quick jump.',
  import: "import { Pagination } from '@virgo-design/ui';",
  states: ['default', 'hover', 'focus-visible', 'current', 'disabled', 'empty'],
  anatomy: [
    {
      name: 'root',
      description: 'Named navigation landmark with left, center or right alignment.',
    },
    { name: 'list', description: 'Previous, numbered pages, optional five-page jumps, and next.' },
    { name: 'total', description: 'Optional total or custom visible item range.' },
    {
      name: 'sizeChanger',
      description: 'Virgo Dropdown with checked page sizes; changes return to page one.',
    },
    {
      name: 'jumper',
      description: 'Virgo Input; Enter commits a valid page, Escape clears the draft.',
    },
  ],
  capabilities: {
    controlled: true,
    uncontrolled: true,
    alignment: true,
    ellipsis: true,
    pageSize: true,
    quickJump: true,
    customTotal: true,
    customNavigationLabels: true,
    localization: true,
    showAll: true,
  },
  accessibility: [
    'Native buttons support Tab, Enter and Space; only the selected page has aria-current="page".',
    'Previous and next are disabled at the boundaries; empty data disables all controls.',
    'Ellipsis buttons have descriptive five-page jump labels and use decorative Virgo icons.',
    'The page-size Dropdown supports arrow keys, typeahead, Enter and Escape, with menuitemradio selection.',
    'Quick jump requires a whole number between one and the last page; invalid drafts expose aria-invalid.',
    'Accessible and visible labels can be localized through labels; navigation can be named by aria-label or aria-labelledby.',
  ],
  examples: [
    { name: 'Basic', code: '<Pagination total={50} />' },
    {
      name: 'Controlled',
      code: '<Pagination total={500} page={page} pageSize={pageSize} onChange={(page, size) => { setPage(page); setPageSize(size); }} />',
    },
    { name: 'All controls', code: '<Pagination total={85} showAll />' },
    {
      name: 'Independent options',
      code: '<Pagination total={500} showSizeChanger showQuickJumper align="right" />',
    },
    {
      name: 'Visible range',
      code: '<Pagination total={85} showTotal={(total, [start, end]) => `${start}–${end} of ${total} items`} />',
    },
    {
      name: 'Text navigation',
      code: '<Pagination total={500} previousLabel="Previous" nextLabel="Next" />',
    },
  ],
} as const satisfies ComponentMetadata;
