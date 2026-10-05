export interface ProfileDto {
  name: string;
  displayName?: string;
  headline: string;
  bio: string;
  avatarColor: string;
  avatarImage: string;
  botAvatarImage?: string;
  focusProject: string;
  digest: boolean;
  digestTime: string;
  reviewReminders: boolean;
  compactActivity: boolean;
}
export type UpdateProfileRequest = Partial<ProfileDto>;
