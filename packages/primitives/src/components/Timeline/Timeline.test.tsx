import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { Timeline } from './index';
it('keeps list order, headings and machine-readable timestamps', () => {
  render(
    <Timeline aria-label="Events">
      <Timeline.Item>
        <Timeline.Time dateTime="2026-10-01">October 1</Timeline.Time>
        <Timeline.Title>Created</Timeline.Title>
        <Timeline.Description>Ready</Timeline.Description>
      </Timeline.Item>
      <Timeline.Item aria-current="true">
        <Timeline.Indicator>•</Timeline.Indicator>
        <Timeline.Title>Reviewed</Timeline.Title>
      </Timeline.Item>
    </Timeline>,
  );
  expect(screen.getByRole('list', { name: 'Events' }).tagName).toBe('OL');
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
  expect(screen.getByText('October 1')).toHaveAttribute('datetime', '2026-10-01');
  expect(screen.getByText('•')).toHaveAttribute('aria-hidden', 'true');
  expect(screen.getByRole('heading', { name: 'Reviewed' }).closest('li')).toHaveAttribute(
    'aria-current',
    'true',
  );
});
