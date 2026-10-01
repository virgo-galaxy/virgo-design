import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Tree } from './index';
import type { TreeProps } from './Tree.types';
function Fixture(props: TreeProps) {
  return (
    <Tree aria-label="Files" {...props}>
      <Tree.Item value="src" branch>
        <Tree.Label>
          <Tree.Toggle />
          Source
        </Tree.Label>
        <Tree.Group>
          <Tree.Item value="app">
            <Tree.Label>App</Tree.Label>
          </Tree.Item>
          <Tree.Item value="disabled" disabled>
            <Tree.Label>Disabled</Tree.Label>
          </Tree.Item>
          <Tree.Item value="utils">
            <Tree.Label>Utils</Tree.Label>
          </Tree.Item>
        </Tree.Group>
      </Tree.Item>
      <Tree.Item value="readme">
        <Tree.Label>Readme</Tree.Label>
      </Tree.Item>
    </Tree>
  );
}
describe('Tree focus, expansion and selection', () => {
  it('uses one visible tab stop and separates focus from selection', async () => {
    const user = userEvent.setup();
    render(<Fixture />);
    await user.tab();
    const src = screen.getByRole('treeitem', { name: 'Source' });
    expect(src).toHaveFocus();
    expect(src).toHaveAttribute('aria-expanded', 'false');
    await user.keyboard('{ArrowRight}');
    expect(src).toHaveFocus();
    expect(src).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('treeitem', { name: 'App' })).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('treeitem', { name: 'Utils' })).toHaveFocus();
    expect(screen.getByRole('treeitem', { name: 'Utils' })).toHaveAttribute(
      'aria-selected',
      'false',
    );
    await user.keyboard('{Enter}');
    expect(screen.getByRole('treeitem', { name: 'Utils' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await user.keyboard('{ArrowLeft}');
    expect(src).toHaveFocus();
    await user.keyboard('{ArrowLeft}');
    expect(src).toHaveAttribute('aria-expanded', 'false');
    await user.keyboard('{End}');
    expect(screen.getByRole('treeitem', { name: 'Readme' })).toHaveFocus();
    await user.keyboard('{Home}');
    expect(src).toHaveFocus();
    expect(screen.getAllByRole('treeitem').filter((node) => node.tabIndex === 0)).toHaveLength(1);
  });
  it('supports modifier-free multiple selection and typeahead', async () => {
    const user = userEvent.setup();
    render(<Fixture selectionMode="multiple" defaultExpandedValues={['src']} />);
    await user.tab();
    await user.keyboard(' ');
    await user.keyboard('r');
    const readme = screen.getByRole('treeitem', { name: 'Readme' });
    expect(readme).toHaveFocus();
    await user.keyboard(' ');
    expect(screen.getByRole('tree', { name: 'Files' })).toHaveAttribute(
      'aria-multiselectable',
      'true',
    );
    expect(
      screen
        .getAllByRole('treeitem')
        .filter((node) => node.getAttribute('aria-selected') === 'true'),
    ).toHaveLength(2);
    await user.keyboard(' ');
    expect(readme).toHaveAttribute('aria-selected', 'false');
  });
  it('requests controlled changes without mutating controlled expansion or selection', async () => {
    const expanded = vi.fn();
    const selected = vi.fn();
    const user = userEvent.setup();
    render(
      <Fixture
        expandedValues={[]}
        selectedValues={[]}
        onExpandedValuesChange={expanded}
        onSelectedValuesChange={selected}
      />,
    );
    await user.tab();
    await user.keyboard('{ArrowRight}{Enter}');
    expect(expanded).toHaveBeenCalledWith(['src']);
    expect(selected).toHaveBeenCalledWith(['src']);
    expect(screen.getByRole('treeitem', { name: 'Source' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(screen.getByRole('treeitem', { name: 'Source' })).toHaveAttribute(
      'aria-selected',
      'false',
    );
  });
  it('restores focus to the collapsed ancestor after external collapse and cleans up on unmount', async () => {
    const user = userEvent.setup();
    const { rerender, unmount } = render(<Fixture expandedValues={['src']} />);
    await user.tab();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('treeitem', { name: 'App' })).toHaveFocus();
    rerender(<Fixture expandedValues={[]} />);
    await waitFor(() => expect(screen.getByRole('treeitem', { name: 'Source' })).toHaveFocus());
    unmount();
  });
  it('keeps disabled and canceled actions inert, including nested click bubbling', () => {
    const change = vi.fn();
    render(<Fixture defaultExpandedValues={['src']} onSelectedValuesChange={change} />);
    fireEvent.click(screen.getByRole('treeitem', { name: 'Disabled' }));
    expect(change).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('treeitem', { name: 'App' }));
    expect(change).toHaveBeenCalledExactlyOnceWith(['app']);
  });
  it('uses custom label IDs and excludes a disabled branch subtree from navigation', async () => {
    const user = userEvent.setup();
    render(
      <Tree aria-label="Files" defaultExpandedValues={['locked']}>
        <Tree.Item value="locked" branch disabled>
          <Tree.Label id="locked-label">Locked</Tree.Label>
          <Tree.Group>
            <Tree.Item value="child">
              <Tree.Label>Child</Tree.Label>
            </Tree.Item>
          </Tree.Group>
        </Tree.Item>
        <Tree.Item value="free">
          <Tree.Label id="free-label">Free</Tree.Label>
        </Tree.Item>
      </Tree>,
    );
    expect(screen.getByRole('treeitem', { name: 'Free' })).toHaveAttribute(
      'aria-labelledby',
      'free-label',
    );
    expect(screen.getByRole('treeitem', { name: 'Child' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    await user.tab();
    expect(screen.getByRole('treeitem', { name: 'Free' })).toHaveFocus();
    await user.keyboard('{Home}{ArrowUp}');
    expect(screen.getByRole('treeitem', { name: 'Free' })).toHaveFocus();
  });
  it('mirrors disclosure arrows in RTL and retains native Tab', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Fixture style={{ direction: 'rtl' }} />
        <button>After</button>
      </>,
    );
    await user.tab();
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('treeitem', { name: 'Source' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    await user.tab();
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
  });
});
