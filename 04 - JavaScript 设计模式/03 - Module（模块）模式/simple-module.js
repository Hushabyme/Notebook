const myModule = (function() {
  let counter = 0;

  return {
    increment() {
      return counter++;
    },
    reset() {
      counter = 0;
    }
  }
}());

console.log(myModule.counter);  // undefined
console.log(myModule.increment());  // 0
console.log(myModule.increment());  // 1