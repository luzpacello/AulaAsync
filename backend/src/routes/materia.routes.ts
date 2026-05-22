import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { obtenerMaterias } from "../controllers/materia.controller.js";

const router = Router();

router.use(authMiddleware);

router.get('/', obtenerMaterias);

export default router;