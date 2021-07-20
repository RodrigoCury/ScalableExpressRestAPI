const ConteudoNaoSuportado = require("./erros/ConteudoNaoSuportado")
const jsontoxml = require('jsontoxml')

class Serializador {

    constructor(contentType) {
        this.contentType = contentType
    }

    serializar(dados) {
        dados = this.filtrar(dados)

        if (this.contentType === 'application/json') {
            return this.json(dados)
        } else if (this.contentType === 'application/xml') {
            return this.xml(dados)
        } else {
            throw new ConteudoNaoSuportado(this.contentType)
        }
    }

    json(dados) {
        return JSON.stringify(dados)
    }

    xml(dados) {
        let tag = this.tagSingular

        if (Array.isArray(dados)) {
            tag = this.tagPlural
            dados = dados.map(dado => {
                return {
                    [this.tagSingular]: dado
                }
            })
        }
        return jsontoxml({
            [tag]: dados
        })
    }

    filtarObjeto(dados) {
        const novoObjeto = {}

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
        this.tagSingular = 'fornecedor'
        this.tagPlural = 'fornecedores'
    }
}

class SerializadorErro extends Serializador {
    constructor(contentType, camposExtras = []) {
        super(contentType)
        this.camposPublicos = ['idErro', 'message', ...camposExtras]
        this.tagSingular = 'Erro'
        this.tagPlural = 'Erros'
    }
}

module.exports = {
    Serializador,
    SerializadorFornecedor,
    SerializadorErro,
    formatosAceitos: [
        'application/json',
        'application/xml',
    ],
}