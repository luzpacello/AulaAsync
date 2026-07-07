import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { 
  getClaseId, 
  updateClase,
  deleteClase
} from '../controllers/clase.controller.js';

const router = Router();

router.use(authMiddleware);

router.get('/:id', getClaseId);     
router.put('/:id', updateClase);   
router.delete('/:id', deleteClase);

export default router;