export default class Transportadora {
    #transportadoraId
    #transportadoraNome
    #transportadoraCNPJ
    #transportadoraLogo

    constructor(transportadoraId, transportadoraNome, transportadoraCNPJ, transportadoraLogo) {
        this.#transportadoraId = transportadoraId
        this.#transportadoraNome = transportadoraNome
        this.#transportadoraCNPJ = transportadoraCNPJ
        this.#transportadoraLogo = transportadoraLogo
    }

    get transportadoraId() {
        return this.#transportadoraId
    }

    get transportadoraNome() {
        return this.#transportadoraNome
    }

    get transportadoraCNPJ() {
        return this.#transportadoraCNPJ
    }

    get transportadoraLogo() {
        return this.#transportadoraLogo
    }

    set transportadoraLogo(transportadoraLogo) {
        this.#transportadoraLogo = transportadoraLogo
    }

    set transportadoraCNPJ(transportadoraCNPJ) {
        this.#transportadoraCNPJ = transportadoraCNPJ
    }

    set transportadoraNome(transportadoraNome) {
        this.#transportadoraNome = transportadoraNome
    }

    set transportadoraId(transportadoraId) {
        this.#transportadoraId = transportadoraId
    }

    toJSON() {
        return {
            transportadoraId: this.#transportadoraId,
            transportadoraNome: this.#transportadoraNome,
            transportadoraCNPJ: this.#transportadoraCNPJ,
            transportadoraLogo: this.#transportadoraLogo
        }
    }
}