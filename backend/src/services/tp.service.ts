import prisma from '../config/db.js';

export const TpService = {
  // Crear el TP
  async crearTp(data: { titulo: string, fechaEntrega: string, cursadaId: number }) {
    return await prisma.tp.create({
      data: {
        titulo: data.titulo,
        fechaEntrega: new Date(data.fechaEntrega),
        estado: 'SIN_ENTREGAR', // Estado inicial
        cursadaId: data.cursadaId
      }
    });
  },

  // Registrar entrega de un alumno
  async registrarEntrega(data: { tpId: number, alumnoId: number, nota?: number, observaciones?: string, tipo: string }) {
    return await prisma.entrega.upsert({
      where: {
        tpId_alumnoId: {
          tpId: data.tpId,
          alumnoId: data.alumnoId
        }
      },
      update: {
        nota: data.nota,
        observaciones: data.observaciones,
        fechaEntrega: new Date()
      },
      create: {
        tpId: data.tpId,
        alumnoId: data.alumnoId,
        nota: data.nota,
        observaciones: data.observaciones,
        fechaEntrega: new Date(),
        tipoEntrega: data.tipo
      }
    });
  }
};