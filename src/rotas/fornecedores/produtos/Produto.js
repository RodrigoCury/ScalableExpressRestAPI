// DAO
const TabelaProduto = require('./TabelaProduto')

// Erros Customizados
const CampoInvalido = require('../../../erros/CampoInvalido')

class Produto {
    constructor({ id, titulo, preco, estoque, fornecedor, dataCriacao, dataAtualizacao, versao }) {
        this.id = id
        this.titulo = titulo
        this.preco = preco
        this.estoque = estoque
        this.fornecedor = fornecedor
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    async carregar() {
        const resultado = await TabelaProduto.pegarPorId(this.fornecedor, this.id)
        this.titulo = resultado.titulo
        this.preco = resultado.preco
        this.estoque = resultado.estoque
        this.fornecedor = resultado.fornecedor
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async criar() {
        this.validar()
        const resultado = await TabelaProduto.inserir({
            titulo: this.titulo,
            preco: this.preco,
            estoque: this.estoque,
            fornecedor: this.fornecedor,
        })
        this.estoque = resultado.estoque
        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async apagar() {
        await TabelaProduto.pegarPorId(this.fornecedor, this.id)

        return TabelaProduto.apagar(this.fornecedor, this.id)
    }

    validar() {
        const erros = []

        // Validar o Titulo
        if (typeof this.titulo !== 'string') {
            erros.push(`O campo 'titulo' recebido é '${typeof this.titulo}', mas deveria ser 'string'; `)
        } else if (this.titulo.length === 0) {
            erros.push(`O campo 'titulo' recebido é string vazia; `)
        }

        // Validar Estoque
        if (this.estoque !== undefined && typeof this.estoque !== 'number') {
            erros.push(`O campo 'estoque' recebido é '${typeof this.estoque}', mas deveria ser 'number' ou vazio; `)
        }
        if (typeof this.estoque === 'number' && this.estoque < 0) {
            erros.push('Não é possível ter estoque negativo')
        }

        // Validar Preço        
        if (typeof this.preco !== 'number') {
            erros.push(`O campo 'preco' recebido é '${typeof this.preco}', mas deveria ser 'number'; `)
        } else if (this.preco <= 0) {
            erros.push(`o campo 'preco' precisa ter valor positivo e não 0`)
        }

        if (erros.length) {
            throw new CampoInvalido(erros)
        }
    }
}

module.exports = Produto