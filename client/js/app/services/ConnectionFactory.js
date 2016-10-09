// Module Patern para deixas as variaveis privadas e retornar a classe
// com uma function auto invocada (function (){})();
var ConnectionFactory = (function() {
    const stores = ['negociacoes'];
    const version = 3;
    const dbName = 'aluraframe';

    var connection = null;
    var close = null;
    return class ConnectionFactory {
        constructor() {
            throw new Error('Não é possivel instanciar ConnectionFactory');
        }

        static getConnection() {
            return new Promise((resolve, reject) => {
                let openRequest = window.indexedDB.open(dbName, version);

                openRequest.onupgradeneeded = e => {
                    stores.forEach(store => {
                        ConnectionFactory._createStores(e.target.result);
                    })
                };

                openRequest.onsuccess = e => {

                    if (!connection) {
                        connection = e.target.result;
                        //monkey pathing parecido com @Overide do java
                        close = connection.close.bind(connection);
                        connection.close = function(){
                            throw new Error('Você não pode fechar diretamente a conexão');
                        };
                    }
                    resolve(connection);
                };

                openRequest.onerror = e => {
                    console.log('Erro ao abrir conexão');
                    reject(e.target.error.name);
                };
            });
        }

        static _createStores(connection) {
            if (connection.objectStoreNames.connection(stores)) {
                connection.deleteObjectStore(stores);
            }
            connection.createObjectStore(stores, {
                autoIncrement: true
            });
        }

        static closeConnection(){
            if (connection) {
                // referencia o close à connection
                //Reflect.apply(close, connection, []);
                close();
                connection = null;
            }
        }
    }
})();
