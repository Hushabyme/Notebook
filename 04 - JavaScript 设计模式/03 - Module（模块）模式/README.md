# 第三章 Module（模块）模式

> 模块是任何强大应用程序架构中不可或缺的一部分，他通常能够帮助我们清晰地分离和组织项目中的代码单元。

在 JavaScript 中，有几种用于实现模块的方法，包括以下几种：

- 对象字面量表示法
- Module 模式
- AMD 模块
- CommonJS 模块
- ECMAScript Harmony 模块

我们会在随后的几章中我们会探索后面的三种方法。

Module 模式在某种程度上基于对象字面量，因此首先重新认识对象字面量是有意义的。

## 对象字面量

在对象字面量表示法中，一个对象被描述为一组包含在大括号（{}）中，用逗号分隔的键值对（key/value pairs）。对象中的 key 可以是字符串或标识符，后面跟着一个冒号。

对象字面量不可以使用 new 关键字进行实例化。

在对象外部，可以使用类似于 `myModule.property ='someValue' ` 来添加新的成员。

接下来我们来看一个例子：

```javascript
const myApp = {
  user: 'Hushaby',
  myConfig: {
    useCaching: true,
    language: 'en'
  },
  methods: {
    upper(value) {
      return value.toUpperCase();
    },
    lower(value) {
      return value.toLowCase();
    },
    toString() {
      return `User is ${myApp.user}`;
    }
  }
};
myApp.password = 'abc123456';
myApp.methods.upper('name');  // 'NAME'
```

可以看出，使用对象字面量有助于封装代码和组织代码，并且由于使用了命名空间，因此，在给对象添加方法时，我们就可以知道为是哪一个对象添加了方法。

如果你选择了这种技术，我们可能同样也对 Module 感兴趣。它同样使用了对象字面量，但只是一个作用域函数的返回值。

## Module（模块）模式

> Module 模式在最初被定义为一种在传统软件工程中为类提供私有和公有封装的方法。

在 JavaScript 中，Module 模式用于进一步模拟类的概念，通过这种方式，能够使一个单独的对象拥有公有/私有方法和变量，从而屏蔽来自全局作用域的特殊部分。

**产生的结果是：函数名与在本页上其它脚本定义的函数冲突的可能性降低。**

### 私有

Module 模式使用闭包封装“私有”状态和组织。它提供了一种包装混合公有/私有方法和变量的方式，放置其企鹅楼到全局作用域，并与其它开发人员的接口发生冲突。

**通过该模式，只需返回一个公有 API，而其它的一切则维护在私有闭包里。**

该模式除了返回一个对象而不是一个函数之外，非常类似于一个立即调用表达式（IIFE）。

这里应该指出一个事实，那就是 —— **在 JavaScript 中，不存在真正意义上的“私有”** 。因为不想有些传统语言， JavaScript 没有访问修饰符。从技术上来讲，我们不能称变量为公有或是私有，因此我们需要使用函数作用域的概念来模拟这个概念。

在 Module 模式中，由于闭包的存在，声明变量和方法只在该模式内部可用。但在返回对象上定义的方法和变量，则对外部使用者是可用的。

我们举一个简单的例子看看它是什么样子的：

```javascript
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

myModule.counter;  // undefined
myModule.increment();  // 0
myModule.increment();  // 1
```

我们可以看到第一行中 counter 的输出结果为 undefined，这说明外部确实是访问不到内部的私有变量的。当然，这里我们说它表现的像一个私有变量才是更准确的。

使用 Module 模式时，可能我们会觉得用它定义一个简单的模板用于入门来使用比较合适，下面是一个包含命名空间、公有、私有变量的 Module 模式：

```javascript
const myNamespace = (function () {
  // 私有变量
  let privateVar = 0;

  // 记录参数的私有变量
  const privateMethod = foo => console.log(foo);

  return {
    // 公有变量
    publicVar: 'foo',

    // 可供调用的公有方法
    publicFn(bar) {
      console.log(privateVar++);
      privateMethod(bar);
    }
  }
}());

myNamespace.publicVar;  // 'foo'
myNamespace.publicFn('good');  // 0 'good'
myNamespace.publicFn('good');  // 1 'good'
```

## Module 模式变化

### 1. 引入混入

模块的这种变化演示了全局变量（如 jQuery、Underscore 等） 如何作为参数传递给模块的匿名函数。这允许我们引入它们，并按照我们所希望的为它们取个本地别名。

```javascript
const myModule = (function ($, _) {
  function privateMethod1() {
    $('.container').html('text');
  }

  function privateMethod2() {
    console.log(_.min([1, 2, 3, 4]));
  }
  
  return {
    publicMethod() {
      privateMethod1();
    }
  }
// 用于引入 jQuery 和 underscore  
}(jQuery, _));
```

### 2. 引出

这一个例子是 Module 模式的变化版本，也同样值得学习：

```javascript
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

myModule.publicFn();  // 'Hello World'
```

## 优点和缺点

### 1. 优点

我们已经了解了 Module 模式是多么有用以及它的形式是什么样子的，但为什么它是一个好的选择呢？或者在什么情况下你需要它？首先，相比于真正的封装，他对于许多面向对象背景的开发人员来说更加整洁，至少是从 JavaScript 角度来说。

其次，它支持私有数据，因此，我们在代码的公共部分可以访问内部的私有属性和方法，而外界却接触不到内部的私有属性和方法。

### 2. 缺点

Module 模式最大的缺点之一就是：**假如我想要修改访问公有成员和私有成员的暴露方式，那么我们就要修改每一个曾经使用过该成员的地方。** 在一个拥有庞大系统的代码架构中，这无疑是一种致命的麻烦。因此，该方法更好的地方是用于小型代码库中，暴露公共 API 给其它的对象使用。

其它的缺点包括：无法为私有成员创建单元测试，bug 需要修正补丁时会增加其复杂性；另外，开发人员也无法轻易地扩展私有方法，所以要记住，私有方法并不像它们看起来那样灵活。

