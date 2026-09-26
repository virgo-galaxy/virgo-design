import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CodeIcon, CopyIcon } from '@virgo-design/icons';
import { useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { buttonExamples } from '@/examples/components/button/examples';
import { dialogExamples } from '@/examples/components/dialog/examples';

import { ComponentExample } from './ComponentExample';

const originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');

function setClipboard(value: unknown) {
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value });
}

afterEach(() => {
  if (originalClipboard) Object.defineProperty(navigator, 'clipboard', originalClipboard);
  else Reflect.deleteProperty(navigator, 'clipboard');
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('ComponentExample', () => {
  it('updates source tooltip text in place across repeated clicks and keyboard activation', async () => {
    const user = userEvent.setup();
    render(<ComponentExample example={buttonExamples.variants} />);
    const toggle = screen.getByRole('button', { name: 'View source for Basic variants' });
    await user.hover(toggle);
    const panel = await screen.findByRole('tooltip');
    expect(panel).toHaveAttribute('data-size', 'small');
    await user.click(toggle);
    expect(screen.getByRole('tooltip')).toBe(panel);
    expect(panel).toHaveTextContent('Hide source');
    expect(panel).toHaveAttribute('data-state', 'open');
    await user.click(toggle);
    expect(screen.getByRole('tooltip')).toBe(panel);
    expect(panel).toHaveTextContent('View source');
    await user.keyboard('{Enter}');
    expect(screen.getByRole('tooltip')).toBe(panel);
    expect(panel).toHaveTextContent('Hide source');
  });

  it('keeps the copy tooltip open through pending, success and reset without visible left feedback', async () => {
    vi.useFakeTimers();
    let finish!: () => void;
    setClipboard({
      writeText: vi.fn(
        () =>
          new Promise<void>((resolve) => {
            finish = resolve;
          }),
      ),
    });
    const { container } = render(<ComponentExample example={buttonExamples.variants} />);
    const copy = screen.getByRole('button', { name: 'Copy source for Basic variants' });
    fireEvent.pointerEnter(copy);
    act(() => vi.advanceTimersByTime(100));
    const panel = screen.getByRole('tooltip');
    expect(panel).toHaveTextContent('Copy source');
    fireEvent.pointerDown(copy);
    act(() => copy.focus());
    fireEvent.click(copy, { detail: 1 });
    expect(screen.getByRole('tooltip')).toBe(panel);
    expect(panel).toHaveTextContent('Copying source');
    await act(async () => finish());
    expect(screen.getByRole('tooltip')).toBe(panel);
    expect(panel).toHaveTextContent('Copied');
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.getByRole('tooltip')).toBe(panel);
    expect(panel).toHaveTextContent('Copy source');
    expect(panel).toHaveAttribute('data-state', 'open');
    expect(copy).toHaveFocus();
    expect(container.querySelector('[data-example-announcement]')).toBe(screen.getByRole('status'));
    expect(container.querySelector('[data-example-source]')).not.toBeVisible();
    fireEvent.pointerLeave(copy);
    act(() => vi.advanceTimersByTime(250));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('keeps failure feedback in the same tooltip and opens source for manual copying', async () => {
    const user = userEvent.setup();
    setClipboard({ writeText: vi.fn().mockRejectedValue(new Error('Clipboard denied')) });
    const { container } = render(<ComponentExample example={buttonExamples.variants} />);
    const copy = screen.getByRole('button', { name: 'Copy source for Basic variants' });
    await user.hover(copy);
    const panel = await screen.findByRole('tooltip');
    await user.click(copy);
    expect(screen.getByRole('tooltip')).toBe(panel);
    expect(panel).toHaveTextContent('Copy failed');
    expect(panel).toHaveAttribute('data-state', 'open');
    expect(container.querySelector('[data-example-source]')).toBeVisible();
  });

  it('runs the real example and uses its exact raw source, without a second code string', () => {
    const example = buttonExamples.variants;
    const { container } = render(<ComponentExample example={example} />);

    expect(screen.getByRole('button', { name: 'Primary Button' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Secondary Button' })).toBeInTheDocument();
    expect(container.querySelector('pre code')?.textContent).toBe(example.source);
    expect(example.source).toContain('export default function App()');
    expect(example.source).not.toContain('ReviewSection');
    expect(example.source).not.toContain('ArticleSection');
    expect(container.querySelector('[data-example-source]')).not.toBeVisible();
  });

  it('keeps caption and source outside the preview while floating two actions inside it', () => {
    const { container } = render(<ComponentExample example={buttonExamples.variants} />);
    const frame = container.querySelector('[data-example-frame]');
    const toolbar = container.querySelector('[data-example-toolbar]');
    const source = container.querySelector('[data-example-source]');
    const caption = screen.getByRole('heading', { name: 'Basic variants' });
    expect(frame?.contains(caption)).toBe(false);
    expect(frame?.contains(toolbar)).toBe(true);
    expect(frame?.contains(source)).toBe(false);
    expect(source?.previousElementSibling).toBe(frame);
    const group = screen.getByRole('group', { name: 'Basic variants example actions' });
    const actions = within(group).getAllByRole('button');
    expect(actions).toHaveLength(2);
    actions.forEach((button) => {
      expect(button).toHaveAttribute('type', 'button');
      expect(button).toHaveAttribute('data-icon-only', 'true');
      expect(button).toHaveAttribute('data-shape', 'square');
      expect(button).toHaveAttribute('data-variant', 'text');
      expect(button).toHaveAttribute('data-size', 'small');
      expect(button.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    });
    [CodeIcon, CopyIcon].forEach((Icon, index) => {
      const expected = document.createElement('div');
      expected.innerHTML = renderToStaticMarkup(<Icon />);
      expect(actions[index]?.querySelector('svg')?.innerHTML).toBe(
        expected.querySelector('svg')?.innerHTML,
      );
    });
    expect(container.querySelector('button button')).toBeNull();
    expect(container.querySelector('details, summary')).toBeNull();
  });

  it('can omit the caption when the article already introduces this example', () => {
    const { container } = render(
      <ComponentExample example={buttonExamples.variants} showCaption={false} />,
    );
    expect(container.querySelector('[data-example-caption]')).toBeNull();
    expect(screen.getByRole('button', { name: 'Primary Button' })).toBeInTheDocument();
  });

  it('opens and closes source from the same action, with a real controls relationship', async () => {
    const user = userEvent.setup();
    render(<ComponentExample example={buttonExamples.variants} />);
    const toggle = screen.getByRole('button', { name: 'View source for Basic variants' });
    const panel = document.getElementById(toggle.getAttribute('aria-controls')!);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(panel).not.toBeVisible();
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveAccessibleName('Hide source for Basic variants');
    expect(panel).toBeVisible();
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(panel).not.toBeVisible();
  });

  it('supports Enter and Space without remounting the running example', async () => {
    function Counter() {
      const [count, setCount] = useState(0);
      return <button onClick={() => setCount((value) => value + 1)}>Count {count}</button>;
    }
    const user = userEvent.setup();
    render(
      <ComponentExample
        example={{ id: 'counter', title: 'Counter', Component: Counter, source: 'counter source' }}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Count 0' }));
    const toggle = screen.getByRole('button', { name: 'View source for Counter' });
    act(() => toggle.focus());
    await user.keyboard('{Enter}');
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard(' ');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByRole('button', { name: 'Count 1' })).toBeInTheDocument();
    expect(toggle).toHaveFocus();
  });

  it('gives duplicate instances different source panel ids', () => {
    render(
      <>
        <ComponentExample example={buttonExamples.variants} />
        <ComponentExample example={buttonExamples.variants} />
      </>,
    );
    const toggles = screen.getAllByRole('button', { name: 'View source for Basic variants' });
    expect(toggles[0]?.getAttribute('aria-controls')).not.toBe(
      toggles[1]?.getAttribute('aria-controls'),
    );
  });

  it('shows a Virgo Tooltip on pointer hover and on keyboard focus', async () => {
    const user = userEvent.setup();
    render(<ComponentExample example={buttonExamples.variants} />);
    const toggle = screen.getByRole('button', { name: 'View source for Basic variants' });
    await user.hover(toggle);
    expect(await screen.findByRole('tooltip')).toHaveTextContent('View source');
    await user.unhover(toggle);
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
    const copy = screen.getByRole('button', { name: 'Copy source for Basic variants' });
    act(() => copy.focus());
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Copy source');
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
  });

  it('copies while collapsed, reports success only on resolution, then resets feedback', async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard({ writeText });
    const { container } = render(<ComponentExample example={buttonExamples.variants} />);
    const copy = screen.getByRole('button', { name: 'Copy source for Basic variants' });
    await act(async () => {
      fireEvent.click(copy);
    });
    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith(buttonExamples.variants.source);
    expect(screen.getByRole('status')).toHaveTextContent('Copied');
    expect(container.querySelector('[data-example-source]')).not.toBeVisible();
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  it('does not show Copied before the clipboard promise resolves, or enqueue duplicate writes', async () => {
    let resolveWrite!: () => void;
    const writeText = vi.fn().mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolveWrite = resolve;
        }),
    );
    setClipboard({ writeText });
    render(<ComponentExample example={buttonExamples.variants} />);
    const copy = screen.getByRole('button', { name: 'Copy source for Basic variants' });
    fireEvent.click(copy);
    fireEvent.click(copy);
    expect(writeText).toHaveBeenCalledTimes(1);
    expect(copy).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('status')).not.toHaveTextContent('Copied');
    await act(async () => resolveWrite());
    expect(screen.getByRole('status')).toHaveTextContent('Copied');
  });

  it.each(['unavailable', 'rejected'])(
    'offers manual copying when clipboard is %s',
    async (mode) => {
      setClipboard(
        mode === 'unavailable'
          ? undefined
          : { writeText: vi.fn().mockRejectedValue(new Error('Permission denied')) },
      );
      const { container } = render(<ComponentExample example={buttonExamples.variants} />);
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Copy source for Basic variants' }));
      });
      expect(screen.getByRole('status')).toHaveTextContent('Copy failed.');
      expect(screen.getByRole('status')).not.toHaveTextContent('Copied');
      expect(container.querySelector('[data-example-source]')).toBeVisible();
    },
  );

  it('handles unmount during an outstanding clipboard write', async () => {
    let resolveWrite!: () => void;
    setClipboard({
      writeText: () =>
        new Promise<void>((resolve) => {
          resolveWrite = resolve;
        }),
    });
    const { unmount } = render(<ComponentExample example={buttonExamples.variants} />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy source for Basic variants' }));
    unmount();
    await act(async () => resolveWrite());
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('keeps stateful Dialog behavior and source disclosure independent', async () => {
    const user = userEvent.setup();
    render(<ComponentExample example={dialogExamples.form} />);
    await user.click(screen.getByRole('button', { name: 'Edit workspace' }));
    const input = screen.getByRole('textbox', { name: 'Workspace name' });
    await user.clear(input);
    await user.type(input, 'My workspace');
    await user.click(screen.getByRole('button', { name: 'Save changes' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'View source for Form dialog' }));
    await user.click(screen.getByRole('button', { name: 'Hide source for Form dialog' }));
    await user.click(screen.getByRole('button', { name: 'Edit workspace' }));
    expect(screen.getByRole('textbox', { name: 'Workspace name' })).toHaveValue('My workspace');
  });
});
