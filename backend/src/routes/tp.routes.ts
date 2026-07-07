import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { getTp, updateTp, deleteTp } from '../controllers/tp.controller.js';
import { getEntregas, guardarEntrega } from '../controllers/entrega.controller.js';
const router = Router();

router.use(authMiddleware);

router.get('/:id', getTp);     
router.put('/:id', updateTp);   
router.delete('/:id', deleteTp);

router.get('/:tpId/entregas', getEntregas);
router.post('/:tpId/entregas', guardarEntrega);

export default router;