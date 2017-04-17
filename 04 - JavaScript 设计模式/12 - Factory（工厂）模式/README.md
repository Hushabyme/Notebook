# 第十二章 Factory（工厂）模式

我么先不谈什么是工厂模式，我们来看一个很简单的例子：

```javascript
class Dog {
  constructor() {
    this.sound = 'woof';
  }
  
  bark() {
    console.log(this.sound);
  }
}

const myDog = new Dog();
myDog.bark();  // "woof"
```

这里，我定义了一个 Dog 类，然后使其拥有一个 bark 方法，然后呢，我就可以实例化 Dog 并输出其结果，但是，这里有一个问题存在。第一，每一次我使用它的时候，我都要 new 一次，很麻烦；第二，如果绑定了一个事件的话，我必须使用 bind() 方法或者 es6 中的箭头函数绑定作用域。

为什么？因为 this 是 Dog 类的私有属性。我们可以来看看：

```html
<button id="btn">点击</button>

<script>
  const btn = document.querySelector('#btn');

  const myDog = new Dog();

  btn.addEventListener('click', myDog.bark());
</script>
```

此时，我还没有点击，但是控制台已经输出了 "woof"。

这是为什么呢？**因为事件在浏览器中是异步执行的！**也就是说，当第一遍执行代码时，`myDog.bark()` 已经执行了，而 click 事件却被放入了宏队列（macro task）中，你一定很迷茫，这是什么？

如果我奉上 JavaScript 面试中最经典的一道题：

```javascript
for(var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  } ,1000)
}
```

想必你会一口回答 —— 输出五个 5。

那么这是为什么？答案是一样的。在执行到 for 循环这一行时，已经输出了五个 5，紧接着才会被推入到宏队列中，所以就是五个 5。解决方法就是使用 bind() 或者 ES6 中的箭头符号绑定作用域。当然，这里也可以使用 let。

好了，这就是 Dog 类在这里的局限性，看起来没问题，不就写一个 bind 吗？可是，你不会认为这是 JavaScript 遗留的毛病吗？这是什么怪异的属性？初学者能够轻松理解吗？

接下来我们使用更为简单的工厂模式来写一遍：

```javascript
const dog = function () {
  const sound = 'woof';

  return {
    bark() {
      console.log(sound);
    }
  }
};
```

HTML 

```html
const myDog = dog();
btn.addEventListener('click', myDog.bark);
```

你看出端倪来了吗？什么是工厂模式？没有？

那我们就再写一个！

```javascript
class Class {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  print() {
    console.log(`${this.name} is ${this.age} years old this year.`);
  }
}

const girl = new Class('Alice', 12);
girl.print();  // "Alice is 12 years old this year."
```

好了，那么接下来我们使用工厂模式来重写一遍上面的例子吧，认真看哦：

```javascript
function Factory(name, age) {
  const person = {
    name: name,
    age: age
  }
  
  return {
    print() {
      console.log(`${this.name} is ${this.age} years old this year.`);
    }
  }
}

const girl = Factory('Alice', 12);
girl.print();  // "Alice is 12 years old this year."
```

我们使用了工厂模式来替代了类的写法。好处是什么？视情况而定。

一般来说，工厂模式没有使用 new 关键字，使用了函数来代替，这有一点好，那就是可以不用老是想起来使用 new。但是，缺点也很明显，那就是它不能**继承**。当时工厂模式被创造出来的时候是没有 ES6 的 Class 语法糖的，因此那时候想要继承一个类，是非常麻烦的，需要写一个函数来强制转换 constructor 的指向。

而如今有了 extends 关键字，这些麻烦都省去了，所以，仁者见仁，是否使用工厂模式取决于环境而定。

当然，我们可以使用一个函数来代替 new：

```javascript
const create = function (Class, ...args) {
  return new Class(args);
};
```

HTML：

```html
const myDog1 = create(Dog);
btn.addEventListener('click', () => myDog1.bark());
```

这样，我们就不会忘记写 new 关键字了。

但实际上，我们很少会忘记写 new 的。。。只是不喜欢而已。因为 JavaScript 是一门灵活的语言，不是一定要使用面向对象的写法。