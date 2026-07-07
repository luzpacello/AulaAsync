import prisma from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const AuthService = {
  async login(perfil: number, password: string) {
    const colegio = await prisma.colegio.findFirst({
      where: { id: perfil },
      include: { 
        usuario: true
      }
    });

    if (!colegio || !colegio.usuario)
      throw new Error("Credenciales inválidas");

    const passwordValida = await bcrypt.compare(
      password,
      colegio.usuario.password
    );

    if (!passwordValida) 
      throw new Error("Credenciales inválidas");

    const token = jwt.sign(
      {
        id: colegio.usuario.id,
        colegioId: colegio.id,
        nombre: colegio.nombreComodo
      },
      process.env.JWT_SECRET || "clave_secreta_super_segura",
      {
        expiresIn: "24h"
      }
    );

    return {
      token,
      colegio: {
        id: colegio.id,
        nombre: colegio.nombreComodo
      }
    };
  }
};