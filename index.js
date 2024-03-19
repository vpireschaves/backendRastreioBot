import express from 'express';
import rotaPedido from './Rotas/rotaPedido.js';
import rotaDialogFlow from './Rotas/rotaDialogFlow.js';

const porta= 5000;
const host = 'localhost';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/pedido', rotaPedido);
app.use('/dialogflow', rotaDialogFlow);

app.listen(porta, host, ()=>{
    console.log(`Servidor rodando em http://${host}:${porta}`);
});

