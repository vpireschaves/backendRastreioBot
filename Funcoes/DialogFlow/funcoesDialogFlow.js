//url de referência https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger?hl=pt-br

import Pedido from "../../Modelo/pedidoModel.js";

//Mensagem tem como alvo o DialogFlow Messenger
export function criarMessengerCard() {
    return {
        type: "info",
        title: "",
        subtitle: "",
        image: {
            src: {
                rawUrl: ""
            }
        },
        actionLink: ""
    }
}

//Mensagem do tipo botão para o DialogFlow Messenger
export function criarMessengerButton() {
    return {
        "type": "button",
        "icon": {
            "type": "chevron_right",
            "color": "#FF9800"
        },
        "text": "",
        "link": "",
        "event": {
            "name": "",
            "languageCode": "",
            "parameters": {}
        }
    }
}

//Mensagem do tipo card para um ambiente "CUSTOM (Interface padrão)"
export function criarCustomCard() {
    return {
        card: {
            title: "",
            subtitle: "",
            imageUri: "",
            buttons: [
                {
                    text: "botão",
                    postback: ""
                }
            ]
        }
    }
}

export async function obterCardPedido(tipo = "custom", pedidoId) {
    const pedido = new Pedido();
    const pedidoLocalizado = await pedido.consultarPorId(pedidoId);
    const listaCards = [];
    if (tipo == "custom") {
        card = criarCustomCard();
        card['card']['title'] = pedidoLocalizado.pedidoStatus;
        card['card']['subtitle'] = "Data Prevista: " + pedidoLocalizado.pedidoDataPrevista + " \n" + "Transportadora: " + pedidoLocalizado.transportadora.transportadoraNome;
        card['card']['imageUri'] = pedidoLocalizado.transportadora.transportadoraLogo;
        card['card']['buttons'][0]['text'] = "Mais informações";
        card['card']['buttons'][0]['postback'] = "http://unoeste.br"
    }
    else if (tipo == "messenger") {
        card = criarMessengerCard();
        card['title'] = pedidoLocalizado.pedidoStatus;
        card['subtitle'] = "Data Prevista: " + pedidoLocalizado.pedidoDataPrevista + " \n" + "Transportadora: " + pedidoLocalizado.transportadora.transportadoraNome;
        card['image']['src']['rawUrl'] = pedidoLocalizado.transportadora.transportadoraLogo;
        card['actionLink'] = "http://unoeste.br"
    }
    return card;
}


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