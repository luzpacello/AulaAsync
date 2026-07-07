import type { Colegio } from "@prisma/client";
import prisma from "../config/db.js";

export const ColegioService = {
  // Crear colegio
  async createColegio(data: {
    nombre: string;
    nombreComodo?: string;
    usuarioId: number;
  }) {
    return prisma.colegio.create({
      data,
    });
  },

  // Obtener usuario administrador
  async getAdministrador() {
    return prisma.usuario.findFirst();
  },

  // Saber si ya existe algún colegio
  async existeColegio() {
    const cantidad = await prisma.colegio.count();
    return cantidad > 0;
  },

  // Obtener colegio por id
  async getColegioId(id: number) {
    return prisma.colegio.findUnique({
      where: { id },
      include: {
        cursos: true,
        materias: true,
      },
    });
  },

  // Listado de colegios
  async getColegios() {
    return prisma.colegio.findMany({
      select: {
        id: true,
        nombreComodo: true,
      },
    });
  },

  // Actualizar
  async updateColegio(id: number, datos: Partial<Colegio>) {
    try {
      return prisma.colegio.update({
        where: { id },
        data: datos,
      });
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new Error(`El colegio con ID ${id} no existe.`);
      }
      throw error;
    }
  },

  // Eliminar (solo desarrollo)
  async deleteColegio(id: number) {
    return prisma.colegio.delete({
      where: { id },
    });
  },
};