import { sequelize } from './database.js';
import Sequelize from 'sequelize';

export const User = sequelize.define('user', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

export async function createUser(user) {
    try {
        const resultado = await User.create(user);
        console.log(`User ${resultado.nome} foi criado com sucesso!`);
        return resultado;
    } catch (erro) {
        console.error('Erro ao criar o User:', erro);
        throw erro;
    }
};

export async function readUser() {
    try {
        const resultado = await User.findAll();
        console.log(`Users consultados com sucesso!`, resultado);
        return resultado;
    } catch (erro) {
        console.error('Erro ao buscar o User:', erro);
        throw erro;
    }
};

export async function readUserPerId(id) {
    try {
        const resultado = await User.findByPk(id);
        console.log(`User consultado com sucesso!`, resultado);
        return resultado;
    } catch (erro) {
        console.error('Erro ao buscar o User:', erro);
        throw erro;
    }
};

export async function updateUserPerId(id, dadosUser) {
    try {
        const resultado = await User.findByPk(id);
        if (resultado?.id) {
            for (const chave in dadosUser) {
                if (chave in resultado) {
                    resultado[chave] = dadosUser[chave];
                }
            }
            resultado.save();
            console.log(`User atualizado com sucesso!`, resultado);
        }

        return resultado;
    } catch (erro) {
        console.error('Erro ao atualizar o User:', erro);
        throw erro;
    }
};

export async function deleteUserPerId(id) {
    try {
        const resultado = await User.destroy({ where: { id: id } });
        console.log(`User deletado com sucesso!`, resultado);
        return resultado;
    } catch (erro) {
        console.error('Erro ao deletar o produto:', erro);
        throw erro;
    }
};
