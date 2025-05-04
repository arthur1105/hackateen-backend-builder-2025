import express from 'express';
import { lePedidosPorId, lePedidos, criaPedido } from './../models.js';


export const rotasPedido = express.Router();

rotasPedido.post('/pedidos', async (req, res, next) => {
    const pedido = req.body;
    
    res.statusCode = 400;

    if(!pedido?.produtos || pedido.produtos.length === 0) {
        const resposta = {
            erro: {
                mensagem: `O atributo 'produtos' não foi encontrado ou esta vazio, porem é obrigatório`,
            },
        };
 
        return res.send(resposta);
    }

    if(!pedido?.valortotal || pedido.valortotal <= 0 ) {
        const resposta = {
            erro: {
                mensagem: `O atributo 'valor total' não foi encontrado ou é menor ou igual a zero, porem é obrigatório`,
            },
        };
 
        return res.send(resposta);
    }

    try {
        const resposta = await criaPedido(pedido);

        res.status(201).send(resposta);
    }catch (erro) {
            console.error('Erro ao criar o pedido:', erro);
    
            const resposta = {
                erro: {
                    mensagem: `Erro ao criar o pedido `
                }
            };
            res.status(500).send(resposta);
    
            return;
    }


});

rotasPedido.get('/pedidos/:id', async (req, res, next) => {
     const id = req.params.id;
    
        try {
            const resposta = await lePedidosPorId(id);
       
            res.statusCode = 200;
       
            if (!resposta) {
                res.statusCode = 404;       
            }
    
            
    
            return res.send(resposta);

        } catch (erro) {
            console.error('Erro ao buscar o pedido:', erro);
    
            res.statusCode = 500;
            const resposta = {
                erro: {
                    mensagem: `Erro ao buscar o pedido ${id}`
                }
            };
            res.send(resposta);
    
            return;
        }    

});

rotasPedido.get('/pedidos', async (req, res, next) => {
     try {
            const resposta = await lePedidos();
            res.statusCode = 200;
    
            return res.send(resposta);
    
            
        } catch (erro) {
            console.error('Erro ao buscar os pedido:', erro);
    
            res.statusCode = 500;
            const resposta = {
                erro: {
                    mensagem: `Erro ao buscar os pedidos`
                }
            };
            res.send(resposta);
    
            return;
        }
});