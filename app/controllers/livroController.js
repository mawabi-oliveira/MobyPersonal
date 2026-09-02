const LivroDAO = require('../daos/livroDAO');

exports.renderizarAdicionar = (req, res) => res.render('adicionar');
exports.renderizarEditar = (req, res) => res.render('editar');
exports.renderizarRemover = (req, res) => res.render('remover');

exports.visualizarLivros = (req, res, next) => {
    LivroDAO.buscarTodosPorUsuario(req.session.usuario.id_usuario, (error, livros) => {
        if (error) return next(error);
        res.render('visualizar', { livros });
    });
};

exports.buscarLivros = (req, res, next) => {
    const searchTerm = req.query.search ? req.query.search.trim() : '';
    const id_usuario = req.session.usuario.id_usuario;
    const callback = (error, livros) => {
        if (error) return next(error);
        res.render('visualizar', { livros });
    };

    if (searchTerm) {
        LivroDAO.buscarPorTermoDePesquisa(searchTerm, id_usuario, callback);
    } else {
        LivroDAO.buscarTodosPorUsuario(id_usuario, callback);
    }
};

exports.livrosDoUsuario = (req, res, next) => {
    LivroDAO.buscarTodosPorUsuario(req.session.usuario.id_usuario, (error, livros) => {
        if (error) return next(error);
        res.json(livros);
    });
};

exports.adicionarLivro = (req, res, next) => {
    let { titulo, autor, genero, ano_de_publicacao, sinopse } = req.body;
    const id_usuario = req.session.usuario.id_usuario;

    // Sanitização básica (Remove espaços inúteis)
    titulo = titulo?.trim();
    autor = autor?.trim();
    genero = genero?.trim();
    sinopse = sinopse?.trim();
    const ano = parseInt(ano_de_publicacao, 10);

    // Validações estritas
    if (!titulo || !autor || !genero || !ano_de_publicacao || !sinopse) {
        return res.render('adicionar', { mensagem: 'Todos os campos são obrigatórios e não podem conter apenas espaços.', tipo: 'erro' });
    }

    if (isNaN(ano) || ano < 0 || ano > 2026) {
        return res.render('adicionar', { mensagem: 'Insira um ano de publicação válido (entre 0 e 2026).', tipo: 'erro' });
    }

    if (titulo.length > 255 || autor.length > 255 || genero.length > 100) {
        return res.render('adicionar', { text: 'O tamanho dos campos excede o limite permitido.', tipo: 'erro' });
    }

    LivroDAO.adicionar(titulo, autor, genero, ano, sinopse, id_usuario, (error) => {
        if (error) return next(error);
        res.render('adicionar', { mensagem: 'Livro adicionado com sucesso', tipo: 'sucesso' });
    });
};

exports.removerLivros = (req, res, next) => {
    const { id_livro } = req.body;
    const id_usuario = req.session.usuario.id_usuario;

    if (!id_livro || isNaN(parseInt(id_livro, 10))) {
        return res.render('remover', { mensagem: 'ID do livro inválido.', tipo: 'erro' });
    }

    LivroDAO.buscarTodosPorUsuario(id_usuario, (error, livros) => {
        if (error) return next(error);

        const livro = livros.find(l => l.id_livro == id_livro);
        if (!livro) {
            return res.render('remover', { mensagem: 'Você não tem permissão para remover este livro', tipo: 'erro' });
        }

        LivroDAO.remover(id_livro, (error) => {
            if (error) return next(error);
            res.render('remover', { mensagem: 'Livro removido com sucesso', tipo: 'sucesso' });
        });
    });
};

exports.editarLivro = (req, res, next) => {
    let { id, titulo, autor, sinopse } = req.body;
    const id_usuario = req.session.usuario.id_usuario;

    id = parseInt(id, 10);
    titulo = titulo?.trim();
    autor = autor?.trim();
    sinopse = sinopse?.trim();

    if (!id || isNaN(id) || !titulo || !autor || !sinopse) {
        return res.render('editar', { mensagem: 'Todos os campos são obrigatórios.', tipo: 'erro' });
    }

    if (titulo.length > 255 || autor.length > 255) {
        return res.render('editar', { mensagem: 'O tamanho dos campos excede o limite permitido.', tipo: 'erro' });
    }

    LivroDAO.buscarTodosPorUsuario(id_usuario, (error, livros) => {
        if (error) return next(error);

        const livroPertenceAoUsuario = livros.some(l => l.id_livro == id);
        if (!livroPertenceAoUsuario) {
            return res.render('editar', { mensagem: 'Você não tem permissão para editar este livro', tipo: 'erro' });
        }

        LivroDAO.editar(id, titulo, autor, sinopse, (error) => {
            if (error) return next(error);
            res.render('editar', { mensagem: 'Livro editado com sucesso', tipo: 'sucesso' });
        });
    });
};