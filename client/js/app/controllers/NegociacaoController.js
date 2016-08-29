class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        /*
        * implementar proxy
        this._listaNegociacoes = new ListaNegociacoes(model =>
            this._negociacoesView.update(model));
        */
        this._negociacoesView = new NegociacoesView($("#negociacoesView"));
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($("#mensagemView"));
        this._mensagemView.update(this._mensagem);
    }

    adicionar(event) {
        event.preventDefault();
        this._listaNegociacoes.adicionar(this._criarNegociacao());

        this._mensagem.texto = "Negociação adicionada com sucesso!";
        this._mensagemView.update(this._mensagem);

        this._limparFormulario();
    }

    apagar() {
        this._listaNegociacoes.esvasiar();

        this._mensagem.texto = "Negociações apagadas com sucesso!";
        this._mensagemView.update(this._mensagem);
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
