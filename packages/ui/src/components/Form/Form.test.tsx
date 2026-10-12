import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Checkbox, Field, Form, Input, Radio, Select, Switch, Textarea } from '../../index';
describe('styled form composition', () => {
  it('composes every existing form control with associated labels and inherited state', async () => {
    const user = userEvent.setup();
    render(
      <Form layout="horizontal" size="small">
        <Field required invalid>
          <Field.Label>Email</Field.Label>
          <Input clearable defaultValue="test" />
          <Field.Description>Hint</Field.Description>
          <Field.Message>Error</Field.Message>
        </Field>
        <Field disabled>
          <Field.Label>Notes</Field.Label>
          <Textarea />
        </Field>
        <Field>
          <Field.Label>Item</Field.Label>
          <Select>
            <Select.Trigger placeholder="Choose" />
            <Select.Content>
              <Select.Option value="a">Alpha</Select.Option>
            </Select.Content>
          </Select>
        </Field>
        <Field>
          <Field.Label>Accept</Field.Label>
          <Checkbox />
        </Field>
        <Field>
          <Field.Label>Choice</Field.Label>
          <Radio value="a" />
        </Field>
        <Field readOnly>
          <Field.Label>Notify</Field.Label>
          <Switch />
        </Field>
      </Form>,
    );
    for (const label of ['Email', 'Notes', 'Item', 'Accept', 'Choice', 'Notify'])
      expect(screen.getByLabelText(new RegExp(`^${label}`))).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email/)).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText('Notes')).toBeDisabled();
    await user.click(screen.getByLabelText('Notify'));
    expect(screen.getByLabelText('Notify')).not.toBeChecked();
    expect(screen.getByLabelText(/^Email/).closest('form')).toHaveAttribute(
      'data-layout',
      'horizontal',
    );
  });
  it('associates an explicit input ID through the styled wrapper', () => {
    render(
      <Field>
        <Field.Label>Email</Field.Label>
        <Input id="explicit-email" />
      </Field>,
    );
    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'explicit-email');
  });
  it('cannot clear an inherited readonly input through its auxiliary action', async () => {
    const user = userEvent.setup();
    render(
      <Field readOnly>
        <Field.Label>Name</Field.Label>
        <Input clearable defaultValue="Example" />
      </Field>,
    );
    expect(screen.queryByRole('button', { name: 'Clear input' })).not.toBeInTheDocument();
    await user.click(screen.getByLabelText('Name'));
    expect(screen.getByLabelText('Name')).toHaveValue('Example');
  });
});
