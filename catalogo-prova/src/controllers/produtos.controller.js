export function criarProdutosController(produtosService, categoriasService) {
  return {
    async listar(req, res) {
      const produtos = await produtosService.listar();
      res.render('produtos/index', { produtos });
    },

    async exibirFormulario(req, res) {
      const categorias = await categoriasService.listar();
      res.render('produtos/form', { categorias, erro: null, dados: {} });
    },

    async criar(req, res, next) {
      try {
        await produtosService.criar(req.body);
        res.redirect('/produtos');
      } catch (error) {
        if (error.status === 400) {
          const categorias = await categoriasService.listar();
          return res.status(400).render('produtos/form', {
            erro: error.message,
            categorias,
            dados: req.body
          });
        }
        next(error);
      }
    }
  };
}