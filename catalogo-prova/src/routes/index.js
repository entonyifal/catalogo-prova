import { Router } from 'express';
import { categoriasRepository } from '../repositories/categorias.repository.prisma.js';
import { produtosRepository } from '../repositories/produtos.repository.prisma.js';
import { criarCategoriasService } from '../services/categorias.service.js';
import { criarProdutosService } from '../services/produtos.service.js';
import { criarCategoriasController } from '../controllers/categorias.controller.js';
import { criarProdutosController } from '../controllers/produtos.controller.js';
import { validarCategoria, validarProduto } from '../middlewares/validacao.middleware.js';

const router = Router();

const categoriasService = criarCategoriasService(categoriasRepository);
const produtosService = criarProdutosService(produtosRepository, categoriasRepository);

const categoriasController = criarCategoriasController(categoriasService);
const produtosController = criarProdutosController(produtosService, categoriasService);

router.get('/', (req, res) => {
  res.redirect('/produtos');
});

router.get('/categorias', (req, res, next) => categoriasController.listar(req, res, next));
router.get('/categorias/nova', (req, res) => categoriasController.exibirFormulario(req, res));
router.post('/categorias', validarCategoria, (req, res, next) => categoriasController.criar(req, res, next));

router.get('/produtos', (req, res, next) => produtosController.listar(req, res, next));
router.get('/produtos/novo', (req, res, next) => produtosController.exibirFormulario(req, res, next));
router.post('/produtos', validarProduto(categoriasService), (req, res, next) => produtosController.criar(req, res, next));

export default router;