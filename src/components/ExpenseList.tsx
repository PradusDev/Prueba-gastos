import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { fromISODate } from '../lib/dates'
import { formatCOP } from '../lib/format'
import type { Expense } from '../lib/types'

type Props = {
  expenses: Expense[]
  onRemove: (id: string) => void
}

export function ExpenseList({ expenses, onRemove }: Props) {
  return (
    <div className="card">
      <h2 className="text-sm font-medium text-neutral-900">Movimientos</h2>
      {expenses.length === 0 ? (
        <p className="mt-4 text-sm text-neutral-400">
          Aún no hay gastos registrados en este periodo.
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-neutral-100">
          {expenses.map((expense) => (
            <li key={expense.id} className="group flex items-center gap-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-neutral-900">
                  {expense.note || expense.category}
                </p>
                <p className="text-xs text-neutral-500">
                  {expense.category} ·{' '}
                  {format(fromISODate(expense.date), "d 'de' MMM yyyy", { locale: es })}
                </p>
              </div>
              <span className="tabular-nums text-sm font-medium">{formatCOP(expense.amount)}</span>
              <button
                type="button"
                aria-label={`Eliminar gasto de ${formatCOP(expense.amount)}`}
                onClick={() => onRemove(expense.id)}
                className="rounded-md px-2 py-1 text-xs text-neutral-300 transition hover:bg-neutral-100 hover:text-red-600"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
