import {
  addDays,
  addMonths,
  addWeeks,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  parseISO,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { es } from 'date-fns/locale'
import type { Period } from './types'

export const WEEK_OPTIONS = { locale: es, weekStartsOn: 1 } as const

export function toISODate(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

export function fromISODate(value: string): Date {
  return parseISO(value)
}

export function periodRange(period: Period, anchor: Date): { start: Date; end: Date } {
  if (period === 'day') return { start: anchor, end: anchor }
  if (period === 'week') {
    return { start: startOfWeek(anchor, WEEK_OPTIONS), end: endOfWeek(anchor, WEEK_OPTIONS) }
  }
  return { start: startOfMonth(anchor), end: endOfMonth(anchor) }
}

export function shiftPeriod(period: Period, anchor: Date, delta: number): Date {
  if (period === 'day') return addDays(anchor, delta)
  if (period === 'week') return addWeeks(anchor, delta)
  return addMonths(anchor, delta)
}

export function periodLabel(period: Period, anchor: Date): string {
  const { start, end } = periodRange(period, anchor)
  if (period === 'day') return capitalize(format(start, "EEEE d 'de' MMMM yyyy", { locale: es }))
  if (period === 'week') {
    return `${format(start, 'd MMM', { locale: es })} – ${format(end, 'd MMM yyyy', { locale: es })}`
  }
  return capitalize(format(start, 'MMMM yyyy', { locale: es }))
}

export function daysInRange(start: Date, end: Date): Date[] {
  return eachDayOfInterval({ start, end })
}

export function isWithinISO(dateISO: string, start: Date, end: Date): boolean {
  return dateISO >= toISODate(start) && dateISO <= toISODate(end)
}

export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
