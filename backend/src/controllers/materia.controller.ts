import type { NextFunction, Request, Response } from "express";
import { MateriaService } from "../services/materia.service.js";

export const getMaterias = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const colegioId = req.user?.colegioId;
        const { search } = req.query;

        if (!colegioId) {
            return res.status(401).json({ error: "No autorizado" });
        };

        const materias = await MateriaService.getMaterias(colegioId, search as string);
        res.json(materias);
    } catch (error) {
        next(error);
    }
};

export const getMateriaId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const colegioId = req.user?.colegioId;
        const id = parseInt(req.params.id as string);

        if (!colegioId) {
            return res.status(401).json({ error: "No autorizado" });
        };

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" });
        };

        const materia = await MateriaService.getMateriaID(id);

        if (!materia || materia.colegioId !== colegioId) {
            return res.status(404).json({ error: "Materia no encontrada"});
        };

        res.json(materia);
    } catch (error) {
        next(error);
    }
};

export const createMateria = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const colegioId = req.user?.colegioId;
        const { nombre } = req.body;

        if (!colegioId)
            return res.status(401).json({ error: "No autorizado" });

        if (!nombre) 
            return res.status(400).json({ error: "Debe ingresar un nombre" });

        const materia = await MateriaService.creatrMateria({nombre, colegioId});

        res.status(201).json(materia);
    } catch (error) {
        next(error);
    }
};

export const updateMateria = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const colegioId = req.user?.colegioId;
    const id = parseInt(req.params.id as string);

    if (!colegioId)
        return res.status(401).json({ error: "No autorizado" });

    const materia = await MateriaService.getMateriaID(id);

    if (!materia || materia.colegioId !== colegioId)
        return res.status(404).json({ error: "Materia no encontrada" });

    const actualizada = await MateriaService.updateMateria(id, req.body);

    res.json(actualizada);
  } catch (error) {
    next(error);
  }
};