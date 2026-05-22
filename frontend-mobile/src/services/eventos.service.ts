// src/services/eventos.service.ts
import { Evento } from "../types/schema";

const MOCK_EVENTOS: Evento[] = [
  {
    id: 1,
    titulo: "Entrega de Proyecto Software II",
    tipo: "ENTREGA",
    fecha: new Date(),
    colegioId: 1,
  },
  {
    id: 2,
    titulo: "Reunión de Personal Docente",
    tipo: "REUNION",
    fecha: new Date(),
    colegioId: 1,
  },
  {
    id: 3,
    titulo: "Evaluación Escrita - Turno Noche",
    tipo: "EVALUACION",
    fecha: new Date(),
    colegioId: 2,
  }
];

export const obtenerEventos = (): Promise<Evento[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_EVENTOS);
    }, 1000); // 1 segundo de retraso
  });
};