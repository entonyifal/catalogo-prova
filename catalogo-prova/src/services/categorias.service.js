export function criarCategoriasService(categoriasRepository) {
  return {
    async listar() {
      return await categoriasRepository.listar();
    },

    async buscarPorId(id) {
      return await categoriasRepository.buscarPorId(id);
    },

    async criar(dados) {
      if (!dados.nome || dados.nome.trim() === '') {
        const error = new Error('O nome da categoria é obrigatório.');
        error.status = 400;
        throw error;
      }
      return await categoriasRepository.criar({
        nome: dados.nome.trim()
      });
    }
  };
}