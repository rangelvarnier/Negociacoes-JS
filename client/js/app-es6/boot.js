import {NegociacaoController} from './controllers/NegociacaoController';
import {} from './polyfil/fetch';

let negociacaoController = new NegociacaoController();

document.querySelector('.form').onsubmit = negociacaoController.adicionar.bind(negociacaoController);
document.querySelector('[type=button]').onclick = negociacaoController.apagar.bind(negociacaoController);
