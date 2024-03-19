import Pedido from "../Modelo/pedidoModel.js";
import Pessoa from "../Modelo/pessoaModel.js";
import Transportadora from "../Modelo/transportadoraModel.js";

export default class pedidoCtrl {

    gravar(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method == "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const descricao = dados.descricao;
            const preco = dados.preco;
            const urlImagem = dados.urlImagem;
            const listaIngredientes = dados.listaIngredientes;
            if (descricao && preco && urlImagem && listaIngredientes){
                const lanche = new Lanche(0,descricao, preco, urlImagem, listaIngredientes);
                lanche.gravar()
                .then(()=>{
                    resposta.status(201);
                    resposta.json({
                        "status":true,
                        "mensagem": 'Lanche gravado com sucesso!'
                    })
                })
                .catch((erro)=>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem":"Erro ao gravar o lanche" + erro.message                        
                    });
                });
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem":"Informe todos os dados dos lanche!"
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

    consultar(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method == "GET"){
            const lanche = new Lanche();
            lanche.consultar()
            .then((lanches)=>{
                resposta.status(200);
                resposta.json(lanches);
            })
            .catch((erro)=>{
                resposta.status(500);
                resposta.json({
                    "status":false,
                    "mensagem":"Erro ao consultar os lanches" + erro.message
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