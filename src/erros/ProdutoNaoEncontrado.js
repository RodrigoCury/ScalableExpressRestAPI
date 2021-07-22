class ProdutoNaoEncontrado extends Error {
    constructor() {
        super("Produto não encontrado")
        this.name = 'ProdutoNaoEncontrado'
        this.idErro = 4
        this.status = 404
    }
}

module.exports = ProdutoNaoEncontrado