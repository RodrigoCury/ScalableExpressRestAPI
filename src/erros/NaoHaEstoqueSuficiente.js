class NaoHaEstoqueSuficiente extends Error {
    constructor() {
        super("Quantidade Solicitada para diminuir do estoque é maior que a quantidade que possuímos")
        this.name = "NaoHaEstoqueSuficiente"
        this.status = 400
        this.idErro = 5
    }
}

module.exports = NaoHaEstoqueSuficiente