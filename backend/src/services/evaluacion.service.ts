import prisma from '../config/db.js';

export const EvaluacionService = {
  // 1. Crear la evaluación (el examen en sí)
  async crearEvaluacion(data: { temas: string, fecha: string, tipo: 'ESCRITO' | 'ORAL' | 'GRUPAL', cursadaId: number }) {
    return await prisma.evaluacion.create({
      data: {
        temas: data.temas,
        fecha: new Date(data.fecha),
        tipo: data.tipo,
        cursadaId: data.cursadaId
      }
    });
  },

  // 2. Cargar notas masivamente (Igual que asistencia, usamos upsert)
  async cargarNotasMasivas(evaluacionId: number, notas: { alumnoId: number, calificacion: number }[]) {
    return await prisma.$transaction(
      notas.map((n) =>
        prisma.nota.upsert({
          where: {
            evaluacionId_alumnoId: {
              evaluacionId: evaluacionId,
              alumnoId: n.alumnoId,
            },
          },
          update: { calificacion: n.calificacion },
          create: {
            evaluacionId: evaluacionId,
            alumnoId: n.alumnoId,
            calificacion: n.calificacion,
          },
        })
      )
    );
  }
};