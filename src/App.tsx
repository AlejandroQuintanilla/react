import { DataTable } from "./components/DataTable";
import { calcularDiferenciaEnDias, formatearFechaES } from "./utils/dateUtils";
import { generarReporte } from "./types/universidad";
import type { Estudiante, EstadoMatricula } from "./types/universidad";

const estudiantes: Estudiante[] = [
  { id: "USR-001", nombre: "Laura", apellidos: "Martínez García", email: "laura@uni.es", curso: 2 },
  { id: "USR-002", nombre: "Carlos", apellidos: "Romero Pérez", email: "carlos@uni.es", curso: 3 },
  { id: "USR-003", nombre: "Ana", apellidos: "López Sánchez", email: "ana@uni.es", curso: 1 },
];

const columnas = [
  { key: "id" as const, label: "ID" },
  { key: "nombre" as const, label: "Nombre" },
  { key: "apellidos" as const, label: "Apellidos" },
  { key: "email" as const, label: "Email" },
  { key: "curso" as const, label: "Curso" },
];

const estados: EstadoMatricula[] = [
  { tipo: "ACTIVA", fechaInicio: new Date("2024-09-10"), asignaturas: [] },
  { tipo: "SUSPENDIDA", motivoSuspension: "Impago de tasas", fechaSuspension: new Date("2024-11-01") },
  { tipo: "FINALIZADA", notaMedia: 7.85, fechaFinalizacion: new Date("2024-06-28"), titulacionObtenida: "Grado en Informática" },
];

const fechaMatricula = new Date("2024-09-10");

function App() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Sistema de Gestión Universitaria</h1>

      <h2>Tabla de estudiantes (DataTable&lt;Estudiante&gt;)</h2>
      <DataTable data={estudiantes} columns={columnas} />

      <h2 style={{ marginTop: "2rem" }}>Reportes de matrícula</h2>
      <ul>
        {estados.map((e, i) => (
          <li key={i}>{generarReporte(e)}</li>
        ))}
      </ul>

      <h2 style={{ marginTop: "2rem" }}>Utilidad de fechas (date-fns)</h2>
      <p>
        Días desde el inicio de matrícula ({formatearFechaES(fechaMatricula)}):
        <strong> {calcularDiferenciaEnDias(fechaMatricula)} días</strong>
      </p>
    </div>
  );
}

export default App;