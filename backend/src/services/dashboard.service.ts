import prisma from "../config/db.js";
import { DiaSemana } from "@prisma/client";
export const DashboardService = {
  async obtenerDashboardHoy(colegioId: number) {
    const fechaArg = new Date(new Date().toLocaleDateString("en-US",{ timeZone: "America/Argentina/Buenos_Aires" }));

    const diasSemana: DiaSemana[] =[
      DiaSemana.DOMINGO,
      DiaSemana.LUNES,
      DiaSemana.MARTES,
      DiaSemana.MIERCOLES,
      DiaSemana.JUEVES,
      DiaSemana.VIERNES,
      DiaSemana.SABADO
    ];

    const diaActual = diasSemana[fechaArg.getDay()]!;

    // INICIO DEL DIA
    const inicioDia = new Date(fechaArg);
    inicioDia.setHours(0, 0, 0, 0);
    // FIN DEL DIA
    const finDia = new Date(fechaArg);
    finDia.setHours(23, 59, 59, 999);

    // CLASES DEL DIA
    const clasesHoy =
      await prisma.horarioCursada.findMany({
        where: {
          dia: diaActual,
          cursada: {
            materia: {
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

        orderBy: {horaInicio: 'asc'}
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