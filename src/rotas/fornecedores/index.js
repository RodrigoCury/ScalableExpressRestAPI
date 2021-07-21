// Tabela MySQL
const TabelaFornecedor = require('./TabelaFornecedor')

// Roteadores
const roteador = require('express').Router()
const roteadorProdutos = require('./produtos/index')

// Fornecedor Model
const Fornecedor = require('./Fornecedor')

// Serializador de resposta
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor

/**
 * Setando as Rotas
 */

// GET Lista
roteador.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar()

    // Serializador
    const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'))

    res.send(serializador.serializar(resultados))
})

// GET pelo ID
roteador.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const fornecedor = new Fornecedor({ id });
        await fornecedor.carregar()

        // Serializador
        const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'), [
            'email', 'dataCriacao', 'dataAtualizacao', 'versao'
        ])
        res.status(200)
        res.send(serializador.serializar(fornecedor))

    } catch (error) {
        next(error)
    }
})

// POST novo Fornecedor
roteador.post('/', async (req, res, next) => {
    try {
        const dadosRecebidos = req.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()

        // Serializador
        const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'))

        res.status(201)
        res.send(serializador.serializar(fornecedor))
    } catch (error) {
        next(error)
    }
})

// Put Atualizar informações
roteador.put('/:id', async (req, res, next) => {

    try {
        const id = req.params.id
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, { id })
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()

        res.status(204)
        res.end()

    } catch (error) {
        next(error)
    }
})

// DELETE Fornecedor
roteador.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const fornecedor = new Fornecedor({ id })
        await fornecedor.apagar()

        // Serializador
        res.status(204)
        res.end()
    } catch (error) {
        next(error)
    }
})

// Verificação de Fornecedores
const verificarFornecedor = async (req, res, next) => {
    try {
        const idFornecedor = req.params.idFornecedor

        const fornecedor = new Fornecedor({ id: idFornecedor })
        await fornecedor.carregar()
        req.fornecedor = fornecedor
        next()
    } catch (error) {
        next(error)
    }
}

// Usar Rotas de Produtos por Fornecedor
roteador.use('/:idFornecedor/produtos', verificarFornecedor, roteadorProdutos)

module.exports = roteador