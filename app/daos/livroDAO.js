const db = require('../db/database');

class LivroDAO {
    buscarTodos(callback) {
        const sql = 'SELECT * FROM livro';
        db.query(sql, (error, results) => {
            if (error) return callback(error, null);
            callback(null, results);
        });
    }

    editar(id_livro, titulo, autor, sinopse, callback) {
        const sql = 'UPDATE livro SET titulo = ?, autor = ?, sinopse = ? WHERE id_livro = ?';
        db.query(sql, [titulo, autor, sinopse, id_livro], (error, results) => {
            if (error) return callback(error);
            callback(null);
        });
    }

    remover(id_livro, callback) {
        const sql = 'DELETE FROM livro WHERE id_livro = ?';
        db.query(sql, [id_livro], (error, results) => {
            if (error) return callback(error);
            callback(null);
        });
    }

    adicionar(titulo, autor, genero, ano, sinopse, id_usuario, callback) {
        const sql = 'INSERT INTO livro (titulo, autor, genero, ano_de_publicacao, sinopse, id_usuario) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sql, [titulo, autor, genero, ano, sinopse, id_usuario], (error, results) => {
            if (error) return callback(error);
            callback(null);
        });
    }

    buscarTodosPorUsuario(id_usuario, callback) {
        const sql = 'SELECT * FROM livro WHERE id_usuario = ?';
        db.query(sql, [id_usuario], (error, results) => {
            if (error) return callback(error, null);
            callback(null, results);
        });
    }

    buscarPorTermoDePesquisa(searchTerm, id_usuario, callback) {
        const sql = 'SELECT * FROM livro WHERE (titulo LIKE ? OR autor LIKE ? OR genero LIKE ? OR ano_de_publicacao LIKE ?) AND id_usuario = ?';
        const searchTermWithWildcard = '%' + searchTerm + '%';
        db.query(sql, [searchTermWithWildcard, searchTermWithWildcard, searchTermWithWildcard, searchTermWithWildcard, id_usuario], (error, results) => {
            if (error) return callback(error, null);
            callback(null, results);
        });
    }
}

module.exports = new LivroDAO();