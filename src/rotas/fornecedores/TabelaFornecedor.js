const Model = require('./modelTabelaFornecedor');
const FornecedorNaoEncontrado = require('../../erros/FornecedorNaoEncontrado')

class Fornecedor {
    listar() {
        return Model.findAll({ raw: true })
    }

    inserir(fornecedor) {
        return Model.create(fornecedor)
    }

    async pegarPorId(id) {
        const resultado = await Model.findOne({
            where: { id }
        })


        if (!resultado) {
            throw new FornecedorNaoEncontrado()
        }

        return resultado
    }

    atualizar(id, dadosParaAtualizar) {
        return Model.update(
            dadosParaAtualizar,
            {
                where: { id }
            }
        )
    }

    apagar(id) {
        return Model.destroy({
            where: { id }
        })
    }
}

module.exports = new Fornecedor();