import { useRef, useState } from 'react'
import { parseImportedExpenses } from '../lib/storage'
import type { Expense } from '../lib/types'

type Props = {
  expenses: Expense[]
  onImport: (expenses: Expense[]) => void
  onClear: () => void
}

export function DataControls({ expenses, onImport, onClear }: Props) {
  const fileInput = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState('')

  function handleExport() {
    const blob = new Blob([JSON.stringify(expenses, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `gastos-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  async function handleImport(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const imported = parseImportedExpenses(await file.text())
      onImport(imported)
      setMessage(`Se importaron ${imported.length} gastos.`)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo leer el archivo.')
    } finally {
      event.target.value = ''
    }
  }

  function handleClear() {
    if (!window.confirm('¿Borrar todos los gastos guardados? Esta acción no se puede deshacer.')) {
      return
    }
    onClear()
    setMessage('Se borraron todos los gastos.')
  }

  return (
    <div className="card">
      <h2 className="text-sm font-medium text-neutral-900">Tus datos</h2>
      <p className="mt-1 text-xs text-neutral-500">
        Todo se guarda solo en este navegador. Exporta un respaldo para no perderlo.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={handleExport} className="secondary-button">
          Exportar JSON
        </button>
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          className="secondary-button"
        >
          Importar JSON
        </button>
        <button type="button" onClick={handleClear} className="secondary-button text-red-600">
          Borrar todo
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={handleImport}
        />
      </div>
      {message && <p className="mt-3 text-xs text-neutral-500">{message}</p>}
    </div>
  )
}
