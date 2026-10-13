import { describe, expect, it } from 'vitest';

import {
  avatarFileError,
  avatarForeground,
  profileInitials,
  validateProfile,
} from '@/features/profile';
import { initialProfile } from '@/mock/fixtures/profile';
import { projects } from '@/mock/fixtures/projects';

describe('profile identity and photo constraints', () => {
  it('validates identity, color, project and enabled digest time', () => {
    expect(validateProfile(initialProfile, projects)).toEqual({});
    expect(
      validateProfile(
        {
          ...initialProfile,
          name: ' ',
          avatarColor: 'red',
          focusProject: 'missing',
          digestTime: '25:00',
        },
        projects,
      ),
    ).toMatchObject({
      name: expect.any(String),
      avatarColor: expect.any(String),
      focusProject: expect.any(String),
      digestTime: expect.any(String),
    });
    expect(validateProfile({ ...initialProfile, digest: false, digestTime: '' }, projects)).toEqual(
      {},
    );
  });
  it('keeps initials legible for a single name, multiple words and an empty name', () => {
    expect(profileInitials('Example')).toBe('EX');
    expect(profileInitials('  Ava Thompson ')).toBe('AT');
    expect(profileInitials(' ')).toBe('EX');
    expect(avatarForeground('#ffffff')).toBe('#000000');
    expect(avatarForeground('#000000')).toBe('#ffffff');
    expect(avatarForeground('#1664f9')).toBe('#ffffff');
  });
  it('accepts supported images and rejects unsupported or oversized files', () => {
    expect(avatarFileError({ type: 'image/png', size: 1024 })).toBe('');
    expect(avatarFileError({ type: 'image/svg+xml', size: 1024 })).toBe('unsupportedFile');
    expect(avatarFileError({ type: 'image/jpeg', size: 2 * 1024 * 1024 + 1 })).toBe('fileTooLarge');
  });
});
