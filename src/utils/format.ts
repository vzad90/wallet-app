export function formatCurrencyUSD(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

export function formatDayOrDate(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const oneDay = 24 * 60 * 60 * 1000;
  const days = Math.floor(diffMs / oneDay);
  if (days <= 6) {
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }
  return date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "2-digit",
  });
}

export function kFormat(num: number): string {
  if (Math.abs(num) >= 1000) {
    return `${Math.round(num / 1000)}K`;
  }
  return String(Math.round(num));
}
