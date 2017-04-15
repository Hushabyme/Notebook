# 第六章 Observer（观察者）模式

> Observer 是一种设计模式，其中，一个对象（称其为 subject）维持一系列依赖于它的（观察者）的对象，将有关状态的变化自动地通知给它们。

当一个目标需要告诉观察者发生了什么有趣的事情的时候，它会向观察者广播一个通知（可以包括与通知主题相关的特定数据）。

当我们不希望某个观察者获得其注册目标发出的改变通知时，该目标可以将它从观察者列表中删除。

Observer 模式的组件包括：

- Subject（目标）—— 维护一系列的观察者，方便添加和删除观察者。
- Observer（观察者） —— 为那些在目标状态发生改变时需获得通知的对象提供一个更新接口。
- ConcreteSubject（具体目标） —— 状态发生改变时，向 Observer 发出通知，存储ConcreteObserver 的状态。
- ConcreteObserver（具体观察者） —— 存储一个指向 ConcreteSubject 的引用，实现 Observer 更新接口，以使自身状态与目标状态保持一致。

我们首先实现一个拥有简单功能的观察者：

```javascript
class Subject {
  constructor() {
    this.observers = [];
  }
  
  // 添加观察者
  addObserver(observer) {
    this.observers.push(observer);
  }

  // 移除观察者
  removeObserver(observer) {
    const index = this.observers.indexOf(observer);
    if(index > -1) {
      this.observers.splice(index, 1);
    }
  }
	
  // 向观察者发送消息
  notifyObserver(observer) {
    const index = this.observers.indexOf(observer);
    if(index > -1) {
      this.observers[index].notify(index);
    }
  }

  // 向所有观察者发送消息
  notifyAllObservers() {
    for(let i = 0; i < this.observers.length; i++) {
      this.observers[i].notify(i);
    }
  }
}
```

上面，我们就创建了一个拥有添加、移除等方法的类，接下来，我们再来定义观察者类：

```javascript
class Observer {
  constructor(number) {
    this.number = number;
  }

  notify() {
    console.log(`Observer: ${this.number} is notified!`);
  }
}
```

这个观察者只有一个功能，那就是提供消息。

**注意：我们这里的 Subject 是用于管理 Observer 的，而 Observer 才是真正用于管理具体的子观察者的。**

接下来，我们就开始吧：

```javascript
const subject = new Subject();

const observer1 = new Observer(1);
const observer2 = new Observer(2);
const observer3 = new Observer(3);
const observer4 = new Observer(4);

subject.addObserver(observer1);
subject.addObserver(observer2);
subject.addObserver(observer3);
subject.addObserver(observer4);

console.log(subject.notifyObserver(observer2));  // Observer: 2 is notified!
subject.removeObserver(observer2);
```

上面的 observer1、2、3、4 就是所谓的具体观察者，它们都是 Observer 的实例，我们使用 `addObserver` 方法将这些具体观察者都添加到 Subject 的数组中，这样就可以实现管理与发送消息了。

我们最后使用了 `removeObserver` 方法将其从观察者列表中移除。

接下来我们来获取所有观察者吧：

```javascript
console.log(subject.notifyAllObservers());
// undefined
// Observer: 1 is notified!
// Observer: 3 is notified!
// Observer: 4 is notified!
```

我们这里会发现 Observer2 消失了！没错，因为我们上面将其从列表中删除了，因此，它不再具有观察者的作用了，所以这里就返回了 undefined。

当然，我们这里定义的类不是经典的观察者模式，原因是因为我想让你们先尽快的熟悉到这个环境中来，告诉你们怎样去添加和删除一个观察者，相信不是很难理解吧？

接下来，我们就可以开始真正的观察者模式了。

相信在这样的一个场景下，我们都会做这么一件事。比如，点击一个按钮，弹出一个对话框：

```javascript
document.querySelector('#btn').addEventListener('click', () => alert('Hi!'));
```

以上的代码都是我们最常写的，这个按钮点击时，就会触发一个事件。但是，你有没有想过，为什么在今天，前端的思维从 jQuery 的直接操作 DOM 到 Vue 的数据驱动转变了？

原因就在于：1. 强耦合性，导致该按钮想要添加其它事件，导致其可维护性下降；2. 可复用性差，如果其它按钮也想用该事件，将会不断地重复这样的代码，这就会导致代码臃肿。

