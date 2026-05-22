import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { obtenerCursos } from '../controllers/curso.controller.js';

const router = Router();

// RUTAS CON AUTH
router.use(authMiddleware);

router.get('/', obtenerCursos);

export default router;