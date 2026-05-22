import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { crearColegio } from "../controllers/colegio.controller.js";

const router = Router();

router.use(authMiddleware);

router.post('/', crearColegio);

export default router;