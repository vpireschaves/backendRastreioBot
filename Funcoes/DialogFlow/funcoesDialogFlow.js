//url de referência https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger?hl=pt-br

import Pedido from "../Modelo/pedidoModel.js";

//Mensagem tem como alvo o DialogFlow Messenger
export async function obterCardsLanches(tipo = "custom") { //tipo = "custom" ou "messenger"
    //Recuperar os lanches e estilizá-los no formato Card do DialogFlow
    //Alimentar cada card com informações dos lanches
    const lanche = new Lanche();
    const listaLanches = await lanche.consultar("");
    const listaCards = [];
    //alt + shift + f --> corrige automaticamente a identação do código
    for (const lanche of listaLanches) {
        let card;
        if (tipo == "custom") {
            card = criarCustomCard();
            card['card']['title'] = lanche.descricao;
            card['card']['subtitle'] = "Preço: R$" + lanche.preco + " \n" + lanche.listaIngredientes;
            card['card']['imageUri'] = lanche.urlImagem;
            card['card']['buttons'][0]['text'] = "Mais informações";
            card['card']['buttons'][0]['postback'] = "http://unoeste.br"
        }
        else if (tipo == "messenger") {
            card = criarMessengerCard();
            card['title'] = lanche.descricao;
            card['subtitle'] = "Preço: R$" + lanche.preco + " \n" + lanche.listaIngredientes;
            card['image']['src']['rawUrl'] = lanche.urlImagem;
            //card.image.src.rawUrl = servico.urlImagem;
            card['actionLink'] = "http://unoeste.br";

        }
        listaCards.push(card);
    }
    return listaCards;
}