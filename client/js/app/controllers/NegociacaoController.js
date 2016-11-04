'use strict';

System.register(['../services/NegociacaoService', '../views/NegociacoesView', '../views/MensagemView', '../helpers/Bind', '../models/ListaNegociacoes', '../models/Mensagem', '../helpers/DateHelper', '../models/Negociacao'], function (_export, _context) {
    "use strict";

    var NegociacaoService, NegociacoesView, MensagemView, Bind, ListaNegociacoes, Mensagem, DateHelper, Negociacao, _createClass, NegociacaoController;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_servicesNegociacaoService) {
            NegociacaoService = _servicesNegociacaoService.NegociacaoService;
        }, function (_viewsNegociacoesView) {
            NegociacoesView = _viewsNegociacoesView.NegociacoesView;
        }, function (_viewsMensagemView) {
            MensagemView = _viewsMensagemView.MensagemView;
        }, function (_helpersBind) {
            Bind = _helpersBind.Bind;
        }, function (_modelsListaNegociacoes) {
            ListaNegociacoes = _modelsListaNegociacoes.ListaNegociacoes;
        }, function (_modelsMensagem) {
            Mensagem = _modelsMensagem.Mensagem;
        }, function (_helpersDateHelper) {
            DateHelper = _helpersDateHelper.DateHelper;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('NegociacaoController', NegociacaoController = function () {
                function NegociacaoController() {
                    _classCallCheck(this, NegociacaoController);

                    var $ = document.querySelector.bind(document);

                    this._inputData = $("#data");
                    this._inputQuantidade = $("#quantidade");
                    this._inputValor = $("#valor");

                    this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($("#negociacoesView")), 'adicionar', 'esvasiar');

                    this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagemView")), 'texto');
                    this._service = new NegociacaoService();
                    this._init();
                }

                _createClass(NegociacaoController, [{
                    key: '_init',
                    value: function _init() {
                        var _this = this;

                        this._service.lista().then(function (negociacoes) {
                            return negociacoes.forEach(function (negociacao) {
                                return _this._listaNegociacoes.adicionar(negociacao);
                            });
                        }).catch(function (erro) {
                            return _this._mensagem.texto = erro;
                        });

                        setInterval(function () {
                            _this.importarNegociacoes();
                        }, 3000);
                    }
                }, {
                    key: 'adicionar',
                    value: function adicionar(event) {
                        var _this2 = this;

                        event.preventDefault();

                        var negociacao = this._criarNegociacao();
                        this._service.cadastrar(negociacao).then(function (mensagem) {
                            _this2._listaNegociacoes.adicionar(negociacao);
                            _this2._mensagem.texto = mensagem;
                            _this2._limparFormulario();
                        }).catch(function (erro) {
                            return _this2._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: 'importarNegociacoes',
                    value: function importarNegociacoes() {
                        var _this3 = this;

                        this._service.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
                            return negociacoes.forEach(function (negociacao) {
                                _this3._listaNegociacoes.adicionar(negociacao);
                                _this3._mensagem.texto = 'Negociações do período importadas';
                            });
                        }).catch(function (erro) {
                            return _this3._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: 'apagar',
                    value: function apagar() {
                        var _this4 = this;

                        this._service.apaga().then(function (mensagem) {
                            _this4._mensagem.texto = mensagem;
                            _this4._listaNegociacoes.esvasiar();
                        });
                    }
                }, {
                    key: '_criarNegociacao',
                    value: function _criarNegociacao() {
                        return new Negociacao(DateHelper.textoParaDate(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
                    }
                }, {
                    key: '_limparFormulario',
                    value: function _limparFormulario() {
                        this._inputData.value = "";
                        this._inputQuantidade.value = 1;
                        this._inputValor.value = 0.0;
                        this._inputData.focus();
                    }
                }]);

                return NegociacaoController;
            }());

            _export('NegociacaoController', NegociacaoController);
        }
    };
});
//# sourceMappingURL=NegociacaoController.js.map