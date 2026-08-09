const copFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

const numberFormatter = new Intl.NumberFormat('es-CO', {
  maximumFractionDigits: 0,
})

export function formatCOP(value: number): string {
  return copFormatter.format(Math.round(value))
}

export function formatCompactCOP(value: number): string {
  if (Math.abs(value) >= 1_000_000) return `$${numberFormatter.format(value / 1_000_000)}M`
  if (Math.abs(value) >= 1_000) return `$${numberFormatter.format(value / 1_000)}k`
  return `$${numberFormatter.format(value)}`
}

/** Convierte texto escrito por el usuario ("15.000", "15000", "15,5") a un número. */
export function parseAmount(input: string): number {
  const cleaned = input.replace(/[^\d.,-]/g, '').replace(/\./g, '').replace(',', '.')
  const value = Number(cleaned)
  return Number.isFinite(value) ? value : 0
}

/** Agrega separadores de miles mientras el usuario escribe. */
export function formatAmountInput(input: string): string {
  const digits = input.replace(/\D/g, '')
  if (!digits) return ''
  return numberFormatter.format(Number(digits))
}
