import type { NextFunction, Request, Response } from "express";
import { CursadaService } from "../services/cursada.service.js";

export const getCursadaId = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const colegioId = req.user?.colegioId;

    if (!colegioId)
      return res.status(401).json({ error: "No autorizado" });

    const id = Number(req.params.id);

    const cursada = await CursadaService.getCursadaId(id);

    if (!cursada)
      return res.status(404).json({ error: "Cursada no encontrada" });

    res.json(cursada);
  } catch (error) {
    next(error);
  }
};

export const createCursada = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const colegioId = req.user?.colegioId;

    if (!colegioId) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const { cursoId, materiaId, horarios } = req.body;

    if (!cursoId || !materiaId) {
      return res.status(400).json({
        error: "El curso y la materia son obligatorios.",
      });
    }

    if (horarios) {
        const horarioInvalido = horarios.some(
            (h: any) => !h.dia || !h.horaInicio || !h.horaFin
        );

        if (horarioInvalido) {
            return res.status(400).json({
                error: "Todos los horarios deben tener día, hora de inicio y hora de fin.",
            });
        }
    }

    const cursada = await CursadaService.createCursada({
      cursoId: Number(cursoId),
      materiaId: Number(materiaId),
      horarios: horarios ?? [],
    });

    res.status(201).json(cursada);
  } catch (error) {
    if (error instanceof Error && error.message === "La cursada ya existe.") {
      return res.status(409).json({
        error: error.message,
      });
    }

    next(error);
  }
};

export const deleteCursada = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const colegioId = req.user?.colegioId;

    if (!colegioId)
      return res.status(401).json({ error: "No autorizado" });

    const id = Number(req.params.id);

    const cursada = await CursadaService.getCursadaId(id);

    if (!cursada)
      return res.status(404).json({ error: "Cursada no encontrada" });

    await CursadaService.deleteCursada(id);

    res.json({
      message: "Cursada eliminada correctamente"
    });
  } catch (error) {
    next(error);
  }
};