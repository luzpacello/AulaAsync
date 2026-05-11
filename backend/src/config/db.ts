import 'dotenv/config';
import pkg from 'pg';
const { Pool } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

// 1. Creamos la conexión de PostgreSQL usando el paquete 'pg'
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

// 2. Creamos el adaptador de Prisma para PostgreSQL
const adapter = new PrismaPg(pool);

// 3. Instanciamos el cliente pasándole el adaptador
const prisma = new PrismaClient({ adapter });

export default prisma;