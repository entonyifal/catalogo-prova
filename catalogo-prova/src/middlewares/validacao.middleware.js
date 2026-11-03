export function validarCategoria(req, res, next) {
  const { nome } = req.body;
  if (!nome || nome.trim() === '') {
    return res.status(400).render('categorias/form', {
      erro: 'O nome da categoria é obrigatório.',
      dados: req.body
    });
  }
  next();
}

export function validarProduto(categoriasService) {
  return async (req, res, next) => {
    const { nome, preco, categoriaId } = req.body;
    const precoNum = Number(preco);

    let erro = null;

    if (!nome || nome.trim() === '') {
      erro = 'O nome do produto é obrigatório.';
    } else if (isNaN(precoNum) || precoNum <= 0) {
      erro = 'O preço deve ser um número maior que zero.';
    } else if (!categoriaId) {
      erro = 'A categoria é obrigatória.';
    } else {
      const categoria = await categoriasService.buscarPorId(categoriaId);
      if (!categoria) {
        erro = 'A categoria informada não existe.';
      }
    }

    if (erro) {
      const categorias = await categoriasService.listar();
      return res.status(400).render('produtos/form', {
        erro,
        categorias,
        dados: req.body
      });
    }

    next();
  };
}