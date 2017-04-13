const mySingleton = (function () {
  let instance;

  function init() {
    function privateMethod() {
      console.log(`I'm private method`);
    }

    const privateVar = 'I am also private';
    const privateRandom = Math.random();

    return {
      publicMethod() {
        console.log(`I'm public`);
      },
      publicVar: 'I am public variable',
      getRandom() {
        return privateRandom;
      }
    };
  }

  return {
    getInstance() {
      if(!instance) {
        instance = init();
      }

      return instance;
    }
  }
}());

const singleA = mySingleton.getInstance();
const singleB = mySingleton.getInstance();
console.log(singleA.getRandom() === singleB.getRandom());  // true