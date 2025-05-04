import sqlite3 from 'sqlite3';
import { sequelize } from './models.js';
import express from 'express';
import bodyParser from 'body-parser';
import {rotasProduto} from './routes/produtos.js';
import {rotasPedido} from './routes/pedidos.js';



const app = express();

app.use(bodyParser.json());

app.use(rotasProduto);

app.use(rotasPedido);






async function InicializaApp() {
    const db = new sqlite3.Database('./dados.db', (erro) => {
        if (erro) {
            console.error('Erro ao inicializar o banco de dados:', erro);
            return;
        }
        console.log('Banco de dados conectado com sucesso!');
    });
    await sequelize.sync();


    const porta = 3000;

    app.listen(porta);
}


InicializaApp();