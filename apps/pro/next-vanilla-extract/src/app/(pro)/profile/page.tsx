import { ProfileView } from '@/features/profile/view';
import { PageAccess } from '@/routes/components/PageAccess';

export default function Page() {
  return (
    <PageAccess routeKey="profile">
      <ProfileView />
    </PageAccess>
  );
}
