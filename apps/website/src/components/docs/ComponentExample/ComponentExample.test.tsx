import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckIcon, CodeIcon, CopyIcon, ExternalLinkIcon } from '@virgo-design/icons';
import { useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { buttonExamples } from '@/examples/components/button/examples';
import { dialogExamples } from '@/examples/components/dialog/examples';
import { AppearanceContext } from '@/shared/theme/appearance-context';

import { ComponentExample } from './ComponentExample';
import {
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from './ComponentExampleRuntime';
import reactLogo from './react-logo.svg';
import sassLogo from './sass-logo.svg';

const originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');

function setClipboard(value: unknown) {
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value });
}

function openSource(title = 'Basic variants') {
  fireEvent.click(screen.getByRole('button', { name: `View source for ${title}` }));
}

function canonicalReactSource(source: string) {
  return source.replace(/from ['"]\.\/[^'"]+\.module\.scss['"]/g, "from './Example.module.scss'");
}

function expectIcon(button: HTMLElement, Icon: typeof CopyIcon) {
  const expected = document.createElement('div');
  expected.innerHTML = renderToStaticMarkup(<Icon />);
  expect(button.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  expect(button.querySelector('svg')?.innerHTML).toBe(expected.querySelector('svg')?.innerHTML);
}

afterEach(() => {
  if (originalClipboard) Object.defineProperty(navigator, 'clipboard', originalClipboard);
  else Reflect.deleteProperty(navigator, 'clipboard');
  vi.useRealTimers();
  vi.restoreAllMocks();
  delete document.documentElement.dataset.theme;
});

describe('ComponentExample', () => {
  it('updates source tooltip text in place across repeated clicks and keyboard activation', async () => {
    const user = userEvent.setup();
    render(<ComponentExample example={buttonExamples.variants} />);
    const toggle = screen.getByRole('button', { name: 'View source for Basic variants' });
    await user.hover(toggle);
    const panel = await screen.findByRole('tooltip');
    expect(panel).toHaveAttribute('data-size', 'small');
    expect(panel.querySelector('[data-slot="arrow"]')).not.toBeInTheDocument();
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
    openSource();
    const copy = screen.getByRole('button', { name: 'Copy source for Basic variants' });
    fireEvent.pointerEnter(copy);
    act(() => vi.advanceTimersByTime(100));
    const panel = screen.getByRole('tooltip');
    expect(panel).toHaveTextContent('Copy source');
    expect(panel.querySelector('[data-slot="arrow"]')).not.toBeInTheDocument();
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
    expect(container.querySelector('[data-example-source]')).toBeVisible();
    fireEvent.pointerLeave(copy);
    act(() => vi.advanceTimersByTime(250));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('keeps failure feedback in the same tooltip and leaves source available for manual copying', async () => {
    const user = userEvent.setup();
    setClipboard({ writeText: vi.fn().mockRejectedValue(new Error('Clipboard denied')) });
    const { container } = render(<ComponentExample example={buttonExamples.variants} />);
    openSource();
    const copy = screen.getByRole('button', { name: 'Copy source for Basic variants' });
    await user.hover(copy);
    const panel = await screen.findByRole('tooltip');
    await user.click(copy);
    expect(screen.getByRole('tooltip')).toBe(panel);
    expect(panel).toHaveTextContent('Copy failed');
    expect(panel).toHaveAttribute('data-state', 'open');
    expect(container.querySelector('[data-example-source]')).toBeVisible();
  });

  it('runs the real example and uses its exact paired React / SCSS raw sources', () => {
    const example = buttonExamples.variants;
    const { container } = render(<ComponentExample example={example} />);

    expect(screen.getByRole('button', { name: 'Primary Button' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Secondary Button' })).toBeInTheDocument();
    expect(example.source).toContain("import styles from './ButtonVariantsExample.module.scss';");
    expect(container.querySelector('pre code')?.textContent).toContain(
      "import styles from './Example.module.scss';",
    );
    expect(container.querySelector('pre code')?.textContent).not.toContain(
      './ButtonVariantsExample.module.scss',
    );
    expect(example.source).toContain('export default function App()');
    expect(example.styleSource).toContain('.root');
    expect(example.source).not.toContain('ReviewSection');
    expect(example.source).not.toContain('ArticleSection');
    expect(container.querySelector('[data-example-source]')).toHaveAttribute(
      'data-state',
      'closed',
    );
  });

  it('keeps standalone and source actions in the preview and exposes React / SCSS source tabs', () => {
    const { container } = render(<ComponentExample example={buttonExamples.variants} />);
    const frame = container.querySelector('[data-example-frame]');
    const toolbar = container.querySelector('[data-example-toolbar]');
    const source = container.querySelector('[data-example-source]');
    const caption = screen.getByRole('heading', { name: 'Basic variants' });
    const external = screen.getByRole('button', { name: 'Open Basic variants in new window' });
    const toggle = screen.getByRole('button', { name: 'View source for Basic variants' });

    expect(frame?.contains(caption)).toBe(false);
    expect(frame?.contains(toolbar)).toBe(true);
    expect(frame?.contains(source)).toBe(false);
    expect(source?.previousElementSibling).toBe(frame);
    expect(toolbar?.querySelectorAll('button')).toHaveLength(2);
    expect(toolbar?.contains(external)).toBe(true);
    expect(toolbar?.contains(toggle)).toBe(true);
    expect(toolbar?.querySelector('[data-example-action="copy"]')).toBeNull();
    expect(source).toHaveAttribute('data-state', 'closed');
    expect(source).toHaveAttribute('aria-hidden', 'true');
    expect(external).toHaveAttribute('data-size', 'small');
    expect(external).toHaveAttribute('data-example-action', 'external');
    expectIcon(external, ExternalLinkIcon);
    expect(toggle).toHaveAttribute('data-size', 'small');
    expectIcon(toggle, CodeIcon);

    openSource();
    const tabs = screen.getByRole('tablist', { name: 'Basic variants source files' });
    const reactTab = screen.getByRole('tab', { name: 'React' });
    const scssTab = screen.getByRole('tab', { name: 'SCSS' });
    const panel = screen.getByRole('tabpanel', { name: 'React' });
    const copy = screen.getByRole('button', { name: 'Copy source for Basic variants' });

    expect(container.querySelector('[data-example-source-header]')).toContainElement(tabs);
    expect(tabs).toHaveAttribute('data-variant', 'plain');
    expect(reactTab).toHaveAttribute('aria-selected', 'true');
    expect(scssTab).toHaveAttribute('aria-selected', 'false');
    expect(panel.querySelector('code')).toHaveAttribute('data-language', 'tsx');
    expect(panel.querySelector('code')?.textContent).toContain(
      "import styles from './Example.module.scss';",
    );
    expect(reactTab.querySelector('img')).toHaveAttribute('src', reactLogo);
    expect(scssTab.querySelector('img')).toHaveAttribute('src', sassLogo);
    expect(copy).toHaveAttribute('data-size', 'small');
    expectIcon(copy, CopyIcon);
    [external, toggle, copy].forEach((button) => {
      expect(button).toHaveAttribute('type', 'button');
      expect(button).toHaveAttribute('data-icon-only', 'true');
      expect(button).toHaveAttribute('data-shape', 'circle');
      expect(button).toHaveAttribute('data-variant', 'text');
    });
    expect(container.querySelector('button button')).toBeNull();
    expect(container.querySelector('details, summary')).toBeNull();
  });

  it('shows only React when the paired SCSS contains comments but no actual styles', () => {
    const reactOnlyExample = {
      ...buttonExamples.variants,
      id: 'react-only-example',
      title: 'React only example',
      source: `import './ReactOnlyExample.module.scss';

export default function App() {
  return null;
}
`,
      styleSource:
        '/* This example relies on Virgo Design component styles and has no example-specific SCSS. */',
    };
    const { container } = render(<ComponentExample example={reactOnlyExample} />);

    openSource('React only example');

    expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
    expect(screen.queryByRole('tab', { name: 'SCSS' })).not.toBeInTheDocument();
    expect(container.querySelector('[data-example-source-label]')).toHaveTextContent('React');
    expect(container.querySelector('[data-example-source-label]')).toHaveAttribute(
      'data-example-framework',
      'react',
    );
    expect(container.querySelector('pre code')).toHaveAttribute('data-language', 'tsx');
    expect(container.querySelector('pre code')?.textContent).toBe(`export default function App() {
  return null;
}
`);
  });

  it('switches between canonical React and exact SCSS sources and copies the active tab', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard({ writeText });
    render(<ComponentExample example={buttonExamples.variants} />);
    openSource();

    const copy = screen.getByRole('button', { name: 'Copy source for Basic variants' });
    await user.click(copy);
    expect(writeText).toHaveBeenLastCalledWith(
      canonicalReactSource(buttonExamples.variants.source),
    );

    const scssTab = screen.getByRole('tab', { name: 'SCSS' });
    await user.click(scssTab);
    expect(scssTab).toHaveAttribute('aria-selected', 'true');
    const panel = screen.getByRole('tabpanel', { name: 'SCSS' });
    expect(panel.querySelector('code')).toHaveAttribute('data-language', 'scss');
    expect(panel.querySelector('code')?.textContent).toBe(buttonExamples.variants.styleSource);

    await user.click(copy);
    expect(writeText).toHaveBeenLastCalledWith(buttonExamples.variants.styleSource);
  });

  it('opens the standalone example in a new window with the current theme', async () => {
    const user = userEvent.setup();
    const open = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(
      <AppearanceContext.Provider value={{ appearance: 'dark', setAppearance: () => {} }}>
        <ComponentExample example={buttonExamples.variants} />
      </AppearanceContext.Provider>,
    );
    const external = screen.getByRole('button', { name: 'Open Basic variants in new window' });

    await user.hover(external);
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Open in new window');
    await user.click(external);

    expect(open).toHaveBeenCalledWith(
      '/examples/button-variants?theme=dark',
      '_blank',
      'noopener,noreferrer',
    );
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
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
    expect(panel).toHaveAttribute('data-state', 'closed');
    expect(panel).toHaveAttribute('aria-hidden', 'true');
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveAccessibleName('Hide source for Basic variants');
    expect(panel).toHaveAttribute('data-state', 'open');
    expect(panel).toHaveAttribute('aria-hidden', 'false');
    expect(panel).toBeVisible();
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(panel).toHaveAttribute('data-state', 'closed');
    expect(panel).toHaveAttribute('aria-hidden', 'true');
  });

  it('supports Enter and Space without remounting the running example', async () => {
    function Counter() {
      const [count, setCount] = useState(0);
      return <button onClick={() => setCount((value) => value + 1)}>Count {count}</button>;
    }
    const user = userEvent.setup();
    render(
      <ComponentExample
        example={{
          id: 'counter',
          title: 'Counter',
          Component: Counter,
          source: 'counter source',
          styleSource: '.counter {}',
        }}
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
    openSource();
    const copy = screen.getByRole('button', { name: 'Copy source for Basic variants' });
    act(() => copy.focus());
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Copy source');
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
  });

  it('copies from the React header and resets the check icon and feedback after two seconds', async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard({ writeText });
    const { container } = render(<ComponentExample example={buttonExamples.variants} />);
    openSource();
    const copy = screen.getByRole('button', { name: 'Copy source for Basic variants' });
    await act(async () => {
      fireEvent.click(copy);
    });
    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith(canonicalReactSource(buttonExamples.variants.source));
    expect(screen.getByRole('status')).toHaveTextContent('Copied');
    expect(copy).toHaveAttribute('data-copy-state', 'success');
    expectIcon(copy, CheckIcon);
    expect(container.querySelector('[data-example-source]')).toBeVisible();
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
    expect(copy).toHaveAttribute('data-copy-state', 'idle');
    expectIcon(copy, CopyIcon);
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
    openSource();
    const copy = screen.getByRole('button', { name: 'Copy source for Basic variants' });
    fireEvent.click(copy);
    fireEvent.click(copy);
    expect(writeText).toHaveBeenCalledTimes(1);
    expect(copy).toHaveAttribute('aria-disabled', 'true');
    expectIcon(copy, CopyIcon);
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
      openSource();
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
    openSource();
    fireEvent.click(screen.getByRole('button', { name: 'Copy source for Basic variants' }));
    unmount();
    await act(async () => resolveWrite());
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('unmounts the copy tooltip when source is collapsed, without discarding the source', async () => {
    const user = userEvent.setup();
    const { container } = render(<ComponentExample example={buttonExamples.variants} />);
    openSource();
    const copy = screen.getByRole('button', { name: 'Copy source for Basic variants' });
    await user.hover(copy);
    const panel = await screen.findByRole('tooltip');
    expect(panel).toHaveTextContent('Copy source');
    fireEvent.click(screen.getByRole('button', { name: 'Hide source for Basic variants' }));
    expect(panel).not.toBeInTheDocument();
    expect(container.querySelector('pre code')?.textContent).toBe(
      canonicalReactSource(buttonExamples.variants.source),
    );
  });

  it('does not reopen source when a pending copy fails after the user collapses it', async () => {
    let rejectWrite!: (error: Error) => void;
    setClipboard({
      writeText: () =>
        new Promise<void>((_, reject) => {
          rejectWrite = reject;
        }),
    });
    const { container } = render(<ComponentExample example={buttonExamples.variants} />);
    openSource();
    fireEvent.click(screen.getByRole('button', { name: 'Copy source for Basic variants' }));
    fireEvent.click(screen.getByRole('button', { name: 'Hide source for Basic variants' }));
    await act(async () => rejectWrite(new Error('Permission denied')));
    expect(container.querySelector('[data-example-source]')).toHaveAttribute(
      'data-state',
      'closed',
    );
    expect(screen.getByRole('status')).toHaveTextContent('Copy failed.');
  });

  it('allows retry after copy failure and clears the previous success timer', async () => {
    vi.useFakeTimers();
    const writeText = vi
      .fn()
      .mockRejectedValueOnce(new Error('Permission denied'))
      .mockResolvedValue(undefined);
    setClipboard({ writeText });
    render(<ComponentExample example={buttonExamples.variants} />);
    openSource();
    const copy = screen.getByRole('button', { name: 'Copy source for Basic variants' });
    await act(async () => {
      fireEvent.click(copy);
    });
    expectIcon(copy, CopyIcon);
    expect(copy).toHaveAttribute('data-copy-state', 'error');
    await act(async () => {
      fireEvent.click(copy);
    });
    expectIcon(copy, CheckIcon);
    act(() => vi.advanceTimersByTime(1500));
    await act(async () => {
      fireEvent.click(copy);
    });
    act(() => vi.advanceTimersByTime(500));
    expectIcon(copy, CheckIcon);
    act(() => vi.advanceTimersByTime(1500));
    expectIcon(copy, CopyIcon);
    expect(writeText).toHaveBeenCalledTimes(3);
  });

  it('keeps the page-level Expand all / Collapse all control synchronized with individual examples', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ComponentExampleRuntimeProvider>
        <ComponentExampleRuntimeControl />
        <ComponentExample example={buttonExamples.variants} />
        <ComponentExample example={buttonExamples.sizes} />
      </ComponentExampleRuntimeProvider>,
    );

    const control = screen.getByRole('button', { name: 'Expand all' });
    expect(control.querySelector('svg')).toBeNull();
    expect(control).toHaveAttribute('aria-expanded', 'false');
    expect(container.querySelectorAll('[data-example-source][data-state="closed"]')).toHaveLength(
      2,
    );

    await user.click(screen.getByRole('button', { name: 'View source for Basic variants' }));
    expect(screen.getByRole('button', { name: 'Expand all' })).toBe(control);

    await user.click(control);
    expect(screen.getByRole('button', { name: 'Collapse all' })).toBe(control);
    expect(control).toHaveAttribute('aria-expanded', 'true');
    expect(container.querySelectorAll('[data-example-source][data-state="open"]')).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'Hide source for Basic variants' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Hide source for Button sizes' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );

    await user.click(screen.getByRole('button', { name: 'Hide source for Basic variants' }));
    expect(screen.getByRole('button', { name: 'Expand all' })).toBe(control);

    await user.click(screen.getByRole('button', { name: 'View source for Basic variants' }));
    expect(screen.getByRole('button', { name: 'Collapse all' })).toBe(control);
    expect(control).toHaveAttribute('aria-expanded', 'true');

    await user.click(control);
    expect(screen.getByRole('button', { name: 'Expand all' })).toBe(control);
    expect(control).toHaveAttribute('aria-expanded', 'false');
    expect(container.querySelectorAll('[data-example-source][data-state="closed"]')).toHaveLength(
      2,
    );
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
