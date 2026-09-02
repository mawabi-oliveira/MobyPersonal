const express = require('express');
const router = express.Router();

const livroController = require('../app/controllers/livroController');
const usuarioController = require('../app/controllers/usuarioController');
const authController = require('../app/controllers/authController');

// Rotas Públicas
router.get('/', (req, res) => res.render('index'));
router.get('/signup', (req, res) => res.render('signup'));
router.get('/login', (req, res) => res.render('login'));
router.post('/login', authController.login);
router.post('/register', usuarioController.registrar);
router.get('/logout', authController.logout);

// Rotas Protegidas (Exigem Login)
router.get('/adicionar', authController.verificarLogin, livroController.renderizarAdicionar);
router.get('/editar', authController.verificarLogin, livroController.renderizarEditar);
router.get('/remover', authController.verificarLogin, livroController.renderizarRemover);
router.get('/visualizar', authController.verificarLogin, livroController.visualizarLivros);
router.get('/home-logado', authController.verificarLogin, usuarioController.renderizarHomeLogado);
router.get('/perfil', authController.verificarLogin, usuarioController.renderizarPerfil);

// APIs Internas Protegidas
router.get('/livros', authController.verificarLogin, livroController.buscarLivros);
router.get('/livrosDoUsuario', authController.verificarLogin, livroController.livrosDoUsuario);
router.post('/adicionarLivro', authController.verificarLogin, livroController.adicionarLivro);
router.post('/removerLivros', authController.verificarLogin, livroController.removerLivros);
router.post('/editarLivro', authController.verificarLogin, livroController.editarLivro);

module.exports = router;