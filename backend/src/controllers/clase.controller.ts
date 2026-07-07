import type { NextFunction, Request, Response } from "express";
import { ClaseService } from "../services/clase.service.js";

export const getClases = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cursadaId = Number(req.params.cursadaId);
    const clases = await ClaseService.getClases(cursadaId);

    res.json(clases);
  } catch (error) {
    next(error);
  }
};

export const getClaseId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id))
      return res.status(400).json({ error: "ID de clase inválido" });

    const clase = await ClaseService.getClase(id);

    if (!clase) 
      return res.status(404).json({ error: "Clase no encontrada" });

    res.json(clase);
  } catch (error) {
    next(error);
  }
};

export const createClase = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cursadaId = Number(req.params.cursadaId);    

    if (!req.body.fecha) {
      return res.status(400).json({ error: "La fecha es un campo obligatorio" });
    }

    const nuevaClase = await ClaseService.createClase(
      cursadaId,
      {
        ...req.body,
        fecha: new Date(req.body.fecha)
      }
    );

    res.status(201).json(nuevaClase);
    } catch (error) {
        next(error);
    }
};

export const updateClase = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    const datos = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID de clase inválido" });
    }

    const claseExistente = await ClaseService.getClase(id);
    if (!claseExistente) {
      return res.status(404).json({ error: "Clase no encontrada" });
    }

    const claseActualizada = await ClaseService.updateClase(id, datos);
    res.json(claseActualizada);
  } catch (error) {
    next(error);
  }
};

export const deleteClase = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const datos = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID de clase inválido" });
    }

    const clase = await ClaseService.getClase(id);

    if (!clase) {
      return res.status(404).json({ error: "Clase no encontrada" });
    }

    await ClaseService.deleteClase(id);

    res.json({ message: "Clase eliminada correctamente"});
  } catch (error) {
    next(error);
  }
};