import type { NextFunction, Request, Response } from "express";
import { MateriaService } from "../services/materia.service.js";

export const obtenerMaterias = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const colegioId = req.user!.colegioId;

        const materias = await MateriaService.getMaterias(colegioId);
        res.json(materias)
    } catch (error) {
        next(error);
    }
};