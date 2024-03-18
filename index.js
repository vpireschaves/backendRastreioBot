import express from 'express';
import rotaRastreio from './Rotas/rotaRastreio.js';
import rotaDialogFlow from './Rotas/rotaDialogFlow.js';

const porta= 5000;
const host = '0.0.0.0';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/rastreamento', rotaRastreio);
app.use('/dialogflow', rotaDialogFlow);

app.listen(porta, host, ()=>{
    console.log(`Servidor rodando em http://${host}:${porta}`);
});

