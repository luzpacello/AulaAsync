import prisma from '../config/db.js';
import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
  try {
    const { perfil, password } = req.body;

    const colegio = await prisma.colegio.findFirst({
      where: { id: Number(perfil) },
      include: { usuario: true }
    });

    if (!colegio || !colegio.usuario) {
      return res.status(401).json({ error: "Perfil o contraseña incorrectos" });
    }

    const passwordValida = await bcrypt.compare(password, colegio.usuario.password);
    if(!passwordValida) {
      return res.status(401).json({ error: "Perfil o contraseña incorrectos"});
    }

    const token = jwt.sign(
      {
        id: colegio.usuario.id,
        colegioId: colegio.id,
        nombreColegio: colegio.nombreComodo
      },
      process.env.JWT_SECRET || 'clave_secreta_super_segura',
      { expiresIn: '24h'}
    );

    res.json({
      token,
      colegio: {id: colegio.id, nombre: colegio.nombreComodo}
    });

  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};