const Modelo = require('./ModelTabelaProdutos');

class TabelaProdutos {
    listar(idFornecedor) {
        return Modelo.findAll({
            where: {
                fornecedor: idFornecedor
            }
        })
    }
}

module.exports = new TabelaProdutos()