import { obterPedidoId } from "../Funcoes/DialogFlow/funcoesDialogFlow.js";

export default class DialogFlowCtrl{

    processar(requisicao, resposta){
        resposta.type('application/json');
        //processar intenção 'RastreioEncomenda - numero'
        const intencao = requisicao.body.queryResult.intent.displayName;
        const ambienteOrigem = requisicao.body?.originalDetectIntentRequest?.source;
        if (intencao && intencao == 'RastreioEncomenda - numero'){
            let respostaDF = { fulfillmentMessages: [] };
            //deveremos construir uma resposta para essa intenção
            if (ambienteOrigem){
                //devolver custom cards
                obterCardsLanches('custom')
                .then((listaCardsCustom)=>{
                    respostaDF['fulfillmentMessages'] = listaCardsCustom;
                    resposta.json(respostaDF);
                })
                .catch((erro)=>{
                    respostaDF['fulfillmentMessages'] = [
                        {
                            "text": {
                               "text":[
                                    "Erro ao recuperar a lista de lanches:\n",
                                    "Não foi possível extrair consultar o menu.",
                                    "Tente novamente mais tarde.",
                                    erro.message
                               ]
                            }
                        }
                    ];
                });
            }
            else{
                //devolver messenger cards
                obterCardsLanches('messenger')
                .then((listaCardsMessenger)=>{
                    respostaDF['fulfillmentMessages'] = [{
                        "payload": {
                            "richContent": [listaCardsMessenger]
                        }
                    }];
                    resposta.json(respostaDF);
                })
                .catch((erro)=>{
                    respostaDF['fulfillmentMessages'] = {
                        "payload": {
                            "richContent": [
                                {
                                    "type":"description",
                                    "title":"Erro ao recuperar a lista de lanches",
                                    "text":[
                                        "Infelizmente não foi possível exibir o menu de lanches.",
                                        erro.message
                                    ]
                                }
                            ]
                        }
                    }
                });  
            }
         
        }
    }
}