import prisma from '../config/db.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10; 

export const UsuarioService = {
  async crearUsuario(data: {nombre: string, password: string}) {
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    return await prisma.usuario.create({ 
      data: {
        ...data,
        password: hashedPassword
      } 
    });
  },

  async validarPassword(passwordIngresada: string, passwordHasheada: string) {
    return await bcrypt.compare(passwordIngresada, passwordHasheada);
  }
};