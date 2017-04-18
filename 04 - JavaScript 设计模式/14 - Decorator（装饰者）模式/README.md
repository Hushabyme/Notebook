# 第十四章 Decorator（装饰者）模式

Decorator 是一种结构型设计模式，旨在促进代码复用。与 Mixin 相似，它们可以被认为是另一个可行的对象子类化的替代方案。

通常，Decorator 提供了将行为动态添加至系统的现有类的能力。其想法是，装饰本身对于类原有的基本功能来说并不是必要的，否则，它就可以被合并到超类本身了。

装饰者可以用于修改现有的系统，希望在系统中为对象添加额外的功能，而不需要大量修改使用它们的底层代码。开发人员使用它们的一个共同原因是：应用程序可能包含大量不同类型对象的功能。

装饰者模式并不严重依赖于创建对象的方式，而是关注扩展其额外的功能。我们使用了一个单一的基本对象并逐步添加额外功能的 decorator 对象，而不是仅仅依赖于原型继承。

这个想法是：向基本兑现添加（装饰）属性或方法，而不是进行子类化，因为它较为精简。

还记得上一章最后的例子吗？我们就拿它作为开始：

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

这里的 `print()` 方法覆盖了 Human 类中的 `print()` 方法，这样是否是一件好事呢？

显然并不是，为什么？如果在一个大型的应用程序中，有多少的子类使用了该方法？你无法明确，所以当你修改了以后，会发生什么样的麻烦，谁也不知道。

这时，我们将进行一些修改来改变：

```javascript
class Person extends Human {
  constructor(name, age, gender) {
    super(name, age);
    this.gender = gender;
  }
}

const Alice = new Person('Alice', 15, 'female');
```

我们首先将 Person 子类中的 `print()` 方法移除，然后进行实例化。

接下来，我们将该方法放在这个子类实例化中，这样，只有这个子类拥有该方法，而其它的对象则依然拥有 Human 类的方法。

我们来测试一下：

```javascript
Alice.print = function() {
  console.log(`${this.name} is ${this.gender} and this year ${this.age} years old.`);
};

Alice.print();  // Alice is female and this year 15 years old.
```

上面的结果说明了确实是覆盖了 Human 类中的该方法，接下来，我们再进行测试：

```javascript
const Bob = new Person('Bob', 18, 'male');
Bob.print();  // Bob: 18
```

答案出来了，同样使用了 Person 进行实例化，但 Human 中的方法却并未被覆盖，这就是装饰者模式的好处。

正是由于装饰者模式可以动态地修改对象，因此它们是一种用于改变现有系统的完美模式。有时候，为对象创建装饰者比维护每个对象类型的单个子类要简单的多。可以让可能需要大量子类对象的应用程序的维护变得简单。

但是有一个问题存在，那就是滥用。假如该模式被滥用，那么应用程序中就充满了大量的重复代码，而很多重复地代码其实都是可以放在子类中的，一味地使用装饰者模式，会使该实例变得很好维护，却忽视了原类型可能需要进行修改了。

如果上面的例子弄清楚了，那么下面的例子也就看得懂了。

我们现在要实现一个 Coffee 购买，有小杯、中杯、大杯，它们的价格分别为 5 美元、8 美元和 10 美元。

如果我们使用类的写法是这样的：

```javascript
class Coffee {
  constructor() {};

  small() {
    return 5 + '$';
  }
  medium() {
    return 8 + '$';
  }
  large() {
    return 10 + '$';
  }
}

const coffee = new Coffee();
console.log(coffee.large());  // 10$
```

但是看起来很奇怪，这样也能被叫做类吗？

我们接下来使用装饰者模式的写法：

```javascript
class Coffee {
  constructor() {
    this.cost = () => 5;
  };

  samll() {
    let cost = this.cost;
    return cost + '$';
  }

  medium() {
    let cost = this.cost;
    return cost + 3 + '$';
  }

  large() {
    let cost = this.cost();
    return cost + 5 + '$';
  }
}

const coffee = new Coffee();
console.log(coffee.large());  // 10$
```

这样就让人舒服了，为什么？因为我们使用了函数来写，这样，就变得很灵活，你肯定很疑惑。

假如现在我们涨价了，每一中规格都涨价 1 美元。第一种写法，我们必须将每一个地方都修改一遍，都要加上 1。而第二种呢？因为我们使用的是修饰的写法，所以只需要修改原始的价格，将其变为 6 即可。

这就是本章的内容。