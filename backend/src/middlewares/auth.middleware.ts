import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if(!token) return res.status(401).json({ error: "No autorizado"});

  try {
    const secret = process.env.JWT_SECRET || 'clave_secreta_super_segura';
    const decode = jwt.verify(token, secret) as any;
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token invalido o expirado"});
  }
};