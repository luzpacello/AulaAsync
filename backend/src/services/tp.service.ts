import prisma from '../config/db.js';

type TpData = {
  titulo: string;
  fechaEntrega: Date;
};

export const TpService = {
  async getTps(cursadaId: number) {
    return prisma.tp.findMany({
      where: { cursadaId },
      select: {
        id: true,
        titulo: true,
        fechaEntrega: true,
      },
      orderBy: { fechaEntrega: "desc" }
    });
  },

  async getTp(id: number) {
    return prisma.tp.findMany({
      where: { id },
      select: {
        id: true,
        titulo: true,
        fechaEntrega: true,
        cursadaId: true,
      }
    });
  },

  async createTp( cursadaId: number, data: TpData ){
    return prisma.tp.create({
      data: {
        ...data,
        cursadaId
      }
    });
  },

  async updateTp( id: number, data: Partial<TpData> ){
    return prisma.tp.update({
      where: { id },
      data
    });
  },

  async deleteTp( id: number ){
    return prisma.tp.delete({
      where: { id }
    });
  },
};