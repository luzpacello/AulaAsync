import prisma from '../config/db.js';

export const MateriaService = {

  // Crear
  async createMateria(data: {nombre: string, colegioId: number}) {
    return await prisma.materia.create({ data });
  },

  // Leer una por ID
  async getMateriaId(id: number) {
    return await prisma.materia.findUnique({
      where: { id }
    });
  },

  // Leer todas
  async getMaterias() {
    return await prisma.materia.findMany({
      include: { colegio: true }
    });
  },

  // Actualizar
  async update(id: number, nuevoNombre: string) {
    return await prisma.materia.update({
      where: { id },
      data: { nombre: nuevoNombre }
    });
  },

  // Eliminar
  async delete(id: number) {
    return await prisma.materia.delete({ 
      where: { id }
    });
  }
};