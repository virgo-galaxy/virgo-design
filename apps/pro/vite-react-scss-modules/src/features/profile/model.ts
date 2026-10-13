import type { ProfileDto, ProfileValidationCode } from '@/api/profile/contract';
import type { ProjectDto as Project } from '@/api/projects/contract';
export type ProfileState = ProfileDto;
export function validateProfile(profile: ProfileState, projects: readonly Project[]) {
  const errors: Partial<Record<keyof ProfileState, ProfileValidationCode>> = {};
  if (!profile.name.trim() || profile.name.trim().length > 60) errors.name = 'nameInvalid';
  if (profile.headline.length > 100) errors.headline = 'headlineTooLong';
  if (profile.bio.length > 600) errors.bio = 'bioTooLong';
  if (!/^#[\da-f]{6}$/i.test(profile.avatarColor)) errors.avatarColor = 'colorInvalid';
  if (!projects.some((project) => project.id === profile.focusProject))
    errors.focusProject = 'projectInvalid';
  if (profile.digest && !/^([01]\d|2[0-3]):[0-5]\d$/.test(profile.digestTime))
    errors.digestTime = 'digestTimeInvalid';
  return errors;
}
export function profileInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (
    (parts.length === 1
      ? parts[0]!.slice(0, 2)
      : parts
          .slice(0, 2)
          .map((part) => part[0])
          .join('')
    ).toUpperCase() || 'EX'
  );
}
export function avatarForeground(color: string) {
  if (!/^#[\da-f]{6}$/i.test(color)) return '#ffffff';
  const rgb = [1, 3, 5].map((offset) => {
    const channel = parseInt(color.slice(offset, offset + 2), 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return rgb[0]! * 0.2126 + rgb[1]! * 0.7152 + rgb[2]! * 0.0722 > 0.179 ? '#000000' : '#ffffff';
}

export function avatarFileError(file: { type: string; size: number }) {
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) return 'unsupportedFile';
  if (file.size > 2 * 1024 * 1024) return 'fileTooLarge';
  return '';
}
