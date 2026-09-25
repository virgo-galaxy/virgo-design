import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { App } from '../../App';
import { componentRoutes } from '../../app/componentRoutes';

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});
describe('Tooltip Playground', () => {
  it('includes a four-button smooth transition example with immediate, exclusive handoff', () => {
    vi.useFakeTimers();
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={['/components/tooltip']}>
        <App />
      </MemoryRouter>,
    );
    const group = screen.getByRole('group', { name: 'Smooth transition' });
    expect(within(group).getAllByRole('button')).toHaveLength(4);
    let previous = within(group).getByRole('button', { name: 'Overview' });
    fireEvent.pointerEnter(previous);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(400));
    for (const name of ['Members', 'Activity', 'Settings']) {
      const next = within(group).getByRole('button', { name });
      fireEvent.pointerLeave(previous);
      fireEvent.pointerEnter(next);
      expect(screen.getAllByRole('tooltip', { hidden: true })).toHaveLength(1);
      const panel = screen.getByRole('tooltip');
      expect(panel).toHaveTextContent('Explore your workspace.');
      expect(panel).toHaveAttribute('data-continuous', 'true');
      expect(next).toHaveAttribute('aria-describedby', panel.id);
      expect(previous).not.toHaveAttribute('aria-describedby');
      previous = next;
    }
  });
  it('groups Popover/Tooltip in Data Display and demonstrates all twelve directions and native actions', async () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/components/tooltip']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: 'Tooltip', level: 1 })).toBeInTheDocument();
    expect(
      componentRoutes.filter((route) => route.group === 'data-display').map((route) => route.name),
    ).toEqual(['Accordion', 'Badge', 'Dialog', 'Drawer', 'Popover', 'Tag', 'Toast', 'Tooltip']);
    expect(
      componentRoutes.filter((route) => route.group === 'general').map((route) => route.name),
    ).toEqual(['Button', 'Surface']);
    const compass = screen.getByRole('group', { name: 'Twelve placements' });
    expect(within(compass).getAllByRole('button')).toHaveLength(12);
    const top = within(compass).getByRole('button', { name: 'topRight' });
    act(() => top.focus());
    expect(screen.getByRole('tooltip')).toHaveTextContent('topRight tooltip');
    await user.keyboard('{Escape}');
    await user.click(screen.getByRole('button', { name: 'Workspace settings' }));
    expect(screen.getByRole('status')).toHaveTextContent('Settings opened: 1');
  });
  it('keeps sections 01, 03, 04, 05 and 06 in ordinary mode after visiting the smooth example', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={['/components/tooltip']}>
        <App />
      </MemoryRouter>,
    );
    const smooth = screen.getByRole('group', { name: 'Smooth transition' });
    for (const name of [
      'Instant preview',
      'topRight',
      'brand',
      'Workspace settings',
      'RTL preview',
    ]) {
      act(() => within(smooth).getByRole('button', { name: 'Overview' }).focus());
      act(() => within(smooth).getByRole('button', { name: 'Members' }).focus());
      expect(screen.getByRole('tooltip')).toHaveAttribute('data-continuous', 'true');
      act(() => screen.getByRole('button', { name }).focus());
      expect(screen.getByRole('tooltip')).not.toHaveAttribute('data-continuous');
    }
  });
  it('bootstraps the Dropdown icon trigger without swallowing the menu action', async () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/components/dropdown']}>
        <App />
      </MemoryRouter>,
    );
    const trigger = screen.getByRole('button', { name: 'More workspace actions' });
    act(() => trigger.focus());
    expect(screen.getByRole('tooltip')).toHaveTextContent('More workspace actions');
    expect(trigger).not.toHaveAttribute('title');
    await user.click(trigger);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    await user.click(screen.getByRole('menuitem', { name: 'Settings' }));
    expect(screen.getByRole('status')).toHaveTextContent('Settings selected');
  });
});
