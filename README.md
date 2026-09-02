<div align="center">


# Moby - Sua Biblioteca Pessoal

Aplicação web full-stack para gerenciar sua coleção de livros: cada usuário tem sua própria estante, com login seguro, busca, criação, edição e remoção de registros.

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?logo=mysql&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-3.x-B4CA65?logo=ejs&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

</div>

---

## Funcionalidades

- Cadastro e login de usuários com senha criptografada (bcrypt)
- Sessões persistidas no banco de dados (login continua válido entre reinícios do servidor)
- Adicionar, editar, remover e visualizar livros da sua própria estante
- Busca por título, autor, gênero ou ano de publicação
- Página de perfil com os últimos livros cadastrados
- Layout responsivo feito com Tailwind CSS
- Páginas de erro (404 / 500) personalizadas

---

## Tecnologias

**Backend:** Node.js, Express, Express-Session + Express-MySQL-Session, Bcryptjs, Dotenv
**Banco de dados:** MySQL / MySQL2
**Frontend:** EJS (renderização no servidor), Tailwind CSS v4, Vanilla JS

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- [MySQL Server](https://dev.mysql.com/downloads/installer/)

---

## Rodando localmente

**1. Clone o repositório e instale as dependências**
```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd moby-personal-library
npm install
```

**2. Crie o banco de dados**

Abra o MySQL Workbench (ou outro cliente) e execute:
```sql
CREATE SCHEMA IF NOT EXISTS moby;
USE moby;

CREATE TABLE IF NOT EXISTS users (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nom_usuario VARCHAR(20) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS livro (
    id_livro INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    titulo VARCHAR(100) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    genero VARCHAR(50),
    ano_de_publicacao INT,
    sinopse TEXT,
    FOREIGN KEY (id_usuario) REFERENCES users(id_usuario) ON DELETE CASCADE
);
```

**3. Configure as variáveis de ambiente**
```bash
cp .env.example .env
```
Edite o `.env` com os dados do seu MySQL local.

**4. Rode o servidor**
```bash
npm run dev
```
Acesse **http://localhost:3000**.

---

## Estrutura do projeto

```
├── api/index.js         # adaptador serverless usado pela Vercel
├── app.js               # configuração do Express
├── app/
│   ├── controllers/      # lógica das rotas
│   ├── daos/             # acesso ao banco de dados
│   ├── db/               # pool de conexão MySQL
│   └── views/            # páginas EJS
├── public/               # CSS, JS e imagens estáticas
├── routes/index.js       # definição das rotas
└── vercel.json           # configuração de deploy na Vercel
```

---

## Licença

Este projeto está sob a licença MIT — veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
