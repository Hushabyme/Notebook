const myRevealing = function () {
  let privateCounter = 0;

  function privateFn() {
    privateCounter++;
  }

  function publicIncrement() {
    privateFn();
  }

  function publicGetCount() {
    return privateCounter;
  }

  function publicReset() {
    return privateCounter = 0;
  }

  return {
    reset: publicReset,
    count: publicGetCount,
    increment: publicIncrement
  }
}();

console.log(myRevealing.count());  // 0
myRevealing.increment();
myRevealing.increment();
console.log(myRevealing.count());  // 2
console.log(myRevealing.reset());  // 0
console.log(myRevealing.count());  // 0