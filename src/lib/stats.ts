import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { daysInRange, isWithinISO, periodRange, shiftPeriod, toISODate } from './dates'
import type { Expense, Period } from './types'

export function filterByPeriod(expenses: Expense[], period: Period, anchor: Date): Expense[] {
  const { start, end } = periodRange(period, anchor)
  return expenses.filter((expense) => isWithinISO(expense.date, start, end))
}

export function total(expenses: Expense[]): number {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0)
}

export type CategorySlice = { category: string; amount: number; share: number }

export function byCategory(expenses: Expense[]): CategorySlice[] {
  const totals = new Map<string, number>()
  for (const expense of expenses) {
    totals.set(expense.category, (totals.get(expense.category) ?? 0) + expense.amount)
  }
  const sum = total(expenses)
  return [...totals.entries()]
    .map(([category, amount]) => ({ category, amount, share: sum > 0 ? amount / sum : 0 }))
    .sort((a, b) => b.amount - a.amount)
}

export type TrendPoint = { label: string; amount: number }

/** Serie diaria dentro del periodo (para día se muestran las últimas dos semanas). */
export function trendSeries(expenses: Expense[], period: Period, anchor: Date): TrendPoint[] {
  const { start, end } = period === 'day' ? periodRange('week', anchor) : periodRange(period, anchor)
  return daysInRange(start, end).map((day) => {
    const iso = toISODate(day)
    const amount = total(expenses.filter((expense) => expense.date === iso))
    const label = period === 'month' ? format(day, 'd') : format(day, 'EEE', { locale: es })
    return { label, amount }
  })
}

export function previousPeriodTotal(expenses: Expense[], period: Period, anchor: Date): number {
  return total(filterByPeriod(expenses, period, shiftPeriod(period, anchor, -1)))
}
