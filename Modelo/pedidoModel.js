import Transportadora from "./transportadoraModel.js"
import Pessoa from "./pessoaModel.js"

export default class Pedido {
    #pedidoId
    #pedidoDataPrevista
    #pedidoStatus
    #pessoa
    #transportadora
    
    constructor(pedidoId, pedidoDataPrevista, pedidoStatus, pessoa, transportadora) {
        this.#pedidoId = pedidoId
        this.#pedidoDataPrevista = pedidoDataPrevista
        this.#pedidoStatus = pedidoStatus
        this.#pessoa = pessoa
        this.#transportadora = transportadora
    }

    get pedidoId() {
        return this.#pedidoId
    }

    get pedidoDataPrevista() {
        return this.#pedidoDataPrevista
    }

    get pedidoStatus() {
        return this.#pedidoStatus
    }

    get pessoa() {
        return this.#pessoa
    }

    get transportadora() {
        return this.#transportadora
    }  

    toJSON() {
        return {
            pedidoId: this.#pedidoId,
            pedidoDataPrevista: this.#pedidoDataPrevista,
            pedidoStatus: this.#pedidoStatus,
            pessoa: this.#pessoa.toJSON(),
            transportadora: this.#transportadora.toJSON()
        }
    }
}