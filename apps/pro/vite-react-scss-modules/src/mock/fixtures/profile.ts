import type { ProfileDto as ProfileState } from '@/api/profile';
export const initialProfile: ProfileState = {
  name: 'Mystic',
  headline: 'Product & design · Workspace owner',
  bio: 'Building a calmer place for teams to do focused work. Keeping the product language clear, consistent and useful.',
  avatarColor: '#1664f9',
  avatarImage: '',
  focusProject: 'workspace',
  digest: true,
  digestTime: '09:00',
  reviewReminders: true,
  compactActivity: false,
};
