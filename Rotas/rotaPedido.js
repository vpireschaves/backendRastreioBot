import {Router} from 'express';
import LancheCtrl from '../Controle/lancheCtrl.js';

const rotaPedido = Router();
const lancheControlador = new LancheCtrl();
rotaLanche
.get('/', lancheControlador.consultar)
.post('/', lancheControlador.gravar)
.put('/', lancheControlador.atualizar)
.patch('/', lancheControlador.atualizar)
.delete('/', lancheControlador.excluir);

export default rotaPedido;