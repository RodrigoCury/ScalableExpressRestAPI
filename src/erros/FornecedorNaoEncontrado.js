class FornecedorNaoEncontrado extends Error {
    constructor() {
        super("Fornecedor não encontrado")
        this.name = 'FornecedorNaoEncontrado'
        this.idErro = 0
        this.status = 404
    }
}

module.exports = FornecedorNaoEncontrado