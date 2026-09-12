import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { useColorStudio } from '@/features/color-studio/model/use-color-studio';
import { AppLayout } from '@/layout/AppLayout';
import { PlaceholderPage } from '@/layout/PlaceholderPage';
import { ColorsPage } from '@/pages/colors/ColorsPage';

export function App() {
  const studio = useColorStudio();

  return (
    <BrowserRouter>
      <AppLayout appearance={studio.state.appearance} onAppearanceChange={studio.setAppearance}>
        <Routes>
          <Route path="/" element={<Navigate to="/foundations" replace />} />
          <Route path="/foundations" element={<ColorsPage studio={studio} />} />
          <Route path="/tokens" element={<PlaceholderPage />} />
          <Route path="/components" element={<PlaceholderPage />} />
          <Route path="/resources" element={<PlaceholderPage />} />
          <Route path="*" element={<Navigate to="/foundations" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
