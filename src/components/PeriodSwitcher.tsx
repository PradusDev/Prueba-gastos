import { periodLabel } from '../lib/dates'
import type { Period } from '../lib/types'

const PERIODS: { value: Period; label: string }[] = [
  { value: 'day', label: 'Diario' },
  { value: 'week', label: 'Semanal' },
  { value: 'month', label: 'Mensual' },
]

type Props = {
  period: Period
  anchor: Date
  onPeriodChange: (period: Period) => void
  onShift: (delta: number) => void
  onToday: () => void
}

export function PeriodSwitcher({ period, anchor, onPeriodChange, onShift, onToday }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="inline-flex rounded-lg border border-neutral-200 bg-white p-1">
        {PERIODS.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onPeriodChange(item.value)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
              period === item.value
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Periodo anterior"
          onClick={() => onShift(-1)}
          className="h-8 w-8 rounded-lg border border-neutral-200 bg-white text-neutral-500 transition hover:text-neutral-900"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={onToday}
          className="min-w-[11rem] rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-700 transition hover:text-neutral-900"
          title="Volver a hoy"
        >
          {periodLabel(period, anchor)}
        </button>
        <button
          type="button"
          aria-label="Periodo siguiente"
          onClick={() => onShift(1)}
          className="h-8 w-8 rounded-lg border border-neutral-200 bg-white text-neutral-500 transition hover:text-neutral-900"
        >
          ›
        </button>
      </div>
    </div>
  )
}
