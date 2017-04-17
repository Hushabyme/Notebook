# 第九章 Prototype（原型）模式

原型相信大家都不会陌生，而原型模式，我们可以简单的将其看做继承，什么都不多说了，我们先看一个例子：

```javascript
class Prototype {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayName() {
    console.log(this.name);
  }
}

class Person extends Prototype {
  constructor(name, age, gender) {
    super(name, age);
    this.gender = gender;
  }

  sayGender() {
    console.log(this.gender);
  }
}

const xiaoMing = new Person('小明', 20, '男');

xiaoMing.sayName();  // "小明"
xiaoMing.sayGender();  // "男"
```

上面的 sayName 方法在 Person 中是没有的，而是在 Prototype 中才有的，是 Person 继承来的方法，这就是原型模式的简单的实现。

不是很难吧，先到这里就好了。再复杂的先不做介绍。