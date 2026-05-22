import { Request, Response } from 'express';
import { AsistenciaService } from '../services/asistencia.service.js';

export const registrarAsistencia = async (req: Request, res: Response) => {
  try {
    const { cursadaId } = req.params;
    const { fecha, registros } = req.body; // registros: [{ alumnoId, asistio }, ...]
    
    const resultado = await AsistenciaService.registrarPlanilla(
      Number(cursadaId), 
      fecha, 
      registros
    );
    res.status(201).json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Error al registrar asistencia" });
  }
};