import prisma from '../config/db.js';

export const AsistenciaService = {
  async getAsistencias(cursadaId: number, fecha: Date) {
    const cursada = await prisma.cursada.findUnique({
      where: { id: cursadaId },
      select: {
        cursoId: true
      }
    });

    if (!cursada)
      return null;

    const alumnos = await prisma.alumno.findMany({
      where: {
        cursoId: cursada.cursoId
      },
      orderBy: [
        { apellido: "asc" },
        { nombre: "asc" }
      ]
    });

    const asistencias = await prisma.asistencia.findMany({
      where: {
        cursadaId,
        fecha
      }
    });

    return alumnos.map(alumno => {
      const asistencia = asistencias.find(
        a => a.alumnoId === alumno.id
      );

      return {
        alumnoId: alumno.id,
        apellido: alumno.apellido,
        nombre: alumno.nombre,
        asistio: asistencia?.asistio ?? null
      };
    });
  },

  async guardarAsistencias(cursadaId: number, fecha: string, asistencias: { alumnoId: number, asistio: boolean }[]) {
    return await prisma.$transaction(
      asistencias.map((a) =>
        prisma.asistencia.upsert({
          where: {
            alumnoId_cursadaId_fecha: {
              alumnoId: a.alumnoId,
              cursadaId,
              fecha: new Date(fecha),
            },
          },
          update: { asistio: a.asistio },
          create: {
            alumnoId: a.alumnoId,
            cursadaId,
            fecha: new Date(fecha),
            asistio: a.asistio,
          },
        })
      )
    );
  }
};