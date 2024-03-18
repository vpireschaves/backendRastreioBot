import Pedido from "../Modelo/pedidoModel.js";
import conectar from "./conexao.js";

export default class PedidoDAO {
    async gravar (pedido){
        if (pedido instanceof Pedido){
            const conexao = await conectar();
            const sql = 'INSERT INTO pedidos (pessoaCPF, transportadora) VALUES (?, ?, ?)';
            const [dados] = await conexao.execute(sql, [pedido.status, pedido.pessoaCPF, pedido.transportadora]);
            return dados.insertId;
        }
    }
}
