# 第七章 Publish/Subscribe（发布/订阅）模式

今天我们来探究发布/订阅模式，在网上查找了很多资料以后，发现观察者模式又称发布/订阅模式，excuse me？到底他们是否是一样的呢？

这暂时不去探究。但是，就我个人而言，它们是绝对不同的。

至于他们之间的区别在哪里，我想，发布订阅模式更多讲究的是注册事件，然后触发事件，而观察者模式更多讲究的是将事件进行观察，当被观察者发生了变化时，则观察者则得到相应的消息。

我举个例子：观察者模式，好比是，你去多个公司面试，你就是 Subject，而各个公司就是 Observer，当面试通过了以后，你就会收到消息，而不用你随时去询问是否被录取，你只需要接收消息即可；而发布订阅模式，好比是，你的客户订阅了一年的报刊杂志，当他订阅后，你就负责每个月将订阅的杂志发送给他。

我们来写一个简单的发布/订阅模式的例子看看：

```javascript
class EventBus {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  }

  unsubscribe(eventName, fn) {
    if(this.events[eventName]) {
      for( let i = 0; i < this.events[eventName].length; i++) {
        if(this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  }

  publish(eventName, ...args) {
    if(this.events[eventName]) {
      this.events[eventName].forEach(fn => fn(args));
    }
  }
}
```

当需要的时候，我们就订阅它。

```javascript
const event = new EventBus();

event.subscribe('example', console.log);
```

接下来，我们就可以将这个事件发布出去：

```javascript
event.publish('example', '《程序员》');  // 《程序员》
```

其实，它的思想就是这么简单。将其注册，再将其发布并使用。