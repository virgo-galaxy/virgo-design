import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { AppShell } from '@/app/AppShell';
import { navigationPages } from '@/app/navigation';
import { PlaceholderPage } from '@/pages/PlaceholderPage';
import { WorkplacePage } from '@/pages/workplace/WorkplacePage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="/dashboard/workplace" replace />} />
          <Route path="dashboard/workplace" element={<WorkplacePage />} />
          {navigationPages
            .filter((page) => page.path !== '/dashboard/workplace')
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
