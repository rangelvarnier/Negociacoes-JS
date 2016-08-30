class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        this._listaNegociacoes = ProxyFactory.create(
            new ListaNegociacoes(), ['adicionar', 'esvasiar'],
            model => this._negociacoesView.update(model));
        this._negociacoesView = new NegociacoesView($("#negociacoesView"));
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = ProxyFactory.create(
            new Mensagem(), 'texto',
            model => this._mensagemView.update(model));
        this._mensagemView = new MensagemView($("#mensagemView"));
        this._mensagemView.update(this._mensagem)
    }

    adicionar(event) {
        event.preventDefault();
        this._listaNegociacoes.adicionar(this._criarNegociacao());
        this._mensagem.texto = "Negociação adicionada com sucesso!";
        this._limparFormulario();
    }

    apagar() {
        this._listaNegociacoes.esvasiar();
        this._mensagem.texto = "Negociações apagadas com sucesso!";
    }

    _criarNegociacao() {
        return new Negociacao(
            DateHelper.textoParaDate(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        )
    }

    _limparFormulario() {
        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
}
