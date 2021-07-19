const Model = require('./modelTabelaFornecedor');

class Fornecedor {
    listar() {
        return Model.findAll()
    }
}

module.exports = new Fornecedor();