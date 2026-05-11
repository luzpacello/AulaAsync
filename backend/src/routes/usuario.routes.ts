import { Router } from 'express';
import { registrarUsuario } from '../controllers/usuario.controller.js';

const router = Router();

// POST http://localhost:3000/api/usuarios/registro
router.post('/registro', registrarUsuario);

export default router;