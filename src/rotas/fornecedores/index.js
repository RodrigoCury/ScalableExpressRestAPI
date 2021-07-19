const router = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')

router.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar()
    res.send(
        JSON.stringify(resultados)
    )
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const fornecedor = new Fornecedor({ id });
        await fornecedor.carregar()
        res.status(200).json(fornecedor)

    } catch (error) {
        res.status(error.status).json({
            mensagem: error.message,
            idErro: error.idErro
        })
    }
})

router.post('/', async (req, res) => {
    try {
        const dadosRecebidos = req.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        res.status(201).json(fornecedor)
    } catch (error) {
        res.status(400).json({ mensagem: error.message })
    }
})

router.put('/:id', async (req, res) => {

    try {
        const id = req.params.id
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, { id })
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        res.status(204)
        res.end()

    } catch (error) {
        res.status(error.status).json({
            mensagem: error.message,
            idErro: error.idErro
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const fornecedor = new Fornecedor({ id })
        await fornecedor.apagar()
        res.status(204)
        res.end()
    } catch (error) {
        res.status(400).json({ mensagem: error.message })
    }
})

module.exports = router