# 第四章 Revealing Module（揭示模块）模式

现在，我们已经对 Module 模式有了一定的了解，让我们来看一个稍有改进的版本 —— 揭示模块模式。

揭示模块模式的产生是因为 Heilmann 这个人，他很不满意这种情况，那就是：当他想从另一个方法调用用一个公有方法或访问公有变量时，必须要重复主对象的名字。同时，他也不喜欢 Module 模式必须要切换到对象字面量表示法让某种方法变为公有方法。

它能够在私有范围内简单定义所有的函数和变量，并返回一个对象，它拥有指向私有函数的指针，而该函数就是希望展示为公有的方法。

接下来我们使用揭示模块模式为你展示它什么样的：

```javascript
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
  // 将暴露的公有指针指向到私有属性和函数上
  return {
    setName: publicSetName,
    greeting: publicVar,
    getName: publicGetName
  }
// 注意，最后这里有一个括号！  
}();

myRevealing.greeting;  // Hey there
myRevealing.getName();  // Name: Hello World
```

揭示模块模式与模块模式最大的区别就在于，你可以自定义想要暴露的接口的函数和变量的名称。

如果你喜欢的话，该模式也可以用于展示更具体命名方案的私有函数和属性。

```javascript
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

myRevealing.count();  // 0
myRevealing.increment();
myRevealing.increment();
myRevealing.count();  // 2
myRevealing.reset();  // 0
myRevealing.count();  // 0
```

## 优点和缺点

### 1. 优点

该模式可以使脚本语法更加一致，在模块代码的底部，它会更容易指出哪些函数和变量可以被公开访问，从而改善可读性。

### 2. 缺点

如果一个私有函数引用一个公有函数，在需要打补丁的时候，公有函数是不能被覆盖的。这时因为私有函数将继续引用私有实现，该模式并不适用于公有成员，只适用于函数。

正因为如此，使用揭示模块模式可能比采用原始的模块模式更脆弱，所以在使用时应该特别小心。

