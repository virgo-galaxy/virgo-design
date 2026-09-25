import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  CircleCheckIcon,
  CircleInfoIcon,
  CircleXIcon,
  CloseIcon,
  TriangleAlertIcon,
  WorkspaceIcon,
} from '@virgo-design/icons';
import type { ReactElement } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '../Button';
import { Alert } from './index';

function pathData(icon: ReactElement) {
  const { container, unmount } = render(icon);
  const data = container.querySelector('path')?.getAttribute('d');
  unmount();
  return data;
}

describe('Alert', () => {
  it('renders defaults and preserves consumer attributes', () => {
    render(
      <Alert className="custom-alert" data-testid="alert">
        <Alert.Content>
          <Alert.Title>System update</Alert.Title>
        </Alert.Content>
      </Alert>,
    );
    const alert = screen.getByTestId('alert');
    expect(alert).toHaveClass('custom-alert');
    expect(alert).toHaveAttribute('data-intent', 'default');
    expect(alert).toHaveAttribute('data-variant', 'soft');
    expect(alert).toHaveAttribute('role', 'status');
    expect(screen.getByText('System update')).toBeInTheDocument();
  });

  it.each([
    ['default', 'status'],
    ['info', 'status'],
    ['success', 'status'],
    ['warning', 'alert'],
    ['error', 'alert'],
  ] as const)('maps the %s intent to its semantic role', (intent, role) => {
    render(
      <Alert intent={intent} data-testid="alert">
        {intent}
      </Alert>,
    );
    expect(screen.getByTestId('alert')).toHaveAttribute('data-intent', intent);
    expect(screen.getByTestId('alert')).toHaveAttribute('role', role);
  });

  it.each([
    ['info', <CircleInfoIcon />],
    ['success', <CircleCheckIcon />],
    ['warning', <TriangleAlertIcon />],
    ['error', <CircleXIcon />],
  ] as const)('maps %s to the matching status icon', (intent, expectedIcon) => {
    const expectedPath = pathData(expectedIcon);
    render(
      <Alert intent={intent}>
        <Alert.Icon data-testid="status-icon" />
      </Alert>,
    );
    const icon = screen.getByTestId('status-icon');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon.querySelector('path')).toHaveAttribute('d', expectedPath);
  });

  it('leaves the default intent icon-free', () => {
    render(
      <Alert>
        <Alert.Icon data-testid="status-icon" />
        <Alert.Content>Neutral information</Alert.Content>
      </Alert>,
    );
    expect(screen.queryByTestId('status-icon')).not.toBeInTheDocument();
  });

  it('supports a custom icon supplied by Root', () => {
    render(
      <Alert intent="info" icon={<WorkspaceIcon data-testid="workspace-icon" />}>
        <Alert.Icon className="custom-icon-slot" data-testid="icon-slot" />
      </Alert>,
    );
    expect(screen.getByTestId('icon-slot')).toHaveClass('custom-icon-slot');
    expect(screen.getByTestId('workspace-icon')).toBeInTheDocument();
  });

  it('disables even a status intent icon with icon=false', () => {
    render(
      <Alert intent="error" icon={false}>
        <Alert.Icon data-testid="status-icon" />
        <Alert.Content>Error details</Alert.Content>
      </Alert>,
    );
    expect(screen.queryByTestId('status-icon')).not.toBeInTheDocument();
  });

  it('supports title-only, description-only, and combined content', () => {
    render(
      <>
        <Alert>
          <Alert.Content className="title-content">
            <Alert.Title className="custom-title">Title only</Alert.Title>
          </Alert.Content>
        </Alert>
        <Alert>
          <Alert.Content className="description-content">
            <Alert.Description className="custom-description">Description only</Alert.Description>
          </Alert.Content>
        </Alert>
        <Alert>
          <Alert.Content>
            <Alert.Title>Combined title</Alert.Title>
            <Alert.Description>Combined description</Alert.Description>
          </Alert.Content>
        </Alert>
      </>,
    );
    expect(screen.getByText('Title only')).toHaveClass('custom-title');
    expect(screen.getByText('Title only').parentElement).toHaveClass('title-content');
    expect(screen.getByText('Description only')).toHaveClass('custom-description');
    expect(screen.getByText('Description only').parentElement).toHaveClass('description-content');
    expect(screen.getByText('Combined title')).toBeInTheDocument();
    expect(screen.getByText('Combined description')).toBeInTheDocument();
  });

  it('renders an application-owned action without adding behavior', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(
      <Alert>
        <Alert.Content>Deployment failed.</Alert.Content>
        <Alert.Action className="custom-action">
          <Button size="small" onClick={onRetry}>
            Retry
          </Button>
        </Alert.Action>
      </Alert>,
    );
    const retry = screen.getByRole('button', { name: 'Retry' });
    expect(retry.parentElement).toHaveClass('custom-action');
    await user.click(retry);
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it('notifies close without removing the Alert or bubbling', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const onRootClick = vi.fn();
    render(
      <Alert onClick={onRootClick}>
        <Alert.Content>Persistent feedback</Alert.Content>
        <Alert.Close className="custom-close" onClick={onClose} />
      </Alert>,
    );
    const close = screen.getByRole('button', { name: 'Close alert' });
    expect(close).toHaveClass('custom-close');
    expect(close.querySelector('path')).toHaveAttribute('d', pathData(<CloseIcon />));
    await user.click(close);
    expect(onClose).toHaveBeenCalledOnce();
    expect(onRootClick).not.toHaveBeenCalled();
    expect(screen.getByText('Persistent feedback')).toBeInTheDocument();
  });

  it.each(['soft', 'outline'] as const)('supports the %s variant', (variant) => {
    render(
      <Alert variant={variant} data-testid="alert">
        {variant}
      </Alert>,
    );
    expect(screen.getByTestId('alert')).toHaveAttribute('data-variant', variant);
  });

  it('allows native role and live-region attributes to override the default', () => {
    render(
      <Alert intent="error" role="status" aria-live="polite">
        Deferred error
      </Alert>,
    );
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });
});
