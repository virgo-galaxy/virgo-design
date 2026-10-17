import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ComponentProps, createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Tabs } from './index';

function renderTabs(
  props: Partial<ComponentProps<typeof Tabs>> = {},
  tabProps: Partial<ComponentProps<typeof Tabs.Tab>> = {},
) {
  return render(
    <Tabs defaultValue="overview" {...props}>
      <Tabs.List aria-label="Sections">
        <Tabs.Tab value="overview" {...tabProps}>
          Overview
        </Tabs.Tab>
        <Tabs.Tab value="api">API</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview">Overview content</Tabs.Panel>
      <Tabs.Panel value="api">API content</Tabs.Panel>
    </Tabs>,
  );
}

describe('Tabs', () => {
  it('uses the line variant and start alignment by default', () => {
    renderTabs();

    const root = screen.getByRole('tablist', { name: 'Sections' }).parentElement;
    expect(root).toHaveAttribute('data-variant', 'line');
    expect(root).toHaveAttribute('data-align', 'start');
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
  });

  it('supports the card variant and center alignment', () => {
    renderTabs({ variant: 'card', align: 'center' });

    const list = screen.getByRole('tablist', { name: 'Sections' });
    expect(list).toHaveAttribute('data-variant', 'card');
    expect(list).toHaveAttribute('data-align', 'center');
  });

  it('supports the plain variant without the sliding indicator contract', () => {
    renderTabs({ variant: 'plain' });

    const list = screen.getByRole('tablist', { name: 'Sections' });
    expect(list).toHaveAttribute('data-variant', 'plain');
    expect(list).not.toHaveAttribute('data-indicator-ready');
    expect(list.querySelector('[data-slot="indicator"]')).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders icon content as decorative and keeps the label as the accessible name', () => {
    renderTabs({}, { icon: <svg data-testid="tab-icon" /> });

    expect(screen.getByTestId('tab-icon').parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('tab', { name: 'Overview' })).toBeInTheDocument();
  });

  it('preserves disabled tab behavior', async () => {
    const user = userEvent.setup();
    renderTabs({}, { disabled: true });

    const overview = screen.getByRole('tab', { name: 'Overview' });
    expect(overview).toBeDisabled();

    await user.click(overview);
    await waitFor(() =>
      expect(screen.getByRole('tab', { name: 'API' })).toHaveAttribute('aria-selected', 'true'),
    );
  });

  it.each([0.9, 1, 1.25])(
    'keeps indicator coordinates local under scale %s when tabs change',
    async (scale) => {
      const user = userEvent.setup();
      const rect = (left: number, width: number) =>
        ({
          left,
          width,
          right: left + width,
          top: 0,
          bottom: 36,
          height: 36,
          x: left,
          y: 0,
          toJSON() {},
        }) as DOMRect;

      renderTabs();

      const list = screen.getByRole('tablist', { name: 'Sections' });
      const overview = screen.getByRole('tab', { name: 'Overview' });
      const api = screen.getByRole('tab', { name: 'API' });
      list.style.width = '300px';
      vi.spyOn(list, 'getBoundingClientRect').mockReturnValue(rect(20, 300 * scale));
      vi.spyOn(overview, 'getBoundingClientRect').mockReturnValue(
        rect(20 + 24 * scale, 96 * scale),
      );
      vi.spyOn(api, 'getBoundingClientRect').mockReturnValue(rect(20 + 144 * scale, 72 * scale));

      window.dispatchEvent(new Event('resize'));

      await waitFor(() => expect(list).toHaveAttribute('data-indicator-ready', 'true'));
      expect(parseFloat(list.style.getPropertyValue('--tabs-indicator-x'))).toBeCloseTo(24);
      expect(parseFloat(list.style.getPropertyValue('--tabs-indicator-width'))).toBeCloseTo(96);
      expect(list.querySelector('[data-slot="indicator"]')).toHaveAttribute('aria-hidden', 'true');

      await user.click(api);

      await waitFor(() => {
        expect(parseFloat(list.style.getPropertyValue('--tabs-indicator-x'))).toBeCloseTo(144);
        expect(parseFloat(list.style.getPropertyValue('--tabs-indicator-width'))).toBeCloseTo(72);
      });
    },
  );

  it('renders and invokes a card add action', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();

    renderTabs({ variant: 'card', addable: true, onAdd, addLabel: 'Add document' });

    const tabList = screen.getByRole('tablist', { name: 'Sections' });
    const addAction = screen.getByRole('button', { name: 'Add document' });

    expect(tabList).not.toContainElement(addAction);

    await user.click(addAction);

    expect(onAdd).toHaveBeenCalledOnce();
  });

  it('keeps close actions out of the Tab order and exposes Delete on closable tabs', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    const onClose = vi.fn();

    render(
      <>
        <button type="button">Before tabs</button>
        <Tabs variant="card" addable onAdd={onAdd} defaultValue="overview">
          <Tabs.List aria-label="Open tabs">
            <Tabs.Tab closable value="overview" onClose={onClose} closeLabel="Close overview">
              Overview
            </Tabs.Tab>
            <Tabs.Tab closable value="api" onClose={onClose} closeLabel="Close API">
              API
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="overview">Overview content</Tabs.Panel>
          <Tabs.Panel value="api">API content</Tabs.Panel>
        </Tabs>
      </>,
    );

    const beforeTabs = screen.getByRole('button', { name: 'Before tabs' });
    const overview = screen.getByRole('tab', { name: 'Overview' });
    const closeOverview = screen.getByRole('button', { name: 'Close overview' });
    const addAction = screen.getByRole('button', { name: 'Add tab' });

    expect(overview).toHaveAttribute('aria-keyshortcuts', 'Delete');
    expect(closeOverview).toHaveAttribute('tabindex', '-1');
    expect(screen.getByRole('tablist', { name: 'Open tabs' })).not.toContainElement(addAction);

    beforeTabs.focus();
    await user.tab();
    expect(overview).toHaveFocus();

    await user.tab();
    expect(addAction).toHaveFocus();
  });

  it('closes the focused card tab with Delete and focuses the adjacent tab', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const onValueChange = vi.fn();

    renderTabs(
      { variant: 'card', onValueChange },
      { closable: true, onClose, closeLabel: 'Close overview' },
    );

    const overview = screen.getByRole('tab', { name: 'Overview' });
    overview.focus();
    await user.keyboard('{Delete}');

    expect(onValueChange).toHaveBeenCalledWith('api');
    expect(onClose).toHaveBeenCalledWith('overview');
    expect(screen.getByRole('tab', { name: 'API' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'API' })).toHaveFocus();
  });

  it('closes a card tab and activates the next adjacent tab first', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const onValueChange = vi.fn();

    renderTabs(
      { variant: 'card', onValueChange },
      { closable: true, onClose, closeLabel: 'Close overview' },
    );

    await user.click(screen.getByRole('button', { name: 'Close overview' }));

    expect(onValueChange).toHaveBeenCalledWith('api');
    expect(onClose).toHaveBeenCalledWith('overview');
    expect(screen.getByRole('tab', { name: 'API' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'API' })).toHaveFocus();
  });

  it('forwards public props, classes, events, and refs', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const rootRef = createRef<HTMLDivElement>();
    const tabRef = createRef<HTMLButtonElement>();
    const panelRef = createRef<HTMLDivElement>();

    render(
      <Tabs ref={rootRef} className="consumer-tabs" defaultValue="overview" data-testid="tabs">
        <Tabs.List className="consumer-list" aria-label="Sections">
          <Tabs.Tab
            ref={tabRef}
            className="consumer-tab"
            value="overview"
            name="section"
            onClick={onClick}
          >
            Overview
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel ref={panelRef} className="consumer-panel" value="overview">
          Content
        </Tabs.Panel>
      </Tabs>,
    );

    expect(rootRef.current).toBe(screen.getByTestId('tabs'));
    expect(rootRef.current).toHaveClass('consumer-tabs');
    expect(screen.getByRole('tablist')).toHaveClass('consumer-list');
    expect(tabRef.current?.parentElement).toHaveClass('consumer-tab');
    expect(tabRef.current).toHaveAttribute('name', 'section');
    expect(panelRef.current).toHaveClass('consumer-panel');

    await user.click(screen.getByRole('tab', { name: 'Overview' }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});

it('styles the item, native tab and label separately while preserving tab and panel associations', async () => {
  const user = userEvent.setup();
  const ref = createRef<HTMLButtonElement>();
  render(
    <Tabs defaultValue="one">
      <Tabs.List aria-label="Languages">
        <Tabs.Tab
          ref={ref}
          value="one"
          className="item-style"
          tabClassName="button-style"
          labelClassName="label-style"
        >
          One
        </Tabs.Tab>
        <Tabs.Tab value="two">Two</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="one">First</Tabs.Panel>
      <Tabs.Panel value="two">Second</Tabs.Panel>
    </Tabs>,
  );
  expect(ref.current).toHaveClass('button-style');
  expect(ref.current!.parentElement).toHaveClass('item-style');
  expect(ref.current!.querySelector('[data-slot="label"]')).toHaveClass('label-style');
  await user.tab();
  await user.keyboard('{ArrowRight}{Enter}');
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Second');
});
