import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { 
    getMaterias,
    getMateriaId,
    createMateria,
    updateMateria
} from "../controllers/materia.controller.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getMaterias);
router.get("/:id", getMateriaId);
router.post("/", createMateria);
router.put("/:id", updateMateria);

export default router;