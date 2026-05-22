import type { Colegio } from "@prisma/client";
import prisma from "../config/db.js";

export const ColegioService = {
    //solamente el metodo de eliminacion no se utilizará en produccion

    //creacion de Colegios
    async createColegio(data: {nombre: string, nombreComodo: string, usuarioId: number}) {
        return await prisma.colegio.create({ data });
    },

    //obtener colegio con id para perfil que se visualizará
    async getColegioId(id: number) {
        return await prisma.colegio.findUnique({
            where: { id },
            include: { cursos: true, materias: true }
        });
    },

    // obtener todos los colegios
    async getColegios() {
        return await prisma.colegio.findMany({
            select: {id: true, nombreComodo: true}
        });
    },

    // update colegios
    async updateColegio(id: number, datos: Partial<Colegio>) {
        try {
            return await prisma.colegio.update({
                where: { id },
                data: datos,
            });
        } catch (error: any) {
            if (error.code === 'P2025') {
                throw new Error(`El colegio con ID ${id} no existe.`);
            }
            throw error;
        }
    },

    async deleteColegio(id: number) {
        return await prisma.colegio.delete({
            where: { id }
        });
    }

};