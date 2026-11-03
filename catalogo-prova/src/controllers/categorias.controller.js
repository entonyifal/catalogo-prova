export function criarCategoriasController(categoriasService) {
  return {
    async listar(req, res) {
      const categorias = await categoriasService.listar();
      res.render('categorias/index', { categorias });
    },

    exibirFormulario(req, res) {
      res.render('categorias/form', { erro: null, dados: {} });
    },

    async criar(req, res, next) {
      try {
        await categoriasService.criar(req.body);
        res.redirect('/categorias');
      } catch (error) {
        if (error.status === 400) {
          return res.status(400).render('categorias/form', {
            erro: error.message,
            dados: req.body
          });
        }
        next(error);
      }
    }
  };
}