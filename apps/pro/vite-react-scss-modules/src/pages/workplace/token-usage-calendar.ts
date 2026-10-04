import type { TokenUsageDayDto } from '@/api/analytics';

const dayMs = 86400000;
export function tokenUsageLevel(tokens: number) {
  return tokens === 0
    ? 0
    : tokens < 10000000
      ? 1
      : tokens < 50000000
        ? 2
        : tokens < 100000000
          ? 3
          : 4;
}

export function formatTokenCount(tokens: number, locale: string) {
  if (locale.startsWith('zh')) {
    const unit = tokens >= 100000000 ? 100000000 : tokens >= 10000 ? 10000 : 1;
    return (
      new Intl.NumberFormat(locale, { maximumFractionDigits: 1, useGrouping: false }).format(
        tokens / unit,
      ) + (unit === 100000000 ? '亿' : unit === 10000 ? '万' : '')
    );
  }
  return new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(
    tokens,
  );
}

export function buildTokenUsageCalendar(snapshotDate: string, usage: TokenUsageDayDto[]) {
  const year = Number(snapshotDate.slice(0, 4));
  const start = Date.UTC(year, 0, 1);
  const end = Date.UTC(year + 1, 0, 1);
  const offset = (new Date(start).getUTCDay() + 6) % 7;
  const records = new Map(usage.map((day) => [day.date, day]));
  const days = Array.from({ length: (end - start) / dayMs }, (_, index) => {
    const date = new Date(start + index * dayMs).toISOString().slice(0, 10);
    const future = date > snapshotDate;
    const inputTokens = future ? 0 : (records.get(date)?.inputTokens ?? 0);
    const outputTokens = future ? 0 : (records.get(date)?.outputTokens ?? 0);
    return {
      date,
      inputTokens,
      outputTokens,
      tokens: inputTokens + outputTokens,
      future,
      week: Math.floor((index + offset) / 7),
      weekday: (index + offset) % 7,
    };
  });
  return { year, days, weeks: Math.ceil((days.length + offset) / 7) };
}
