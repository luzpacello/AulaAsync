import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getAlumnos,
  getAlumnoId,
  getPorCurso,
  createAlumno,
  updateAlumno,
  deleteAlumno,
  obtenerDetalle,
  importarAlumnos
} from "../controllers/alumno.controller.js";

const router = Router();

router.use(authMiddleware);

// Todos los alumnos del colegio
router.get("/", getAlumnos);

// Alumnos de un curso
router.get("/curso/:cursoId", getPorCurso);

// Detalle de un alumno
router.get("/:id", getAlumnoId);

// Estadísticas / detalle completo
router.get("/:id/detalle", obtenerDetalle);

// Crear alumno individual
router.post("/", createAlumno);

// Importación masiva
router.post("/curso/:cursoId/importar", importarAlumnos);

// Editar
router.put("/:id", updateAlumno);

// Eliminar
router.delete("/:id", deleteAlumno);

export default router;