import { Request, Response } from 'express';
import { EvaluacionService } from '../services/evaluacion.service.js';

export const crearEvaluacion = async (req: Request, res: Response) => {
  try {
    const { cursadaId } = req.params;
    const evaluacion = await EvaluacionService.crearEvaluacion({
      ...req.body,
      cursadaId: Number(cursadaId)
    });
    res.status(201).json(evaluacion);
  } catch (error) {
    res.status(500).json({ error: "Error al crear evaluación" });
  }
};

export const cargarNotas = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // evaluacionId
    const { notas } = req.body; // [{ alumnoId, calificacion }]
    const resultado = await EvaluacionService.cargarNotasMasivas(Number(id), notas);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Error al cargar notas" });
  }
};