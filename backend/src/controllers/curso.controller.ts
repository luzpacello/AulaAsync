import type { NextFunction, Request, Response } from "express";
import { CursoService } from "../services/curso.service.js";


export const obtenerCursos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const colegioId = req.user!.colegioId;

        const search = req.query.search as string;

        const cursos = await CursoService.getCursos(colegioId, search);

        res.json(cursos);
    } catch (error) {
        next(error);
    }
};