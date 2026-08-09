import { useCallback, useEffect, useState } from 'react'
import { loadExpenses, saveExpenses } from './storage'
import type { Expense } from './types'

export type NewExpense = Omit<Expense, 'id' | 'createdAt'>

function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>(() => loadExpenses())

  useEffect(() => {
    saveExpenses(expenses)
  }, [expenses])

  const addExpense = useCallback((input: NewExpense) => {
    const expense: Expense = { ...input, id: createId(), createdAt: new Date().toISOString() }
    setExpenses((current) => [expense, ...current])
  }, [])

  const removeExpense = useCallback((id: string) => {
    setExpenses((current) => current.filter((expense) => expense.id !== id))
  }, [])

  const replaceExpenses = useCallback((next: Expense[]) => {
    setExpenses(next)
  }, [])

  const clearExpenses = useCallback(() => {
    setExpenses([])
  }, [])

  return { expenses, addExpense, removeExpense, replaceExpenses, clearExpenses }
}
