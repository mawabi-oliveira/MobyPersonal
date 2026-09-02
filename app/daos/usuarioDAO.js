const db = require('../db/database');
const bcrypt = require('bcryptjs');

class UsuarioDAO {
    buscarPorUsuario(nom_usuario, callback) {
        const sql = 'SELECT * FROM users WHERE nom_usuario = ?';
        db.query(sql, [nom_usuario], (error, results) => {
            if (error) return callback(error, null);
            if (results.length > 0) return callback(null, results[0]);
            return callback(null, null);
        });
    }

    adicionar(nom_usuario, senha, callback) {
        // Criptografia assíncrona para não travar a aplicação
        bcrypt.hash(senha, 10, (err, hash) => {
            if (err) return callback(err);
            
            const sql = 'INSERT INTO users (nom_usuario, senha) VALUES (?, ?)';
            db.query(sql, [nom_usuario, hash], (error, results) => {
                if (error) return callback(error);
                callback(null);
            });
        });
    }

    buscarTodos(callback) {
        // Removida a senha do SELECT por segurança
        const sql = 'SELECT id_usuario, nom_usuario FROM users';
        db.query(sql, (error, results) => {
            if (error) return callback(error, null);
            callback(null, results);
        });
    }
}

module.exports = new UsuarioDAO();