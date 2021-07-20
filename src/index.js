require('dotenv').config()
const express = require('express')
const ConteudoNaoSuportado = require('./erros/ConteudoNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos
const SerializadorErro = require('./Serializador').SerializadorErro

// Declaring the App
const app = express()

/**
 * Configs
 */

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
app.use((erro, req, res, next) => {
    res.status(erro.status ? erro.status : 400)

    // Serializador de erros
    const serializador = new SerializadorErro(res.getHeader('Content-Type'))
    res.send(serializador.serializar(erro))
})

// Run App
app.listen(process.env.PORT, () => {
    console.log(`
        Servidor Subido Com Sucesso
        Escutando na porta ${process.env.PORT}
        http://localhost:${process.env.PORT}/
    `)
})