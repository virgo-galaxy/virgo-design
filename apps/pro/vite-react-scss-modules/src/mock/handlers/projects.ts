import { http } from 'msw';

import { projects } from '../fixtures/projects';
import { endpoint, success } from '../response';
export const projectsHandlers = [http.get(endpoint('/projects'), () => success(projects))];
