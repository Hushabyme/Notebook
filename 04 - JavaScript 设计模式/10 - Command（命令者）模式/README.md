# 第十章 Command（命令者）模式

> Command 模式旨在将方法调用、请求或操作封装到单一对象中，从而根据我们不同的请求对使用者进行参数化和传递可供执行的方法调用。

Command 模式背后的思想是：它为我们提供了一种分离职责的手段，这些职责包括从执行命令的任意地方发布命令以及将该职责转而委托给不同对象。

多说无益，我们来构建一个简单的计算器功能吧：

```javascript
class Calculate {
  constructor(number) {
    this.number = number;
  }

  add(val) {
    this.number += val;
    return this;
  }

  sub(val) {
    this.number -= val;
    return this;
  }

  result() {
    console.log(this.number);
  }
}

const num = new Calculate(100);
num.add(10).sub(5).add(20).sub(6).result();  // 119
```

看到了吗？上面的构建过程还算简单吧，只有减法和加法，但是如果我再加上其他的数学公式呢？那么应该怎么写？在写一堆的乘法、除法、乘方、开根等等。

接下来我们使用 Command 模式重构一下它：

```javascript
class Calculate {
  constructor(number) {
    this.number = number;
  }

  execute(command, value) {
    this.number = command(this.number, value);
    return this;
  }

  result() {
    console.log(this.number);
  }
}

const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;
const div = (a, b) => a / b;

const num = new Calculate(100);

num
  .run(add, 5)
  .run(sub, 10)
  .run(mul, 2)
  .result();  // 190
```

看出区别来了么？区别就在于解耦！这时，我们使用 `run` 方法作为代理执行，而我们的 `add` 、`sub` 等方法都与 Calculate 类毫无关联，也就是说，它们可以独立存在，供其他地方进行调用。

其实，我们可以看到，代码量并未增加，反而缩减了，这些函数可以在其它地方调用，也就说明了Calculate 类不需要这些东西，换句话说，我现在有一个拼接字符串的方法。

```javascript
const toString = (str1, str2) => str1 + str2;
```

照样可以使用在这里，即使它不是加减乘除等算法，这就是解耦的好处。

也就是设计模式存在的目的。