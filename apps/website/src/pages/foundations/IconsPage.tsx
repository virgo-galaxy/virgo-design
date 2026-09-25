import { IconsExplorer } from '@/features/icons/IconsExplorer';

import { FoundationPage } from './FoundationPage';

export function IconsPage() {
  return (
    <FoundationPage title="Icons" description="A focused canvas for refining a single Virgo icon.">
      <IconsExplorer />
    </FoundationPage>
  );
}
