import { Materia, Cursada, Curso, HorarioCursada } from "../types/schema"; 

export interface HorarioDetalle {
  dia: string;
  inicio: string;
  fin: string;
}

export interface CursadaDetalle {
  id: number;
  cursoLabel: string; 
  horarios: HorarioDetalle[];
}

export interface MateriaConCursadas {
  id: number;
  nombre: string;
  cursadas: CursadaDetalle[];
}

const MOCK_MATERIAS: Materia[] = [
  { id: 1, nombre: 'Software Engineering II', colegioId: 10 },
  { id: 2, nombre: 'Programación Web Frontend', colegioId: 10 },
  { id: 3, nombre: 'Base de Datos I', colegioId: 10 },
];

const MOCK_CURSOS: Curso[] = [
  { id: 101, anio: 4, division: 'A', orientacion: 'Computación', colegioId: 10 },
  { id: 102, anio: 5, division: 'B', orientacion: 'Informatica', colegioId: 10 },
];

const MOCK_CURSADAS: Cursada[] = [
  { id: 1, cursoId: 101, materiaId: 1 },
  { id: 2, cursoId: 102, materiaId: 1 },
  { id: 3, cursoId: 101, materiaId: 2 },
];

const MOCK_HORARIOS: HorarioCursada[] = [
  { id: 1, dia: 'Lunes', horaInicio: '18:30', horaFin: '22:30', cursadaId: 1 },
  { id: 2, dia: 'Miércoles', horaInicio: '18:30', horaFin: '20:30', cursadaId: 1 },
  { id: 3, dia: 'Martes', horaInicio: '08:00', horaFin: '12:00', cursadaId: 2 },
  { id: 4, dia: 'Jueves', horaInicio: '19:00', horaFin: '22:00', cursadaId: 3 },
];

export const obtenerMateriasConDetalle = (): Promise<MateriaConCursadas[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const resultado: MateriaConCursadas[] = MOCK_MATERIAS.map((materia) => {
        const cursadasFiltradas = MOCK_CURSADAS.filter(c => c.materiaId === materia.id);

        const cursadasDetalle: CursadaDetalle[] = cursadasFiltradas.map((cursada) => {
          const curso = MOCK_CURSOS.find(cu => cu.id === cursada.cursoId);
          const horariosCursada = MOCK_HORARIOS.filter(h => h.cursadaId === cursada.id);

          return {
            id: cursada.id, 
            cursoLabel: curso ? `${curso.anio}° ${curso.division} - ${curso.orientacion || ''}` : `Curso ${cursada.cursoId}`,
            horarios: horariosCursada.map(h => ({
              dia: h.dia,
              inicio: h.horaInicio,
              fin: h.horaFin
            }))
          };
        });

        return {
          id: materia.id,
          nombre: materia.nombre,
          cursadas: cursadasDetalle
        };
      });

      resolve(resultado);
    }, 600);
  });
};