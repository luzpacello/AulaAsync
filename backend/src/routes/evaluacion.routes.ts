import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { getEvaluacion, updateEvaluacion, deleteEvaluacion } from '../controllers/evaluacion.controller.js';
import { getNotas, guardarNota } from '../controllers/nota.controller.js';
const router = Router();

router.use(authMiddleware);

router.get('/:id', getEvaluacion);     
router.put('/:id', updateEvaluacion);   
router.delete('/:id', deleteEvaluacion);

router.get('/:evaluacionId/notas', getNotas);
router.post('/:evaluacionId/notas', guardarNota);

export default router;