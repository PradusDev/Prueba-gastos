import type { Expense } from './types'

const STORAGE_KEY = 'control-gastos:v1'

function isExpense(value: unknown): value is Expense {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.amount === 'number' &&
    typeof candidate.category === 'string' &&
    typeof candidate.note === 'string' &&
    typeof candidate.date === 'string' &&
    typeof candidate.createdAt === 'string'
  )
}

export function loadExpenses(): Expense[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isExpense)
  } catch {
    return []
  }
}

export function saveExpenses(expenses: Expense[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  } catch {
    /* almacenamiento no disponible (modo privado o cuota llena) */
  }
}

export function parseImportedExpenses(raw: string): Expense[] {
  const parsed: unknown = JSON.parse(raw)
  if (!Array.isArray(parsed)) throw new Error('El archivo no contiene una lista de gastos.')
  const expenses = parsed.filter(isExpense)
  if (expenses.length === 0) throw new Error('El archivo no contiene gastos válidos.')
  return expenses
}
