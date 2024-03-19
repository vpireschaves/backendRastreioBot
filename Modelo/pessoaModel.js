export default class Pessoa {
    #pessoaId
    #pessoaNome
    #pessoaCPF
    #pessoaEmail

    constructor(pessoaId, pessoaNome, pessoaCPF, pessoaEmail) {
        this.#pessoaId = pessoaId
        this.#pessoaNome = pessoaNome
        this.#pessoaCPF = pessoaCPF
        this.#pessoaEmail = pessoaEmail
    }

    get pessoaId() {
        return this.#pessoaId
    }

    get pessoaNome() {
        return this.#pessoaNome
    }

    get pessoaCPF() {
        return this.#pessoaCPF
    }

    get pessoaEmail() {
        return this.#pessoaEmail
    }

    set pessoaEmail(pessoaEmail) {
        this.#pessoaEmail = pessoaEmail
    }

    set pessoaCPF(pessoaCPF) {
        this.#pessoaCPF = pessoaCPF
    }

    set pessoaNome(pessoaNome) {
        this.#pessoaNome = pessoaNome
    }

    set pessoaId(pessoaId) {
        this.#pessoaId = pessoaId
    }

    toJSON() {
        return {
            pessoaId: this.#pessoaId,
            pessoaNome: this.#pessoaNome,
            pessoaCPF: this.#pessoaCPF,
            pessoaEmail: this.#pessoaEmail
        }
    }
}