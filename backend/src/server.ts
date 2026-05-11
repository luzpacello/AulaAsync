import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import usuarioRoutes from './routes/usuario.routes.js';

const app = express();

app.use(cors());
app.use(express.json()); // Vital para poder leer el body de los POST

// Rutas
app.use('/api/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor listo en http://localhost:${PORT}`);
});