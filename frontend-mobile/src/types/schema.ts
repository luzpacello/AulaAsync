export enum TipoEvaluacion {
  ESCRITO = 'ESCRITO',
  ORAL = 'ORAL',
  GRUPAL = 'GRUPAL'
}

export enum EstadoTp {
  ENTREGADO = 'ENTREGADO',
  FUERA_TERMINO = 'FUERA_TERMINO',
  SIN_ENTREGAR = 'SIN_ENTREGAR'
}

export interface Usuario {
  id: number;
  nombre: string;
  createdAt: Date;
}

export interface Colegio {
  id: number;
  nombre: string;
  nombreComodo?: string | null;
  usuarioId: number;
}

export interface Curso {
  id: number;
  anio: number;
  division: string;
  orientacion?: string | null;
  ciclo?: string | null;
  colegioId: number;
}

export interface Materia {
  id: number;
  nombre: string;
  colegioId: number;
}

export interface Cursada {
  id: number;
  cursoId: number;
  materiaId: number;
}

export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  documento: string;
  cursoId: number;
}

export interface HorarioCursada {
  id: number;
  dia: string;
  horaInicio: string;
  horaFin: string;
  cursadaId: number;
}

export interface Clase {
  id: number;
  fecha: Date | string;
  tema?: string | null;
  actividades?: string | null;
  observaciones?: string | null;
  estado?: string | null;
  cursadaId: number;
}

export interface Evaluacion {
  id: number;
  fecha: Date | string;
  temas: string;
  tipo: TipoEvaluacion;
  cursadaId: number;
}

export interface Nota {
  id: number;
  calificacion: number;
  evaluacionId: number;
  alumnoId: number;
}

export interface Asistencia {
  id: number;
  fecha: Date | string;
  asistio: boolean;
  alumnoId: number;
  cursadaId: number;
}

export interface Tp {
  id: number;
  titulo: string;
  fechaEntrega: Date | string;
  estado: EstadoTp;
  cursadaId: number;
}

export interface Entrega {
  id: number;
  fechaEntrega: Date | string;
  nota?: number | null;
  observaciones?: string | null;
  tipoEntrega: string;
  tpId: number;
  alumnoId: number;
}

export interface Evento {
  id: number;
  titulo: string;
  tipo: string; 
  fecha: Date | string;
  colegioId: number;
}