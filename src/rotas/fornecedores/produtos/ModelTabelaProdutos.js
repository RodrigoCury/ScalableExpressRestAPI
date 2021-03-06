const Sequelize = require('sequelize')
const instancia = require('../../../banco-de-dados/index')

const colunas = {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    preco: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    estoque: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    fornecedor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: require('../modelTabelaFornecedor'),
            key: 'id',
        }
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'produtos',
    timeStamps: true,
    createdAt: "dataCriacao",
    updatedAt: "dataAtualizacao",
    version: "versao",
}


module.exports = instancia.define('produto', colunas, opcoes)