import type { NextFunction, Request, Response } from 'express';
import {DashboardService} from '../services/dashboard.service.js';

export const getDashboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const colegioId = req.user?.colegioId;

    if (!colegioId){
      return res.status(401).json({ error: "No autorizado" });
    }

    const dashboard = await DashboardService.obtenerDashboardHoy(colegioId);
    res.json(dashboard);
  } catch (error) {
    next(error);
  }
}