import type { Request, Response } from "express";
import { ColegioService } from "../services/colegio.service.js";

export const crearColegio = async (req: Request, res: Response) => {
    try {
        const { usuarioId, nombre, nombreComodo } = req.body;

        if (!nombre) {
            return res.status(400).json({ error: 'Faltan datos obligatorios' });
        }

        if (!nombreComodo) {
            nombreComodo == nombre;
        }

        const nuevoColegio = await ColegioService.createColegio(nombre, nombreComodo, usuarioId);
        res.status(201).json(nuevoColegio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el colegio' });
    }
};