module.exports = {

  /*
    a function that takes two input lists, and applies an operation on these two via
    a lambda function. i.e if lambda is a multiplication function then the inputs
    xs = [1,2,3] and ys = [5,6,7] the output list will be [1*5,2*6,3*7]
  */
  zipWith: function (λ,xs,ys) {
    var self = this;
    if(xs.length != ys.length) {
      console.log("[!] Error in zipWith function from haskell.js");
      console.log("[!] Mismatched array sizes for arrays xs and ys");
      return []
    } else if(xs.length == 0) return [];
      else return [λ(xs[0],ys[0])].concat(self.zipWith(λ,xs.slice(1),ys.slice(1)));
  },

  /*
    a function that takes a list of things and applies a lambda to every element to
    create a new list with transformed elements, i.e lambda that doubles elements and
    a list xs = [1,2,3] then output is [1*2,2*2,3*2]
  */
  map: function (λ,xs) {
    if(xs.length == 0) return [];
    else return [λ(xs[0])].concat(this.map(λ,xs.slice(1)));
  },

  //returns sum of list values
  sum: function (xs) {
    if(xs.length == 0) return 0;
    else return xs[0] + this.sum(xs.slice(1));
  }
};
