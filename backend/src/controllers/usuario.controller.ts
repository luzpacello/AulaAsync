import type { Request, Response } from 'express';
import { UsuarioService } from '../services/usuario.service.js';

export const registrarUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre, password } = req.body;

    // Validación básica (luego usaremos Zod para esto)
    if (!nombre || !password) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const nuevoUsuario = await UsuarioService.crearUsuario(nombre, password);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};