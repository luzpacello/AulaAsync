import { EstadoTp } from "@prisma/client";
import prisma from "../config/db.js";

type EntregaData = {
    alumnoId: number;
    nota: number;
    observaciones?: string;
};

export const EntregaService = {
    async getEntregas(tpId: number) {
        const tp = await prisma.tp.findUnique({
            where: { id: tpId },
            select: {
                cursada: {
                    select: {
                        cursoId: true
                    }
                }
            }
        });

        if (!tp) {
            return null;
        }

        const alumnos = await prisma.alumno.findMany({
            where: { cursoId: tp.cursada.cursoId },
            orderBy: [
                { apellido: "asc" },
                { nombre: "asc" }
            ]
        });

        const entregas = await prisma.entrega.findMany({
                where: { tpId }
        });

        return alumnos.map(alumno => {
            const entrega = entregas.find(
                e => e.alumnoId === alumno.id
            );

            return {
                alumnoId: alumno.id,
                apellido: alumno.apellido,
                nombre: alumno.nombre,
                tipoEntrega: entrega?.tipoEntrega ?? EstadoTp.SIN_ENTREGAR,
                nota: entrega?.nota ?? null,
                observaciones: entrega?.observaciones ?? null
            };
        });
    },

    async guardarEntrega(tpId: number, data: EntregaData) {
        const tp = await prisma.tp.findUnique({
            where: { id: tpId },
            select: {
                fechaEntrega: true
            }
        });

        if (!tp)
            throw new Error("TP no encontrado");
        
        const hoy = new Date();

        const tipoEntrega =
            hoy <= tp.fechaEntrega
                ? EstadoTp.ENTREGADO
                : EstadoTp.FUERA_TERMINO;

        return prisma.entrega.upsert({
            where: {
                tpId_alumnoId: {
                    tpId,
                    alumnoId: data.alumnoId
                }
            },
            update: {
                fechaEntrega: hoy,
                tipoEntrega,
                ...(data.nota !== undefined && {
                    nota: data.nota
                }),
                ...(data.observaciones !== undefined && {
                    observaciones: data.observaciones
                })
            },
            create: {
                tpId,
                alumnoId: data.alumnoId,
                fechaEntrega: hoy,
                tipoEntrega,
                ...(data.nota !== undefined && {
                    nota: data.nota
                }),
                ...(data.observaciones !== undefined && {
                    observaciones: data.observaciones
                })
            }
        });
    }
};