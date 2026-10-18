export interface ProfileIdentityDto {
  name: string;
  displayName?: string;
  headline: string;
  bio: string;
  avatarColor: string;
  avatarImage: string;
  botAvatarImage?: string;
}

export interface ProfilePreferencesDto {
  focusProject: string;
  digest: boolean;
  digestTime: string;
  reviewReminders: boolean;
  compactActivity: boolean;
}

export type UpdateProfileIdentityRequest = Partial<ProfileIdentityDto>;
export type UpdateProfilePreferencesRequest = Partial<ProfilePreferencesDto>;

export type ProfileValidationCode =
  | 'nameInvalid'
  | 'headlineTooLong'
  | 'bioTooLong'
  | 'colorInvalid'
  | 'projectInvalid'
  | 'digestTimeInvalid'
  | 'unsupportedFile'
  | 'fileTooLarge'
  | 'imageUnreadable';
