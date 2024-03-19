import Pedido from "../Modelo/pedidoModel.js";
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
        const [registros] = await conexao.query(sql, valores);
        const pedido = new Pedido();
        pedido.pedidoId = registros.pedidoId;
        pedido.pedidoDataPrevista = registros.pedidoDataPrevista;
        pedido.pedidoStatus = registros.pedidoStatus;
        const pessoa = new Pessoa();
        pessoa.pessoaId = registros.pessoaId;
        pessoa.pessoaNome = registros.pessoaNome;
        pessoa.pessoaCPF = registros.pessoaCPF;
        pessoa.pessoaEmail = registros.pessoaEmail;
        const transportadora = new Transportadora();
        transportadora.transportadoraId = registros.transportadoraId;
        transportadora.transportadoraNome = registros.transportadoraNome;
        transportadora.transportadoraCNPJ = registros.transportadoraCNPJ;
        transportadora.transportadoraLogo = registros.transportadoraLogo;
        pedido.pessoa = pessoa;
        pedido.transportadora = transportadora;

        return pedido;
    }
}
