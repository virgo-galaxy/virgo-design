// @vitest-environment jsdom
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input, Table } from '@virgo-design/ui';
import { StrictMode } from 'react';
import { createMemoryRouter } from 'react-router';
import { afterEach, expect, it, vi } from 'vitest';

import { i18nInstance } from '@/i18n';
import { createAppRouter } from '@/routes/router';

vi.mock('@/routes/router', () => ({ createAppRouter: vi.fn() }));

afterEach(() => vi.unstubAllEnvs());

it('switches the UI language with the app while preserving component state', async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter([
    {
      path: '*',
      element: (
        <>
          <Input.Password aria-label="Password" defaultValue="virgo123" />
          <Table.Search label="Task" />
        </>
      ),
    },
  ]);
  vi.mocked(createAppRouter).mockReturnValue(router);
  vi.stubEnv('VITE_API_MOCKING', 'false');

  const { App } = await import('../App');
  const view = render(
    <StrictMode>
      <App />
    </StrictMode>,
  );

  try {
    const password = screen.getByLabelText('Password');
    await user.click(screen.getByRole('button', { name: 'Show password' }));
    await act(() => i18nInstance.changeLanguage('zh-CN'));
    expect(password).toHaveAttribute('type', 'text');
    expect(password).toHaveValue('virgo123');
    expect(screen.getByRole('button', { name: '隐藏密码' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '查询Task' }));
    const search = screen.getByRole('textbox', { name: '查询Task' });
    await user.type(search, 'Virgo');
    await act(() => i18nInstance.changeLanguage('en-US'));
    expect(screen.getByRole('textbox', { name: 'Search Task' })).toBe(search);
    expect(search).toHaveValue('Virgo');
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  } finally {
    view.unmount();
    router.dispose();
  }
});
