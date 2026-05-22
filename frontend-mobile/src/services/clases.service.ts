// src/services/clases.service.ts
import { Clase } from "../types/schema"; // Ajustá la ruta según dónde creaste el archivo de tipos

// Datos falsos basados en tu modelo Prisma
const MOCK_CLASES: Clase[] = [
  {
    id: 1,
    fecha: new Date(),
    tema: "React Native Hooks & State",
    actividades: "Maquetado de HomeScreen y mocks",
    observaciones: "Alumnos participativos",
    estado: "DICTA",
    cursadaId: 101, // Perteneciente a Cursada (Curso 1 + Materia X)
  },
  {
    id: 2,
    fecha: new Date(),
    tema: "Modelado Entidad Relación & Prisma",
    actividades: "Análisis de relaciones jerárquicas",
    observaciones: "Traer entrega lista",
    estado: "PENDIENTE",
    cursadaId: 102,
  },
];

export const obtenerClases = (): Promise<Clase[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CLASES);
    }, 800); // Retraso de 800ms para simular la API
  });
};