import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Alert } from '../../components/Alert';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Calendar } from '../../components/Calendar';
import { Carousel } from '../../components/Carousel';
import { ColorPicker } from '../../components/ColorPicker';
import { DatePicker } from '../../components/DatePicker';
import { Input } from '../../components/Input';
import { Pagination } from '../../components/Pagination';
import { Select } from '../../components/Select';
import { Table } from '../../components/Table';
import { Tabs } from '../../components/Tabs';
import { Tag } from '../../components/Tag';
import { TimePicker } from '../../components/TimePicker';
import { Toast } from '../../components/Toast';
import { enUS, zhCN } from '..';
import { LocaleProvider } from '../provider/LocaleProvider';

describe('LocaleProvider', () => {
  it('localizes color editing controls and preserves an individual field override', async () => {
    const user = userEvent.setup();
    const picker = (
      <ColorPicker defaultValue="#1664f9">
        <ColorPicker.Trigger />
        <ColorPicker.Panel labels={{ hex: 'Custom HEX' }} />
      </ColorPicker>
    );
    const { rerender } = render(<LocaleProvider locale={zhCN}>{picker}</LocaleProvider>);

    await user.click(screen.getByRole('button', { name: '选择颜色' }));

    expect(screen.getByRole('slider', { name: '饱和度' })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: '亮度' })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: '色相' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Custom HEX' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '颜色格式' }));
    await user.click(screen.getByRole('option', { name: 'RGB' }));

    expect(screen.getByRole('spinbutton', { name: '红色通道' })).toBeInTheDocument();

    rerender(<LocaleProvider locale={enUS}>{picker}</LocaleProvider>);

    expect(screen.getByRole('slider', { name: 'Saturation' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'Red' })).toBeInTheDocument();
  });

  it('updates default action names across components while retaining explicit overrides', () => {
    const content = (
      <>
        <Alert>
          <Alert.Close />
        </Alert>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <Tag closable>Virgo</Tag>
        <Tag closable closeLabel="Remove filter">
          Filter
        </Tag>
        <Tabs variant="card" defaultValue="one" addable onAdd={vi.fn()}>
          <Tabs.List>
            <Tabs.Tab value="one" closable onClose={vi.fn()}>
              One
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <Toast.Provider>
          <Toast duration={0}>
            <Toast.Title>Saved</Toast.Title>
            <Toast.Close />
          </Toast>
          <Toast.Viewport />
        </Toast.Provider>
      </>
    );
    const { rerender } = render(<LocaleProvider locale={zhCN}>{content}</LocaleProvider>);

    const chineseActions = [
      '关闭提示',
      '移除标签',
      '添加标签页',
      '关闭标签页',
      '关闭通知',
      'Remove filter',
    ];

    for (const name of chineseActions) {
      expect(screen.getByRole('button', { name })).toBeInTheDocument();
    }
    expect(screen.getByRole('navigation', { name: '面包屑导航' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: '通知' })).toBeInTheDocument();

    rerender(<LocaleProvider locale={enUS}>{content}</LocaleProvider>);

    const englishActions = [
      'Close alert',
      'Remove tag',
      'Add tab',
      'Close tab',
      'Dismiss notification',
      'Remove filter',
    ];

    for (const name of englishActions) {
      expect(screen.getByRole('button', { name })).toBeInTheDocument();
    }
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Notifications' })).toBeInTheDocument();
  });

  it('localizes pagination and keeps explicit wording overrides when the locale changes', () => {
    const pagination = (
      <Pagination total={25} showAll selectedCount={2} labels={{ next: 'Forward' }} />
    );
    const { rerender } = render(<LocaleProvider locale={zhCN}>{pagination}</LocaleProvider>);

    expect(screen.getByRole('navigation', { name: '分页' })).toHaveTextContent('共 25 项');
    expect(screen.getByText('（已选 2 项）')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '第 2 页' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Forward' })).toBeInTheDocument();

    rerender(<LocaleProvider locale={enUS}>{pagination}</LocaleProvider>);

    expect(screen.getByRole('navigation', { name: 'Pagination' })).toHaveTextContent(
      'Total 25 items',
    );
    expect(screen.getByText('(Selected 2 items)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page 2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Forward' })).toBeInTheDocument();
  });

  it('scopes complete language packs and supports consumer wording overrides', () => {
    render(
      <LocaleProvider locale={zhCN}>
        <section aria-label="Chinese">
          <Input.Password />
        </section>
        <LocaleProvider
          locale={{ ...enUS, input: { ...enUS.input, showPassword: 'Reveal secret' } }}
        >
          <section aria-label="Custom English">
            <Input clearable defaultValue="Virgo" />
            <Input.Password />
          </section>
        </LocaleProvider>
      </LocaleProvider>,
    );
    expect(
      within(screen.getByRole('region', { name: 'Chinese' })).getByRole('button', {
        name: '显示密码',
      }),
    ).toBeInTheDocument();
    const english = within(screen.getByRole('region', { name: 'Custom English' }));
    expect(english.getByRole('button', { name: 'Reveal secret' })).toBeInTheDocument();
    expect(english.getByRole('button', { name: 'Clear input' })).toBeInTheDocument();
  });

  it('formats dynamic labels using the component language pack', async () => {
    const user = userEvent.setup();
    render(
      <LocaleProvider locale={zhCN}>
        <Select.Multiple defaultValue={['virgo']}>
          <Select.Trigger />
          <Select.Content>
            <Select.Option value="virgo">Virgo</Select.Option>
          </Select.Content>
        </Select.Multiple>
        <Carousel count={3}>
          <Carousel.Indicators />
        </Carousel>
        <Table.Search label="项目" />
      </LocaleProvider>,
    );
    expect(screen.getByRole('button', { name: '移除Virgo' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '前往页码 3' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '查询项目' }));
    expect(screen.getByRole('textbox', { name: '查询项目' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '查询' })).toBeInTheDocument();
  });

  it.each(['calendar', 'datePicker', 'datePickerRange'] as const)(
    'applies locale formatting to %s and preserves explicit locale and label overrides',
    (kind) => {
      const calendar = (override = false) => {
        const props = {
          defaultMonth: '2026-10',
          ...(override ? { locale: 'en-US', previousMonthLabel: 'Back' } : {}),
        };
        if (kind === 'calendar') return <Calendar {...props} />;
        if (kind === 'datePickerRange')
          return (
            <DatePicker.Range>
              <DatePicker.RangeCalendar {...props} />
            </DatePicker.Range>
          );
        return (
          <DatePicker>
            <DatePicker.Calendar {...props} />
          </DatePicker>
        );
      };
      const { rerender } = render(<LocaleProvider locale={zhCN}>{calendar()}</LocaleProvider>);
      expect(screen.getByRole('grid', { name: '2026年10月' })).toBeInTheDocument();
      expect(screen.getAllByRole('button', { name: '上个月' })[0]).toBeInTheDocument();
      rerender(<LocaleProvider locale={zhCN}>{calendar(true)}</LocaleProvider>);
      expect(screen.getByRole('grid', { name: 'October 2026' })).toBeInTheDocument();
      expect(screen.getAllByRole('button', { name: 'Back' })[0]).toBeInTheDocument();
    },
  );

  it('localizes time actions and default select prompts', async () => {
    const user = userEvent.setup();
    render(
      <LocaleProvider locale={zhCN}>
        <Select>
          <Select.Trigger />
        </Select>
        <TimePicker defaultValue="10:30" showClear showConfirm />
      </LocaleProvider>,
    );
    expect(screen.getByRole('button', { name: '请选择' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '选择时间' }));
    expect(screen.getByRole('button', { name: '清空输入' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '完成' })).toBeInTheDocument();
  });
});
