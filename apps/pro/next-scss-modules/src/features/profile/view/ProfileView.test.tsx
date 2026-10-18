// @vitest-environment jsdom
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import type { ReactNode } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterAll, afterEach, beforeAll, beforeEach, expect, it } from 'vitest';

import {
  getProfileIdentity,
  getProfilePreferences,
  updateProfileIdentity,
  updateProfilePreferences,
} from '@/api/profile';
import { CatalogProvider } from '@/features/catalog';
import { resetProfile } from '@/server/demo/handlers/profile';
import { useInvalidateResources } from '@/store/resources';
import { handlers } from '@/test/demo-handlers';
import { TestSessionProvider } from '@/test/TestSessionProvider';

import { ProfileIdentityProvider } from '../context/ProfileIdentityProvider';
import { ProfileView } from './ProfileView';

const server = setupServer(...handlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
beforeEach(() => resetProfile());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function RefreshProfile({ children }: { children: ReactNode }) {
  const invalidate = useInvalidateResources();
  return (
    <>
      <button onClick={() => invalidate({ profile: true })}>Refresh profile</button>
      {children}
    </>
  );
}

function mount() {
  const router = createMemoryRouter([
    {
      path: '*',
      element: (
        <TestSessionProvider>
          <CatalogProvider>
            <ProfileIdentityProvider>
              <RefreshProfile>
                <ProfileView />
              </RefreshProfile>
            </ProfileIdentityProvider>
          </CatalogProvider>
        </TestSessionProvider>
      ),
    },
  ]);
  const view = render(<RouterProvider router={router} />);
  return () => {
    view.unmount();
    router.dispose();
  };
}

it('saves identity without overwriting preferences changed after the editor opened', async () => {
  const dispose = mount();
  try {
    fireEvent.click(await screen.findByRole('button', { name: 'Edit profile' }));
    const name = await screen.findByRole('textbox', { name: 'Display name' });
    await updateProfilePreferences({ digest: false, reviewReminders: false });
    fireEvent.change(name, { target: { value: 'Updated administrator' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save profile' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(await getProfileIdentity()).toMatchObject({
      name: 'Updated administrator',
    });
    expect(await getProfilePreferences()).toMatchObject({
      digest: false,
      reviewReminders: false,
    });
  } finally {
    dispose();
  }
});

it('keeps edited preference fields while refreshing untouched fields and saves only the edits', async () => {
  const dispose = mount();
  try {
    await screen.findByRole('button', { name: 'Edit profile' });
    fireEvent.click(screen.getByRole('tab', { name: 'Preferences' }));
    const digest = screen.getByRole('switch', { name: 'Daily digest enabled' });
    const reminders = screen.getByRole('switch', { name: 'Review reminders enabled' });
    expect(digest).toBeChecked();
    expect(reminders).toBeChecked();
    fireEvent.click(digest);
    await updateProfilePreferences({ reviewReminders: false });
    await updateProfileIdentity({ headline: 'Updated in another view' });
    fireEvent.click(screen.getByRole('button', { name: 'Refresh profile' }));
    await waitFor(() => expect(reminders).not.toBeChecked());
    expect(digest).not.toBeChecked();
    await act(async () =>
      fireEvent.click(screen.getByRole('button', { name: 'Save preferences' })),
    );
    await screen.findByText('Personal preferences saved.');
    expect(await getProfilePreferences()).toMatchObject({
      digest: false,
      reviewReminders: false,
    });
    expect(await getProfileIdentity()).toMatchObject({
      headline: 'Updated in another view',
    });
  } finally {
    dispose();
  }
});
