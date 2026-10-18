import 'server-only';

import type { ProjectDto } from '@/api/projects/types';

import { demoDate } from './dates';
import { projectNames, teamAssignments } from './team';

export function createProjects(reference = demoDate()): ProjectDto[] {
  const previousYear = Number(reference.slice(0, 4)) - 1;

  const definitions = [
    {
      id: 'online-store',
      start: `${previousYear}-01-01`,
      owner: 'ava',
      health: 'At risk',
      summary: 'Browse products, place orders and pay online.',
      objective:
        'Deliver a reliable shopping journey from product discovery to payment and after-sales support.',
      modules: ['Products', 'Search', 'Cart', 'Orders', 'Payments', 'After-sales'],
      due: demoDate(15, reference),
    },
    {
      id: 'booking-system',
      start: demoDate(-300, reference),
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
      due: demoDate(18, reference),
    },
    {
      id: 'support-desk',
      start: demoDate(-180, reference),
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
      due: demoDate(22, reference),
    },
    {
      id: 'inventory-system',
      start: demoDate(-90, reference),
      owner: 'leo',
      health: 'Planning',
      summary: 'Track stock received, dispatched and counted.',
      objective:
        'Keep inventory accurate with traceable stock movements, reconciliation and low-stock alerts.',
      modules: [
        'Item catalog',
        'Receiving',
        'Dispatch',
        'Stocktaking',
        'Stock alerts',
        'Audit log',
      ],
      due: demoDate(25, reference),
    },
  ] as const;
  return definitions.map((definition, index) => ({
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
        date: demoDate(4, reference),
        note: 'Review the working screens, APIs and test results with the project manager.',
      },
      {
        title: 'Release checkpoint',
        date: definition.due,
        note: 'Confirm delivery readiness, deployment and remaining follow-up tasks.',
      },
    ],
  }));
}

export const projects = createProjects();
