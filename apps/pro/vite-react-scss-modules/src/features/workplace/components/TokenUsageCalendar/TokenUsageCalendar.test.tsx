// @vitest-environment jsdom
import { fireEvent, render, screen, within } from '@testing-library/react';
import { http } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, expect, it } from 'vitest';

import { getTokenUsageReport } from '@/api/analytics';
import { BusinessDataProvider } from '@/layout/providers/BusinessDataProvider';
import { demoDate } from '@/mock/fixtures/dates';
import { handlers } from '@/mock/handlers';
import { success } from '@/mock/http/response';
import { dailyTokenUsage } from '@/mock/model/task-records';
import { TestSessionProvider } from '@/test/TestSessionProvider';

import { TokenUsageDataProvider } from '../../data/token-usage-data';
import { TokenUsageCalendar } from './TokenUsageCalendar';

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('opens a populated day and shows its receipts when the report date itself has no usage', async () => {
  const report = await getTokenUsageReport();
  const date = demoDate(-2, report.referenceDate);
  const records = report.tokenRecords.filter((record) => record.recordedAt.startsWith(date));
  expect(records.length).toBeGreaterThan(0);

  server.use(
    http.get('/api/v1/analytics/token-usage', () =>
      success({ ...report, tokenRecords: records, tokenUsage: dailyTokenUsage(records) }),
    ),
  );

  render(
    <TestSessionProvider>
      <BusinessDataProvider>
        <TokenUsageDataProvider>
          <TokenUsageCalendar year={null} onYearChange={() => {}} />
        </TokenUsageDataProvider>
      </BusinessDataProvider>
    </TestSessionProvider>,
  );

  fireEvent.click(await screen.findByRole('button', { name: 'Open token calendar' }));

  const dialog = await screen.findByRole('dialog', { name: 'Token usage calendar' });
  expect(
    within(dialog).getByRole('heading', { name: `Task operation receipts · ${date}` }),
  ).toBeVisible();
  expect(
    within(dialog).queryByText('No recorded consumption on this date.'),
  ).not.toBeInTheDocument();
  expect(within(dialog).getByText(new RegExp(`^${records.length} records`))).toBeVisible();
});
