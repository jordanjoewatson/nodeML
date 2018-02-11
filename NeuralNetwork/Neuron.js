"use strict";
var hs = require('./haskell.js');

class Neuron {

  constructor(σ,weights,layerType,layer) {
    this.weights = weights;
    this.σ = σ;
    this.layerType = layerType;
    this.layer = layer;
    this.id = ++Neuron.ID;
    this.inputs = [];
    this.inputNeurons = [];
    this.outputs = [];
    this.outputNeurons = [];
    this.error = [];
  }

  Σ(xs,ys) {
    if(xs.length == 0) return 0;
    return (xs[0] * ys[0]) + this.Σ(xs.slice(1),ys.slice(1));
  }

  //set the input neurons only needs to be set once
  setInputs(inputNeurons) {
    this.inputNeurons = inputNeurons;
  }

  //set the output neurons only needs to be set once
  setOutputs(outputNeurons) {
    this.outputNeurons = outputNeurons;
  }

  Δw(xs,answer,ε) {
    this.weights = hs.zipWith(((m,n) => m+n), hs.map((i => ((answer - ε) * i)),xs), this.weights);
  }

  compute(xs) {
    var inputs = (xs) ? xs : this.inputs;
    if(inputs.length != (this.weights).length) return null;
    else return (this.σ(this.Σ(inputs,this.weights)));
  }

  //Still need to implement backpropagation
  backpropogate(error) {

  }

  toString() {
    if(this.layerType.key == "INPUT") {
      return "  [ID: " + this.id + ", w: " + "[" + this.weights + "], function: " + this.σ.name + ", type: " + this.layerType.key + ", output(ID): [" + this.getOutputs() + "]]";
    } else if(this.layerType.key == "OUTPUT") {
      return "  [ID: " + this.id + ", w: " + "[" + this.weights + "], function: " + this.σ.name + ", type: " + this.layerType.key + ", input(ID): [" + this.getInputs() + "]]";
    } else if(this.layerType.key == "PERCEPTRON") {
      return "  [ID: " + this.id + ", w: " + "[" + this.weights + "], function: " + this.σ.name + ", type: " + this.layerType.key + "]";
    } else {
      return "  [ID: " + this.id + ", w: " + "[" + this.weights + "], function: " + this.σ.name + ", type: " + this.layerType.key + ", input(ID): [" + this.getInputs() + "], output(ID): [" + this.getOutputs() + "]]";
    }
  }

  //toString method
  getOutputs() {
    var out = [];
    for(var i = 0 ; i < this.outputNeurons.length ; i++) {
      out.push(this.outputNeurons[i].id);
    }
    return out;
  }

  //toString method
  getInputs() {
    var inputs = [];
    for(var i = 0 ; i < this.inputNeurons.length ; i++) {
      inputs.push(this.inputNeurons[i].id);
    }
    return inputs;
  }

  //updating inputs for following layer
  updateInputs(input) {
    for(var i = 0 ; i < this.outputNeurons.length ; i++) {
      this.outputNeurons[i].updateInput(input);
    }
  }

  updateInput(input) {
    this.inputs.push(input);
  }

  resetInputs() {
    this.inputs = [];
  }

  updateError(error) {
    this.error.push(error);
  }

  //alter weights slightly if they add up to zero so rules out infinity error
  zeroError() {
    for(var i = 0 ; i < this.weights.length ; i++) {
      if((i+1 % 2) == 0) this.weights[i] = this.weights[i]+0.05;
      else this.weights[i] = this.weights[i]-0.05;
    }
  }

};

Neuron.ID = 0;

module.exports = Neuron;
