const mysql = require('mysql2');
require('dotenv').config();

// Em ambiente serverless (Vercel) cada instância da função pode criar seu próprio
// pool: mantenha connectionLimit baixo para não estourar o limite de conexões
// simultâneas do seu provedor de MySQL (a maioria dos planos gratuitos permite poucas).
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'moby',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: process.env.DB_CONNECTION_LIMIT ? Number(process.env.DB_CONNECTION_LIMIT) : 5,
    queueLimit: 0
});

module.exports = pool;
