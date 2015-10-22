const foldl = (fn, acc, [first, ...rest]) => 
  first === undefined
   ? acc
   : foldl(fn, fn(acc, first), rest);

const flatten = list => foldl(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b)
  , []
  , list
);

module.exports = flatten;
