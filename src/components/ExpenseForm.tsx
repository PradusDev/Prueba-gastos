import { useState } from 'react'
import { formatAmountInput, parseAmount } from '../lib/format'
import { CATEGORIES } from '../lib/types'
import type { NewExpense } from '../lib/useExpenses'

type Props = {
  defaultDate: string
  onAdd: (expense: NewExpense) => void
}

export function ExpenseForm({ defaultDate, onAdd }: Props) {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState<string>(CATEGORIES[0])
  const [note, setNote] = useState('')
  const [date, setDate] = useState(defaultDate)
  const [error, setError] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = parseAmount(amount)
    if (value <= 0) {
      setError('Ingresa un monto mayor a cero.')
      return
    }
    onAdd({ amount: value, category, note: note.trim(), date })
    setAmount('')
    setNote('')
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <div>
        <label className="label" htmlFor="amount">
          Monto (COP)
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-400">
            $
          </span>
          <input
            id="amount"
            className="input pl-7 text-lg font-semibold"
            inputMode="numeric"
            placeholder="0"
            autoComplete="off"
            value={amount}
            onChange={(event) => setAmount(formatAmountInput(event.target.value))}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label" htmlFor="category">
            Categoría
          </label>
          <select
            id="category"
            className="input"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="date">
            Fecha
          </label>
          <input
            id="date"
            type="date"
            className="input"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="note">
          Nota (opcional)
        </label>
        <input
          id="note"
          className="input"
          placeholder="Almuerzo, taxi, mercado…"
          autoComplete="off"
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        className="w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700"
      >
        Agregar gasto
      </button>
    </form>
  )
}
