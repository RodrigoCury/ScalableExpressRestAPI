const Model = require('./modelTabelaFornecedor');

class Fornecedor {
    listar() {
        return Model.findAll()
    }

    inserir(fornecedor) {
        return Model.create(fornecedor)
    }

    async pegarPorId(id) {
        const resultado = await Model.findOne({
            where: { id }
        })


        if (!resultado) {
            throw new Error("Fornecedor não encontrado")
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