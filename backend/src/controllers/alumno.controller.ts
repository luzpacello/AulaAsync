import type { NextFunction, Request, Response } from 'express';
import { AlumnoService } from '../services/alumno.service.js';
import { CursoService } from '../services/curso.service.js';

export const getAlumnos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const colegioId = req.user?.colegioId;
    const { search } = req.query;

    if (!colegioId) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const alumnos = await AlumnoService.getAlumnos(colegioId, search as string);
    res.json(alumnos);
  } catch (error) {
    next(error);
  }
};

export const getAlumnoId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const colegioId = req.user?.colegioId;
    const id = parseInt(req.params.id as string);

    if (!colegioId) {
      return res.status(401).json({ error: "No autorizado" });
    }

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID de alumno inválido" });
    }

    const alumno = await AlumnoService.getAlumnoId(id);

    if (!alumno || alumno.curso.colegioId !== colegioId) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }

    res.json(alumno);
  } catch (error) {
    next(error);
  }
};

export const getPorCurso = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cursoId = parseInt(req.params.id as string);

    if (isNaN(cursoId)) {
      return res.status(400).json({ error: "ID de curso inválido" });
    }

    const alumnos = await AlumnoService.getPorCurso(cursoId);

    res.status(200).json(alumnos);
  } catch (error) {
    next(error);
  }
};

export const createAlumno = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const colegioId = req.user?.colegioId;
    const { nombre, apellido, documento, cursoId } = req.body;

    if (!colegioId) {
      return res.status(401).json({ error: "No autorizado" });
    }

    if (!nombre || !apellido || !documento || !cursoId) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const cursoExistente = await CursoService.getCursoId(Number(cursoId));
    if (!cursoExistente || cursoExistente.colegioId !== colegioId) {
      return res.status(400).json({ error: "El curso asignado no pertenece a tu colegio o no existe" });
    }

    const nuevoAlumno = await AlumnoService.createAlumno({
      nombre,
      apellido,
      documento: String(documento),
      cursoId: Number(cursoId)
    });

    res.status(201).json(nuevoAlumno);
  } catch (error) {
    next(error);
  }
};

export const updateAlumno = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const colegioId = req.user?.colegioId;
    const id = parseInt(req.params.id as string);
    const { nombre, apellido, documento, cursoId } = req.body;

    if (!colegioId) {
      return res.status(401).json({ error: "No autorizado" });
    }

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID de alumno inválido" });
    }

    const alumnoExistente = await AlumnoService.getAlumnoId(id);
    if (!alumnoExistente || alumnoExistente.curso.colegioId !== colegioId) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }

    if (cursoId) {
      const cursoExistente = await CursoService.getCursoId(Number(cursoId));
      if (!cursoExistente || cursoExistente.colegioId !== colegioId) {
        return res.status(400).json({ error: "El nuevo curso no pertenece a tu colegio" });
      }
    }

    const alumnoActualizado = await AlumnoService.updateAlumno(id, {
      ...(nombre && { nombre }),
      ...(apellido && { apellido }),
      ...(documento && { documento: String(documento) }),
      ...(cursoId && { cursoId: Number(cursoId) })
    });

    res.json(alumnoActualizado);
  } catch (error) {
    next(error);
  }
};

export const deleteAlumno = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const colegioId = req.user?.colegioId;
    const id = parseInt(req.params.id as string);

    if (!colegioId) {
      return res.status(401).json({ error: "No autorizado" });
    }

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID de alumno inválido" });
    }

    const alumnoExistente = await AlumnoService.getAlumnoId(id);
    if (!alumnoExistente || alumnoExistente.curso.colegioId !== colegioId) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }

    await AlumnoService.deleteAlumno(id);
    res.json({ message: "Alumno eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};

export const importarAlumnos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const colegioId = req.user?.colegioId;
    const cursoId = Number(req.params.cursoId);

    if (!colegioId)
      return res.status(401).json({ error: "No autorizado" });

    const curso = await CursoService.getCursoId(cursoId);

    if (!curso || curso.colegioId !== colegioId)
      return res.status(404).json({ error: "Curso no encontrado" });

    const { alumnos } = req.body;

    if (!Array.isArray(alumnos))
      return res.status(400).json({ error: "Lista inválida" });

    const resultado = await AlumnoService.importarAlumnos(
      cursoId,
      alumnos
    );

    res.status(201).json(resultado);

  } catch (error) {
    next(error);
  }
};

export const obtenerDetalle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cursoId = parseInt(req.params.id as string);
    const id = parseInt(req.params.id as string);
    
    if (isNaN(cursoId)) {
      return res.status(400).json({ error: "ID de curso inválido" });
    }

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID de alumno inválido" });
    }

    const detalle = await AlumnoService.obtenerDetalleAlumno(id);

    if (!detalle) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }
    res.status(200).json(detalle);
  } catch (error) {
    next(error);
  }
};