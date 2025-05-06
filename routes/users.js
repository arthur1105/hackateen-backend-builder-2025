/**
 * @swagger
 * tags:
 *   - name: Usuários
 *     description: Operações relacionadas aos usuários
 */

import express from 'express';

import { createUser, readUser, readUserPerId, updateUserPerId, deleteUserPerId } from '../models/users.js';

export const usersRoute = express.Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ryan
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               password:
 *                 type: string
 *                 example: password@123
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Dados inválidos ou campos obrigatórios ausentes
 *       500:
 *         description: Erro interno ao criar usuário
 */
usersRoute.post('/users', async (req, res) => {
    const user = req.body;

    res.statusCode = 400;
    try {
        if (!user.name && !user.email && !user.password) {
            const response = {
                erro: {
                    mensagem: `Todos os campos obrigatorios devem ser preenchidos `,
                },
            };
            return res.send(response);
        }
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


/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Atualiza um usuário existente
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Nenhum atributo fornecido para atualização
 *       500:
 *         description: Erro ao atualizar usuário
 */
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


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       202:
 *         description: Usuário removido com sucesso
 *       500:
 *         description: Erro ao remover usuário
 */
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


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: Usuário não encontrado
 */
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


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários cadastrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *       404:
 *         description: Nenhum usuário encontrado
 */
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