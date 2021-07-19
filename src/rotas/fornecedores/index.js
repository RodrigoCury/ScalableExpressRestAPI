const router = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')

router.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar()
    res.send(
        JSON.stringify(resultados)
    )
})

router.post('/', async (req, res) => {
    const dadosRecebidos = req.body
    const fornecedor = new Fornecedor(dadosRecebidos)
    fornecedor.criar()
        .then(() => res.send(JSON.stringify(fornecedor)))
        .catch(error => {
            console.log(error)
            res.status(400).json(error)
        })


})

module.exports = router