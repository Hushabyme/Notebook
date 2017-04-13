const myModule = (function () {
  const module = {};

  const privateVar = 'Hello World';

  function privateMethod() {
    return privateVar;
  }

  module.publicVar = 'foo';
  module.publicFn = () => privateMethod();

  return module;
}());

console.log(myModule.publicFn());  // 'Hello World'