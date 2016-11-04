export class DateHelper {

    constructor() {
        throw new Error('Esta classe não precisa ser instanciada');
    }

    static dataParaTexto(data) {
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }

    static textoParaDate(texto) {
        if (!/\d{4}-\d{2}-\d{2}/.test(texto)) {
            throw new Error('Formato deve ser aaaa-mm-dd');
        }
        return new Date(...texto.split("-").map((item, indice) => item - indice % 2));
    }
}
