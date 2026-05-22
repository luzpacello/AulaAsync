import type { NextFunction, Request, Response } from "express";
import { CursadaService } from "../services/cursada.service.js";

export const crearCursada = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cursada = await CursadaService.crearCursada(req.body);
        res.status(201).json(cursada);
    } catch (error) {
        next(error);
    }
}