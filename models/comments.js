import { sequelize } from './database.js';
import Sequelize from 'sequelize';

export const Comments = sequelize.define('comments', {
    comment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId:{
        type: Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'userId'
        }
    },
    postId:{
        type: Sequelize.INTEGER,
        references: {
            model: 'posts',
            key: 'postId'
        }
    }
});

export async function createComment(comment) {
    try {
        const resultado = await Comments.create(comment);
        console.log(`Comments ${resultado.nome} foi criado com sucesso!`);
        return resultado;
    } catch (erro) {
        console.error('Erro ao criar o Comments:', erro);
        throw erro;
    }
};

export async function readComments() {
    try {
        const resultado = await Comments.findAll();
        console.log(`Comments consultados com sucesso!`, resultado);
        return resultado;
    } catch (erro) {
        console.error('Erro ao buscar os Comments:', erro);
        throw erro;
    }
};

export async function readCommentsPerId(id) {
    try {
        const resultado = await Comments.findByPk(id);
        console.log(`Comments consultado com sucesso!`, resultado);
        return resultado;
    } catch (erro) {
        console.error('Erro ao buscar os Comments:', erro);
        throw erro;
    }
};

export async function updateCommentsPerId(id, dadosComments) {
    try {
        const resultado = await Comments.findByPk(id);
        if (resultado?.id) {
            for (const chave in dadosComments) {
                if (chave in resultado) {
                    resultado[chave] = dadosComments[chave];
                }
            }
            resultado.save();
            console.log(`Comments atualizado com sucesso!`, resultado);
        }

        return resultado;
    } catch (erro) {
        console.error('Erro ao atualizar os Comments:', erro);
        throw erro;
    }
};

export async function deleteCommentsPerId(id) {
    try {
        const resultado = await Comments.destroy({ where: { id: id } });
        console.log(`Comments deletado com sucesso!`, resultado);
        return resultado;
    } catch (erro) {
        console.error('Erro ao deletar os Comments:', erro);
        throw erro;
    }
};
