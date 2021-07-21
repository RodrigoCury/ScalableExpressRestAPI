// Tabela MySQL
const TabelaFornecedor = require('./TabelaFornecedor')

// Roteadores
const router = require('express').Router()
const routerProdutos = require('./produtos/index')

// Fornecedor Model
const Fornecedor = require('./Fornecedor')

// Serializador de resposta
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor

// GET Lista
router.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar()

    // Serializador
    const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'))

    res.send(serializador.serializar(resultados))
})

// GET pelo ID
router.get('/:id', async (req, res, next) => {
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
router.post('/', async (req, res, next) => {
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
router.put('/:id', async (req, res, next) => {

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
router.delete('/:id', async (req, res, next) => {
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

// Usar Rotas de Produtos por Fornecedor
router.use('/:idFornecedor/produtos', routerProdutos)

module.exports = router