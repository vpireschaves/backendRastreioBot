export default class Pedido {
    #id
    #status
    #pessoaCPF
    #transportadora
    
    constructor(id, status, pessoaCPF, transportadora) {
        this.#id = id;
        this.#status = status;
        this.#pessoaCPF = pessoaCPF;
        this.#transportadora = transportadora;
    }

    get id() { return this.#id; }
    get status() { return this.#status; }
    get pessoaCPF() { return this.#pessoaCPF; }
    get transportadora() { return this.#transportadora; }

    set id(id) { this.#id = id; }
    set status(status) { this.#status = status; }
    set pessoaCPF(pessoaCPF) { this.#pessoaCPF = pessoaCPF; }
    set transportadora(transportadora) { this.#transportadora = transportadora; }   

    toJSON(){
        return {
            id: this.#id,
            status: this.#status,
            pessoaCPF: this.#pessoaCPF,
            transportadora: this.#transportadora
        }
    }
}