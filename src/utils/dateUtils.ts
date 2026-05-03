import { differenceInDays, isValid } from "date-fns";

export function calcularDiferenciaEnDias(
  fechaInicio: Date,
  fechaFin: Date = new Date()
): number {
  if (!isValid(fechaInicio)) throw new Error("Fecha de inicio no válida");
  if (!isValid(fechaFin)) throw new Error("Fecha de fin no válida");
  return Math.abs(differenceInDays(fechaFin, fechaInicio));
}

export function formatearFechaES(fecha: Date): string {
  if (!isValid(fecha)) return "Fecha inválida";
  return fecha.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}