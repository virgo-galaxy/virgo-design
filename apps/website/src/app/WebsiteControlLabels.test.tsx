import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input, Layout } from '@virgo-design/ui';
import { afterEach, describe, expect, it } from 'vitest';

import { setAppLocale } from '@/i18n/runtime';

import { WebsiteControlLabels } from './WebsiteControlLabels';

afterEach(async () => {
  await setAppLocale('en-US');
});

describe('website control labels', () => {
  it('updates internal labels without resetting input visibility or sidebar state', async () => {
    const user = userEvent.setup();
    render(
      <WebsiteControlLabels>
        <Input clearable defaultValue="Virgo" />
        <Input.Password />
        <Layout>
          <Layout.Sidebar collapsible resizable>
            <span>Virgo</span>
          </Layout.Sidebar>
        </Layout>
      </WebsiteControlLabels>,
    );
    expect(screen.getByRole('button', { name: 'Clear input' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Show password' }));
    await act(async () => {
      await setAppLocale('zh-CN');
    });
    expect(screen.getByRole('button', { name: '清空输入' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '隐藏密码' })).toBeInTheDocument();
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
