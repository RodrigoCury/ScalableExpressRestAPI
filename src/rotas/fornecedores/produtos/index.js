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

roteador.get('/', async (req, res) => {
    const idFornecedor = req.fornecedor.id

    const produtos = await TabelaProduto.listar(idFornecedor)

    const serializador = new Serializador(res.getHeader('Content-Type'))

    res.send(serializador.serializar(produtos))

})

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

        res.send(serializador.serializar(produto))
    } catch (error) {
        next(error)
    }
})

roteador.post('/', async (req, res, next) => {

    try {
        const idFornecedor = req.fornecedor.id
        const corpo = req.body

        const dados = Object.assign({}, corpo, { fornecedor: parseInt(idFornecedor) })

        const produto = new Produto(dados)
        await produto.criar()

        const serializador = new Serializador(res.getHeader('Content-type'), ['estoque', 'dataCriacao', 'dataAtualizacao', 'versao'])

        res.status(201)
        res.send(serializador.serializar(produto))
    } catch (error) {
        next(error)
    }

})

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

module.exports = roteador