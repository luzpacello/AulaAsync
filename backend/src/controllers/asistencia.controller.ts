import type { Request, Response, NextFunction } from 'express';
import { AsistenciaService } from '../services/asistencia.service.js';

export const getAsistencias = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cursadaId = Number(req.body.cursadaId);
    const fecha = new Date(req.query.fecha as string);

    const asistencia = await AsistenciaService.getAsistencias(cursadaId, fecha);

    if(!asistencia)
      return res.json({ error: "No hay asistencias para la fecha dada"});

    res.json(asistencia);
  } catch (error) {
    next(error);
  }
};

export const guardarAsistencias = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cursadaId = Number(req.body.cursadaId);
    const { fecha, asistencias } = req.body;

    await AsistenciaService.guardarAsistencias(cursadaId, fecha, asistencias);
    
    res.json({ message: "Asistencia registrada correctamente" });
  } catch (error) {
    next(error);
  }
};