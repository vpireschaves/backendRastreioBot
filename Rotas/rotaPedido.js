import {Router} from 'express';
import pedidoCtrl from '../Controle/pedidoCtrl.js';

const rotaPedido = Router();
const pedidoControlador = new pedidoCtrl();
rotaPedido
.get('/', pedidoControlador.consultar)
.get('/:pedidoId', pedidoControlador.consultarPorId)
.post('/', pedidoControlador.gravar);

export default rotaPedido;