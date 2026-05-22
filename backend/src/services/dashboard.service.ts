import prisma from "../config/db.js";

export const DashboardService = {
  async obtenerDashboardHoy(colegioId: number) {
    const hoy = new Date();

    const diasSemana = [
      "DOMINGO", 
      "LUNES",
      "MARTES",
      "MIERCOLES",
      "JUEVES",
      "VIERNES",
      "SABADO"
    ];

    const diaActual = diasSemana[hoy.getDay()]!;

    // INICIO DEL DIA
    const inicioDia = new Date(hoy);
    inicioDia.setHours(0, 0, 0, 0);
    // FIN DEL DIA
    const finDia = new Date(hoy);
    finDia.setHours(23, 59, 50, 999);

    // CLASES DEL DIA
    const clasesHoy =
      await prisma.horarioCursada.findMany({
        where: {
          dia: diaActual,
          cursada: {
            curso: {
              colegioId
            }
          }
        },
        include: {
          cursada: {
            include: {
              materia: {
                select: {
                  nombre: true
                }
              },
              curso: {
                select: {
                  anio: true,
                  division: true,
                  orientacion: true
                }
              }

            }
          }
        },

        orderBy: {horaFin: 'asc'}
      });

    // EVENTOS DEL DIA
    const eventosHoy = 
      await prisma.evento.findMany({
        where: {
          colegioId,
          fecha: {
            gte: inicioDia,
            lte: finDia
          }
        },
        orderBy: { fecha: 'asc' }
      });
    
    return { 
      clasesHoy: clasesHoy.map(
        clase => ({
          materia: clase.cursada.materia.nombre,
          curso: `${clase.cursada.curso.anio}° ${clase.cursada.curso.division}`,
          orientation: clase.cursada.curso.orientacion,
          horaInicio: clase.horaInicio,
          horaFin: clase.horaFin
        })
      ), eventosHoy 
    };
  }
};