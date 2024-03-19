import Pedido from "../Modelo/pedidoModel.js";
import Pessoa from "../Modelo/pessoaModel.js";
import Transportadora from "../Modelo/transportadoraModel.js";
import conectar from "./conexao.js";

export default class PedidoDAO {

    async gravar(pedido) {
        if (pedido instanceof Pedido){
            const conexao = await conectar();
            const sql = 'INSERT INTO `Pedido (pedidoId, pedidoDataPrevista, pedidoStatus, pessoaId, transportadoraId) VALUES (?, ?, ?, ?, ?)';
            const valores = [pedido.pedidoId, pedido.pedidoDataPrevista, pedido.pedidoStatus, pedido.pessoa.pessoaId, pedido.transportadora.transportadoraId];
            const resultado = await conexao.query(sql, valores);
            pedido.id = resultado[0].insertId;
        }
    }

    async atualizar(pedido) {
        if (pedido instanceof Pedido){
            const conexao = await conectar();
            const sql = 'UPDATE Pedido SET pedidoDataPrevista = ?, pedidoStatus = ?, pessoaId = ?, transportadoraId = ? WHERE pedidoId = ?';
            const valores = [pedido.pedidoDataPrevista, pedido.pedidoStatus, pedido.pessoa.pessoaId, pedido.transportadora.transportadoraId, pedido.pedidoId];
            const resultado = await conexao.query(sql, valores);
        }
    }

    async excluir(pedido){
        if (pedido instanceof Pedido){
            const conexao = await conectar();
            const sql = 'DELETE FROM Pedido WHERE pedidoId = ?';
            const valores = [pedido.pedidoId];
            const resultado = await conexao.query(sql, valores);
        }
    }

    async consultar(){
        const conexao = await conectar();
        const sql = 'SELECT * FROM Pedido inner join Pessoa on Pedido.pessoaId = Pessoa.pessoaId inner join Transportadora on Pedido.transportadoraId = Transportadora.transportadoraId';
        const [registros] = await conexao.query(sql);
        let listaPedidos = [];
        for (const registro of registros){
            const pedido = new Pedido();
            pedido.pedidoId = registro.pedidoId;
            pedido.pedidoDataPrevista = registro.pedidoDataPrevista;
            pedido.pedidoStatus = registro.pedidoStatus;
            const pessoa = new Pessoa();
            pessoa.pessoaId = registro.pessoaId;
            pessoa.pessoaNome = registro.pessoaNome;
            pessoa.pessoaCPF = registro.pessoaCPF;
            pessoa.pessoaEmail = registro.pessoaEmail;
            const transportadora = new Transportadora();
            transportadora.transportadoraId = registro.transportadoraId;
            transportadora.transportadoraNome = registro.transportadoraNome;
            transportadora.transportadoraCNPJ = registro.transportadoraCNPJ;
            transportadora.transportadoraLogo = registro.transportadoraLogo;
            pedido.pessoa = pessoa;
            pedido.transportadora = transportadora;
            listaPedidos.push(pedido);
        }
        return listaPedidos;
    }

    async consultarPorId(pedidoId){
        const conexao = await conectar();
        const sql = 'SELECT * FROM Pedido inner join Pessoa on Pedido.pessoaId = Pessoa.pessoaId inner join Transportadora on Pedido.transportadoraId = Transportadora.transportadoraId WHERE pedidoId = ? ';
        const valores = [pedidoId];
        const [registro] = await conexao.query(sql, valores);
        const pedido = new Pedido();
        pedido.pedidoId = registro[0].pedidoId;
        pedido.pedidoDataPrevista = registro[0].pedidoDataPrevista;
        pedido.pedidoStatus = registro[0].pedidoStatus;
        const pessoa = new Pessoa();
        pessoa.pessoaId = registro[0].pessoaId;
        pessoa.pessoaNome = registro[0].pessoaNome;
        pessoa.pessoaCPF = registro[0].pessoaCPF;
        pessoa.pessoaEmail = registro[0].pessoaEmail;
        const transportadora = new Transportadora();
        transportadora.transportadoraId = registro[0].transportadoraId;
        transportadora.transportadoraNome = registro[0].transportadoraNome;
        transportadora.transportadoraCNPJ = registro[0].transportadoraCNPJ;
        transportadora.transportadoraLogo = registro[0].transportadoraLogo;
        pedido.pessoa = pessoa;
        pedido.transportadora = transportadora;
        
        return pedido;
    }
}
