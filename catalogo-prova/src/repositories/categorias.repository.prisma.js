import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const categoriasRepository = {
  async listar() {
    return await prisma.categoria.findMany();
  },

  async buscarPorId(id) {
    return await prisma.categoria.findUnique({
      where: { id: Number(id) }
    });
  },

  async criar(dados) {
    return await prisma.categoria.create({
      data: {
        nome: dados.nome
      }
    });
  }
};