import type { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error detectado:", err.message);

  // Errores específicos de Prisma
  if (err.code === 'P2002') {
    return res.status(400).json({ error: 'Ya existe un registro con esos datos (campo único duplicado)' });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({ error: 'El registro solicitado no existe' });
  }

  // Error genérico
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor'
  });
};