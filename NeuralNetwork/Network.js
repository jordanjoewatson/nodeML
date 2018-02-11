var Neuron = require('./Neuron.js');
var activation = require('./activation.js');
var Enum = require('enum');
var hs = require('./haskell');
"use strict";

class Network {

  constructor(layers) { //layers specifies the amount of layers in the networks
    this.layers = layers; //amount of layers
    this.layer = [];
  }

  //called once for each layer
  setLayer(neurons) {
    this.layer.push(neurons);
  }

  train(inputs,answer) {
    var output = [this.compute(inputs)];

    if(output == answer) return true;
    else {
      var outputNeurons = this.layer[this.layers-1]; //gets list of output neurons
      for(var layer = this.layers ; layer > 0 ; --layer) {
        for(var neuron = 0 ; neuron < this.layer[layer-1].length ; neuron++) {
          if(layer == this.layers) this.layer[layer-1][neuron].backpropogate(output); //backprop with error if output node
          else this.layer[layer-1][neuron].backpropogate();
        }
      }
    }
  }

  printNetwork() {
    for(var layer = 0 ; layer < (this.layers) ; ++layer) {
      console.log("Layer " + (layer+1) + ":");

      for(var neuron = 0 ; neuron < (this.layer[layer].length) ; ++neuron) {
        console.log(this.layer[layer][neuron].toString());
      }
    }
  }

  compute(inputs) {

    var outputs = [];
    var output;

    for(var layer = 0 ; layer < this.layer.length ; layer++) {
      for(var neuron = 0 ; neuron < this.layer[layer].length ; neuron++) {
        output = (layer == 0) ? this.layer[layer][neuron].compute(inputs[neuron]) : this.layer[layer][neuron].compute();

        if(this.layer[layer][neuron].layerType.key == "OUTPUT") {
          console.log("OUTPUT: " + output);
          outputs.push(output);
        } else { //is hidden or input
          this.layer[layer][neuron].updateInputs(output); //
        }
        this.layer[layer][neuron].resetInputs(); //after computation the inputs are not valid
      }
    }
    return outputs;
  }

};

module.exports = Network;
