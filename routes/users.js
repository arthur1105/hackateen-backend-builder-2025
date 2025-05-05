import express from 'express';

import { createUser, readUser, readUserPerId, updateUserPerId, deleteUserPerId } from '../models/users.js';

export const usersRoute = express.Router();


usersRoute.post('/users', async (req, res) => {
    const user = req.body;

    res.statusCode = 400;


    if (!user?.name) {
        const response = {
            erro: {
                mensagem: `O atributo 'name' não foi encontrado, porém é obrigatório `,
            },
        };

        return res.send(response);
    }

    if (!user?.email) {
        const response = {
            erro: {
                mensagem: `O atributo 'email' não foi encontrado, porém é obrigatório`,
            },
        };

        return res.send(response);
    }

    if (!user?.password) {
        const response = {
            erro: {
                mensagem: `O atributo 'password' não foi encontrado, porém é obrigatório`,
            },
        };

        return res.send(response);
    }

    try {
        const response = await createUser(user);
        res.statusCode = 201;

        return res.send(response);
    } catch (error) {
        if (error) {
            console.error('Erro ao criar o user:', error);

            res.statusCode = 500;
            const response = {
                erro: {
                    mensagem: `Erro ao criar o user ${user.name}`
                }
            };
            return res.send(response);
        }
    }
});

usersRoute.patch('/users/:id', async (req, res) => {

    const user = req.body;

    res.statusCode = 400;

    if (!user?.name && !user.email && !user.password) {
        const response = {
            erro: {
                mensagem: `Nenhum atributo foi encontrado, porem ao menos um é obrigatório para atualização`,
            },
        };

        return res.send(response);        
    }

    const id = req.params.id;

    try {
        const response = await updateUserPerId(id, user);
        res.statusCode = 200;

        return res.send(response);

    } catch (error) {
        console.error('Erro ao Atualizar o user:', error);

        res.statusCode = 500;
        const response = {
            erro: {
                mensagem: `Erro ao atualizar o user ${id}`
            }
        };
         return res.send(response);       
    };
});

usersRoute.delete('/users/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await deleteUserPerId(id);

        res.statusCode = 202;

        const response = {
            response: {
                mensagem: `User ${id} removido com sucesso!`,
            }
        };

        return res.send(response);

    } catch (error) {
        res.statusCode = 500;
        const response = {
            erro: {
                mensagem: `Erro ao remover o user ${id}, ${error}`
            }
        };
        return res.send(response);        
    }
});

usersRoute.get('/users/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const response = await readUserPerId(id);

        res.statusCode = 200;

        return res.send(response);      
    } catch (error) {
        res.statusCode = 404;
        const response = {
            erro: {
                mensagem: `Erro ao buscar o user ${id}, ${error}`
            }
        };
        return res.send(response);        
    }
});

usersRoute.get('/users', async (req, res) => {
    try {
        const response = await readUser();
        res.statusCode = 200;

        return res.send(response);        
    } catch (error) {

        res.statusCode = 404;
        const response = {
            erro: {
                mensagem: `Erro ao buscar os users. ${error}`
            }
        };
        return res.send(response);        
    }
});