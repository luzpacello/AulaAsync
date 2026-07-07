import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

export const login = async (req: Request, res: Response) => {
  try {
    const { perfil, password } = req.body;

    if (!perfil || !password) 
      return res.status(400).json({ error: "Perfil y contraseña son obligatorios." });

    const resultado = await AuthService.login(
      Number(perfil),
      password
    );

    res.json(resultado);

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      error: error instanceof Error ? error.message : "Error desconocido"
    });
  }
};