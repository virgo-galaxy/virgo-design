import type { ProjectDto as Project } from '@/api/projects';
export const projects: Project[] = [
  {
    id: 'workspace',
    name: 'Workspace',
    code: 'PRJ-01',
    owner: 'ava',
    health: 'At risk',
    summary: 'A clearer workspace for everyday team delivery.',
    objective:
      'Make navigation, ownership handoffs and release permissions predictable. Every destination should have a clear next action and a reliable path back.',
    start: '2026-09-14',
    due: '2026-10-06',
    color: 1,
    milestones: [
      {
        title: 'Scope agreed',
        date: '2026-09-14',
        note: 'Navigation and task handoffs are the release focus.',
      },
      {
        title: 'Team review',
        date: '2026-10-02',
        note: 'Resolve the navigation review and overdue handoff checklist.',
      },
      {
        title: 'October release checkpoint',
        date: '2026-10-06',
        note: 'Attach acceptance notes and confirm support readiness.',
      },
    ],
  },
  {
    id: 'design-system',
    name: 'Design system',
    code: 'PRJ-02',
    owner: 'eli',
    health: 'On track',
    summary: 'Consistent controls, accessible by default.',
    objective:
      'Validate keyboard behavior and publish density guidance so teams can compose busy product screens with confidence.',
    start: '2026-09-16',
    due: '2026-10-08',
    color: 2,
    milestones: [
      {
        title: 'Keyboard audit',
        date: '2026-10-01',
        note: 'Audit delivered; findings linked to shared controls.',
      },
      {
        title: 'Acceptance review',
        date: '2026-10-06',
        note: 'Verify focus, appearance switching and error feedback.',
      },
      {
        title: 'Guidelines handoff',
        date: '2026-10-08',
        note: 'Share control density patterns with the product team.',
      },
    ],
  },
  {
    id: 'onboarding',
    name: 'Onboarding',
    code: 'PRJ-03',
    owner: 'leo',
    health: 'On track',
    summary: 'From the first invitation to the first meaningful action.',
    objective:
      'Reduce friction in invitations and welcome messages. Give every first-week touchpoint a single owner and measurable acceptance criteria.',
    start: '2026-09-21',
    due: '2026-10-14',
    color: 3,
    milestones: [
      {
        title: 'Touchpoint map',
        date: '2026-10-03',
        note: 'Agree on ownership between invitation and first delivery.',
      },
      {
        title: 'Invitation copy',
        date: '2026-10-09',
        note: 'Make expired invitation recovery clear and safe.',
      },
      {
        title: 'Activation review',
        date: '2026-10-14',
        note: 'Review first-week funnel findings with product.',
      },
    ],
  },
  {
    id: 'discovery',
    name: 'Discovery',
    code: 'PRJ-04',
    owner: 'nina',
    health: 'Planning',
    summary: 'Help people find useful work without the noise.',
    objective:
      'Improve search result clarity, remove duplicate suggestions and document ranking signals for reproducible support cases.',
    start: '2026-09-23',
    due: '2026-10-12',
    color: 4,
    milestones: [
      {
        title: 'Search baseline',
        date: '2026-09-23',
        note: 'Review suggestion sources and empty-state recovery.',
      },
      {
        title: 'Ranking documentation',
        date: '2026-10-07',
        note: 'Document recency, exact matches and project membership.',
      },
      {
        title: 'Search quality review',
        date: '2026-10-12',
        note: 'Verify duplicate handling and recovery paths.',
      },
    ],
  },
];
