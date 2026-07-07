import type { NextFunction, Request, Response } from "express";
import { NotaService } from "../services/nota.service.js";

export const getNotas = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const evaluacionId = Number(req.params.evaluacionId);

    if (isNaN(evaluacionId)) {
      return res.status(400).json({
        error: "ID de evaluación inválido"
      });
    }

    const notas = await NotaService.getNotas(evaluacionId);

    if (!notas) {
      return res.status(404).json({
        error: "Evaluación no encontrada"
      });
    }

    res.json(notas);

  } catch (error) {
    next(error);
  }
};

export const guardarNota = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const evaluacionId = Number(req.params.evaluacionId);

    if (isNaN(evaluacionId)) {
      return res.status(400).json({
        error: "ID de evaluación inválido"
      });
    }

    const { alumnoId, calificacion } = req.body;

    if (
      !alumnoId ||
      calificacion === undefined ||
      calificacion === null
    ) {
      return res.status(400).json({
        error: "Alumno y calificación son obligatorios"
      });
    }

    const nota = await NotaService.guardarNota(
      evaluacionId,
      {
        alumnoId: Number(alumnoId),
        calificacion: Number(calificacion)
      }
    );

    res.status(201).json(nota);

  } catch (error) {
    next(error);
  }
};
