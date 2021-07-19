class NaoEncontrado extends Error {
    constructor() {
        super("Fornecedor não encontrado")
        this.name = 'NaoEncontrado'
        this.idErro = 0
        this.status = 404
    }
}

module.exports = NaoEncontrado