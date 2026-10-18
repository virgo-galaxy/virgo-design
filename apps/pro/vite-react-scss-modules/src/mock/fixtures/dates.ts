export function demoDate(days = 0, reference = new Date().toISOString().slice(0, 10)) {
  const date = new Date(`${reference}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);

  return date.toISOString().slice(0, 10);
}
