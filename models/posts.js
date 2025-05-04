import { sequelize } from './database.js';
import Sequelize from 'sequelize';

import { User } from './users.js';

export const Posts = sequelize.define('posts', {
    postId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.ENUM('event', 'request', 'alert'),
        allowNull: false,
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    place: {
        type: Sequelize.STRING,
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'userId'
        }
    }
});

export async function createPost(post) {
    try {
        const resultado = await Posts.create(post);
        console.log(`Post ${resultado.title} foi criado com sucesso!`);
        return resultado;
    } catch (erro) {
        console.error('Erro ao criar o Post:', erro);
        throw erro;
    }
};

export async function readPosts() {
    try {
        const resultado = await Posts.findAll();
        console.log(`Posts consultados com sucesso!`, resultado);
        return resultado;
    } catch (erro) {
        console.error('Erro ao buscar o Posts:', erro);
        throw erro;
    }
};

export async function readPostsPerId(id) {
    try {
        const resultado = await Posts.findByPk(id);
        console.log(`Post consultado com sucesso!`, resultado);
        return resultado;
    } catch (erro) {
        console.error('Erro ao buscar o Posts:', erro);
        throw erro;
    }
};

export async function updatePostPerId(id, dadosPost) {
    try {
        const resultado = await Posts.findByPk(id);
        if (resultado?.id) {
            for (const chave in dadosPost) {
                if (chave in resultado) {
                    resultado[chave] = dadosPost[chave];
                }
            }
            resultado.save();
            console.log(`Post atualizado com sucesso!`, resultado);
        }

        return resultado;
    } catch (erro) {
        console.error('Erro ao atualizar o Posts:', erro);
        throw erro;
    }
};

export async function deletePostPerId(id) {
    try {
        const resultado = await Posts.destroy({ where: { id: id } });
        console.log(`Post deletado com sucesso!`, resultado);
        return resultado;
    } catch (erro) {
        console.error('Erro ao deletar o Post:', erro);
        throw erro;
    }
};
