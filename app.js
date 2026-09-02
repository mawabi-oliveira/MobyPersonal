const path = require('path');
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config();

const pool = require('./app/db/database');

const app = express();
const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.set('trust proxy', 1);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sessionStore = new MySQLStore({}, pool);

app.use(session({
    key: 'moby_session',
    secret: process.env.SESSION_SECRET || 'moby_secret_key_1234',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 4, // 4 horas
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax'
    }
}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

const routes = require('./routes');
app.use('/', routes);

app.use((req, res) => {
    res.status(404).render('404');
});

// Middleware central de erros
app.use((err, req, res, next) => {
    console.error('--- ERRO DETECTADO NA APLICAÇÃO ---');
    console.error(err);
    console.error('-----------------------------------');
    res.status(500).render('500');
});


if (require.main === module) {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
}

module.exports = app;
