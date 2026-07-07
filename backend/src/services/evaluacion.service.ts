import type { TipoEvaluacion } from '@prisma/client';
import prisma from '../config/db.js';

type EvaluacionData = {
  fecha: Date;
  temas: string;
  tipo: TipoEvaluacion;
};

export const EvaluacionService = {
  async getEvaluaciones(cursadaId: number) {
    return prisma.evaluacion.findMany({
      where: { cursadaId },
      select: {
        id: true,
        fecha: true,
        temas: true,
        tipo: true
      },
      orderBy: { fecha: "desc" }
    });
  },

  async getEvaluacion(id: number) {
    return prisma.evaluacion.findMany({
      where: { id },
      select: {
        id: true,
        fecha: true,
        temas: true,
        tipo: true,
        cursadaId: true,
      }
    });
  },

  async createEvaluacion( cursadaId: number, data: EvaluacionData ){
    return prisma.evaluacion.create({
      data: {
        ...data,
        cursadaId
      }
    });
  },

  async updateEvaluacion( id: number, data: Partial<EvaluacionData> ){
    return prisma.evaluacion.update({
      where: { id },
      data
    });
  },

  async deleteEvaluacion( id: number ){
    return prisma.evaluacion.delete({
      where: { id }
    });
  },
};