import type { NextFunction, Request, Response } from "express";
import { ColegioService } from "../services/colegio.service.js";

export const crearColegio = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nombre, nombreComodo } = req.body;

    if (!nombre) {
      return res.status(400).json({
        error: "El nombre es obligatorio",
      });
    }

    let usuarioId = req.user?.id;

    // ¿No hay JWT?
    if (!usuarioId) {
      const yaExisteColegio = await ColegioService.existeColegio();

      if (yaExisteColegio) {
        return res.status(401).json({
          error: "No autorizado",
        });
      }

      const administrador = await ColegioService.getAdministrador();

      if (!administrador) {
        return res.status(400).json({
          error: "Primero debe registrarse un usuario administrador.",
        });
      }

      usuarioId = administrador.id;
    }

    const colegio = await ColegioService.createColegio({
      nombre,
      nombreComodo,
      usuarioId,
    });

    res.status(201).json(colegio);
  } catch (error) {
    next(error);
  }
};

export const getColegioId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        error: "ID inválido",
      });
    }

    const colegio = await ColegioService.getColegioId(id);

    if (!colegio) {
      return res.status(404).json({
        error: "Colegio no encontrado",
      });
    }

    res.json(colegio);
  } catch (error) {
    next(error);
  }
};

export const getColegiosPublic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const colegios = await ColegioService.getColegios();
    res.json(colegios);
  } catch (error) {
    next(error);
  }
};

export const listColegios = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const colegios = await ColegioService.getColegios();
    res.json(colegios);
  } catch (error) {
    next(error);
  }
};

export const updateColegio = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        error: "ID inválido",
      });
    }

    const { nombre, nombreComodo } = req.body;

    const datosActualizados = {
      ...(nombre && { nombre }),
      ...(nombreComodo && { nombreComodo }),
    };

    if (Object.keys(datosActualizados).length === 0) {
      return res.status(400).json({
        error: "No se enviaron datos para actualizar",
      });
    }

    const colegio = await ColegioService.updateColegio(
      id,
      datosActualizados
    );

    res.json(colegio);
  } catch (error: any) {
    if (error.message.includes("no existe")) {
      return res.status(404).json({
        error: error.message,
      });
    }

    next(error);
  }
};