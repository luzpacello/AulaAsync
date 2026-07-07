import prisma from '../config/db.js';

export const MateriaService = {
  async getMaterias(colegioId: number, search?: string) {
    return await prisma.materia.findMany({
      where: {
        colegioId,
        ...(search && {
          nombre: {
            contains: search,
            mode: "insensitive",
          },
        }),
      },
      include: {
        cursadas: {
          select: {
            id: true,
            curso: {
              select: {
                id: true,
                anio: true,
                division: true,
              },
            },
          },
          orderBy: [
            {
              curso: {
                anio: "asc",
              },
            },
          ],
        },
      },
      orderBy: {
        nombre: "asc",
      },
    });
  },

  async getMateriaID(id: number) {
    return await prisma.materia.findUnique({
      where: {id},
      include: {
        cursadas: {
          include: {
            curso: true,
          },
        },
      },
    });
  },

  async creatrMateria(data: {nombre:string; colegioId: number;}) {
    return await prisma.materia.create({data});
  },

  async updateMateria(id: number, datos: { nombre?: string;}) {
    return await prisma.materia.update({
      where: { id },
      data: datos,
    });
  }
};