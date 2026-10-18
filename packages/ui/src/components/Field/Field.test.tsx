import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { Field } from './index';

import styles from './Field.module.scss';

describe('Field visual contract', () => {
  it.each(['vertical', 'horizontal'] as const)(
    'preserves %s layout, the root class and ref',
    (layout) => {
      const ref = createRef<HTMLDivElement>();
      render(<Field ref={ref} layout={layout} className="custom-field" data-testid="field" />);
      const field = screen.getByTestId('field');
      expect(field.tagName).toBe('DIV');
      expect(ref.current).toBe(field);
      expect(field).toHaveAttribute('data-layout', layout);
      expect(field).toHaveClass(styles.root!, 'custom-field');
    },
  );

  it('styles Label, Description and Message while preserving custom classes and associations', () => {
    render(
      <Field>
        <Field.Label className="custom-label">Email</Field.Label>
        <Field.Control render={(props) => <input {...props} />} />
        <Field.Description id="hint" className="custom-description">
          Private
        </Field.Description>
        <Field.Message id="message" className="custom-message">
          Check the address
        </Field.Message>
      </Field>,
    );
    const label = screen.getByText('Email');
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveClass(styles.label!, 'custom-label');
    expect(screen.getByText('Private')).toHaveClass(styles.description!, 'custom-description');
    expect(screen.getByText('Check the address')).toHaveClass(styles.message!, 'custom-message');
    expect(screen.getByText('Check the address')).toHaveAttribute('aria-live', 'polite');
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute(
      'aria-describedby',
      'hint message',
    );
  });

  it('passes invalid and disabled state through to the control and clears both on update', () => {
    const contents = (
      <>
        <Field.Label>Email</Field.Label>
        <Field.Control render={(props) => <input {...props} />} />
        <Field.Message>Check the address</Field.Message>
      </>
    );
    const { rerender } = render(
      <Field invalid disabled data-testid="field">
        {contents}
      </Field>,
    );
    const field = screen.getByTestId('field');
    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(field).toHaveAttribute('data-invalid', 'true');
    expect(field).toHaveAttribute('data-disabled', 'true');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toBeDisabled();

    rerender(<Field data-testid="field">{contents}</Field>);
    expect(field).not.toHaveAttribute('data-invalid');
    expect(field).not.toHaveAttribute('data-disabled');
    expect(field).not.toHaveAttribute('data-layout');
    expect(input).not.toHaveAttribute('aria-invalid', 'true');
    expect(input).toBeEnabled();
  });
});
