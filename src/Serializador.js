class Serializador {

    constructor(contentType) {
        this.contentType = contentType
    }

    serializar(dados) {
        if (this.contentType === 'application/json') {
            return this.json(
                this.filtrar(dados)
            )
        }
    }

    json(dados) {
        return JSON.stringify(dados)
    }

    filtarObjeto(dados) {
        const novoObjeto = {}

        console.log(this);

        this.camposPublicos.forEach(campo => {
            if (dados.hasOwnProperty(campo)) {
                novoObjeto[campo] = dados[campo]
            }
        })

        return novoObjeto
    }

    filtrar(dados) {
        if (Array.isArray(dados)) {
            dados = dados.map(dado => this.filtarObjeto(dado))
        } else {
            dados = this.filtarObjeto(dados)
        }

        return dados
    }
}

class SerializadorFornecedor extends Serializador {
    constructor(contentType) {
        super(contentType)
        this.camposPublicos = ['id', 'empresa', 'categoria']
    }
}

module.exports = {
    Serializador,
    SerializadorFornecedor,
    formatosAceitos: ['application/json'],
}