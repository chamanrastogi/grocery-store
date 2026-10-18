export function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: value % 1 === 0 ? 0 : 1,
  }).format(value)
}

export function discountPercent(original: number, current: number): number {
  if (original <= current) return 0
  return Math.round(((original - current) / original) * 100)
}

export function formatDate(iso: string, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...options,
  }).format(new Date(iso))
}

export function formatTime(iso: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(iso))
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return `${count} ${count === 1 ? singular : (plural ?? `${singular}s`)}`
}