import prisma from "../config/db.js"

export const AlumnoService = {
  async createAlumno(data: {nombre: string, apellido: string, documento: string, cursoId: number}) {
    return await prisma.alumno.create({ data });
  },

  async getAlumnos(colegioId: number, search?: string) {
    return await prisma.alumno.findMany({
      where: {
        curso: {
          colegioId: colegioId
        },
        ...(search && {
          OR: [
            { apellido: { contains: search, mode: 'insensitive' } },
            { nombre: { contains: search, mode: 'insensitive' } },
            { documento: { contains: search, mode: 'insensitive' } }
          ]
        })
      },
      include: {
        curso: {
          select: {
            anio: true,
            division: true
          }
        }
      },
      orderBy: [
        { apellido: 'asc' },
        { nombre: 'asc' }
      ]
    });
  },

  async getAlumnoId(id: number) {
    return await prisma.alumno.findUnique({
      where: { id },
      include: {
        curso: true 
      }
    });
  },

  async getPorCurso(cursoId: number) {
    return await prisma.alumno.findMany({
      where: { cursoId },
      orderBy: { apellido: 'asc'}
    });
  },

  async updateAlumno(id: number, datos: { nombre?: string, apellido?: string, documento?: string, cursoId?: number }) {
    return await prisma.alumno.update({
      where: { id },
      data: datos
    });
  },

  async deleteAlumno(id: number) {
    return await prisma.alumno.delete({
      where: { id }
    });
  },

  async obtenerDetalleAlumno(alumnoId: number) {
    return await prisma.alumno.findUnique({
      where: { id: alumnoId },
      include: {
        curso: {
          include: {
            cursadas: {
              include: {
                materia: true,
                evaluaciones: {
                  include: {
                    notas: {
                      where: {
                        alumnoId
                      }
                    }
                  }
                },
                tps: {
                  include: {
                    entregas: {
                      where: {
                        alumnoId
                      }
                    }
                  }
                },
                asistencias: {
                  where: {
                    alumnoId
                  }
                }
              }
            }
          }
        }
      }
    });
  }
}