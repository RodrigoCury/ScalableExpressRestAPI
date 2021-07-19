const Model = require('./modelTabelaFornecedor');

class Fornecedor {
    listar() {
        return Model.findAll()
    }

    inserir(fornecedor) {
        return Model.create(fornecedor)
    }
}

module.exports = new Fornecedor();