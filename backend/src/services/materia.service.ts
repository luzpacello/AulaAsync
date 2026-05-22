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
  async getMaterias(colegioId: number) {
    const materias =  await prisma.materia.findMany({
      where: { colegioId },
      include: {
        cursadas: {
          include: {
            curso: {
              select: {
                id: true,
                anio: true,
                division: true
              }
            },
            horarios: true
          }
        } 
      },
      orderBy: {nombre: 'asc'}
    });

    return materias.map(materia => ({
      id: materia.id,
      nombre: materia.nombre,
      cursos: materia.cursadas.map(c => ({
        cursadaId: c.id,
        id: c.curso.id,
        nombre: `${c.curso.anio}° ${c.curso.division}`,
        horarios: c.horarios
      }))
    }));
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