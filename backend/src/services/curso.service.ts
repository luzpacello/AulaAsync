import prisma from "../config/db.js"

export const CursoService = {
  async getCursos(colegioId: number, search?: string){
    return await prisma.curso.findMany({
        where: {
          colegioId,
          ...(search && {
            OR: [
              {
                division: {
                  contains: search,
                  mode: 'insensitive'
                }
              },
              {
                orientacion: {
                  contains: search,
                  mode: 'insensitive'
                }
              }
            ]
          })
        },
        select: {
          id: true,
          anio: true,
          division: true,
          ciclo: true,
          orientacion: true
        },
        orderBy: [
          { anio: 'asc' },
          { division: 'asc' }
        ]
    });
  },

  async createCurso(data: {anio: number, division: string, orientacion: string, ciclo: string, colegioId: number}) {
    return await prisma.curso.create({ data });
  },

  async getCursoId(id: number){
    return await prisma.curso.findUnique({
        where: { id },
        include: {
          cursadas: {
            include: {
              materia: {
                select: {
                  id: true,
                  nombre: true
                }
              }

            }
          },

          alumnos: {
            select: {
              id: true,
              nombre: true,
              apellido: true,
              documento: true
            },
            orderBy: { apellido: 'asc'}
          }
        }
    });
  },

  

  async updateCurso(id: number, datos: {anio?: number, division?: string, orientacion?: string, ciclo?: string}) {
    return await prisma.curso.update({
        where: {id},
        data: datos
    });
  },

  async deteleCurso(id:number){
    return await prisma.curso.delete({
        where: {id}
    });
  }
};