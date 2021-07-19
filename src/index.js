require('dotenv').config()
const express = require('express')

// Declaring the App
const app = express()

/**
 * Configs
 */
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * Rotas
 */

const router = require('./rotas/fornecedores')
app.use('/api/fornecedores', router)

// Run App
app.listen(process.env.PORT, () => {
    console.log(`
        Servidor Subido Com Sucesso
        Escutando na porta ${PORT}
        http://localhost:${PORT}/
    `)
})