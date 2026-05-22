import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if(!token) return res.status(401).json({ error: "No autorizado"});

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token invalido"});
  }
};