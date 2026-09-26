import { fireEvent, render, screen, within } from '@testing-library/react';
import { StrictMode, useState } from 'react';
import { describe, expect, it } from 'vitest';

import { ComponentExample, type ComponentExampleDefinition } from './ComponentExample';
import {
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from './ComponentExampleRuntime';

function StatefulPreview() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((value) => value + 1)}>Count: {count}</button>;
}

const example = {
  id: 'shared-definition',
  title: 'Stateful preview',
  Component: StatefulPreview,
  source: 'export default function App() { return <button>Count: 0</button>; }',
} satisfies ComponentExampleDefinition;

function toggleIn(element: HTMLElement, expanded: boolean) {
  return within(element).getByRole('button', {
    name: `${expanded ? 'Hide' : 'View'} source for Stateful preview`,
  });
}

describe('ComponentExample runtime instance boundaries', () => {
  it('registers duplicate definitions as independent instances, including in StrictMode', () => {
    render(
      <StrictMode>
        <ComponentExampleRuntimeProvider>
          <ComponentExampleRuntimeControl />
          <section aria-label="First instance">
            <ComponentExample example={example} />
          </section>
          <section aria-label="Second instance">
            <ComponentExample example={example} />
          </section>
        </ComponentExampleRuntimeProvider>
      </StrictMode>,
    );
    const first = screen.getByRole('region', { name: 'First instance' });
    const second = screen.getByRole('region', { name: 'Second instance' });
    const firstToggle = toggleIn(first, false);
    const secondToggle = toggleIn(second, false);
    expect(firstToggle.getAttribute('aria-controls')).not.toBe(
      secondToggle.getAttribute('aria-controls'),
    );

    fireEvent.click(firstToggle);
    expect(firstToggle).toHaveAttribute('aria-expanded', 'true');
    expect(secondToggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByRole('button', { name: 'Expand all' })).toBeEnabled();

    fireEvent.click(secondToggle);
    const control = screen.getByRole('button', { name: 'Collapse all' });
    expect(control).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(control);
    expect(firstToggle).toHaveAttribute('aria-expanded', 'false');
    expect(secondToggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('does not unregister a surviving duplicate, and new instances start collapsed', () => {
    function Harness() {
      const [first, setFirst] = useState(true);
      const [third, setThird] = useState(false);
      return (
        <ComponentExampleRuntimeProvider>
          <ComponentExampleRuntimeControl />
          <button onClick={() => setFirst(false)}>Remove first</button>
          <button onClick={() => setThird(true)}>Add third</button>
          {first ? (
            <section aria-label="First instance">
              <ComponentExample example={example} />
            </section>
          ) : null}
          <section aria-label="Second instance">
            <ComponentExample example={example} />
          </section>
          {third ? (
            <section aria-label="Third instance">
              <ComponentExample example={example} />
            </section>
          ) : null}
        </ComponentExampleRuntimeProvider>
      );
    }
    render(<Harness />);
    const second = screen.getByRole('region', { name: 'Second instance' });
    fireEvent.click(screen.getByRole('button', { name: 'Expand all' }));
    fireEvent.click(screen.getByRole('button', { name: 'Remove first' }));
    expect(toggleIn(second, true)).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'Collapse all' })).toBeEnabled();

    fireEvent.click(screen.getByRole('button', { name: 'Add third' }));
    const third = screen.getByRole('region', { name: 'Third instance' });
    expect(toggleIn(third, false)).toHaveAttribute('aria-expanded', 'false');
    expect(toggleIn(second, true)).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Expand all' }));
    expect(toggleIn(third, true)).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'Collapse all' })).toBeEnabled();
  });

  it('keeps providers and live preview state independent', () => {
    render(
      <>
        <section aria-label="First runtime">
          <ComponentExampleRuntimeProvider>
            <ComponentExampleRuntimeControl />
            <ComponentExample example={example} />
          </ComponentExampleRuntimeProvider>
        </section>
        <section aria-label="Second runtime">
          <ComponentExampleRuntimeProvider>
            <ComponentExampleRuntimeControl />
            <ComponentExample example={example} />
          </ComponentExampleRuntimeProvider>
        </section>
      </>,
    );
    const first = within(screen.getByRole('region', { name: 'First runtime' }));
    const second = within(screen.getByRole('region', { name: 'Second runtime' }));
    fireEvent.click(first.getByRole('button', { name: 'Count: 0' }));
    fireEvent.click(first.getByRole('button', { name: 'Expand all' }));
    expect(second.getByRole('button', { name: 'Expand all' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    fireEvent.click(first.getByRole('button', { name: 'Collapse all' }));
    expect(first.getByRole('button', { name: 'Count: 1' })).toBeInTheDocument();
    expect(second.getByRole('button', { name: 'Count: 0' })).toBeInTheDocument();
  });

  it('disables bulk disclosure when the final registered example unmounts', () => {
    function Harness() {
      const [visible, setVisible] = useState(true);
      return (
        <ComponentExampleRuntimeProvider>
          <ComponentExampleRuntimeControl />
          <button onClick={() => setVisible((value) => !value)}>Toggle instance</button>
          {visible ? <ComponentExample example={example} /> : null}
        </ComponentExampleRuntimeProvider>
      );
    }
    render(<Harness />);
    fireEvent.click(screen.getByRole('button', { name: 'Expand all' }));
    fireEvent.click(screen.getByRole('button', { name: 'Toggle instance' }));
    expect(screen.getByRole('button', { name: 'Expand all' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Toggle instance' }));
    expect(screen.getByRole('button', { name: 'Expand all' })).toBeEnabled();
    expect(
      screen.getByRole('button', { name: 'View source for Stateful preview' }),
    ).toHaveAttribute('aria-expanded', 'false');
  });
});
