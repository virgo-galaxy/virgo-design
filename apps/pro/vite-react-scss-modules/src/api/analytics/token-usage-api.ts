import type { TokenUsageReportDto } from '@/contracts/analytics';
import { http } from '@/lib/http';

export function getTokenUsageReport(signal?: AbortSignal): Promise<TokenUsageReportDto> {
  return http.get('/analytics/token-usage', signal ? { signal } : undefined);
}
