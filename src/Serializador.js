class Serializador {

    constructor(contentType) {
        this.contentType = contentType
    }

    serializar(dados) {
        if (this.contentType === 'application/json') {
            return this.json(dados)
        }
    }

    json(dados) {
        return JSON.stringify(dados)
    }
}

class SerializadorFornecedor extends Serializador {
    constructor(contentType) {
        super(contentType)
    }
}

module.exports = {
    Serializador,
    SerializadorFornecedor,
    formatosAceitos: ['application/json'],
}