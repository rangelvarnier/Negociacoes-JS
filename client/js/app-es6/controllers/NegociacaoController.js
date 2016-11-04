import {NegociacaoService} from '../services/NegociacaoService';
import {NegociacoesView} from '../views/NegociacoesView';
import {MensagemView} from '../views/MensagemView';
import {Bind} from '../helpers/Bind';
import {ListaNegociacoes} from '../models/ListaNegociacoes';
import {Mensagem} from '../models/Mensagem';
import {DateHelper} from '../helpers/DateHelper';
import {Negociacao} from '../models/Negociacao';

export class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        this._listaNegociacoes = new Bind(new ListaNegociacoes(),
            new NegociacoesView($("#negociacoesView")), 'adicionar', 'esvasiar');

        this._mensagem = new Bind(new Mensagem(),
            new MensagemView($("#mensagemView")), 'texto');
        this._service = new NegociacaoService();
        this._init();
    }

    _init(){
        this._service
            .lista()
            .then(negociacoes =>
                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adicionar(negociacao)))
                    .catch(erro => this._mensagem.texto = erro);

        setInterval(() => {
            this.importarNegociacoes();
        }, 3000);
    }

    adicionar(event) {
        event.preventDefault();

        let negociacao = this._criarNegociacao();
        this._service
            .cadastrar(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adicionar(negociacao);
                this._mensagem.texto = mensagem;
                this._limparFormulario();
            }).catch(erro => this._mensagem.texto = erro);
    }

    importarNegociacoes() {
        this._service
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adicionar(negociacao);
                this._mensagem.texto = 'Negociações do período importadas'
            }))
            .catch(erro => this._mensagem.texto = erro);
    }

    apagar() {
        this._service
            .apaga()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvasiar();
            });
    }

    _criarNegociacao() {
        return new Negociacao(
            DateHelper.textoParaDate(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        )
    }

    _limparFormulario() {
        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
}
