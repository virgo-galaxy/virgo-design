import grokBotAvatar from '@virgo-design/icons/artwork/grok-bot.svg';

import type { ProfileDto as ProfileState } from '@/api/profile';
import adminHumanAvatar from '@/assets/avatars/admin.svg';
export const initialProfile: ProfileState = {
  name: 'Administrator',
  displayName: 'Admin',
  headline: 'Administrator · Virgo Studio',
  bio: 'Building a calmer place for teams to do focused work. Keeping the product language clear, consistent and useful.',
  avatarColor: '#1664f9',
  avatarImage: adminHumanAvatar,
  botAvatarImage: grokBotAvatar,
  focusProject: 'workspace',
  digest: true,
  digestTime: '09:00',
  reviewReminders: true,
  compactActivity: false,
};
