// .ENV 
require('dotenv').config()

// Express
const express = require('express')

// Manipulador de Erros
const ConteudoNaoSuportado = require('./erros/ConteudoNaoSuportado')
const SerializadorErro = require('./Serializador').SerializadorErro

// Lista de Content-Types Aceitos
const formatosAceitos = require('./Serializador').formatosAceitos

// Declarando o APP
const app = express()

/**
 * Configs
 */

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Checagem de Content-Type 
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

// Setando Headers de Resposta Gerais
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("X-Powered-By", "Gatito")

    next()
})

/**
 * Rotas
 */

const routerFornecedores = require('./rotas/fornecedores')
app.use('/api/fornecedores', routerFornecedores)


// Lidando com erros Middleware
app.use((erro, req, res, next) => {
    res.status(erro.status ? erro.status : 400)

    // Serializador de erros
    const serializador = new SerializadorErro(res.getHeader('Content-Type'))
    res.send(serializador.serializar(erro))
})

// Rodar App
app.listen(process.env.PORT, () => {
    console.log(`
        Servidor Subido Com Sucesso
        Escutando na porta ${process.env.PORT}
        http://localhost:${process.env.PORT}/
    `)
})