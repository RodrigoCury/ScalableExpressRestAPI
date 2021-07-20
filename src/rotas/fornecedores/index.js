const router = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor

router.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar()

    // Serializador
    const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'))

    res.send(serializador.serializar(resultados))
})

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

module.exports = router