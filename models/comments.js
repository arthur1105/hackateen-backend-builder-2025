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
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'userId'
        }
    },
    postId: {
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
    } catch (error) {
        console.error('Error creating Comments:', error);
        throw error;
    }
};

export async function readComments() {
    try {
        const resultado = await Comments.findAll();
        console.log(`Comments queried successfully!`, resultado);
        return resultado;
    } catch (error) {
        console.error('Error searching Comments:', error);
        throw error;
    }
};

export async function readCommentsPerId(id) {
    try {
        const resultado = await Comments.findByPk(id);
        console.log(`Comments successfully queried!`, resultado);
        return resultado;
    } catch (error) {
        console.error('Error fetching Comments:', error);
        throw error;
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
            console.log(`Comments successfully updated!`, resultado);
        }

        return resultado;
    } catch (error) {
        console.error('Error updating Comments:', error);
        throw error;
    }
};

export async function deleteCommentsPerId(id) {
    try {
        const resultado = await Comments.destroy({ where: { id: id } });
        console.log(`Comments deleted successfully!`, resultado);
        return resultado;
    } catch (error) {
        console.error('Error deleting Comments:', error);
        throw error;
    }
};
