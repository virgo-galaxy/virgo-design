import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox, Field, Form, Input, Radio, Select, Switch, Textarea } from '../../index';
describe('Field association and inheritance', () => {
  it('associates a label with an explicit control ID and composes external, description and message IDs', () => {
    const { rerender } = render(
      <Field invalid required>
        <Field.Label>Email</Field.Label>
        <Input id="email" aria-describedby="external" />
        <Field.Description id="hint">Private</Field.Description>
        <Field.Message id="error">Invalid</Field.Message>
      </Field>,
    );
    const control = screen.getByRole('textbox', { name: 'Email' });
    expect(control).toHaveAttribute('id', 'email');
    expect(control).toHaveAttribute('aria-describedby', 'external hint error');
    expect(control).toHaveAttribute('aria-invalid', 'true');
    expect(control).toBeRequired();
    rerender(
      <Field>
        <Field.Label>Email</Field.Label>
        <Input id="email" aria-describedby="external" />
        <Field.Description id="hint">Private</Field.Description>
      </Field>,
    );
    expect(control).toHaveAttribute('aria-describedby', 'external hint');
    expect(control).not.toBeRequired();
    expect(control).not.toHaveAttribute('aria-invalid', 'true');
  });
  it('generates unique IDs, supports textareas and resets association after unmount', () => {
    const { rerender } = render(
      <>
        <Field>
          <Field.Label>One</Field.Label>
          <Textarea />
          <Field.Description>Hint</Field.Description>
        </Field>
        <Field>
          <Field.Label>Two</Field.Label>
          <Input />
        </Field>
      </>,
    );
    expect(screen.getByLabelText('One').id).not.toBe(screen.getByLabelText('Two').id);
    expect(screen.getByLabelText('One')).toHaveAttribute('aria-describedby');
    rerender(
      <Field>
        <Field.Label>Three</Field.Label>
        <Input />
      </Field>,
    );
    expect(screen.getByLabelText('Three')).not.toHaveAttribute('aria-describedby');
  });
  it('inherits form disabled/read-only state with explicit field/control overrides', () => {
    render(
      <Form disabled readOnly>
        <Field>
          <Field.Label>Inherited</Field.Label>
          <Input />
        </Field>
        <Field disabled={false} readOnly={false}>
          <Field.Label>Editable</Field.Label>
          <Input />
        </Field>
        <Field>
          <Field.Label>Local</Field.Label>
          <Input disabled={false} readOnly={false} />
        </Field>
      </Form>,
    );
    expect(screen.getByLabelText('Inherited')).toBeDisabled();
    expect(screen.getByLabelText('Inherited')).toHaveAttribute('readonly');
    expect(screen.getByLabelText('Editable')).toBeEnabled();
    expect(screen.getByLabelText('Editable')).not.toHaveAttribute('readonly');
    expect(screen.getByLabelText('Local')).toBeEnabled();
  });
  it.each([Checkbox, Radio, Switch])(
    'prevents readonly native choice controls from changing',
    async (Control) => {
      const change = vi.fn();
      const user = userEvent.setup();
      render(
        <Field readOnly required invalid>
          <Field.Label>Choice</Field.Label>
          <Control onChange={change} />
        </Field>,
      );
      const input = screen.getByLabelText(/^Choice/);
      await user.click(input);
      await user.keyboard(' ');
      expect(input).not.toBeChecked();
      expect(change).not.toHaveBeenCalled();
      expect(input).toHaveAttribute('aria-readonly', 'true');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    },
  );
  it.each([Checkbox, Radio, Switch])(
    'preserves checked read-only controls after click and Space',
    async (Control) => {
      const user = userEvent.setup();
      const change = vi.fn();
      const { rerender } = render(
        <Control aria-label="Choice" checked readOnly onChange={change} />,
      );
      const control = screen.getByLabelText('Choice');
      await user.click(control);
      await user.keyboard(' ');
      expect(control).toBeChecked();
      expect(change).not.toHaveBeenCalled();
      rerender(<Control aria-label="Choice" checked={false} readOnly onChange={change} />);
      await user.click(control);
      expect(control).not.toBeChecked();
    },
  );
  it('preserves an uncontrolled read-only radio that was already checked', async () => {
    const user = userEvent.setup();
    render(<Radio aria-label="Choice" defaultChecked readOnly />);
    await user.click(screen.getByLabelText('Choice'));
    expect(screen.getByLabelText('Choice')).toBeChecked();
  });
  it('associates a Select trigger and inherits readonly and invalid state', async () => {
    const user = userEvent.setup();
    render(
      <Field readOnly invalid required>
        <Field.Label>Item</Field.Label>
        <Select>
          <Select.Trigger>Choose</Select.Trigger>
          <Select.Content>
            <Select.Option value="a">Alpha</Select.Option>
          </Select.Content>
        </Select>
        <Field.Description>Help</Field.Description>
      </Field>,
    );
    const trigger = screen.getByLabelText(/^Item/);
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    expect(trigger).toHaveAttribute('aria-required', 'true');
    expect(trigger).toHaveAttribute('aria-describedby');
    await user.click(trigger);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
  it('allows custom controls through Field.Control and preserves native submit ownership', () => {
    const submit = vi.fn((event) => event.preventDefault());
    render(
      <Form onSubmit={submit}>
        <Field controlId="custom" required>
          <Field.Label>Custom</Field.Label>
          <Field.Control render={(props) => <input {...props} defaultValue="ok" />} />
        </Field>
        <button type="submit">Save</button>
      </Form>,
    );
    expect(screen.getByLabelText(/^Custom/)).toHaveAttribute('id', 'custom');
    fireEvent.submit(screen.getByRole('button', { name: 'Save' }).closest('form')!);
    expect(submit).toHaveBeenCalledOnce();
  });
});
