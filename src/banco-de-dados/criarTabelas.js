const tabelas = [
    require('../rotas/fornecedores/modelTabelaFornecedor'),
    require('../rotas/fornecedores/produtos/ModelTabelaProdutos'),
]

async function criarTabelas() {
    for (let model of tabelas) {
        await model
            .sync()
            .then(() => console.log(`Tabela ${model.name} criada com sucesso`))
            .catch(error => {
                console.error(`Tabela ${model.name} Não foi criada`)
                console.error(error)
            })
    }
}

criarTabelas()



/**
 * To Run, on terminal type
 * $ node ./src/banco-de-dados/criarTabelas.js
 */