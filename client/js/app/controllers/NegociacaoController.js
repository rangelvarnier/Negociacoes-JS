class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        this._listaNegociacoes = new Bind(new ListaNegociacoes(),
            new NegociacoesView($("#negociacoesView")), 'adicionar', 'esvasiar');

        this._mensagem = new Bind(new Mensagem(),
            new MensagemView($("#mensagemView")), 'texto');
    }

    adicionar(event) {
        event.preventDefault();
        this._listaNegociacoes.adicionar(this._criarNegociacao());
        this._mensagem.texto = "Negociação adicionada com sucesso!";
        this._limparFormulario();
    }

    importarNegociacoes() {
        let service = new NegociacaoService();
        service.obterNegociacoesDaSemana((erro, negociacoes) => {
            if (erro) {
                this._mensagem.texto = erro;
                return;
            }
            negociacoes.forEach(negociacao => this._listaNegociacoes.adicionar(negociacao));
            this._mensagem.texto = "Negociações importadas com sucesso!";
        });
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
