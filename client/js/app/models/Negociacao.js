class Negociacao {
    /**
     * Classe com valores imutaveis.
     * atribuindo a data um new Date(...gerTime()) para garantir via
     * programação defensiva que a data não será alterada via referencia
     * fora da classe
     */
    constructor(data, quantidade, valor) {
        this._data = new Date(data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;
        Object.freeze(this);
    }

    get volume() {
        return this._quantidade * this._valor;
    }

    get data() {
        return new Date(this._data.getTime());
    }

    get quantidade() {
        return this._quantidade;
    }

    get valor() {
        return this._valor;
    }

}
