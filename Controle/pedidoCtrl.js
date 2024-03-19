import Pedido from "../Modelo/pedidoModel.js";

export default class pedidoCtrl {


    async gravar(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method == "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const pedidoDataPrevista = dados.pedidoDataPrevista;
            const pedidoStatus = dados.pedidoStatus;
            const pessoa = dados.pessoa;
            const transportadora = dados.transportadora;
            if (pedidoDataPrevista && pedidoStatus && pessoa && transportadora){
                const pedido = new Pedido(0, pedidoDataPrevista, pedidoStatus, pessoa, transportadora);
                pedido.gravar()
                .then(()=>{
                    resposta.status(201);
                    resposta.json({
                        "status":true,
                        "mensagem": 'Pedido gravado com sucesso!'
                    })
                })
                .catch((erro)=>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem":"Erro ao gravar o pedido" + erro.message
                    });
                });
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem":"Informe todos os dados do pedido!"
                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem":"Requisição inválida!"
            })
        }
    }

    async consultar(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method == "GET"){
            const pedido = new Pedido();
            pedido.consultar()
            .then((pedidos)=>{
                resposta.status(200);
                resposta.json(pedidos);
            })
            .catch((erro)=>{
                resposta.status(500);
                resposta.json({
                    "status":false,
                    "mensagem":"Erro ao consultar os pedidos" + erro.message
                })
            })
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem":"Requisição inválida!"
            });
        }
    }
    
    async consultarPorId(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method == "GET"){
            const pedido = new Pedido();
            const pedidoId = requisicao.params.pedidoId;
            pedido.consultarPorId(pedidoId)
            .then((pedidos)=>{
                resposta.status(200);
                resposta.json(pedidos);
            })
            .catch((erro)=>{
                resposta.status(500);
                resposta.json({
                    "status":false,
                    "mensagem":"Erro ao consultar o pedido" + erro.message
                })
            })
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem":"Requisição inválida!"
            });
        }
    }
}