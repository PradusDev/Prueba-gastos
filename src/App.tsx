import { useMemo, useState } from 'react'
import { CategoryBreakdown } from './components/CategoryBreakdown'
import { DataControls } from './components/DataControls'
import { ExpenseForm } from './components/ExpenseForm'
import { ExpenseList } from './components/ExpenseList'
import { PeriodSwitcher } from './components/PeriodSwitcher'
import { SummaryCards } from './components/SummaryCards'
import { TrendChart } from './components/TrendChart'
import { daysInRange, periodRange, shiftPeriod, toISODate } from './lib/dates'
import { formatCOP } from './lib/format'
import { byCategory, filterByPeriod, previousPeriodTotal, total, trendSeries } from './lib/stats'
import type { Period } from './lib/types'
import { useExpenses } from './lib/useExpenses'

const PERIOD_NAMES: Record<Period, string> = {
  day: 'del día',
  week: 'de la semana',
  month: 'del mes',
}

const CHART_TITLES: Record<Period, string> = {
  day: 'Gasto por día (semana actual)',
  week: 'Gasto por día de la semana',
  month: 'Gasto por día del mes',
}

export default function App() {
  const { expenses, addExpense, removeExpense, replaceExpenses, clearExpenses } = useExpenses()
  const [period, setPeriod] = useState<Period>('day')
  const [anchor, setAnchor] = useState(() => new Date())

  const visible = useMemo(
    () => filterByPeriod(expenses, period, anchor),
    [expenses, period, anchor],
  )
  const totalPeriod = useMemo(() => total(visible), [visible])
  const previous = useMemo(
    () => previousPeriodTotal(expenses, period, anchor),
    [expenses, period, anchor],
  )
  const trend = useMemo(() => trendSeries(expenses, period, anchor), [expenses, period, anchor])
  const categories = useMemo(() => byCategory(visible), [visible])

  const dailyAverage = useMemo(() => {
    const { start, end } = periodRange(period, anchor)
    return totalPeriod / daysInRange(start, end).length
  }, [period, anchor, totalPeriod])

  const sorted = useMemo(
    () => [...visible].sort((a, b) => (a.date === b.date ? 0 : a.date < b.date ? 1 : -1)),
    [visible],
  )

  return (
    <div className="min-h-screen">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-baseline justify-between px-4 py-5">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Control de gastos</h1>
            <p className="text-xs text-neutral-500">Pesos colombianos · sin cuentas ni servidores</p>
          </div>
          <p className="tabular-nums text-sm text-neutral-500">
            Histórico total <span className="font-medium text-neutral-900">{formatCOP(total(expenses))}</span>
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-5 px-4 py-6">
        <PeriodSwitcher
          period={period}
          anchor={anchor}
          onPeriodChange={setPeriod}
          onShift={(delta) => setAnchor((current) => shiftPeriod(period, current, delta))}
          onToday={() => setAnchor(new Date())}
        />

        <SummaryCards
          totalPeriod={totalPeriod}
          previousPeriod={previous}
          dailyAverage={dailyAverage}
          count={visible.length}
          periodName={PERIOD_NAMES[period]}
        />

        <div className="grid gap-5 lg:grid-cols-[20rem_1fr]">
          <div className="space-y-5">
            <ExpenseForm defaultDate={toISODate(new Date())} onAdd={addExpense} />
            <DataControls
              expenses={expenses}
              onImport={replaceExpenses}
              onClear={clearExpenses}
            />
          </div>

          <div className="space-y-5">
            <TrendChart data={trend} title={CHART_TITLES[period]} />
            <CategoryBreakdown slices={categories} />
            <ExpenseList expenses={sorted} onRemove={removeExpense} />
          </div>
        </div>
      </main>
    </div>
  )
}
