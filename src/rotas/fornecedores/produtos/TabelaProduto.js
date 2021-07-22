// Sequelize Model
const Modelo = require('./ModelTabelaProdutos');

// Erro Não Encontrado
const ProdutoNaoEncontrado = require('../../../erros/ProdutoNaoEncontrado')

class TabelaProdutos {
    listar(idFornecedor) {
        return Modelo.findAll({
            where: {
                fornecedor: idFornecedor
            },
            raw: true,
        })
    }

    async pegarPorId(idFornecedor, idProduto) {
        const produtoEncontrado = await Modelo.findOne({
            where: {
                id: idProduto,
                fornecedor: idFornecedor,
            },
        })

        if (!produtoEncontrado) {
            throw new ProdutoNaoEncontrado()
        }

        return produtoEncontrado
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