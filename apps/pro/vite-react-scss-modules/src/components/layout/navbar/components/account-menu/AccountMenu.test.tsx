// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { i18nInstance } from '@/i18n';
import { initialProfile } from '@/mock/fixtures/profile';

import { AccountMenu } from './AccountMenu';

const { navigate, signOut, changeMode, currentUser, profileResource } = vi.hoisted(() => ({
  navigate: vi.fn(),
  signOut: vi.fn(),
  changeMode: vi.fn(),
  currentUser: { name: 'Admin', role: 'admin', account: 'admin', department: 'Platform' },
  profileResource: vi.fn(),
}));
vi.mock('react-router', async (importOriginal) => ({
  ...(await importOriginal<typeof import('react-router')>()),
  useNavigate: () => navigate,
}));
vi.mock('@/features/auth', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/features/auth')>()),
  useSession: () => ({ signOut }),
  useCurrentUser: () => currentUser,
}));
vi.mock('@/features/profile', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/features/profile')>()),
  useProfileIdentityResource: profileResource,
}));

beforeEach(async () => {
  vi.resetAllMocks();
  currentUser.role = 'admin';
  profileResource.mockReturnValue({ data: initialProfile });
  await i18nInstance.changeLanguage('en-US');
});
afterEach(cleanup);

describe('account menu', () => {
  it.each(['member', 'manager'])('hides Agent mode for %s accounts', async (role) => {
    currentUser.role = role;
    render(<AccountMenu agentMode={true} onAgentModeChange={changeMode} />);
    fireEvent.click(screen.getByRole('button', { name: 'Admin account' }));
    await screen.findByRole('menu');
    expect(screen.queryByRole('menuitem', { name: 'Agent mode' })).toBeNull();
    expect(screen.getByRole('menuitem', { name: 'Personal center' })).toBeTruthy();
    expect(screen.getByRole('menuitem', { name: 'Sign out' })).toBeTruthy();
    expect(changeMode).not.toHaveBeenCalled();
  });

  it('enters and leaves Agent mode while preserving the account name and avatar', async () => {
    const { rerender } = render(<AccountMenu agentMode={false} onAgentModeChange={changeMode} />);
    const human = screen.getByRole('button', { name: 'Admin account' });
    expect(human.querySelector('img')?.getAttribute('src')).toBe(initialProfile.avatarImage);
    fireEvent.click(human);
    fireEvent.click(await screen.findByRole('menuitem', { name: 'Agent mode' }));
    await waitFor(() => expect(changeMode).toHaveBeenCalledWith(true));
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
    rerender(<AccountMenu agentMode={true} onAgentModeChange={changeMode} />);
    const bot = screen.getByRole('button', { name: 'Admin account' });
    expect(bot.querySelector('img')?.getAttribute('src')).toBe(initialProfile.avatarImage);
    fireEvent.click(bot);
    fireEvent.click(await screen.findByRole('menuitem', { name: 'Agent mode' }));
    await waitFor(() => expect(changeMode).toHaveBeenLastCalledWith(false));
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
    rerender(<AccountMenu agentMode={false} onAgentModeChange={changeMode} />);
    expect(
      screen
        .getByRole('button', { name: 'Admin account' })
        .querySelector('img')
        ?.getAttribute('src'),
    ).toBe(initialProfile.avatarImage);
  });

  it('opens account actions and navigates to the personal center', async () => {
    render(<AccountMenu agentMode={false} onAgentModeChange={changeMode} />);
    const trigger = screen.getByRole('button', { name: 'Admin account' });
    fireEvent.click(trigger);
    const menu = await screen.findByRole('menu', { name: 'Admin account' });
    expect(within(menu).queryByRole('menuitem', { name: 'Reset demo data' })).toBeNull();
    expect(screen.getByText('Administrator · Platform')).toBeTruthy();
    fireEvent.click(screen.getByRole('menuitem', { name: 'Personal center' }));
    expect(navigate).toHaveBeenCalledWith('/profile');
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
  });

  it('keeps sign-out usable without profile data and permits retry after failure', async () => {
    profileResource.mockReturnValue({ data: null });
    signOut.mockRejectedValueOnce(new Error('Network failed')).mockResolvedValueOnce(undefined);
    render(<AccountMenu agentMode={false} onAgentModeChange={changeMode} />);
    const trigger = screen.getByRole('button', { name: 'Admin account' });
    expect(within(trigger).getByText('A')).toBeInTheDocument();
    expect(trigger.querySelector('img')).toBeNull();
    fireEvent.click(trigger);
    fireEvent.click(await screen.findByRole('menuitem', { name: 'Sign out' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Unable to sign out');
    expect(screen.getByRole('menuitem', { name: 'Sign out' })).not.toBeDisabled();
    expect(navigate).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('menuitem', { name: 'Sign out' }));
    await waitFor(() => expect(signOut).toHaveBeenCalledTimes(2));
  });
});
