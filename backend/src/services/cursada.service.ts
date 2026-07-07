import prisma from '../config/db.js';
import type { $Enums } from '@prisma/client';

export const CursadaService = {
  async createCursada(data: {
    cursoId: number;
    materiaId: number;
    horarios: {
      dia: $Enums.DiaSemana;
      horaInicio: string;
      horaFin: string;
    }[];
  }) {
    return await prisma.$transaction(async (tx) => {
      const existente = await tx.cursada.findUnique({
        where: {
          cursoId_materiaId: {
            cursoId: data.cursoId,
            materiaId: data.materiaId,
          },
        },
      });
      if (existente) {
        throw new Error("La cursada ya existe.");
      }

      const cursada = await tx.cursada.create({
        data: {
          cursoId: data.cursoId,
          materiaId: data.materiaId,
        },
      });

      if (data.horarios.length > 0) {
        await tx.horarioCursada.createMany({
          data: data.horarios.map((h) => ({
            dia: h.dia,
            horaInicio: h.horaInicio,
            horaFin: h.horaFin,
            cursadaId: cursada.id,
          })),
        });
      }

      return await tx.cursada.findUnique({
        where: {
          id: cursada.id,
        },
        include: {
          materia: true,
          curso: {
            select: {
              id: true,
              anio: true,
              division: true,
              orientacion: true,
              ciclo: true,
            },
          },
          horarios: {
            orderBy: [
              { dia: "asc" },
              { horaInicio: "asc" },
            ],
          },
        },
      });
    });
  },

  async getCursadaId(id: number) {
    return await prisma.cursada.findUnique({
      where: { id },
      include: {
        materia:true,
        curso: {
          select: {
            id: true,
            anio: true,
            division: true,
            orientacion: true,
            ciclo: true,
            _count: {
              select: {
                alumnos: true
              }
            }
          }
        },
        horarios: {
          orderBy: [
            { dia: "asc" },
            { horaInicio: "asc" }
          ]
        }
      }
    });
  },

  async existeCursada(cursoId: number, materiaId: number) {
    return await prisma.cursada.findUnique({
      where: {
        cursoId_materiaId: {
          cursoId,
          materiaId
        }
      }
    });
  },

  async deleteCursada(id: number) {
    return await prisma.cursada.delete({
      where: {
        id
      }
    });
  }
};