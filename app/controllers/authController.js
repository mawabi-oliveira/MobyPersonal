const bcrypt = require('bcryptjs');
const UsuarioDAO = require('../daos/usuarioDAO');

exports.verificarLogin = (req, res, next) => {
    const id_usuario = req.session.usuario ? req.session.usuario.id_usuario : null;
    if (!id_usuario) {
        return res.redirect('/login');
    }
    next();
};

exports.login = (req, res, next) => {
    const { nom_usuario, senha } = req.body;

    UsuarioDAO.buscarPorUsuario(nom_usuario, (error, usuarioEncontrado) => {
        if (error) return next(error); // Encaminha o erro para o middleware centralizado
        
        if (!usuarioEncontrado) {
            return res.render('login', { error: 'Usuário ou senha incorretos' });
        }
        
        bcrypt.compare(senha, usuarioEncontrado.senha, (err, result) => {
            if (err) return next(err);
            
            if (result) {
                req.session.usuario = usuarioEncontrado;
                req.session.nom_usuario = nom_usuario;
                res.redirect('/home-logado');
            } else {
                res.render('login', { error: 'Usuário ou senha incorretos' });
            }
        });
    });
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao fazer logout:', err);
        }
        res.redirect('/login');
    });
};