// @vitest-environment jsdom
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input, Table } from '@virgo-design/ui';
import { StrictMode } from 'react';
import { expect, it } from 'vitest';

import { i18nInstance } from '@/i18n';

import { LocaleProvider } from './LocaleProvider';

it('switches UI language without remounting stateful controls', async () => {
  const user = userEvent.setup();
  render(
    <StrictMode>
      <LocaleProvider>
        <Input.Password aria-label="Password" defaultValue="virgo123" />
        <Table.Search label="Task" />
      </LocaleProvider>
    </StrictMode>,
  );
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
});
