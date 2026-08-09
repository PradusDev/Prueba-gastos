import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { formatCOP, formatCompactCOP } from '../lib/format'
import type { TrendPoint } from '../lib/stats'

type Props = {
  data: TrendPoint[]
  title: string
}

export function TrendChart({ data, title }: Props) {
  const hasData = data.some((point) => point.amount > 0)

  return (
    <div className="card">
      <h2 className="text-sm font-medium text-neutral-900">{title}</h2>
      <div className="mt-4 h-56">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
              <CartesianGrid vertical={false} stroke="#f1f1f1" />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: '#a3a3a3' }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={52}
                tick={{ fontSize: 11, fill: '#a3a3a3' }}
                tickFormatter={formatCompactCOP}
              />
              <Tooltip
                cursor={{ fill: '#fafafa' }}
                formatter={(value) => [formatCOP(Number(value)), 'Total']}
                contentStyle={{ borderRadius: 12, border: '1px solid #e5e5e5', fontSize: 12 }}
              />
              <Bar dataKey="amount" fill="#171717" radius={[4, 4, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <EmptyChart />
        )}
      </div>
    </div>
  )
}

function EmptyChart() {
  return (
    <div className="flex h-full items-center justify-center text-sm text-neutral-400">
      Sin gastos en este periodo
    </div>
  )
}
