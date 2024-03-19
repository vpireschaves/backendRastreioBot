import Transportadora from "./transportadoraModel.js"
import Pessoa from "./pessoaModel.js"
import PedidoDAO from "../Persistencia/pedidoDAO.js"

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

    set pedidoId(pedidoId) {
        this.#pedidoId = pedidoId
    }

    set pedidoDataPrevista(pedidoDataPrevista) {
        this.#pedidoDataPrevista = pedidoDataPrevista
    }

    set pedidoStatus(pedidoStatus) {
        this.#pedidoStatus = pedidoStatus
    }

    set pessoa(pessoa) {
        this.#pessoa = pessoa
    }

    set transportadora(transportadora) {
        this.#transportadora = transportadora
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

    async gravar() {
        const pedidoDAO = new PedidoDAO();
        return await pedidoDAO.gravar(this);        
    }

    async atualizar() {
        const pedidoDAO = new PedidoDAO();
        return await pedidoDAO.atualizar(this);        
    }

    async consultar() {
        const pedidoDAO = new PedidoDAO();
        return await pedidoDAO.consultar(this);
    }

    async consultarPorId(pedidoId) {
        const pedidoDAO = new PedidoDAO();
        return await pedidoDAO.consultarPorId(pedidoId);
    }
}