import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { 
  getAlumnos, 
  getAlumnoId, 
  getPorCurso,
  createAlumno, 
  updateAlumno, 
  deleteAlumno,
  obtenerDetalle
} from '../controllers/alumno.controller.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getAlumnos);     
router.get('/:id', getAlumnoId);  
router.get('/', getPorCurso); 
router.post('/', createAlumno);   
router.put('/:id', updateAlumno);  
router.delete('/:id', deleteAlumno); 
router.get('/:id', obtenerDetalle); 

export default router;