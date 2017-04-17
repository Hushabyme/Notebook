# 第十三章 Mixin（混入）模式

可能看到这个标题就会很迷惑，什么是混入模式？

如果看了上一章，想必你你一定看到了 extends 关键字，这就是 Mixin。

在传统的面向对象的编程中，类 B 是从另一个类 A 中扩展而来，这里我么就可以认为 A 是一个超类，B 是 A 的一个子类。因为，B 类的所有实例继承了 A 的方法。但 B 也能定义自己的方法，包括 A 中拥有的方法，可以进行重写。

我们首先来看看在 ES6 出现以前，我们想要继承一个类应该怎么做：

```javascript
function Human(name, age) {
  this.name = name;
  this.age = age;
}

Human.prototype.print = function() {
  console.log(this.name + ':' +  this.age);
}

function Person(name, age, gender) {
  Human.call(this, name, age);
  this.gender = gender;
}

// 手动改变 Person 的原型链指向
Person.prototye = Object.create(Human.prototype);

Person.prototype.print = function() {
  console.log(this.name + ' is ' + this.gender + ' and this year ' + this.age + ' years old.')
}

const person = new Person('Alice', 12, 'female');
person.print();  // Alice is female and this year 12 years old.
```

其实看上去并不是那么的麻烦，但是当原型链过长，需要一直向下继承怎么办？要写多少个这样的函数呀，而 ES6 中一个 extends 就解决了。

```javascript
class Human {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  print() {
    console.log(`${this.name}: ${this.age}`);
  };
}

class Person extends Human {
  constructor(name, age, gender) {
    super(name, age);
    this.gender = gender;
  }

  print() {
    console.log(`${this.name} is ${this.gender} and this year ${this.age} years old.`);
  };
}

const Alice = new Person('Alice', 15, 'female');
Alice.print();  // Alice is female and this year 15 years old.
```

使用 ES6 中的模板字符串写法也同时方便了我们的书写。

这多么的简洁清晰呀，这就是所谓 Mixin 模式，不是什么新奇的东西，所以作为了解就好了。

如果你想自己试试 ES5 中的写法有多么的糟糕，可以使用 Babel 在线转码 ES6 写法后看看，那是怎么一个场景。。。

好了，本节也到此结束了。