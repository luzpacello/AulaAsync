import prisma from '../config/db.js';

export const UsuarioService = {

  // creacion de Usuario - No se utilizará en producción, 
  // ya que el usuario estara predefinido
  async crearUsuario(data: {nombre: string, password: string}) {
    return await prisma.usuario.create({ data });
  },

  // metodos para pruebas
  async obtenerTodos() {
    return await prisma.usuario.findMany({
      select: { id: true, nombre: true }
    });
  },

  async eliminarUsuario(id: String){
    return await prisma.usuario.delete({
      where: { id }
    });
  }
};