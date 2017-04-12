# 第二章 Constructor（构造器）模式

在经典的面向对象的编程语言中，Constructor 是一种在内存已分配给该对象的情况下，用于初始化新创建对象的特殊方法。

而在 JavaScript 中，几乎所有的东西都是对象，我们通常最感兴趣的就是 ***Object 构造器***。

Object 构造器用于创建特定类型的对象 —— 准备好对象以备用，同时接受构造器可以使用的参数，以在第一次创建对象时，设置成员属性和方法的值。

在 JavaScript 中不支持类（Class）的概念（注：ES6 中的 Class 只是语法糖），但它确实支持与对象一起用的特殊的 constructor（构造器）函数。通过在构造器前面加上 **new** 关键字，告诉 JavaScript 像使用构造器一样实例化一个新的对象，并且对象成员由该函数定义。

在构造器内，关键字 this 引用新创建的对象。

接下来我们实现一个简单的构造器模式的版本。

```javascript
function Car(model, year, miles) {
  this.model = model;
  this.year = year;
  this.miles = miles;
  
  this.toString = function () {
    return this.model + ' has done ' + this.miles + ' miles';
  }
}

const myCar = new Car('Honda Civic', 2009, 20000);

console.log(myCar.toString());  // Honda Civic has done 20000 miles
```

但是这样的写法是有问题存在的，首先，toString 方法使得继承变得困难，其次，它是为每个使用 Car 构造器创建的新对象分别重新定义的，这不是最理想的，因为这中函数应该再所有的 Car 类型的实例中间共享。

想必，在你心中已经有了答案 —— prototype。

## 带原型的 Constructor（构造器） 

JavaScript 中，有一个名叫 *prototype* 的属性。调用 JavaScript 构造器创建一个对象后，新对象就会具有构造器原型的所有属性。

通过这种方式，可以创建多个 Car 对象，并访问相同的原型。

因此，我们可以修改并拓展上述的例子：

```javascript
function Car (model, year, miles) {
  this.model = model;
  this.year = year;
  this.miles = miles;
}

Car.prototype = {
  toString: function () {
    return this.model + ' has done ' + this.miles + ' miles';
  },
  changeYear: function (miles) {
    return this.miles = miles;
  }
};

const myCar = new Car('Honda Civic', 2009, 20000);

console.log(myCar.toString());  // Honda Civic has done 20000 miles
console.log(myCar.changeYear(50000));  // 50000
```

这就是构造器模式，我们在学习 JavaScript 的过程中，一定都接触过它，只不过那时的你可能还不知道它怎么称呼。

接下来，我们使用 ES2015/ES6 来重构上述的例子：

```javascript
class Car {
  constructor(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;
  }

  toString() {
    return this.model + ' has done ' + this.miles + ' miles';
  }

  changeYear(miles) {
    return this.miles = miles;
  }
}

const myCar = new Car('Honda Civic', 2009, 20000);

console.log(myCar.toString());  // Honda Civic has done 20000 miles
console.log(myCar.changeYear(40000));  // 40000
```

看得出来，这样的写法更加简洁清晰。

目前可能看起来与前面的差距并不大，但是当你准备继承的时候，你就会发现 ES2015/ES6 的 Class 语法糖是多么的可爱了。

好的，本章的内容就是这些，请继续阅读下一章节吧。