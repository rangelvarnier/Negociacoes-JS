class ListaNegociacoes {
    constructor(armadilha) {
        this._negociacoes = [];
        this._armadilha = armadilha;
    }

    adicionar(negociacao) {
        this._negociacoes.push(negociacao);
        this._armadilha(this);
    }

    get negociacoes() {
        return [].concat(this._negociacoes);
    }

    esvasiar() {
        this._negociacoes = [];
        this._armadilha(this);
    }
}
