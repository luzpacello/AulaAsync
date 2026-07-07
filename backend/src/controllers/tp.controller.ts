import type { Request, Response, NextFunction } from 'express';
import { TpService } from '../services/tp.service.js';

export const getTps = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cursadaId = Number(req.params.cursadaId);
    const tps = await TpService.getTps(cursadaId);

    res.json(tps);
  } catch (error) {
    next(error);
  }
};

export const getTp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id))
      return res.status(400).json({ error: "ID de tp inválido" });

    const tp = await TpService.getTp(id);

    if (!tp) 
      return res.status(404).json({ error: "Trabajo no encontrada" });

    res.json(tp);
  } catch (error) {
    next(error);
  }
};

export const createTp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cursadaId = Number(req.params.cursadaId);    

    const { titulo, fechaEntrega } = req.body;

    if (!titulo || !fechaEntrega)
      return res.status(400).json({ error: "Todos los campos son obligatorios" });

    const tp = await TpService.createTp(
      cursadaId,
      {
        titulo,
        fechaEntrega: new Date(fechaEntrega)
      }
    );

    res.status(201).json(tp);
    } catch (error) {
        next(error);
    }
};

export const updateTp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    const datos = {
      ...req.body,
      ...(req.body.fechaEntrega && {
        fechaEntrega: new Date(req.body.fechaEntrega)
      })
    }
    if (isNaN(id)) 
      return res.status(400).json({ error: "ID de trabajo inválido" });
    
    const tpExistente = await TpService.getTp(id);
    
    if (!tpExistente) 
      return res.status(404).json({ error: "Trabajo no encontrada" });

    const tpActualizada = await TpService.updateTp(id, datos);

    res.json(tpActualizada);
  } catch (error) {
    next(error);
  }
};

export const deleteTp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID de evaluación inválido" });
    }

    const tp = await TpService.getTp(id);

    if (!tp) {
      return res.status(404).json({ error: "Trabajo no encontrada" });
    }

    await TpService.deleteTp(id);

    res.json({ message: "Trabajo eliminada correctamente"});
  } catch (error) {
    next(error);
  }
};