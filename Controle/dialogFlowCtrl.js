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
                obterCardPedido('custom', pedidoId)
                .then((CardCustom)=>{
                    respostaDF['fulfillmentMessages'] = CardCustom;
                    resposta.json(respostaDF);
                })
                .catch((erro)=>{
                    respostaDF['fulfillmentMessages'] = [
                        {
                            "text": {
                               "text":[
                                    "Número de pedido não encontrado.",
                                    "Em que mais posso ajudar?"
                               ]
                            }
                        }
                    ];
                    resposta.json(respostaDF);
                });
            }
            else{
                //devolver messenger cards
                obterCardPedido('messenger', pedidoId)
                .then((CardMessenger)=>{
                    respostaDF['fulfillmentMessages'] = [{
                        "payload": {
                            "richContent": [CardMessenger]
                        }
                    }];
                    resposta.json(respostaDF);
                })
                .catch((erro)=>{
                    respostaDF['fulfillmentMessages'] = [{
                        "payload": {
                            "richContent": [
                              [
                                {
                                  "type": "description",
                                  "title": "Número de pedido não encontrado.",
                                  "text": [
                                    "Em que mais posso ajudar?"
                                  ]
                                }
                              ]
                            ]
                          }
                          
                    }]
                    resposta.json(respostaDF);
                });  
            }
         
        }
    }
}