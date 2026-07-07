import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getCursadaId, createCursada, deleteCursada } from "../controllers/cursada.controller.js";
import { getClases, createClase } from '../controllers/clase.controller.js';
import { getAsistencias, guardarAsistencias } from '../controllers/asistencia.controller.js';
import { getEvaluaciones, createEvaluacion } from '../controllers/evaluacion.controller.js';
import { getTps, createTp } from "../controllers/tp.controller.js";
const router = Router();

router.use(authMiddleware);

router.get("/:id", getCursadaId);
router.post("/", createCursada);
router.delete("/:id", deleteCursada);

// clases
router.get("/:cursadaId/clases", getClases);
router.post("/:cursadaId/clases", createClase);
// asistencia
router.get("/:cursadaId/asistencia", getAsistencias);
router.post("/:cursadaId/asistencia", guardarAsistencias);
//evaluaciones
router.get("/:cursadaId/evaluaciones", getEvaluaciones);
router.post("/:cursadaId/evaluaciones", createEvaluacion);
// TP
router.get("/:cursadaId/tps", getTps);
router.post("/:cursadaId/tps", createTp);

export default router;