import prisma from "../config/db.js"

export const AlumnoService = {
    /*crear(...): Recibe un objeto con los datos.

  obtenerPorId(...): Busca un registro único.

  listarPorPadre(...): (Ej: listar alumnos de un curso) Usa el where de Prisma.

  actualizar(...): Recibe ID y los campos a cambiar.

  eliminar(...): Borra por ID. */
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
  }
}