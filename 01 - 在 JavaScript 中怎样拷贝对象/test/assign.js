function assign(target) {
  for(let hOP = Object.prototype.hasOwnProperty,
          copy = function (key) {
            if(!hOP.call(target, key)) {
              Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(this, key))
              }
            }
        , i = arguments.length;
        1 < i--;
        Object.keys(arguments[i]).forEach(copy, arguments[i])
  ){}

  return target;
}