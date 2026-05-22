import prisma from '../config/db.js';

export const AsistenciaService = {
  async registrarPlanilla(cursadaId: number, fecha: string, registros: { alumnoId: number, asistio: boolean }[]) {
    // Usamos una transacción para asegurar que se guarde toda la lista o nada
    return await prisma.$transaction(
      registros.map((r) =>
        prisma.asistencia.upsert({
          where: {
            alumnoId_cursadaId_fecha: {
              alumnoId: r.alumnoId,
              cursadaId: cursadaId,
              fecha: new Date(fecha),
            },
          },
          update: { asistio: r.asistio },
          create: {
            alumnoId: r.alumnoId,
            cursadaId: cursadaId,
            fecha: new Date(fecha),
            asistio: r.asistio,
          },
        })
      )
    );
  }
};