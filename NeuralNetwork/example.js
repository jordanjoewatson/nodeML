"use strict";
var Network = require('./Network');
var Neuron = require('./Neuron');
var activation = require('./activation');
var layerTypes = require('./layerTypes');

let INPUT = layerTypes.input();
let OUTPUT = layerTypes.output();
let HIDDEN = layerTypes.hidden();
let PERCEPTRON = layerTypes.perceptron();

//Creates a network with 3 layers, one input, one hidden and one output
var net = new Network(3);

//create 5 nodes, specify the activation functions, weights, layer type and layer, i.e 1 for input etc
var n1 = new Neuron(activation.sign,[1,-3],INPUT,1);
var n2 = new Neuron(activation.sign,[2,1],INPUT,1);
var n3 = new Neuron(activation.sign,[1,-2],HIDDEN,2);
var n4 = new Neuron(activation.sign,[-2],HIDDEN,2);
var n5 = new Neuron(activation.sign,[-2,1],OUTPUT,3);

//set the outputs and inputs of each node
//n3 has two weights [1,-2]
//below n3 has inputs set to [n1,n2]
//the weight of 1 is the weight multiplied by the output of n1 and so on
n1.setOutputs([n3]);
n2.setOutputs([n3,n4]);
n3.setInputs([n1,n2]);
n4.setInputs([n2]);
n3.setOutputs([n5]);
n4.setOutputs([n5]);
n5.setInputs([n3,n4]);

//after the nodes you then need to set what nodes are in what layers in the network
net.setLayer([n1,n2]);
net.setLayer([n3,n4]);
net.setLayer([n5]);

//print information about the network
net.printNetwork();

//the inputs -2 and 1 are the inputs for node n1 with the weights 1 and -3 respectively, 1 and -2 are the inputs for n2 with weights 2 and 1
net.compute([[-2,1],[1,-2]],1);
