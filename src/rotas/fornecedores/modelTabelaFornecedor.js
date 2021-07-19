const { Sequelize } = require('sequelize')
const instancia = require('../../banco-de-dados')

const colunas = {
    expresa: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    categoria: {
        type: Sequelize.ENUM("ração", "brinquedos"), // Apenas Essas opções
        allowNull: false,
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'fornecedores',
    timeStamps: true,
    createdAt: "dataCriacao",
    updatedAt: "dataAtualizacao",
    version: "versao",
}

module.exports = instancia.define("fornecedores", colunas, opcoes)