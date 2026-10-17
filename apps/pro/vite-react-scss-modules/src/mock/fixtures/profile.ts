import grokBotAvatar from '@virgo-design/icons/artwork/grok-bot.svg';

import adminHumanAvatar from '@/assets/avatars/admin.svg';

import type { ProfileRecord } from '../model/state';
export const initialProfile: ProfileRecord = {
  name: 'Administrator',
  displayName: 'Admin',
  headline: 'Administrator · Virgo Studio',
  bio: 'Building a calmer place for teams to do focused work. Keeping the product language clear, consistent and useful.',
  avatarColor: '#1664f9',
  avatarImage: adminHumanAvatar,
  botAvatarImage: grokBotAvatar,
  focusProject: 'online-store',
  digest: true,
  digestTime: '09:00',
  reviewReminders: true,
  compactActivity: false,
};
