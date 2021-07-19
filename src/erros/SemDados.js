class SemDados extends Error {
    constructor() {
        super("Nenhum dado foi fornecido")
        this.name = 'SemDados'
        this.idErro = 1
        this.status = 400
    }
}

module.exports = SemDados