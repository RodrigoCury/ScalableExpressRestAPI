// DAO
const TabelaProduto = require('./TabelaProduto')

// Erros Customizados
const CampoInvalido = require('../../../erros/CampoInvalido')
const SemDados = require('../../../erros/SemDados')

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
        const resultado = await TabelaProduto.pegarPorId(this.fornecedor, this.id) // Retorna Erro se não existir no DB
        this.titulo = resultado.titulo
        this.preco = resultado.preco
        this.estoque = resultado.estoque
        this.fornecedor = resultado.fornecedor
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async criar() {
        this.validarCriacao()
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

    async atualizar() {
        await TabelaProduto.pegarPorId(this.fornecedor, this.id) // Retorna Erro se não existir no DB

        // Validação ed dados recebidos
        const dadosParaAtualizar = this.validarAtualizacao() // Lancará erro se algum dado for inválido

        await TabelaProduto.atualizar(this.id, this.fornecedor, dadosParaAtualizar)
    }

    async apagar() {
        await TabelaProduto.pegarPorId(this.fornecedor, this.id) // Retorna Erro se não existir no DB

        return TabelaProduto.apagar(this.fornecedor, this.id)
    }

    validarCriacao() {
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

    validarAtualizacao() {
        // Objeto de Atualiação

        const dadosParaAtualizar = {}

        // Lista de Erros
        const erros = []

        // Validar o Titulo
        if (this.titulo !== undefined) {
            if (typeof this.titulo !== 'string') {
                erros.push(`O campo 'titulo' recebido é '${typeof this.titulo}', mas deveria ser 'string'; `)
            } else if (this.titulo.length === 0) {
                erros.push(`O campo 'titulo' recebido é string vazia; `)
            }
            dadosParaAtualizar.titulo = this.titulo
        }

        // Validar Estoque
        if (this.estoque !== undefined) {
            if (typeof this.estoque !== 'number') {
                erros.push(`O campo 'estoque' recebido é '${typeof this.estoque}', mas deveria ser 'number' ou vazio; `)
            } else if (this.estoque < 0) {
                erros.push('Não é possível ter estoque negativo')
            }
            dadosParaAtualizar.estoque = this.estoque
        }

        // Validar Preço        
        if (this.preco !== undefined) {
            if (typeof this.preco !== 'number') {
                erros.push(`O campo 'preco' recebido é '${typeof this.preco}', mas deveria ser 'number'; `)
            } else if (this.preco <= 0) {
                erros.push(`o campo 'preco' precisa ter valor positivo e não 0`)
            }

            dadosParaAtualizar.preco = this.preco
        }

        if (erros.length) {
            throw new CampoInvalido(erros)
        }

        if (!Object.keys(dadosParaAtualizar).length) {
            throw new SemDados()
        }

        return dadosParaAtualizar
    }
}

module.exports = Produto