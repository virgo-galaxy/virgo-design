import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';

import CheckboxCheckAllExample from './checkbox/CheckboxCheckAllExample';
import CommandDialogExample from './command/CommandDialogExample';
import { drawerExamples } from './drawer/examples';
import LayoutControlledSidebarExample from './layout/LayoutControlledSidebarExample';
import MenuActionsExample from './menu/MenuActionsExample';
import { popoverExamples } from './popover/examples';
import RadioBasicExample from './radio/RadioBasicExample';
import TabsEditableExample from './tabs/TabsEditableExample';
import { tagExamples } from './tag/examples';
import ToastIntentsExample from './toast/ToastIntentsExample';
import ToastUndoExample from './toast/ToastUndoExample';

describe('Independent component examples', () => {
  it('keeps check-all state local to each mounted use case', () => {
    render(
      <>
        <section aria-label="First fruit">
          <CheckboxCheckAllExample />
        </section>
        <section aria-label="Second fruit">
          <CheckboxCheckAllExample />
        </section>
      </>,
    );
    const first = within(screen.getByRole('region', { name: 'First fruit' }));
    const second = within(screen.getByRole('region', { name: 'Second fruit' }));
    expect(first.getByRole('checkbox', { name: 'Check all' })).toBePartiallyChecked();
    fireEvent.click(first.getByRole('checkbox', { name: 'Check all' }));
    expect(first.getByRole('checkbox', { name: 'Pear' })).toBeChecked();
    expect(second.getByRole('checkbox', { name: 'Pear' })).not.toBeChecked();
    expect(second.getByRole('checkbox', { name: 'Check all' })).toBePartiallyChecked();
  });

  it('uses distinct native radio group names when the same example is rendered twice', () => {
    render(
      <>
        <section aria-label="First radio">
          <RadioBasicExample />
        </section>
        <section aria-label="Second radio">
          <RadioBasicExample />
        </section>
      </>,
    );
    const first = within(screen.getByRole('region', { name: 'First radio' }));
    const second = within(screen.getByRole('region', { name: 'Second radio' }));
    expect(first.getByRole('radio', { name: 'Pear' }).getAttribute('name')).not.toBe(
      second.getByRole('radio', { name: 'Pear' }).getAttribute('name'),
    );
    fireEvent.click(first.getByRole('radio', { name: 'Apple' }));
    expect(first.getByRole('radio', { name: 'Apple' })).toBeChecked();
    expect(second.getByRole('radio', { name: 'Pear' })).toBeChecked();
  });

  it('retains a closable collection through bulk source disclosure without changing its sibling', () => {
    render(
      <ComponentExampleRuntimeProvider>
        <ComponentExampleRuntimeControl />
        <section aria-label="First tags">
          <ComponentExample example={tagExamples.tagClosable} />
        </section>
        <section aria-label="Second tags">
          <ComponentExample example={tagExamples.tagClosable} />
        </section>
      </ComponentExampleRuntimeProvider>,
    );
    const first = within(screen.getByRole('region', { name: 'First tags' }));
    const second = within(screen.getByRole('region', { name: 'Second tags' }));
    fireEvent.click(first.getByRole('button', { name: 'Remove React' }));
    fireEvent.click(screen.getByRole('button', { name: 'Expand all' }));
    fireEvent.click(screen.getByRole('button', { name: 'Collapse all' }));
    expect(first.queryByRole('button', { name: 'Remove React' })).not.toBeInTheDocument();
    expect(second.getByRole('button', { name: 'Remove React' })).toBeInTheDocument();
    fireEvent.click(first.getByRole('button', { name: 'Reset tags' }));
    expect(first.getByRole('button', { name: 'Remove React' })).toBeInTheDocument();
  });

  it('adds and closes editable tabs with active-tab fallback', () => {
    render(<TabsEditableExample />);
    fireEvent.click(screen.getByRole('button', { name: 'Add document tab' }));
    expect(screen.getByRole('tab', { name: 'Tab 4' })).toHaveAttribute('aria-selected', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Close Tab 4' }));
    expect(screen.queryByRole('tab', { name: 'Tab 4' })).not.toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 3' })).toHaveAttribute('aria-selected', 'true');
  });

  it.each([
    ['drawer', drawerExamples.drawerForm],
    ['popover', popoverExamples.popoverForm],
  ] as const)('preserves the %s form through source disclosure', async (_name, example) => {
    const user = userEvent.setup();
    render(<ComponentExample example={example} />);
    await user.click(screen.getByRole('button', { name: 'Edit workspace' }));
    const input = screen.getByRole('textbox', { name: 'Workspace name' });
    await user.clear(input);
    await user.type(input, 'Independent workspace');
    await user.click(screen.getByRole('button', { name: 'Save changes' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: `View source for ${example.title}` }));
    await user.click(screen.getByRole('button', { name: `Hide source for ${example.title}` }));
    await user.click(screen.getByRole('button', { name: 'Edit workspace' }));
    expect(screen.getByRole('textbox', { name: 'Workspace name' })).toHaveValue(
      'Independent workspace',
    );
  });

  it('scopes command shortcuts to the focused example instead of the document', async () => {
    render(
      <>
        <button>Outside command example</button>
        <CommandDialogExample />
        <CommandDialogExample />
      </>,
    );
    fireEvent.keyDown(screen.getByRole('button', { name: 'Outside command example' }), {
      key: 'k',
      ctrlKey: true,
    });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    const triggers = screen.getAllByRole('button', { name: 'Open command palette' });
    fireEvent.keyDown(triggers[0]!, { key: 'k', ctrlKey: true });
    expect(await screen.findAllByRole('dialog')).toHaveLength(1);
    fireEvent.change(screen.getByRole('combobox', { name: 'Search command palette' }), {
      target: { value: 'home' },
    });
    fireEvent.click(await screen.findByRole('option', { name: 'Open dashboard' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(screen.getByText('Selected: open-dashboard')).toBeInTheDocument();
    expect(screen.getByText('Selected: No command selected.')).toBeInTheDocument();
  });

  it('keeps toast providers, viewports, and undo feedback separate', async () => {
    const user = userEvent.setup();
    render(
      <>
        <ToastIntentsExample />
        <ToastUndoExample />
      </>,
    );
    await user.click(screen.getByRole('button', { name: 'Show success' }));
    const statusViewport = screen.getByRole('region', { name: 'Status notifications' });
    const archiveViewport = screen.getByRole('region', { name: 'Archive notifications' });
    expect(statusViewport.querySelectorAll('[data-toast-root]')).toHaveLength(1);
    expect(archiveViewport.querySelectorAll('[data-toast-root]')).toHaveLength(0);
    await user.click(screen.getByRole('button', { name: 'Archive with Undo' }));
    expect(archiveViewport.querySelectorAll('[data-toast-root]')).toHaveLength(1);
    await user.click(within(archiveViewport).getByRole('button', { name: 'Undo' }));
    expect(screen.getByText('Document is in your workspace.')).toBeInTheDocument();
    expect(statusViewport.querySelectorAll('[data-toast-root]')).toHaveLength(1);
  });

  it('starts action menus closed and reports local selection', async () => {
    const user = userEvent.setup();
    render(<MenuActionsExample />);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await user.click(screen.getByRole('menuitem', { name: 'Rename' }));
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    expect(screen.getByRole('status')).toHaveTextContent('Rename');
  });

  it('retains the external sidebar toggle and its controls relationship', () => {
    render(<LayoutControlledSidebarExample />);
    const toggle = screen.getByRole('button', { name: 'Collapse sidebar' });
    const sidebar = document.getElementById(toggle.getAttribute('aria-controls')!);
    expect(sidebar).toHaveAttribute('data-state', 'expanded');
    fireEvent.click(toggle);
    expect(sidebar).toHaveAttribute('data-state', 'collapsed');
    expect(screen.getByRole('button', { name: 'Expand sidebar' })).toBe(toggle);
    fireEvent.click(toggle);
    expect(sidebar).toHaveAttribute('data-state', 'expanded');
  });
});
