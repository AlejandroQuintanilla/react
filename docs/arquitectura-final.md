# Arquitectura final — Práctica 4

## Introducción

Este documento explica cómo el uso de TypeScript ha reducido la posibilidad
de errores en tiempo de ejecución (runtime) en comparación a JavaScript estándar.

---

## 1. Genéricos (`<T>`)

El componente `DataTable<T>` acepta cualquier tipo de dato sin perder seguridad de tipos.

```ts
// El compilador sabe que `data` es Estudiante[], no `any`
<DataTable<Estudiante> data={estudiantes} columns={columnas} />
```

En JavaScript puro, pasarías un array sin ninguna garantía de qué propiedades
tiene cada objeto. Con TypeScript, si intentas acceder a una propiedad que no
existe en `Estudiante`, el compilador lo detecta antes de ejecutar el código.

---

## 2. Uniones Discriminadas (`EstadoMatricula`)

En lugar de un objeto con propiedades opcionales ambiguas:

```ts
// ❌ JavaScript: no sabes qué propiedades existen en cada estado
const estado = { tipo: "ACTIVA", notaMedia: 7.5 }; // notaMedia no tiene sentido aquí
```

Usamos una unión discriminada:

```ts
// ✅ TypeScript: cada estado tiene su propio contrato
type EstadoMatricula = MatriculaActiva | MatriculaSuspendida | MatriculaFinalizada;
```

El compilador estrecha el tipo automáticamente en cada rama del switch,
garantizando que solo accedemos a propiedades que existen en ese estado concreto.

---

## 3. Exhaustiveness checking con `never`

```ts
default: {
  const _exhaustive: never = estado;
  throw new Error(`Estado no manejado: ${JSON.stringify(_exhaustive)}`);
}
```

Si en el futuro añadimos un nuevo estado a la unión (por ejemplo `MatriculaCongelada`)
y olvidamos actualizar el switch, el compilador lanza un **error en tiempo de compilación**,
no en producción. En JavaScript este error pasaría desapercibido hasta que un usuario
lo encontrara en ejecución.

---

## 4. Tipos de utilidad

- `Partial<T>` — el estado de edición en `DataTable` usa `Partial<T>` porque
  el usuario puede no haber rellenado todos los campos aún.
- `readonly` — los IDs de las entidades son `readonly` para evitar mutaciones accidentales.
- `keyof T` — las columnas de `DataTable` usan `keyof T` para garantizar que
  solo se pueden referenciar propiedades que existen en el tipo `T`.

---

## 5. Librería externa con tipos: `date-fns`

`date-fns` incluye sus propias definiciones de tipos, por lo que el compilador
conoce la firma exacta de cada función:

```ts
import { differenceInDays, isValid } from "date-fns";

export function calcularDiferenciaEnDias(fechaInicio: Date, fechaFin: Date): number {
  return Math.abs(differenceInDays(fechaFin, fechaInicio));
}
```

Si pasáramos un `string` en lugar de un `Date`, el compilador lo detectaría
inmediatamente. En JavaScript este error solo aparecería en runtime.

---

## 6. Comparación con JavaScript estándar

| Situación | JavaScript | TypeScript |
|---|---|---|
| Propiedad inexistente en objeto | Error en runtime | Error en compilación |
| Nuevo estado no manejado en switch | Fallo silencioso | Error en compilación |
| Prop incorrecta en componente React | Error en runtime | Error en compilación |
| Función con tipo de retorno incorrecto | Sin aviso | Error en compilación |
| Librería externa sin tipos | Sin autocompletado | Tipos completos con `@types` |