class ConteudoNaoSuportado extends Error {
    constructor(contentType) {
        super(`O tipo de Conteúdo '${contentType}' não é suportado pela aplicação`)

        this.name = 'ConteudoNaoSuportado'

        this.idErro = 3

        this.status = 406
    }
}

module.exports = ConteudoNaoSuportado