import prisma from "../config/db.js"

export const CursoService = {
  async createCurso(data: {anio: number, division: string, orientacion: string, ciclo: string, colegioId: number}) {
    return await prisma.curso.create({ data });
  },

  async getCursoId(id: number){
    return await prisma.curso.findUnique({
        where: {id}
    });
  },

  async getCursos(){
    return await prisma.curso.findMany({
        include: {colegio: true}
    });
  },

  async updateCurso(id: number, datos: {anio?: number, division?: string, orientacion?: string, ciclo?: string}) {
    return await prisma.curso.update({
        where: {id},
        data: datos
    });
  },

  async deteleCurso(id:number){
    return await prisma.curso.delete({
        where: {id}
    });
  }
}