import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Tabs } from './index';

function TabsExample({
  value,
  defaultValue,
  onValueChange,
}: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}) {
  return (
    <Tabs value={value} defaultValue={defaultValue} onValueChange={onValueChange}>
      <Tabs.List aria-label="Item sections">
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab disabled value="settings">
          Settings
        </Tabs.Tab>
        <Tabs.Tab value="api">API</Tabs.Tab>
        <Tabs.Tab value="accessibility">Accessibility</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview">Overview content</Tabs.Panel>
      <Tabs.Panel value="settings">Settings content</Tabs.Panel>
      <Tabs.Panel value="api">API content</Tabs.Panel>
      <Tabs.Panel value="accessibility">Accessibility content</Tabs.Panel>
    </Tabs>
  );
}

describe('Tabs primitive', () => {
  it('selects the first enabled tab by default and shows its panel', async () => {
    render(<TabsExample />);

    await waitFor(() =>
      expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute(
        'aria-selected',
        'true',
      ),
    );

    expect(screen.getByRole('tabpanel', { name: 'Overview' })).toBeVisible();
    const apiPanelId = screen.getByRole('tab', { name: 'API' }).getAttribute('aria-controls');
    expect(document.getElementById(apiPanelId!)).not.toBeVisible();
  });

  it('supports an uncontrolled default value and click selection', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(<TabsExample defaultValue="api" onValueChange={onValueChange} />);

    expect(screen.getByRole('tab', { name: 'API' })).toHaveAttribute('aria-selected', 'true');

    await user.click(screen.getByRole('tab', { name: 'Accessibility' }));

    expect(onValueChange).toHaveBeenCalledWith('accessibility');
    expect(screen.getByRole('tabpanel', { name: 'Accessibility' })).toBeVisible();
  });

  it('supports controlled values without changing selection itself', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(<TabsExample value="overview" onValueChange={onValueChange} />);

    await user.click(screen.getByRole('tab', { name: 'API' }));

    expect(onValueChange).toHaveBeenCalledWith('api');
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
  });

  it('composes a controlled value with application state', async () => {
    const user = userEvent.setup();

    function ControlledTabs() {
      const [value, setValue] = useState('overview');
      return <TabsExample value={value} onValueChange={setValue} />;
    }

    render(<ControlledTabs />);
    await user.click(screen.getByRole('tab', { name: 'API' }));

    expect(screen.getByRole('tab', { name: 'API' })).toHaveAttribute('aria-selected', 'true');
  });

  it('keeps disabled tabs visible and unavailable', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(<TabsExample defaultValue="overview" onValueChange={onValueChange} />);

    const disabledTab = screen.getByRole('tab', { name: 'Settings' });
    expect(disabledTab).toBeDisabled();
    expect(disabledTab).toHaveAttribute('aria-disabled', 'true');

    await user.click(disabledTab);

    expect(onValueChange).not.toHaveBeenCalled();
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
  });

  it('moves focus and selection with ArrowLeft and ArrowRight while skipping disabled tabs', async () => {
    const user = userEvent.setup();

    render(<TabsExample defaultValue="overview" />);

    const overview = screen.getByRole('tab', { name: 'Overview' });
    const api = screen.getByRole('tab', { name: 'API' });
    const accessibility = screen.getByRole('tab', { name: 'Accessibility' });

    overview.focus();
    await user.keyboard('{ArrowRight}');
    expect(api).toHaveFocus();
    expect(api).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{ArrowLeft}');
    expect(overview).toHaveFocus();

    await user.keyboard('{ArrowLeft}');
    expect(accessibility).toHaveFocus();
  });

  it('moves to the first and last enabled tabs with Home and End', async () => {
    const user = userEvent.setup();

    render(<TabsExample defaultValue="api" />);

    const api = screen.getByRole('tab', { name: 'API' });
    api.focus();

    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Accessibility' })).toHaveFocus();

    await user.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveFocus();
  });

  it('associates every tab and panel with matching aria ids', () => {
    render(<TabsExample defaultValue="overview" />);

    const tab = screen.getByRole('tab', { name: 'Overview' });
    const panel = screen.getByRole('tabpanel', { name: 'Overview' });

    expect(tab).toHaveAttribute('aria-controls', panel.id);
    expect(panel).toHaveAttribute('aria-labelledby', tab.id);
    expect(tab).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('tab', { name: 'API' })).toHaveAttribute('tabindex', '-1');
  });

  it('generates distinct tab and panel ids for values with ambiguous encoded forms', () => {
    render(
      <Tabs defaultValue="a%b">
        <Tabs.List aria-label="Special values">
          <Tabs.Tab value="a%b">Percent value</Tabs.Tab>
          <Tabs.Tab value="a-25b">Hyphen value</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="a%b">Percent content</Tabs.Panel>
        <Tabs.Panel value="a-25b">Hyphen content</Tabs.Panel>
      </Tabs>,
    );

    const percentTab = screen.getByRole('tab', { name: 'Percent value' });
    const hyphenTab = screen.getByRole('tab', { name: 'Hyphen value' });
    const percentPanelId = percentTab.getAttribute('aria-controls');
    const hyphenPanelId = hyphenTab.getAttribute('aria-controls');

    expect(percentTab.id).not.toBe(hyphenTab.id);
    expect(percentPanelId).not.toBe(hyphenPanelId);
    expect(document.getElementById(percentPanelId!)).toHaveAttribute(
      'aria-labelledby',
      percentTab.id,
    );
    expect(document.getElementById(hyphenPanelId!)).toHaveAttribute(
      'aria-labelledby',
      hyphenTab.id,
    );
  });
});
