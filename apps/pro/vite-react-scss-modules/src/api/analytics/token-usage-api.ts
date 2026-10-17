import { http } from '@/lib/http';

import type { TokenUsageReportDto } from './types';

export function getTokenUsageReport(signal?: AbortSignal): Promise<TokenUsageReportDto> {
  return http.get('/analytics/token-usage', signal ? { signal } : undefined);
}
