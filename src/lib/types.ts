export type Expense = {
  id: string
  /** Monto en pesos colombianos (COP), sin decimales. */
  amount: number
  category: string
  note: string
  /** Fecha local en formato yyyy-MM-dd. */
  date: string
  createdAt: string
}

export type Period = 'day' | 'week' | 'month'

export const CATEGORIES = [
  'Alimentación',
  'Transporte',
  'Vivienda',
  'Servicios',
  'Salud',
  'Educación',
  'Entretenimiento',
  'Compras',
  'Otros',
] as const

export type Category = (typeof CATEGORIES)[number]
