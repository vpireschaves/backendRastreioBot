import PedidoDAO from "../Persistencia/pedidoDAO"

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

    toJSON(){
        return {
            pedidoId: this.#pedidoId,
            pedidoDataPrevista: this.#pedidoDataPrevista,
            pedidoStatus: this.#pedidoStatus,
            pessoa: this.#pessoa.toJSON(),
            transportadora: this.#transportadora.toJSON()
        }
    }
    
}