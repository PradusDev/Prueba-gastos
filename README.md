# Control de gastos

Registro minimalista de gastos **diarios, semanales y mensuales** en **pesos colombianos (COP)**.
No usa base de datos ni servidor: todo vive en el `localStorage` del navegador.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS
- Recharts (gráficas) y date-fns (fechas, locale `es`)
- Persistencia en `localStorage` con export/import en JSON

## Funcionalidades

- Registro rápido de gastos: monto (con separador de miles), categoría, fecha y nota.
- Vistas Diario / Semanal / Mensual con navegación entre periodos.
- Totales, comparación con el periodo anterior, promedio diario y número de movimientos.
- Gráfica de gasto por día y desglose por categoría.
- Respaldo: exportar e importar JSON, y borrar todos los datos.
- Formato de moneda con `Intl.NumberFormat('es-CO')` → `$ 1.234.567`.

## Desarrollo

Requiere Node.js 20.19+ o 22.12+ (ver `.nvmrc`).

```bash
npm install
npm run dev      # servidor local
npm run lint     # oxlint
npm run build    # typecheck + build de producción
npm run preview  # servir el build
```

## Despliegue

El build es estático (`dist/`), así que funciona en Vercel, Netlify, Cloudflare Pages o GitHub Pages
sin configuración adicional.

## Notas sobre los datos

Los gastos se guardan solo en el navegador donde se registran; no se sincronizan entre dispositivos
y se pierden si se borran los datos del sitio. Usa **Exportar JSON** para tener un respaldo.
