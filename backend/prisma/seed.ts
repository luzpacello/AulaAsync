import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

// Sin pasarle objetos al constructor, Prisma buscará DATABASE_URL en el entorno
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Iniciando el seed...');
  
  // Limpieza inicial
  await prisma.usuario.deleteMany();

  const luz = await prisma.usuario.create({
    data: {
      nombre: 'Luz',
      password: 'password123',
      colegios: {
        create: {
          nombre: 'Colegio Secundario Técnico',
          nombreComodo: 'La Técnica',
          cursos: {
            create: {
              anio: 5,
              division: 'B',
              orientacion: 'Programación',
              alumnos: {
                create: [
                  { nombre: 'Alex', apellido: 'Rojas', documento: '45000111' },
                  { nombre: 'Sofía', apellido: 'Paz', documento: '45000222' }
                ]
              }
            }
          },
          materias: {
            create: { nombre: 'Base de Datos' }
          }
        }
      }
    }
  });

  console.log('🌱 Datos de prueba cargados correctamente para:', luz.nombre);
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });