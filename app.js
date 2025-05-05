const PORT = 3000;

import sqlite3 from 'sqlite3';
import express from 'express';
import bodyParser from 'body-parser';

import { commentsRoute } from './routes/comments.js';
import { usersRoute } from './routes/users.js';
import { postsRoute } from './routes/posts.js';

import { sequelize } from './models/database.js';

const app = express();

app.use(bodyParser.json());

app.use(commentsRoute);
app.use(usersRoute);
app.use(postsRoute);


async function App() {
    const db = new sqlite3.Database('./database/database.sqlite', (erro) => {
        if (erro) {
            console.error('Erro ao inicializar o banco de dados:', erro);
            return;
        }
        console.log('Banco de dados conectado com sucesso!');
    });
    
    await sequelize.sync({force: true});

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

App();