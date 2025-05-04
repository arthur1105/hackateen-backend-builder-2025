import Sequelize from 'sequelize';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './dados.db'
});

sequelize.authenticate();

export const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

export const Posts = sequelize.define('posts', {
    id: {
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
            key: 'id'
        }
    }
});

export const Comentarios = sequelize.define('comentarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    postId: {
        type: Sequelize.INTEGER,
        references: {
            model: Posts,
            key: 'id'
        }
    }
});

export const Produto = sequelize.define('produto', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    preco: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
});

export async function criaProduto(produto) {
    try {
        const resultado = await Produto.create(produto);
        console.log(`Produto ${resultado.nome} foi criado com sucesso!`);
        return resultado;
    } catch (erro) {
        console.error('Erro ao criar o produto:', erro);
        throw erro;
    }
};

export async function leProduto() {
    try {
        const resultado = await Produto.findAll();
        console.log(`Produtos consultados com sucesso!`, resultado);
        return resultado;
    } catch (erro) {
        console.error('Erro ao buscar o produto:', erro);
        throw erro;
    }
};

export async function leProdutoPorId(id) {
    try {
        const resultado = await Produto.findByPk(id);
        console.log(`Produto consultado com sucesso!`, resultado);
        return resultado;
    } catch (erro) {
        console.error('Erro ao buscar o produto:', erro);
        throw erro;
    }
};

export async function atualizaProdutoPorId(id, dadosProduto) {
    try {
        const resultado = await Produto.findByPk(id);
        if (resultado?.id) {
            for (const chave in dadosProduto) {
                if (chave in resultado) {
                    resultado[chave] = dadosProduto[chave];
                }
            }
            resultado.save();
            console.log(`Produto atualizado com sucesso!`, resultado);
        }

        return resultado;
    } catch (erro) {
        console.error('Erro ao atualizar o produto:', erro);
        throw erro;
    }
};

export async function deletaProdutoPorId(id) {
    try {
        const resultado = await Produto.destroy({ where: { id: id } });
        console.log(`Produto deletado com sucesso!`, resultado);
        return resultado;
    } catch (erro) {
        console.error('Erro ao deletar o produto:', erro);
        throw erro;
    }
};

const Pedido = sequelize.define('pedido', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    valor_total: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    estado: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const ProdutoPedido = sequelize.define('produtos_pedido', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    preco: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
});

Produto.belongsToMany(Pedido, { through: ProdutoPedido });
Pedido.belongsToMany(Produto, { through: ProdutoPedido });






export async function criaPedido(novoPedido) {
    try {
        const pedido = await Pedido.create({
            valor_total: 0,
            estado: "ENCAMINHADO"
        });

        for (const prod of novoPedido.produtos) {
            const produto = await Produto.findByPk(prod.id);
            if (produto) {
                pedido.addProduto(produto, { through: { quantidade: prod.quantidade, preco: produto.preco } });
            }
            pedido.valor_total += prod.preco * prod.quantidade;

        }

        console.log(`Pedido foi criado com sucesso!`);
        console.log(`Valor total do pedido: ${pedido.valor_total}`);

        return pedido;
    } catch (erro) {
        console.error('Erro ao criar o pedido:', erro);
        throw erro;
    }
}

export async function lePedidos() {
    try {
        const resultado = await ProdutoPedido.findAll();
        console.log(`Pedidos consultados com sucesso!`, resultado);
        return resultado;
    } catch (error) {
        console.error('Erro ao consultar os pedidos:', erro);
        throw erro;
    }

}

export async function lePedidosPorId(id) {
    try {
        const resultado = await Pedido.findByPk(id);
        console.log(`Pedido consultado com sucesso!`, resultado);
        return resultado;
    } catch (error) {
        console.error('Erro ao consultar o pedido:', erro);
        throw erro;
    }

}
