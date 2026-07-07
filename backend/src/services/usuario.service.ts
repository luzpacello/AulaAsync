import prisma from '../config/db.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10; 

export const UsuarioService = {
  async registrarUsuario(data: {nombre: string, password: string}) {

    const usuarioExistente = 
      await prisma.usuario.findFirst({ 
        select: {
          id: true
        }
      })
    
    if (usuarioExistente)
      throw new Error("REGISTRO_BLOQUEADO");
    
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    return await prisma.usuario.create({ 
      data: {
        ...data,
        password: hashedPassword
      } ,
      select: {
        id: true,
        nombre: true,
        createdAt: true
      }
    });
  },

  async validarPassword(passwordIngresada: string, passwordHasheada: string) {
    return await bcrypt.compare(passwordIngresada, passwordHasheada);
  }
};