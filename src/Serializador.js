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
    constructor(contentType, camposExtras = []) {
        super(contentType)
        this.camposPublicos = ['id', 'empresa', 'categoria', ...camposExtras]
    }
}

class SerializadorErro extends Serializador {
    constructor(contentType, camposExtras = []) {
        super(contentType)
        this.camposPublicos = ['idErro', 'message', ...camposExtras]
    }
}

module.exports = {
    Serializador,
    SerializadorFornecedor,
    SerializadorErro,
    formatosAceitos: ['application/json'],
}