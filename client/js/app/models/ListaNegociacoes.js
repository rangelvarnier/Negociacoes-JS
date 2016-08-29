class ListaNegociacoes {
    constructor() {
        this._negociacoes = [];
    }

    adicionar(negociacao) {
        this._negociacoes = [].concat(this._negociacoes, negociacao);
        //this._negociacoes.push(negociacao);
    }

    get negociacoes() {
        return [].concat(this._negociacoes);
    }

    esvasiar() {
        this._negociacoes = [];
    }
}
