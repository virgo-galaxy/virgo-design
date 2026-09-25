import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from './index';

describe('Card', () => {
  it('renders content without adding a role', () => {
    render(<Card data-testid="card">Content</Card>);
    expect(screen.getByTestId('card')).toHaveTextContent('Content');
    expect(screen.getByTestId('card')).not.toHaveAttribute('role');
  });

  it('renders the complete compound structure', () => {
    render(
      <Card>
        <Card.Header>
          <Card.Title as="h2">Project</Card.Title>
          <Card.Description>Project description</Card.Description>
        </Card.Header>
        <Card.Body>Content</Card.Body>
        <Card.Footer>
          <Button>Open</Button>
        </Card.Footer>
      </Card>,
    );
    expect(screen.getByRole('heading', { name: 'Project', level: 2 })).toBeInTheDocument();
    expect(screen.getByText('Project description')).toHaveProperty('tagName', 'P');
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
  });

  it.each([
    {
      variant: 'default',
      tone: 'default',
      elevation: '0',
      border: 'none',
    },
    {
      variant: 'outlined',
      tone: 'default',
      elevation: '0',
      border: 'subtle',
    },
    {
      variant: 'elevated',
      tone: 'elevated',
      elevation: '2',
      border: 'none',
    },
  ] as const)(
    'maps the $variant variant to existing Surface capabilities',
    ({ variant, tone, elevation, border }) => {
      render(<Card data-testid="card" variant={variant} />);
      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('data-variant', variant);
      expect(card).toHaveAttribute('data-tone', tone);
      expect(card).toHaveAttribute('data-elevation', elevation);
      expect(card).toHaveAttribute('data-border', border);
      expect(card).toHaveAttribute('data-radius', '12');
    },
  );

  it.each(['sm', 'md', 'lg'] as const)('supports the %s size', (size) => {
    render(<Card data-testid="card" size={size} />);
    expect(screen.getByTestId('card')).toHaveAttribute('data-size', size);
  });

  it('supports consumer className on the root and every part', () => {
    render(
      <Card className="root" data-testid="root">
        <Card.Header className="header" data-testid="header" />
        <Card.Title className="title">Title</Card.Title>
        <Card.Description className="description">Description</Card.Description>
        <Card.Body className="body" data-testid="body" />
        <Card.Footer className="footer" data-testid="footer" />
      </Card>,
    );
    expect(screen.getByTestId('root')).toHaveClass('root');
    expect(screen.getByTestId('header')).toHaveClass('header');
    expect(screen.getByText('Title')).toHaveClass('title');
    expect(screen.getByText('Description')).toHaveClass('description');
    expect(screen.getByTestId('body')).toHaveClass('body');
    expect(screen.getByTestId('footer')).toHaveClass('footer');
  });

  it('composes arbitrary children without making the card interactive', () => {
    render(
      <Card data-testid="card">
        <Avatar fallback="PK" />
        <Card.Title>Pokeya</Card.Title>
        <Badge count="Online" intent="success" />
      </Card>,
    );
    expect(screen.getByTestId('card')).toHaveTextContent('PKPokeyaOnline');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('keeps Title neutral by default and lets consumers choose a heading level', () => {
    const { rerender } = render(<Card.Title>Visual title</Card.Title>);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    rerender(<Card.Title as="h4">Document title</Card.Title>);
    expect(screen.getByRole('heading', { name: 'Document title', level: 4 })).toBeInTheDocument();
  });
});
