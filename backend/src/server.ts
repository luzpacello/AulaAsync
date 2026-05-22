import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import usuarioRoutes from './routes/usuario.routes.js';
import authRoutes from './routes/auth.routes.js';
import colegioRoutes from './routes/colegio.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js'
import cursoRoutes from './routes/curso.routes.js';
import materiaRoutes from './routes/materia.routes.js';
import cursadaRoutes from './routes/cursada.routes.js';

const app = express();

app.use(cors());
app.use(express.json()); // Vital para poder leer el body de los POST

// Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/colegios', colegioRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/materias', materiaRoutes);
app.use('/api/cursadas', cursadaRoutes);


app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    const status = err.status || 500;
    const message = err.message || 'Error interno del servidor';
    res.status(status).json({ error: message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor listo en http://localhost:${PORT}`);
});