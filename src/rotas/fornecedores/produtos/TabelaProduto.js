const instancia = require('../../../banco-de-dados');

// Sequelize Model
const Modelo = require('./ModelTabelaProdutos');

// Erro Não Encontrado
const ProdutoNaoEncontrado = require('../../../erros/ProdutoNaoEncontrado');

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

    atualizar(idProduto, idFornecedor, dadosParaAtualizar) {
        return Modelo.update(dadosParaAtualizar, {
            where: {
                id: idProduto,
                fornecedor: idFornecedor
            }
        })
    }

    apagar(idFornecedor, idProduto) {
        return Modelo.destroy({
            where: {
                id: idProduto,
                fornecedor: idFornecedor
            }
        })
    }

    subtrair(idProduto, idFornecedor, campo, quantidade) {
        return instancia.transaction(async transacao => {
            const produto = await Modelo.findOne({
                where: {
                    id: idProduto,
                    fornecedor: idFornecedor
                }
            })

            produto[campo] = quantidade

            await produto.save()

            return produto
        })
    }
}

module.exports = new TabelaProdutos()