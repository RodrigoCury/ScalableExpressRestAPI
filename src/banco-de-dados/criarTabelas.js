const Model = require('../rotas/fornecedores/modelTabelaFornecedor');

Model.sync()
    .then(() => console.log("Tabela Fornecedor Criada com sucesso"))
    .catch(error => console.error(error))

/**
 * To Run, on terminal type
 * $ node ./src/banco-de-dados/criarTabelas.js
 */