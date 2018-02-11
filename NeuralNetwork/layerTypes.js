var Enum = require('enum');
require('enum').register();
let LAYER = new Enum(["INPUT","OUTPUT","HIDDEN","PERCEPTRON"]);

module.exports = {

  input: function () {
    return LAYER.INPUT;
  },

  output: function () {
    return LAYER.OUTPUT;
  },

  perceptron: function () {
    return LAYER.PERCEPTRON;
  },

  hidden: function () {
    return LAYER.HIDDEN;
  }

};
