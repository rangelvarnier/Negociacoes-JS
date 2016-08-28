class ListaNegociacoes {
    constructor(contexto, armadilha) {
        this._negociacoes = [];
        this._armadilha = armadilha;
        this._contexto = contexto;
    }

    adicionar(negociacao) {
        this._negociacoes.push(negociacao);
        Reflect.apply(this._armadilha, this._contexto, [this]);
    }

    get negociacoes() {
        return [].concat(this._negociacoes);
    }

    esvasiar() {
        this._negociacoes = [];
        Reflect.apply(this._armadilha, this._contexto, [this]);
    }
}
