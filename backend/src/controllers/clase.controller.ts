import { Request, Response } from 'express';
import { ClaseService } from '../services/clase.service.js';

export const guardarClase = async (req: Request, res: Response) => {
  try {
    const { cursadaId } = req.params;
    const clase = await ClaseService.registrarClase({
      ...req.body,
      cursadaId: Number(cursadaId)
    });
    res.status(201).json(clase);
  } catch (error) {
    res.status(500).json({ error: "Error al guardar registro de clase" });
  }
};