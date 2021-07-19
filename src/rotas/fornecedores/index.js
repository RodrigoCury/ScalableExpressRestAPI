const router = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')

router.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar()
    res.send(
        JSON.stringify(resultados)
    )
})

router.post('/', (req, res) => {

})

module.exports = router