比如：

```javascript
document.querySelector('#btn1').addEventListener('click', () => alert('Hi!'));
document.querySelector('#btn2').addEventListener('click', () => alert('Hi!'));
document.querySelector('#btn3').addEventListener('click', () => alert('Hi!'));
document.querySelector('#btn4').addEventListener('click', () => alert('Hi!'));
```

这样的代码你觉得可靠吗？这时你会说，那我就封装吧！或者使用 jQuery 的 `$`  操作符不就好了吗？

```javascript
$('#btn1').on('click', () => alert('Hi!'));
$('#btn2').on('click', () => alert('Hi!'));
$('#btn3').on('click', () => alert('Hi!'));
$('#btn4').on('click', () => alert('Hi!'));
```

你真的觉得这很好吗？如果事件比较复杂呢？管理起来怎么样？在 Vue 中，我们可以这样写：

```javascript
new Vue({
  el: '#btn',
  methods: {
    hi() {
      alert('Hi!');
    },
    good() {
      alert(`I'm good!`);
    },
    bad() {
      alert(`I'm bad!`);
    }
  }
});

<button id="btn" @click="hi()"></button>
```

这样看起来和谐多了，所有 `#btn` 可用的方法都放在了一起，想要改变，直接找到这个 Vue 实例，然后查找到你想修改的部分，在 HTML 中的 button 里直接修改即可。

我为什么要提 Vue 呢？这里有一个思想，我不知道你注意到了没。就是当 Vue 实例注册了 `#btn` 以后，它就和 HTML 中拥有该 id 的 button 绑定在一起了。

以下是它们间的对话：

> button：当 `@click` 改变了，它就告诉 Vue 实例，你注册了我吗？
>
> Vue 实例：el 说，我已经绑定你了。
>
> button：我想要绑定 good() 方法，你有吗？
>
> Vue 实例：good() 方法说，我在这呢！
>
> button：现在我想变成 bad() 。
>
> Vue 实例：有呢有呢，拿去吧，不客气！

 你发现了吗？这像极了观察者模式，button 是一个具体观察者，它说，我要注册一个 click 方法，而 Vue 实例就是具体目标，它管理着 button，一旦 button 有了变化，那么 Vue 实例就会收到通知，然后再通知给 Vue 这个类，Vue 就会做出相应的反应。假如没有绑定 el 呢？那么 Vue 就会向控制台发送一个错误消息：

```
ERROR: cannot find #btn element.
```

**当然，这只是一种假设，并不代表着在 Vue 框架中使用的就是这样的形式。这么说的目的是为了让你感受它的工作方式。**

接下来就是重头戏了，这里使用 ES6 语法来写的，目的是为了方便和简洁：

```javascript
const isFunction = function(obj) {
  return typeof obj === 'function' || false;
};

class EventEmitter {
  constructor() {
    this.observerList = new Map();
  }
  
  add(label, callback) {
    this.observerList.has(label) || this.observerList.set(label, []);
    this.observerList.get(label).push(callback);
  }

  remove(label, callback) {
    let observerList = this.observerList.get(label),
      index;

    if (observerList && observerList.length) {
      index = observerList.reduce((i, listener, index) => {
        return (isFunction(listener) && listener === callback) 
          ? i = index
          : i;
      }, -1);

      if (index > -1) {
        observerList.splice(index, 1);
        this.observerList.set(label, observerList);
        return true;
      }
    }
    return false;
  }
  
  emit(label, ...args) {
    let observerList = this.observerList.get(label);

    if (observerList && observerList.length) {
      observerList.forEach((listener) => {
        listener(...args);
      });
      return true;
    }
    return false;
  }
}
```

在 HTML 中键入下列 script：

```javascript
let observable = new EventEmitter(),
    onChange = ((data) => {
      console.log(`Data change:`, data);
    });

  observable.add("change", (data) => onChange(data));

  observable.emit("change", {
    a: 1
  });  // Data change: Object {a: 1}

  observable.emit("change", {
    a: 2
  });  // Data change: Object {a: 2}
```

以上的代码我没有注释，也不会讲解，如果你理解了 Observer 到底是什么，那么你就会知道上面写的是什么。

