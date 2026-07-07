import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { 
  getCursos, 
  getCursoId, 
  createCurso, 
  updateCurso
} from '../controllers/curso.controller.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getCursos);          
router.get('/:id', getCursoId);     
router.post('/', createCurso);      
router.put('/:id', updateCurso);   

export default router;