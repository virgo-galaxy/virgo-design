import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, type FormEvent } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Input } from '../Input';
import { Form } from './index';

describe('Form public contract', () => {
  it('renders a native form, forwards its ref and preserves native attributes', () => {
    const ref = createRef<HTMLFormElement>();
    render(
      <Form ref={ref} aria-label="Details" id="profile" action="/details" method="post" noValidate>
        <input name="name" defaultValue="Example" />
      </Form>,
    );
    const form = screen.getByRole('form', { name: 'Details' });
    expect(form.tagName).toBe('FORM');
    expect(ref.current).toBe(form);
    expect(form).toHaveAttribute('id', 'profile');
    expect(form).toHaveAttribute('action', '/details');
    expect(form).toHaveAttribute('method', 'post');
    expect(form).toHaveAttribute('novalidate');
  });

  it('updates its state data attributes without adding unsupported native form attributes', () => {
    const { rerender } = render(<Form aria-label="Details" disabled />);
    const form = screen.getByRole('form', { name: 'Details' });
    expect(form).toHaveAttribute('data-disabled', 'true');
    expect(form).not.toHaveAttribute('data-readonly');
    expect(form).not.toHaveAttribute('disabled');

    rerender(<Form aria-label="Details" readOnly />);
    expect(form).not.toHaveAttribute('data-disabled');
    expect(form).toHaveAttribute('data-readonly', 'true');
    expect(form).not.toHaveAttribute('readonly');

    rerender(<Form aria-label="Details" disabled={false} readOnly={false} />);
    expect(form).not.toHaveAttribute('data-disabled');
    expect(form).not.toHaveAttribute('data-readonly');
  });

  it('scopes disabled/readOnly defaults, permits control overrides and updates consumers', () => {
    const controls = (
      <>
        <Input aria-label="Inherited" />
        <Input aria-label="Override" disabled={false} readOnly={false} />
      </>
    );
    const { rerender } = render(
      <>
        <Form disabled readOnly>
          {controls}
        </Form>
        <Input aria-label="Outside" />
      </>,
    );
    const inherited = screen.getByRole('textbox', { name: 'Inherited' });
    expect(inherited).toBeDisabled();
    expect(inherited).toHaveAttribute('readonly');
    for (const name of ['Override', 'Outside']) {
      const input = screen.getByRole('textbox', { name });
      expect(input).toBeEnabled();
      expect(input).not.toHaveAttribute('readonly');
    }

    rerender(
      <>
        <Form disabled={false} readOnly={false}>
          {controls}
        </Form>
        <Input aria-label="Outside" />
      </>,
    );
    expect(inherited).toBeEnabled();
    expect(inherited).not.toHaveAttribute('readonly');
  });

  it('delivers native submit and form data to the consumer without stopping propagation', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLFormElement>();
    const bubble = vi.fn();
    const submit = vi.fn((event: FormEvent<HTMLFormElement>) => {
      expect(event.currentTarget).toBe(ref.current);
      expect(event.defaultPrevented).toBe(false);
      expect(new FormData(event.currentTarget).get('name')).toBe('Example');
      event.preventDefault();
    });
    render(
      <div onSubmit={bubble}>
        <Form ref={ref} onSubmit={submit}>
          <Input name="name" aria-label="Name" defaultValue="Example" />
          <button type="submit">Save</button>
        </Form>
      </div>,
    );
    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(submit).toHaveBeenCalledOnce();
    expect(bubble).toHaveBeenCalledOnce();
  });
});
