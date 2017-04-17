# 第八章 Mediator（中介者）模式

> 中介者是一种行为设计模式，它允许我们公开一个统一的接口，系统中不同的部分可以通过该接口进行通信。

想象一下，我们要去买房子，我们首先需要找的是销售人员，而不是开发商对吧？而销售人员就是中介者，他负责处理买房者与卖房者的需求问题。

如果一个系统的各个组件之间看起来有太多的直接关系，也许就是需要一个中心控制点了，以便各个组件可以通过这个中心控制点进行通信。

Mediator 模式促进松散耦合的方式是：确保组件的交互是通过这个中心点来处理的，而不是通过显示地引用彼此。这种模式可以版主沃恩解耦系统并提高组件的可重用性。

**但是，我需要把话先说在前面，那就是，中介者模式本身就是一个问题。**

如果你需要一个逻辑去处理或控制其它的对象，那么你就要为这些对象编写中介者来处理逻辑，但如果其中的一些对象发生了改变呢？我们就要重新修改中介者的处理逻辑，所以，其实它并没有看起来那么的好，而通常会更加的复杂。

这里我们看一个简单的例子：

```javascript
class Mediator {
  constructor() {
    this.handlers = [];
  }

  addHandler(handler) {
    if (this.isValidHandler(handler)) {
      this.handlers.push(handler);
      return this;
    }
    let error = new Error('Attempt to register an invalid handler with the mediator.');
    error.handler = handler;
    throw error;
  }

  isValidHandler(handler) {
    return (typeof handler.canHandle === 'function') &&
      (typeof handler.handle === 'function');
  }

  request(message) {
    for (let i = 0; i < this.handlers.length; i++) {
      let handler = this.handlers[i];
      if (handler.canHandle(message)) {
        return handler.handle(message);
      }
    }
    let error = new Error('Mediator was unable to satisfy request.');
    error.request = message;
    return error;
  }
}
```

你可能会发现，它与之前讲到的 Observer 和 Pub/Sub 模式没有特别的区别，原因就在于在它们两个模式中，都会有一个中介者作为对象存储这些函数，所以，其实是包含了在其中，所以，中介者模式也并不是一味的独立出来的部分。

**但是它们之间还是存在区别的，那就是：观察者模式等是用于订阅或取消和发布需要注册的事件，而中介者模式是强制进行通信，也就是必须通过这个中介者达到通信的目的。**

