module.exports = {

  e: function (z) {
    return Math.exp(z);
  },

  step: function (n) {
    if(n >= 0) return 1;
    else return 0;
  },

  sign: function (n) {
    if(n >= 0) return 1;
    else return (-1);
  },

  sigmoid: function (n) { 
    return (1/(1+ this.e(-n)));
  }

};

function e(z) {
  return Math.exp(z);
}
