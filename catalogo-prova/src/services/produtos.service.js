export function criarProdutosService(produtosRepository, categoriasRepository) {
  return {
    async listar() {
      return await produtosRepository.listar();
    },

    async criar(dados) {
      if (!dados.nome || dados.nome.trim() === '') {
        const error = new Error('O nome do produto é obrigatório.');
        error.status = 400;
        throw error;
      }

      const precoNum = Number(dados.preco);
      if (isNaN(precoNum) || precoNum <= 0) {
        const error = new Error('O preço do produto deve ser maior que zero.');
        error.status = 400;
        throw error;
      }

      if (!dados.categoriaId) {
        const error = new Error('A categoria é obrigatória.');
        error.status = 400;
        throw error;
      }

      const categoriaExistente = await categoriasRepository.buscarPorId(dados.categoriaId);
      if (!categoriaExistente) {
        const error = new Error('A categoria informada não existe.');
        error.status = 400;
        throw error;
      }

      return await produtosRepository.criar({
        nome: dados.nome.trim(),
        preco: precoNum,
        categoriaId: Number(dados.categoriaId)
      });
    }
  };
}