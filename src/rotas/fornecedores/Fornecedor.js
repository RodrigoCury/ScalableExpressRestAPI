const TabelaFornecedor = require('./TabelaFornecedor')
const SemDados = require('../../erros/SemDados')
const CampoInvalido = require('../../erros/CampoInvalido')

class Fornecedor {
    constructor({ id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao }) {
        this.id = id
        this.empresa = empresa
        this.email = email
        this.categoria = categoria
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    async criar() {
        this.validar()
        const resultado = await TabelaFornecedor.inserir({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria,
        })
        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async carregar() {
        const resultado = await TabelaFornecedor.pegarPorId(this.id)
        this.empresa = resultado.empresa
        this.email = resultado.email
        this.categoria = resultado.categoria
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async atualizar() {
        await TabelaFornecedor.pegarPorId(this.id) // Checar se Fornecedor existe, se não lançará erro

        const campos = [
            'empresa', 'email', 'categoria'
        ]
        const dadosParaAtualizar = {}

        campos.forEach(campo => {
            const valor = this[campo]
            if (typeof valor === 'string' && valor.length > 0) {
                dadosParaAtualizar[campo] = valor
            }
        })

        if (Object.keys(dadosParaAtualizar).length === 0) {
            throw new SemDados()
        }

        await TabelaFornecedor.atualizar(this.id, dadosParaAtualizar)
    }

    async apagar() {
        await TabelaFornecedor.pegarPorId(this.id) // Checar se Fornecedor existe, se não lançará erro

        return TabelaFornecedor.apagar(this.id)
    }

    validar() {
        const campos = [
            'empresa', 'email', 'categoria'
        ]

        const erros = []

        campos.forEach(campo => {
            if (typeof this[campo] !== 'string') {
                erros.push(`O campo '${campo}' recebido é '${typeof this[campo]}', mas deveria ser string; `)
            } else if (this[campo].length === 0) {
                erros.push(`O campo '${campo}' recebido é string vazia; `)
            }
        })

        if (erros.length) {
            console.log(erros);
            throw new CampoInvalido(erros)
        }
    }
}

module.exports = Fornecedor