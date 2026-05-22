import prisma from '../config/db.js';

export const CursadaService = {
  async crearCursada(data: { 
    cursoId: number, 
    materiaId: number, 
    horarios: { dia: string, horaInicio: string, horaFin: string }[] 
  }) {
    // Usamos $transaction para que se cree todo o nada
    return await prisma.$transaction(async tx => {
      // 1. Creamos la Cursada
      const cursada = await tx.cursada.create({
        data: {
          cursoId: data.cursoId,
          materiaId: data.materiaId
        }
      });

      if (data.horarios && data.horarios.length > 0) {
        await tx.horarioCursada.createMany({
          data: data.horarios.map(h => ({
            dia: h.dia,
            horaInicio: h.horaInicio,
            horaFin: h.horaFin,
            cursadaId: cursada.id
          }))
        });
      }

      return cursada;
    });
  },

  async obtenerDetalleParaGestion(cursadaId: number) {
    const detalle = await prisma.cursada.findUnique({
      where: { id: cursadaId },
      include: {
        materia: true,
        curso: {
          include: {
            alumnos: { orderBy: { apellido: 'asc' } }
          }
        },
        horarios: true,
        tps: { orderBy: { fechaEntrega: 'desc' } },
        evaluaciones: { orderBy: { fecha: 'desc' } }
      }
    });
    
    if (!detalle) throw new Error("Cursada no encontrada");
    return detalle;
  }

};