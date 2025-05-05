import { sequelize } from './database.js';
import Sequelize from 'sequelize';

import { User } from './users.js';
import { Posts } from './posts.js';

export const Comments = sequelize.define('comments', {
    commentId: {
    commentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
        validate: {
            isDate: {
                msg: 'Data inválida!'
            }
        }
    },
    userId: {
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'userId'
        },
        onDelete: 'CASCADE'
    },
    postId: {
    postId: {
        type: Sequelize.INTEGER,
        references: {
            model: Posts,
            key: 'postId'
        },
        onDelete: 'CASCADE'
    }
});

export async function createComment(comment) {
    try {
        const result = await Comments.create(comment);
        console.log(`Comentário ${result.commentId} foi criado com sucesso!`);
        return result;
    } catch (error) {
        console.error('Erro ao criar o Comentário:', error);
        throw error;
    }
};

export async function readComments() {
    try {
        const result = await Comments.findAll();
        console.log(`Comentários consultados com sucesso!`, result);
        return result;
    } catch (error) {
        console.error('Erro ao buscar os comentários:', error);
        throw error;
    }
};

export async function readCommentsPerId(id) {
    try {
        const result = await Comments.findByPk(id);
        if (result === null) {
            throw "Comentário não encontrado!";
        }
        console.log(`Comentário consultado com sucesso!`, result);
        return result;
    } catch (error) {
        console.error('Erro ao buscar o Comentário:', error);
        throw error;
    }
};

export async function updateCommentsPerId(id, dataComments) {
    try {
        const result = await Comments.findByPk(id);
        if (result) {
            for (const key in dataComments) {
                if (Object.hasOwn(result.dataValues, key)) {
                    result[key] = dataComments[key];
                }
            }
            await result.save();
            console.log(`Comentário atualizado com sucesso!`, result);
        } else {
            console.log(`Comentário não encontrado!`);
        }

        return result;
    } catch (error) {
        console.error('Erro ao atualizar o Comentário:', error);
        throw error;
    }
};

export async function deleteCommentsPerId(id) {
    try {
        const result = await Comments.destroy({ where: { commentId: id } });
        console.log(`Comentário deletado com sucesso!`, result);
        return result;
    } catch (error) {
        console.error('Erro ao deletar o Comentário:', error);
        throw error;
    }
};
