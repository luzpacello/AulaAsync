import prisma from '../config/db.js';

export const ClaseService = {
  async registrarClase(data: { fecha: string, tema: string, actividades?: string, observaciones?: string, cursadaId: number }) {
    return await prisma.clase.create({
      data: {
        fecha: new Date(data.fecha),
        tema: data.tema,
        actividades: data.actividades,
        observaciones: data.observaciones,
        estado: "DICTADA",
        cursadaId: data.cursadaId
      }
    });
  }
};