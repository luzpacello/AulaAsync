import { Router } from 'express';
import * as ColegioController from '../controllers/colegio.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// RUTAS PUBLICAS
router.get("/selector", ColegioController.getColegiosPublic);
router.post("/", ColegioController.crearColegio);

// RUTAS CON AUTH
router.use(authMiddleware);

// -- AJUSTES --
router.get('/', ColegioController.listColegios);
router.get('/:id', ColegioController.getColegioId);
router.put('/:id', ColegioController.updateColegio);

export default router;