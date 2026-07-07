import prisma from "../config/db.js";

type NotaData = {
  alumnoId: number;
  calificacion: number;
};

export const NotaService = {
  async getNotas(evaluacionId: number) {
    const evaluacion = await prisma.evaluacion.findUnique({
      where: { id: evaluacionId },
      select: {
        cursada: {
          select: {
            cursoId: true
          }
        }
      }
    });

    if (!evaluacion) {
      return null;
    }

    const alumnos = await prisma.alumno.findMany({
      where: {
        cursoId: evaluacion.cursada.cursoId
      },
      orderBy: [
        { apellido: "asc" },
        { nombre: "asc" }
      ]
    });

    const notas = await prisma.nota.findMany({
      where: {
        evaluacionId
      }
    });

    return alumnos.map(alumno => {
      const nota = notas.find(
        n => n.alumnoId === alumno.id
      );

      return {
        alumnoId: alumno.id,
        apellido: alumno.apellido,
        nombre: alumno.nombre,
        calificacion: nota?.calificacion ?? null
      };
    });
  },

  async guardarNota(
    evaluacionId: number,
    data: NotaData
  ) {
    return prisma.nota.upsert({
      where: {
        evaluacionId_alumnoId: {
          evaluacionId,
          alumnoId: data.alumnoId
        }
      },
      update: {
        calificacion: data.calificacion
      },
      create: {
        evaluacionId,
        alumnoId: data.alumnoId,
        calificacion: data.calificacion
      }
    });
  }
};