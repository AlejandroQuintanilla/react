export interface Asignatura {
    readonly id: string;
    nombre: string;
    creditos: number;
    departamento: string;
    profesor: string;
  }
  
  export interface Estudiante {
    readonly id: string;
    nombre: string;
    apellidos: string;
    email: string;
    curso: number;
  }
  
  export interface MatriculaActiva {
    tipo: "ACTIVA";
    asignaturas: Asignatura[];
    fechaInicio: Date;
  }
  
  export interface MatriculaSuspendida {
    tipo: "SUSPENDIDA";
    motivoSuspension: string;
    fechaSuspension: Date;
  }
  
  export interface MatriculaFinalizada {
    tipo: "FINALIZADA";
    notaMedia: number;
    fechaFinalizacion: Date;
    titulacionObtenida: string;
  }
  
  export type EstadoMatricula = MatriculaActiva | MatriculaSuspendida | MatriculaFinalizada;
  
  export function generarReporte(estado: EstadoMatricula): string {
    switch (estado.tipo) {
      case "ACTIVA":
        return `Matrícula activa con ${estado.asignaturas.length} asignatura(s).`;
      case "SUSPENDIDA":
        return `Matrícula suspendida. Motivo: ${estado.motivoSuspension}.`;
      case "FINALIZADA":
        return `Matrícula finalizada. Nota media: ${estado.notaMedia.toFixed(2)}.`;
      default: {
        const _exhaustive: never = estado;
        throw new Error(`Estado no manejado: ${JSON.stringify(_exhaustive)}`);
      }
    }
  }