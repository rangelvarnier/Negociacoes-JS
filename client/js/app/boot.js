'use strict';

System.register(['./controllers/NegociacaoController', './polyfil/fetch'], function (_export, _context) {
  "use strict";

  var NegociacaoController, negociacaoController;
  return {
    setters: [function (_controllersNegociacaoController) {
      NegociacaoController = _controllersNegociacaoController.NegociacaoController;
    }, function (_polyfilFetch) {}],
    execute: function () {
      negociacaoController = new NegociacaoController();


      document.querySelector('.form').onsubmit = negociacaoController.adicionar.bind(negociacaoController);
      document.querySelector('[type=button]').onclick = negociacaoController.apagar.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map