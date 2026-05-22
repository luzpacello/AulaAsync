import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import { registrarUsuario } from "../controllers/usuario.controller.js";

const router = Router();

router.post('/register', registrarUsuario);
router.post('/login', login);

export default router;