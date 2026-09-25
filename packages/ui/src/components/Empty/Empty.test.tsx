import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from '../Button';
import { Empty } from './index';

describe('Empty', () => {
  it('renders a semantic section with title and description', () => {
    const { container } = render(
      <Empty>
        <Empty.Title>No documents</Empty.Title>
        <Empty.Description>Create your first document to get started.</Empty.Description>
      </Empty>,
    );
    expect(container.querySelector('section')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'No documents', level: 3 })).toBeInTheDocument();
    expect(screen.getByText('Create your first document to get started.')).toHaveProperty(
      'tagName',
      'P',
    );
  });

  it('renders a decorative icon slot', () => {
    render(<Empty.Icon data-testid="icon">Icon</Empty.Icon>);
    expect(screen.getByTestId('icon')).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders consumer actions without owning their behavior', () => {
    render(
      <Empty>
        <Empty.Action>
          <Button>Create</Button>
        </Empty.Action>
      </Empty>,
    );
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
  });

  it.each(['sm', 'md', 'lg'] as const)('supports the %s size', (size) => {
    render(<Empty data-testid="empty" size={size} />);
    expect(screen.getByTestId('empty')).toHaveAttribute('data-size', size);
  });

  it('supports consumer className on every part', () => {
    render(
      <Empty className="root" data-testid="root">
        <Empty.Icon className="icon" data-testid="icon" />
        <Empty.Title className="title">Title</Empty.Title>
        <Empty.Description className="description">Description</Empty.Description>
        <Empty.Action className="action" data-testid="action" />
      </Empty>,
    );
    expect(screen.getByTestId('root')).toHaveClass('root');
    expect(screen.getByTestId('icon')).toHaveClass('icon');
    expect(screen.getByRole('heading')).toHaveClass('title');
    expect(screen.getByText('Description')).toHaveClass('description');
    expect(screen.getByTestId('action')).toHaveClass('action');
  });
});
