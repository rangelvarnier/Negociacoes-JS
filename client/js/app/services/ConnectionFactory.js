'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, stores, version, dbName, connection, close, ConnectionFactory;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            stores = ['negociacoes'];
            version = 1;
            dbName = 'aluraframe';
            connection = null;
            close = null;

            _export('ConnectionFactory', ConnectionFactory = function () {
                function ConnectionFactory() {
                    _classCallCheck(this, ConnectionFactory);

                    throw new Error('Não é possivel instanciar ConnectionFactory');
                }

                _createClass(ConnectionFactory, null, [{
                    key: 'getConnection',
                    value: function getConnection() {
                        return new Promise(function (resolve, reject) {
                            var openRequest = window.indexedDB.open(dbName, version);

                            openRequest.onupgradeneeded = function (e) {
                                stores.forEach(function (store) {
                                    ConnectionFactory._createStores(e.target.result);
                                });
                            };

                            openRequest.onsuccess = function (e) {

                                if (!connection) {
                                    connection = e.target.result;
                                    //monkey pathing parecido com @Overide do java
                                    close = connection.close.bind(connection);
                                    connection.close = function () {
                                        throw new Error('Você não pode fechar diretamente a conexão');
                                    };
                                }
                                resolve(connection);
                            };

                            openRequest.onerror = function (e) {
                                console.log('Erro ao abrir conexão');
                                reject(e.target.error);
                            };
                        });
                    }
                }, {
                    key: '_createStores',
                    value: function _createStores(connection) {
                        if (connection.objectStoreNames.contains(stores)) {
                            connection.deleteObjectStore(stores);
                        }
                        connection.createObjectStore(stores, {
                            autoIncrement: true
                        });
                    }
                }, {
                    key: 'closeConnection',
                    value: function closeConnection() {
                        if (connection) {
                            // referencia o close à connection
                            //Reflect.apply(close, connection, []);
                            close();
                            connection = null;
                        }
                    }
                }]);

                return ConnectionFactory;
            }());

            _export('ConnectionFactory', ConnectionFactory);
        }
    };
});
//# sourceMappingURL=ConnectionFactory.js.map