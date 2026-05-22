import { Request, Response } from 'express';
import { TpService } from '../services/tp.service.js';

export const crearTp = async (req: Request, res: Response) => {
  try {
    const { cursadaId } = req.params;
    const tp = await TpService.crearTp({
      ...req.body,
      cursadaId: Number(cursadaId)
    });
    res.status(201).json(tp);
  } catch (error) {
    res.status(500).json({ error: "Error al crear TP" });
  }
};

export const registrarEntregaAlumno = async (req: Request, res: Response) => {
  try {
    const { tpId } = req.params;
    const entrega = await TpService.registrarEntrega({
      ...req.body,
      tpId: Number(tpId)
    });
    res.json(entrega);
  } catch (error) {
    res.status(500).json({ error: "Error al registrar entrega" });
  }
};