const LivroDAO = require('../daos/livroDAO');
const UsuarioDAO = require('../daos/usuarioDAO');

exports.renderizarHomeLogado = (req, res) => {
    res.render('home-logado', { nom_usuario: req.session.nom_usuario });
};

exports.renderizarPerfil = (req, res, next) => {
    LivroDAO.buscarTodosPorUsuario(req.session.usuario.id_usuario, (error, livros) => {
        if (error) return next(error);
        const cincoPrimeirosLivros = livros.slice(0, 5);
        res.render('perfil', { nom_usuario: req.session.nom_usuario, livros: cincoPrimeirosLivros });
    });
};

exports.listarUsuarios = (req, res, next) => {
    UsuarioDAO.buscarTodos((error, resultados) => {
        if (error) return next(error);
        res.status(200).json(resultados);
    });
};

exports.registrar = (req, res, next) => {
    let { nom_usuario, senha } = req.body;

    nom_usuario = nom_usuario?.trim();

    if (!nom_usuario || nom_usuario.length < 3) {
        return res.render('signup', { error: 'O nome de usuário deve ter no mínimo 3 caracteres.' });
    }

    // RegEx para impedir caracteres especiais e injeções no nome do usuário
    const usuarioValido = /^[a-zA-Z0-9_]+$/.test(nom_usuario);
    if (!usuarioValido) {
        return res.render('signup', { error: 'O nome de usuário pode conter apenas letras, números e underlines (_).' });
    }

    if (!senha || senha.length < 8) {
        return res.render('signup', { error: 'A senha deve ter no mínimo 8 caracteres.' });
    }

    UsuarioDAO.buscarPorUsuario(nom_usuario, (error, usuarioEncontrado) => {
        if (error) return next(error);
        if (usuarioEncontrado) {
            return res.render('signup', { error: 'Usuário já existe' });
        }
        UsuarioDAO.adicionar(nom_usuario, senha, (error) => {
            if (error) return next(error);
            res.redirect('/login');
        });
    });
};