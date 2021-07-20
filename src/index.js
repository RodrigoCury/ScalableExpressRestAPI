require('dotenv').config()
const express = require('express')
const ConteudoNaoSuportado = require('./erros/ConteudoNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos

// Declaring the App
const app = express()

/**
 * Configs
 */
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Checagem de ContentType 
app.use((req, res, next) => {
    let formatoRequisitado = req.get('Accept')

    if (formatoRequisitado === '*/*') {
        formatoRequisitado = "application/json"
    }

    if (!formatosAceitos.includes(formatoRequisitado)) {
        throw new ConteudoNaoSuportado(formatoRequisitado)
    }

    res.setHeader("Content-Type", formatoRequisitado)

    next()
})

/**
 * Rotas
 */

const router = require('./rotas/fornecedores')
app.use('/api/fornecedores', router)

// Lidando com erros Middleware
app.use((erro, requisicao, resposta, next) => {
    resposta.status(erro.status ? erro.status : 400)

    resposta.json({
        errorName: erro.name,
        mensagem: erro.message,
        idErro: erro.idErro
    })
})

// Run App
app.listen(process.env.PORT, () => {
    console.log(`
        Servidor Subido Com Sucesso
        Escutando na porta ${PORT}
        http://localhost:${PORT}/
    `)
})