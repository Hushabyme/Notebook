const myRevealing = function () {
  let privateVar = 'Hello World';
  const publicVar = 'Hey there';

  function privateFn() {
    console.log(`Name: ${privateVar}`);
  }

  function publicSetName(value) {
    privateVar = value;
  }

  function publicGetName() {
    privateFn();
  }

  return {
    setName: publicSetName,
    greeting: publicVar,
    getName: publicGetName
  }
}();

console.log(myRevealing.greeting);  // Hey there
myRevealing.getName();  // Name: Hello World