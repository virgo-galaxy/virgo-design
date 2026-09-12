import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { useColorStudio } from '@/features/color-studio/model/use-color-studio';
import { AppLayout } from '@/layout/AppLayout';
import { PlaceholderPage } from '@/layout/PlaceholderPage';
import { ColorsPage } from '@/pages/colors/ColorsPage';
import { LayoutPage } from '@/pages/foundations/LayoutPage';
import { MotionPage } from '@/pages/foundations/MotionPage';
import { ShapeDepthPage } from '@/pages/foundations/ShapeDepthPage';
import { TypographyPage } from '@/pages/foundations/TypographyPage';

export function App() {
  const studio = useColorStudio();

  return (
    <BrowserRouter>
      <AppLayout appearance={studio.state.appearance} onAppearanceChange={studio.setAppearance}>
        <Routes>
          <Route path="/" element={<Navigate to="/foundations/colors" replace />} />
          <Route path="/foundations" element={<Navigate to="/foundations/colors" replace />} />
          <Route path="/foundations/colors" element={<ColorsPage studio={studio} />} />
          <Route path="/foundations/typography" element={<TypographyPage />} />
          <Route path="/foundations/layout" element={<LayoutPage />} />
          <Route path="/foundations/shape-depth" element={<ShapeDepthPage />} />
          <Route path="/foundations/motion" element={<MotionPage />} />
          <Route path="/tokens" element={<PlaceholderPage />} />
          <Route path="/components" element={<PlaceholderPage />} />
          <Route path="/resources" element={<PlaceholderPage />} />
          <Route path="*" element={<Navigate to="/foundations/colors" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
