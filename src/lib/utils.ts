import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function getDaysUntil(date: string | Date): number {
  const targetDate = new Date(date)
  const today = new Date()
  const diffTime = targetDate.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function calculateMonthlySpend(subscriptions: Array<{ price: number; cadence: string }>): number {
  return subscriptions.reduce((total, sub) => {
    switch (sub.cadence) {
      case 'daily':
        return total + sub.price * 30
      case 'weekly':
        return total + sub.price * 4
      case 'monthly':
        return total + sub.price
      case 'quarterly':
        return total + sub.price / 3
      case 'annual':
        return total + sub.price / 12
      default:
        return total
    }
  }, 0)
}

export function calculateAnnualSpend(subscriptions: Array<{ price: number; cadence: string }>): number {
  return calculateMonthlySpend(subscriptions) * 12
}

export function normalizeToMonthly(price: number, cadence: string): number {
  switch (cadence) {
    case 'daily':
      return price * 30
    case 'weekly':
      return price * 4
    case 'monthly':
      return price
    case 'quarterly':
      return price / 3
    case 'annual':
      return price / 12
    default:
      return price
  }
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.substring(0, length) + '...'
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
