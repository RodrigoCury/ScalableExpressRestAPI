class CampoInvalido extends Error {
    constructor(campos) {
        const mensagem = ''.concat(...campos)
        console.log(mensagem);
        super(mensagem);

        this.name = 'CampoInvalido'

        this.status = 400

        this.idErro = 2
    }
}

module.exports = CampoInvalido