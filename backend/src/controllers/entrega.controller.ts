import type { NextFunction, Request, Response } from "express";
import { EntregaService } from "../services/entrega.service.js";

export const getEntregas = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const tpId = Number(req.params.tpId);

        if (isNaN(tpId))
            return res.status(400).json({ error: "ID de TP inválido" });

        const entregas = await EntregaService.getEntregas(tpId);

        if (!entregas)
            return res.status(404).json({ error: "TP no encontrado" });

        res.json(entregas);
    } catch (error) {
        next(error);
    }
};

export const guardarEntrega = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tpId = Number(req.params.tpId);
        const {
            alumnoId,
            tipoEntrega,
            nota,
            observaciones
        } = req.body;

        if (!alumnoId || !tipoEntrega)
            return res.status(400).json({ error: "Alumno y tipo de entrega son obligatorios." });

        const entrega = await EntregaService.guardarEntrega(
            tpId,
            {
                alumnoId,
                nota,
                observaciones
            }
        );
        res.status(201).json(entrega);

    } catch (error) {
        next(error);
    }
};