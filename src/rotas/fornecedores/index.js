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
        return res.status(200).json(fornecedor)

    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.post('/', async (req, res) => {
    const dadosRecebidos = req.body
    const fornecedor = new Fornecedor(dadosRecebidos)
    await fornecedor.criar()
        .then(() => res.send(JSON.stringify(fornecedor)))
        .catch(error => {
            console.log(error)
            res.status(400).json(error)
        })
})

router.put('/:id', async (req, res) => {

    try {
        const id = req.params.id
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, { id })
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        res.status(200).json(fornecedor)

    } catch (error) {
        res.status(400).json(error.message)
    }
})

module.exports = router