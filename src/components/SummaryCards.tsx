import { formatCOP } from '../lib/format'

type Props = {
  totalPeriod: number
  previousPeriod: number
  dailyAverage: number
  count: number
  periodName: string
}

export function SummaryCards({
  totalPeriod,
  previousPeriod,
  dailyAverage,
  count,
  periodName,
}: Props) {
  const diff = previousPeriod > 0 ? (totalPeriod - previousPeriod) / previousPeriod : null

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Stat label={`Total ${periodName}`} value={formatCOP(totalPeriod)} />
      <Stat
        label="Vs. periodo anterior"
        value={
          diff === null
            ? '—'
            : `${diff >= 0 ? '+' : ''}${new Intl.NumberFormat('es-CO', {
                maximumFractionDigits: 1,
              }).format(diff * 100)}%`
        }
        tone={diff === null ? 'neutral' : diff > 0 ? 'up' : 'down'}
      />
      <Stat label="Promedio diario" value={formatCOP(dailyAverage)} />
      <Stat label="Gastos registrados" value={String(count)} />
    </div>
  )
}

function Stat({
  label,
  value,
  tone = 'neutral',
}: {
  label: string
  value: string
  tone?: 'neutral' | 'up' | 'down'
}) {
  const toneClass =
    tone === 'up' ? 'text-red-600' : tone === 'down' ? 'text-emerald-600' : 'text-neutral-900'
  return (
    <div className="card p-4">
      <p className="text-xs uppercase tracking-wide text-neutral-500">{label}</p>
      <p className={`mt-1 text-xl font-semibold tabular-nums ${toneClass}`}>{value}</p>
    </div>
  )
}
