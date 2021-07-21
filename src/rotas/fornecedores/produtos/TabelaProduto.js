const Modelo = require('./ModelTabelaProdutos');

class TabelaProdutos {
    listar(idFornecedor) {
        return Modelo.findAll({
            where: {
                fornecedor: idFornecedor
            },
            raw: true,
        })
    }

    pegarPorId(idFornecedor, idProduto) {
        return Modelo.findOne({
            where: {
                id: idProduto,
                fornecedor: idFornecedor,
            }
        })
    }

    inserir(produto) {
        return Modelo.create(produto)
    }

    apagar(idFornecedor, idProduto) {
        return Modelo.destroy({
            where: {
                id: idProduto,
                fornecedor: idFornecedor
            }
        })
    }
}

module.exports = new TabelaProdutos()