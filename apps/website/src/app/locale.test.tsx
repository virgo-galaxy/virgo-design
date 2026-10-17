import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input, Layout, Table } from '@virgo-design/ui';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { setAppLocale } from '@/i18n/runtime';

import { App } from '../App';

vi.mock('@/layout/AppLayout', () => ({
  AppLayout: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock('@/app/routes/AppRouter', () => ({
  AppRouter: () => (
    <>
      <Input clearable defaultValue="Virgo" />
      <Input.Password />
      <Table.Search label="Task" />
      <Layout>
        <Layout.Sidebar collapsible resizable>
          <span>Virgo</span>
        </Layout.Sidebar>
      </Layout>
    </>
  ),
}));

afterEach(async () => {
  await setAppLocale('en-US');
});

describe('Website App locale', () => {
  it('updates internal labels without resetting input visibility or sidebar state', async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(screen.getByRole('button', { name: 'Clear input' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Show password' }));
    await act(async () => {
      await setAppLocale('zh-CN');
    });
    expect(screen.getByRole('button', { name: '清空输入' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '隐藏密码' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '查询Task' }));
    expect(screen.getByRole('textbox', { name: '查询Task' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '查询' })).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.getByRole('separator', { name: '调整侧栏宽度' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '收起侧栏' }));
    expect(screen.getByRole('button', { name: '展开侧栏' })).toBeInTheDocument();
    await act(async () => {
      await setAppLocale('en-US');
    });
    expect(screen.getByRole('button', { name: 'Hide password' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Expand sidebar' })).toBeInTheDocument();
  });
});
