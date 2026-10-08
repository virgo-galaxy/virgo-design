import type { ProjectDto } from '@/api/projects';

import { projectNames, teamAssignments } from './team';

const definitions = [
  {
    id: 'online-store',
    start: '2025-06-02',
    owner: 'ava',
    health: 'At risk',
    summary: 'Browse products, place orders and pay online.',
    objective:
      'Deliver a reliable shopping journey from product discovery to payment and after-sales support.',
    modules: ['Products', 'Search', 'Cart', 'Orders', 'Payments', 'After-sales'],
    due: '2026-10-20',
  },
  {
    id: 'booking-system',
    start: '2025-09-08',
    owner: 'leo',
    health: 'On track',
    summary: 'Choose a service and reserve an available time.',
    objective: 'Let customers book, reschedule and cancel appointments without time conflicts.',
    modules: [
      'Service catalog',
      'Availability',
      'Reservations',
      'Rescheduling',
      'Reminders',
      'Administration',
    ],
    due: '2026-10-23',
  },
  {
    id: 'support-desk',
    start: '2026-01-12',
    owner: 'ava',
    health: 'On track',
    summary: 'Submit customer issues and track their resolution.',
    objective:
      'Give customers and support agents a clear path from a reported issue to a resolved ticket.',
    modules: [
      'Ticket intake',
      'Routing',
      'Collaboration',
      'Notifications',
      'Knowledge base',
      'Reporting',
    ],
    due: '2026-10-27',
  },
  {
    id: 'inventory-system',
    start: '2026-04-06',
    owner: 'leo',
    health: 'Planning',
    summary: 'Track stock received, dispatched and counted.',
    objective:
      'Keep inventory accurate with traceable stock movements, reconciliation and low-stock alerts.',
    modules: ['Item catalog', 'Receiving', 'Dispatch', 'Stocktaking', 'Stock alerts', 'Audit log'],
    due: '2026-10-30',
  },
] as const;
export const projects: ProjectDto[] = definitions.map((definition, index) => ({
  ...definition,
  name: projectNames[index]!,
  code: `PRJ-0${index + 1}`,
  memberIds: teamAssignments
    .filter((person) => person.projects.includes(index))
    .map((person) => person.id),
  modules: definition.modules.map((name, moduleIndex) => ({
    id: `${definition.id}-${moduleIndex + 1}`,
    name,
  })),
  color: index + 1,
  milestones: [
    {
      title: 'Requirements agreed',
      date: new Date(Date.parse(`${definition.start}T00:00:00Z`) + 14 * 86400000)
        .toISOString()
        .slice(0, 10),
      note: `Agree on the six modules and acceptance criteria for ${projectNames[index]}.`,
    },
    {
      title: 'Integration review',
      date: '2026-10-09',
      note: 'Review the working screens, APIs and test results with the project manager.',
    },
    {
      title: 'Release checkpoint',
      date: definition.due,
      note: 'Confirm delivery readiness, deployment and remaining follow-up tasks.',
    },
  ],
}));
