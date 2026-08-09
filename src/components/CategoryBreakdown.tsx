import { formatCOP } from '../lib/format'
import type { CategorySlice } from '../lib/stats'

type Props = {
  slices: CategorySlice[]
}

export function CategoryBreakdown({ slices }: Props) {
  return (
    <div className="card">
      <h2 className="text-sm font-medium text-neutral-900">Por categoría</h2>
      {slices.length === 0 ? (
        <p className="mt-4 text-sm text-neutral-400">Sin gastos en este periodo</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {slices.map((slice) => (
            <li key={slice.category}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-neutral-700">{slice.category}</span>
                <span className="tabular-nums font-medium">{formatCOP(slice.amount)}</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full bg-neutral-900"
                  style={{ width: `${Math.max(slice.share * 100, 2)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
