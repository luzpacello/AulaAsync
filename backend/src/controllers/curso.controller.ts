import type { NextFunction, Request, Response } from "express";
import { CursoService } from "../services/curso.service.js";


export const getCursos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const colegioId = req.user?.colegioId;
        const { search } = req.query;

        if (!colegioId) {
            return res.status(401).json({ error: "No autorizado" });
        }

        const cursos = await CursoService.getCursos(colegioId, search as string);
        res.json(cursos);
    } catch (error) {
        next(error);
    }
};

export const getCursoId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const colegioId = req.user?.colegioId;
        const id = parseInt(req.params.id as string);

        if (!colegioId) {
            return res.status(401).json({ error: "No autorizado" });
        }

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID de curso inválido" });
        }

        const curso = await CursoService.getCursoId(id);

        if (!curso || curso.colegioId !== colegioId) {
            return res.status(404).json({ error: "Curso no encontrado" });
        }

        res.json(curso);
    } catch (error) {
        next(error);
    }
};

export const createCurso = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const colegioId = req.user?.colegioId;
        const { anio, division, orientacion, ciclo } = req.body;

        if (!colegioId) {
            return res.status(401).json({ error: "No autorizado" });
        }

        if (!anio || !division) {
            return res.status(400).json({ error: "El año y la división son campos obligatorios" });
        }

        const nuevoCurso = await CursoService.createCurso({
            anio: Number(anio),
            division,
            orientacion,
            ciclo,
            colegioId
        });

        res.status(201).json(nuevoCurso);
    } catch (error) {
        next(error);
    }
};

export const updateCurso = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const colegioId = req.user?.colegioId;
    const id = parseInt(req.params.id as string);
    const datos = req.body;

    if (!colegioId) {
      return res.status(401).json({ error: "No autorizado" });
    }

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID de curso inválido" });
    }

    // Primero verificamos que el curso exista y pertenezca al colegio del docente
    const cursoExistente = await CursoService.getCursoId(id);
    if (!cursoExistente || cursoExistente.colegioId !== colegioId) {
      return res.status(404).json({ error: "Curso no encontrado o no pertenece a tu colegio" });
    }

    const cursoActualizado = await CursoService.updateCurso(id, datos);
    res.json(cursoActualizado);
  } catch (error) {
    next(error);
  }
};