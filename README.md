# React — Módulo 3

Proyecto desarrollado con Vite + React + TypeScript como parte de la Práctica 4.

## Tecnologías

- React 18
- TypeScript 5 (modo strict)
- Vite
- date-fns

## Estructura

src/
  components/
    DataTable.tsx       # Componente genérico DataTable<T>
  types/
    universidad.ts      # Interfaces, unión discriminada y generarReporte()
  utils/
    dateUtils.ts        # Utilidad de fechas con date-fns
  App.tsx               # Componente principal
docs/
  arquitectura-final.md # Documentación de decisiones arquitectónicas

## Instalación y ejecución

npm install
npm run dev

## Verificación de tipos

npx tsc --noEmit

Sin errores de tipado.

## Conceptos aplicados

- Componente genérico DataTable<T> con keyof T para las columnas
- Estado de edición con Partial<T>
- Unión discriminada EstadoMatricula con exhaustiveness checking usando never
- Librería externa date-fns con tipos integrados