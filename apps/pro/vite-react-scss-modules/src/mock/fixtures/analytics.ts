import type { ProjectDeliveryDayDto } from '@/api/analytics';

import { projects } from './projects';
import { trendPoints } from './workplace';

// Daily historical output by project. Each row sums to the matching delivery trend day.
const dailyCounts = [
  [2, 1, 2, 1],
  [1, 3, 2, 2],
  [2, 2, 1, 2],
  [4, 2, 3, 1],
  [2, 1, 4, 2],
  [3, 4, 2, 3],
  [2, 3, 2, 3],
  [1, 2, 2, 1],
  [3, 1, 2, 3],
  [2, 3, 1, 2],
  [5, 2, 4, 3],
  [2, 4, 3, 3],
  [4, 5, 3, 5],
  [6, 3, 5, 4],
];

export const projectDelivery: ProjectDeliveryDayDto[] = trendPoints.map((point, index) => ({
  date: point.date,
  deliveries: projects.map((project, projectIndex) => ({
    projectId: project.id,
    completed: dailyCounts[index]![projectIndex]!,
  })),
}));
