import { http } from 'msw';

import { projects } from '../fixtures/projects';
import { endpoint, success } from '../response';
import { requestUser } from '../session';
export const projectsHandlers = [
  http.get(endpoint('/projects'), ({ request }) =>
    success(projects.filter((project) => requestUser(request)?.projects.includes(project.name))),
  ),
];
