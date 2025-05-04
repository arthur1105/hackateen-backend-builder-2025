import express from 'express';
import { criaProduto, leProduto, leProdutoPorId, atualizaProdutoPorId, deletaProdutoPorId } from './../models.js';


export const rotasProduto = express.Router();


rotasProduto.post('/produtos', async (req, res) => {
    const produto = req.body;



    res.statusCode = 400;


    if (!produto?.nome) {
        const resposta = {
            erro: {
                mensagem: `O atributo 'nome' não foi encontrado é obrigatório`,
            },
        };

        res.send(resposta);

        return;
    }

    if (!produto?.preco) {
        const resposta = {
            erro: {
                mensagem: `O atributo 'preco' não foi encontrado é obrigatório`,
            },
        };

        res.send(resposta);

        return;
    }

    try {
        const resposta = await criaProduto(produto);
        res.statusCode = 201;

        res.send(resposta);
        return;
    } catch (erro) {
        if (erro) {
            console.error('Erro ao criar o produto:', erro);

            res.statusCode = 500;
            const resposta = {
                erro: {
                    mensagem: `Erro ao criar o produto ${produto.nome}`
                }
            };
            res.send(resposta);

            return;
        }
    }
});

rotasProduto.patch('/produtos/:id', async (req, res) => {

    const produto = req.body;

    res.statusCode = 400;


    if (!produto?.nome && !produto.preco) {
        const resposta = {
            erro: {
                mensagem: `Nenhum atributo foi encontrado, porem ao menos um é obrigatório para atualização`,
            },
        };

        res.send(resposta);

        return;
    }

    const id = req.params.id;
    try {
        const resposta = await atualizaProdutoPorId(id, produto);
        res.statusCode = 200;

        res.send(resposta);
        return;

    } catch (erro) {
        console.error('Erro ao Atualizar o produto:', erro);

        res.statusCode = 500;
        const resposta = {
            erro: {
                mensagem: `Erro ao atualizar o produto ${id}`
            }
        };
        res.send(resposta);

        return;
    };
});

rotasProduto.delete('/produtos/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const encontrado = await deletaProdutoPorId(id);

        res.statusCode = 204;

        if (!encontrado) {
            res.statusCode = 404;
        }
        res.send();

        return;
    } catch (erro) {
        console.error('Erro ao remover o produto:', erro);

        res.statusCode = 500;
        const resposta = {
            erro: {
                mensagem: `Erro ao remover o produto ${id}`
            }
        };
        res.send(resposta);

        return;
    }
});

rotasProduto.get('/produtos/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const resposta = await leProdutoPorId(id);
   
        res.statusCode = 200;
   
        if (!resposta) {
            res.statusCode = 404;       
        }

        

        res.send(resposta);

        return;
    } catch (erro) {
        console.error('Erro ao buscar o produto:', erro);

        res.statusCode = 500;
        const resposta = {
            erro: {
                mensagem: `Erro ao buscar o produto ${id}`
            }
        };
        res.send(resposta);

        return;
    }
});

rotasProduto.get('/produtos', async (req, res) => {
    try {
        const resposta = await leProduto();
        res.statusCode = 200;

        res.send(resposta);

        return ;
    } catch (erro) {
        console.error('Erro ao buscar o produtos:', erro);

        res.statusCode = 500;
        const resposta = {
            erro: {
                mensagem: `Erro ao buscar o produtos`
            }
        };
        res.send(resposta);

        return;
    }
});