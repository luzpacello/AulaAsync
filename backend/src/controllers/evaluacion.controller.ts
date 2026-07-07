import type { Request, Response, NextFunction } from 'express';
import { EvaluacionService } from '../services/evaluacion.service.js';

export const getEvaluaciones = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cursadaId = Number(req.params.cursadaId);
    const evaluaciones = await EvaluacionService.getEvaluaciones(cursadaId);

    res.json(evaluaciones);
  } catch (error) {
    next(error);
  }
};

export const getEvaluacion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id))
      return res.status(400).json({ error: "ID de clase inválido" });

    const evaluacion = await EvaluacionService.getEvaluacion(id);

    if (!evaluacion) 
      return res.status(404).json({ error: "Evaluación no encontrada" });

    res.json(evaluacion);
  } catch (error) {
    next(error);
  }
};

export const createEvaluacion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cursadaId = Number(req.params.cursadaId);    

    const { fecha, temas, tipo } = req.body;

    if (!fecha || !temas || !tipo)
      return res.status(400).json({ error: "Todos los campos son obligatorios" });

    const evaluacion = await EvaluacionService.createEvaluacion(
      cursadaId,
      {
        fecha: new Date(fecha),
        temas,
        tipo
      }
    );

    res.status(201).json(evaluacion);
    } catch (error) {
        next(error);
    }
};

export const updateEvaluacion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    const datos = {
      ...req.body,
      ...(req.body.fecha && {
        fecha: new Date(req.body.fecha)
      })
    };

    if (isNaN(id)) 
      return res.status(400).json({ error: "ID de evaluación inválido" });
    
    const evaluacionExistente = await EvaluacionService.getEvaluacion(id);
    
    if (!evaluacionExistente) 
      return res.status(404).json({ error: "Evaluación no encontrada" });

    const evaluacionActualizada = await EvaluacionService.updateEvaluacion(id, datos);
    res.json(evaluacionActualizada);
  } catch (error) {
    next(error);
  }
};

export const deleteEvaluacion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const datos = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID de evaluación inválido" });
    }

    const evaluacion = await EvaluacionService.getEvaluacion(id);

    if (!evaluacion) {
      return res.status(404).json({ error: "Evaluacion no encontrada" });
    }

    await EvaluacionService.deleteEvaluacion(id);

    res.json({ message: "Evaluación eliminada correctamente"});
  } catch (error) {
    next(error);
  }
};