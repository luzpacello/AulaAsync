import 'dotenv/config'; // Esto carga las variables del .env
import { defineConfig } from '@prisma/config';
export default defineConfig({
    datasource: {
        url: process.env.DATABASE_URL,
    },
    migrations: {
        "seed": "ts-node prisma/seed.ts"
    },
});
//# sourceMappingURL=prisma.config.js.map