// Roteador Express
const router = require('express').Router({ mergeParams: true })

// DAO Tabela Produtos
const TabelaProduto = require('./TabelaProduto')

// Serializador de respostas
const Serializador = require('../../../Serializador').SerializadorProduto

router.get('/', async (req, res) => {
    const idFornecedor = req.params.idFornecedor
    console.log(req.params);

    const produtos = await TabelaProduto.listar(idFornecedor)

    const serializador = new Serializador(res.getHeader('Content-Type'))

    res.send(serializador.serializar(produtos))

})

module.exports = router