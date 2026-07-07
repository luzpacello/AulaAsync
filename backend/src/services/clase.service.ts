import prisma from '../config/db.js';

type ClaseData = {
  fecha: Date;
  tema?: string;
  actividades?: string;
  observaciones?: string;
};

export const ClaseService = {
  async getClases(cursadaId: number) {
    return prisma.clase.findMany({
      where: { cursadaId },
      select: {
        id: true,
        fecha: true,
        tema: true,
        actividades: true,
        observaciones: true
      },
      orderBy: {
        fecha: "desc"
      }
    });
  },

  async getClase(id: number) {
    return prisma.clase.findUnique({
      where: { id },
        select: {
        id: true,
        fecha: true,
        tema: true,
        actividades: true,
        observaciones: true,
        cursadaId: true
      }
    });
  },

  async createClase( cursadaId: number, data: ClaseData ) {
    return prisma.clase.create({
      data: {
        ...data,
        cursadaId
      }
    });
  },

  async updateClase( id: number, data: Partial<ClaseData> ) {
    return prisma.clase.update({
      where: { id },
      data
    });
  },

  async deleteClase(id: number) {
    return prisma.clase.delete({
      where: { id }
    });
  }
};