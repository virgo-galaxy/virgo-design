export interface ProfileDto {
  name: string;
  headline: string;
  bio: string;
  avatarColor: string;
  avatarImage: string;
  focusProject: string;
  digest: boolean;
  digestTime: string;
  reviewReminders: boolean;
  compactActivity: boolean;
}
export type UpdateProfileRequest = Partial<ProfileDto>;
