# 第六章 Observer（观察者）模式

> Observer 是一种设计模式，其中，一个对象（称其为 subject）维持一系列依赖于它的（观察者）的对象，将有关状态的变化自动地通知给它们。

当一个目标需要告诉观察者发生了什么有趣的事情的时候，它会向观察者广播一个通知（可以包括与通知主题相关的特定数据）。

当我们不希望某个观察者获得其注册目标发出的改变通知时，该目标可以将它从观察者列表中删除。

Observer 模式的组件包括：

- Subject（目标）—— 维护一系列的观察者，方便添加和删除观察者。
- Observer（观察者） —— 为那些在目标状态发生改变时需获得通知的对象提供一个更新接口。
- ConcreteSubject（具体目标） —— 状态发生改变时，向 Observer 发出通知，存储ConcreteObserver 的状态。
- ConcreteObserver（具体观察者） —— 存储一个指向 ConcreteSubject 的引用，实现 Observer 更新接口，以使自身状态与目标状态保持一致。

首先，让我们来模拟一个目标可能拥有的一系列依赖 Observer：

```javascript
class ObserverList {
  constructor() {
    this.observerList = [];
  }
  
  Add(obj) {
    return this.observerList.push(obj);
  }
  
  Empty() {
    this.observerList = [];
  }
  
  Count() {
    return this.observerList.length;
  }
  
  Get(index) {
    if(index > -1 && index < this.observerList.length) {
      return this.observerList[index];
    }
  }
  
  Insert(obj, index) {
    let pointer = -1;
    
    if(index === 0) {
      this.observerList.unshift(obj);
      pointer = index;
    } else if(index === this.observerList.length) {
      this.observerList.push(obj);
      pointer = index;
    }
    
    return pointer;
  }
  
  IndexOf(obj, startIndex) {
    let i = startIndex, pointer = -1;
    
    while(i < this.observerList.length) {
      if(this.observerList[i] === obj) {
        pointer = i;
      }
      
      i++;
    }
    
    return pointer;
  }
  
  RemoveIndexAt(index) {
    if(index === 0) {
      this.observerList.shift();
    } else if(index === this.observerList.length - 1) {
      this.observerList.pop();
    } 
  }
}
```

接下来，我们来模拟目标（Subject）和观察者列表上添加、删除或通知观察者的能力。

```javascript
class Subject {
  constructor() {
    this.observers = new ObserverList();
  }
  
  AddObserver(observer) {
    this.observers.Add(observer);
  }
  
  RemoveObserver(observer) {
    this.observers.RemoveIndexAt(this.observers.IndexOf(observer, 0));
  }
  
  Notify(context) {
    const observerCount = this.observers.Count();
    for(let i = 0; i < observerCount.length; i++) {
      this.observers.Get(i).Update(context);
    }
  }
}
```

这里的 `Update()` 方法将在后面的自定义部分进一步介绍。

在上述 Observer 组件的样例应用程序中，定义如下：

- 用于向页面添加新课件的 checkbox 按钮。
- 控制 checkbox，将充当一个目标，通知其他的 checkbox 需要进行检查。
- 用于添加新的 checkbox 的容器。

然后定义 ConcreteSubject 和 ConcreteObserver 处理程序，以便向页面添加新的观察者，并实现更新界面。

这里我们需要再定义一个 `extend` 函数，用于扩展对象：

```javascript
function extend(obj, extension) {
  for(let key in obj) {
    extension[key] = obj[key];
  }
}
```

