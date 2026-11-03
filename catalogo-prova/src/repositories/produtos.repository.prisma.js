import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const produtosRepository = {
  async listar() {
    return await prisma.produto.findMany({
      include: {
        categoria: true
      }
    });
  },

  async criar(dados) {
    return await prisma.produto.create({
      data: {
        nome: dados.nome,
        preco: Number(dados.preco),
        categoriaId: Number(dados.categoriaId)
      }
    });
  }
};