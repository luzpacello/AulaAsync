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

    if (error instanceof Error &&
        error.message === "Credenciales inválidas") {
      return res.status(401).json({
        error: "Perfil o contraseña incorrectos"
      });
    }

    return res.status(500).json({
      error: "Error en el servidor"
    });
  }
};