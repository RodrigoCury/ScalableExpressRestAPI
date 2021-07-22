// Roteador Express
const roteador = require('express').Router()

// DAO Tabela Produto
const TabelaProduto = require('./TabelaProduto')

// Model Produto
const Produto = require('./Produto')

// Serializador de respostas
const Serializador = require('../../../Serializador').SerializadorProduto

/**
 * Setando As Rotas
 */

// GET lista de produtos do fornecedor
roteador.get('/', async (req, res) => {
    const idFornecedor = req.fornecedor.id

    const produtos = await TabelaProduto.listar(idFornecedor)

    const serializador = new Serializador(res.getHeader('Content-Type'))

    res.send(serializador.serializar(produtos))

})

// GET único produtor por id
roteador.get('/:idProduto', async (req, res, next) => {
    try {
        const idFornecedor = req.fornecedor.id
        const idProduto = req.params.idProduto

        const produto = new Produto({
            id: idProduto,
            fornecedor: idFornecedor
        })
        await produto.carregar()

        const serializador = new Serializador(res.getHeader('Content-Type'), ['estoque', 'dataCriacao', 'dataAtualizacao', 'versao',])

        // Setando os Headers da Respota
        Serializador.setHeader(res, produto)

        res.send(serializador.serializar(produto))
    } catch (error) {
        next(error)
    }
})

// HEAD
roteador.head('/:idProduto', async (req, res, next) => {
    try {
        const idFornecedor = req.fornecedor.id
        const idProduto = req.params.idProduto

        const produto = new Produto({
            id: idProduto,
            fornecedor: idFornecedor
        })
        await produto.carregar()

        // Setando os Headers da Respota
        Serializador.setHeader(res, produto)

        res.status(200).end()
    } catch (error) {
        next(error)
    }
})

// Post Cria um novo produto
roteador.post('/', async (req, res, next) => {

    try {
        const idFornecedor = req.fornecedor.id
        const corpo = req.body

        const dados = Object.assign({}, corpo, { fornecedor: parseInt(idFornecedor) })

        const produto = new Produto(dados)
        await produto.criar()

        const serializador = new Serializador(res.getHeader('Content-type'), ['estoque', 'dataCriacao', 'dataAtualizacao', 'versao'])

        // Setando os Headers da Respota
        Serializador.setHeader(res, produto)

        res.status(201)
        res.send(serializador.serializar(produto))
    } catch (error) {
        next(error)
    }

})

// Atualiza um produto ja existente
roteador.put('/:idProduto', async (req, res, next) => {
    try {
        const idFornecedor = req.fornecedor.id
        const idProduto = req.params.idProduto
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, { id: idProduto, fornecedor: idFornecedor })
        const produto = new Produto(dados)
        await produto.atualizar()
        await produto.carregar()

        // Setando os Headers da Respota
        Serializador.setHeader(res, produto)

        res.status(204)
        res.end()

    } catch (error) {
        next(error)
    }
})

// DELETE deleta um produto existente
roteador.delete('/:idProduto', async (req, res, next) => {
    try {
        const idFornecedor = req.fornecedor.id
        const idProduto = req.params.idProduto

        const produto = new Produto({ id: idProduto, fornecedor: idFornecedor })
        await produto.apagar()

        res.status(204)
        res.end()
    } catch (error) {
        next(error)
    }
})

// Venda de Produto
roteador.post('/:idProduto/diminuir-estoque/', async (req, res, next) => {
    try {
        const idFornecedor = req.fornecedor.id
        const idProduto = req.params.idProduto

        const produto = new Produto({ id: idProduto, fornecedor: idFornecedor })
        await produto.carregar()

        const quantidadeVendida = req.body.quantidade

        await produto.diminuirEstoque(quantidadeVendida)
        await produto.carregar()

        // Setando os Headers da Respota
        Serializador.setHeader(res, produto)

        res.status(204)
        res.end()

    } catch (error) {
        next(error)
    }
})

module.exports = roteador