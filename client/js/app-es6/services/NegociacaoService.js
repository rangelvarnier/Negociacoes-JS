import {HttpService} from './HttpService';
import {Negociacao} from '../models/Negociacao';
import {ConnectionFactory} from "./ConnectionFactory";
import {NegociacaoDao} from "../dao/NegociacaoDao";

export class NegociacaoService {
    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoes() {
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), [])
                .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor));

            return negociacoes;
        }).catch(erro => {
            throw new Error(erro);
        });
    }

    obterNegociacoesDaSemana() {
        return new Promise((resolve, reject) => {
            this._http
                .get('negociacoes/semana')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto =>
                        new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possivel obter as negociaçoes da semana');
                });
        });
    }

    obterNegociacoesDaSemanaAnterior(callBack) {
        return new Promise((resolve, reject) => {
            this._http
                .get('negociacoes/anterior')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto =>
                        new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possivel obter as negociaçoes da semana anterior');
                });
        });
    }

    obterNegociacoesDaSemanaRetrasada(callBack) {
        return new Promise((resolve, reject) => {
            this._http
                .get('negociacoes/retrasada')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto =>
                        new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possivel obter as negociaçoes da semana retrasada');
                });
        });
    }

    cadastrar(negociacao){
        return ConnectionFactory
            .getConnection()
            .then(conexao => new NegociacaoDao(conexao))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociacao adicionada com sucesso')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possivel cadastra a negociação');
            });
    }

    lista(){
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possivel listar as negociações');
            });
    }

    apaga(){
        return ConnectionFactory
            .getConnection()
            .then(conexao => new NegociacaoDao(conexao))
            .then(dao => dao.apagarTodos())
            .then(() => 'Negociações apagadas com sucesso')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possivel apagar as negociações');
            });
    }

    importa(listaAtual){
        return this.obterNegociacoes()
            .then(negociacoes => negociacoes.filter(negociacao =>
                !listaAtual.some(negociacaoExistente =>
                JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente))))
            .catch(erro => {
                console.log(erro);
                throw new Error('')
            })
    }
}
