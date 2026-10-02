import { useReducer } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { AppShell } from '@/app/AppShell';
import { navigationPages } from '@/app/navigation';
import { tasksReducer } from '@/data/tasks';
import { initialTaskState } from '@/data/tasks.seed';
import { PlaceholderPage } from '@/pages/PlaceholderPage';
import { TasksPage } from '@/pages/tasks/TasksPage';
import { WorkplacePage } from '@/pages/workplace/WorkplacePage';

export function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTaskState);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="/dashboard/workplace" replace />} />
          <Route path="dashboard/workplace" element={<WorkplacePage />} />
          <Route path="work/tasks" element={<TasksPage state={tasks} dispatch={dispatch} />} />
          {navigationPages
            .filter((page) => page.path !== '/dashboard/workplace' && page.path !== '/work/tasks')
            .map((page) => (
              <Route
                key={page.path}
                path={page.path}
                element={<PlaceholderPage title={page.label} />}
              />
            ))}
          <Route path="*" element={<PlaceholderPage title="Page not found" missing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
