import { obterCardPedido } from "../Funcoes/DialogFlow/funcoesDialogFlow.js";

export default class DialogFlowCtrl{

    processar(requisicao, resposta){
        resposta.type('application/json');
        //processar intenção 'RastreioEncomenda - numero'
        const intencao = requisicao.body.queryResult.intent.displayName;
        const pedidoId = requisicao.body.queryResult.parameters.number;
        const ambienteOrigem = requisicao.body?.originalDetectIntentRequest?.source;
        if (intencao && intencao == 'RastreioEncomenda - numero' && pedidoId && pedidoId > 0){ 
            let respostaDF = { fulfillmentMessages: [] };
            //deveremos construir uma resposta para essa intenção
            if (ambienteOrigem){
                //devolver custom cards
                obterCardsLanches('custom', pedidoId)
                .then((CardCustom)=>{
                    respostaDF['fulfillmentMessages'] = CardCustom;
                    resposta.json(respostaDF);
                })
                .catch((erro)=>{
                    respostaDF['fulfillmentMessages'] = [
                        {
                            "text": {
                               "text":[
                                    "Erro ao recuperar pedido.",
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
                obterCardsLanches('messenger', pedidoId)
                .then((CardMessenger)=>{
                    respostaDF['fulfillmentMessages'] = [{
                        "payload": {
                            "richContent": [CardMessenger]
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
                                    "title":"Erro ao recuperar pedido",
                                    "text":[
                                        "Infelizmente não foi possível recuperar o pedido.",
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