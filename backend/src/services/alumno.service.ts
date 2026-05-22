import prisma from "../config/db.js"

export const AlumnoService = {
  async createAlumno(data: {nombre: string, apellido: string, documento: string, cursoId: number}) {
    return await prisma.alumno.create({ data });
  },

  async getAlumnoId(id: number) {
    return await prisma.alumno.findUnique({
        where: { id }
    });
  },

  async getAlumnos() {
    return await prisma.alumno.findMany({});
  },

  async getPorCurso(cursoId: number) {
    return await prisma.alumno.findMany({
      where: { cursoId },
      orderBy: { apellido: 'asc'}
    });
  },

  async updateAlumnos(id: number, datos: {nombre?: string, apellido?: string, documento?: string}) {
    return await prisma.alumno.update({
        where: { id },
        data: datos
    });
  },

  async deleteAlumnos(id: number) {
    return await prisma.alumno.delete({
        where: { id }
    });
  },
  // Para la "Ficha del Alumno" en la maqueta
  async obtenerDetalleAlumno(alumnoId: number) {
    return await prisma.alumno.findUnique({
      where: { id: alumnoId },
      include: {
        notas: {
          include: { evaluacion: true }
        },
        entregas: {
          include: { tp: true }
        },
        asistencias: true
      }
    });
  }
}