

# 第五章 Singleton（单例）模式

单例模式被人们所熟知是因为它限制了类的实例化次数只能是一次。

从经典的意义上来说，Singleton 模式，在该实例不存在的情况下，可以通过一个方法创建一个类来实现创建类的新实例；如果实例已经存在，那么就会简单的返回该对象的引用。它不同于静态类（或对象），因为我们可以推迟它们的初始化，这通常是因为它们需要一些信息，而这些信息在初始化期间可能无法获得。

在 JavaScript 中，Singleton 充当共享资源命名空间，从全局命名空间中隔离出代码实现，从而为函数提供单一访问点。

我们来举一个例子，让大家可以感受什么叫做“单例”。比如我们在注册某一网站的账号的时候，如果用户名被注册了，那么就会接收到一个提示：该用户名已被注册。而这里的单例也是一样的，在此情景下，只允许存在一个实例，无法再创建第二个。

我们可以像懓这样实现一个 Singleton：

```javascript
const mySingleton = (function () {
  let instance;

  function init() {
    function privateMethod() {
      console.log(`I'm private method`);
    }

    const privateVar = 'I am also private';
    const privateRandom = Math.random();

    return {
      publicMethod() {
        console.log(`I'm public`);
      },
      publicVar: 'I am public variable',
      getRandom() {
        return privateRandom;
      }
    };
  }

  return {
    getInstance() {
      if(!instance) {
        instance = init();
      }

      return instance;
    }
  }
}());

const singleA = mySingleton.getInstance();
const singleB = mySingleton.getInstance();

singleA.getRandom() === singleB.getRandom();  // true
```

我们看到上面的结果返回使 true，这说明，singleA 与 singleB 是同一个值，也就是 singleA 的值。

原因就在于该实例已经被检测到创建过了，因此，不会再次创建。

我们接着再举一个例子吧，比如我们的页面上有一个按钮，当点击它的时候，就会弹出一个提示框，如果每一次点击都要创建一个提示框，这显然是不合理的，那么页面上会出现多少个提示框啊。

因此，我们可以说，该提示框在此页面上是唯一的，也就是说，它属于单例模式中的例子。

**下面的例子不是最佳实践，尽量避免模仿。**

```html
<button id="open">打开</button>
<button id="close">关闭</button>
```

```javascript
 const createDiv = (function() {
      const div = document.createElement('div');
      div.style.width = '300px';
      div.style.height = '160px';
      div.style.border = '1px solid black';
      div.style.display = 'none';
      document.body.appendChild(div);

      return div;
  }());

  document.querySelector('#btn').addEventListener('click', () => {
    createDiv.style.display = 'block';
  });

  document.querySelector('#close').addEventListener('click', () => {
    createDiv.style.display = 'none';
  });
```

接着我们来使用单例模式重构上述的代码：

```html
<button id="open">打开</button>
<button id="close">关闭</button>
```

```css
.show {
      width: 300px;
      height: 160px;
      border: 1px solid black;
      border-radius: 5px;
      box-shadow: 0 0 8px gray;
      margin-top: 8px;
      transition: all .5s;
    }

    .hide {
      display: none;
      transition: display 1s;
    }
```

```javascript
class Model {
    constructor(id, html) {
      this.html = html;
      this.id = id;
      this.open = false;
    }

    create() {
      if(!this.open) {
        const model = document.createElement('div');
        model.innerHTML = this.html;
        model.id = this.id;
        document.body.appendChild(model);

        setTimeout(() => model.classList.add('show'), 0);

        this.open = true;
      }
    }

    delete() {
      if(this.open) {
        const model = document.getElementById(this.id);
        model.classList.add('hide');
        setTimeout(() => document.body.removeChild(model) ,200);

        this.open = false;
      }
    }
  }

  const createInstance = (function() {
    let instance;
    return function () {
      return instance || (instance = new Model('model', '这是一个弹窗'));
    }
  }());

  document.querySelector('#open').addEventListener('click', () => {
    const instance = createInstance();
    instance.create();
  });

  document.querySelector('#close').addEventListener('click', () => {
    const instance = createInstance();
    instance.delete();
  });
```

我们可以看到，其中最重要的是 `createInstance` 这个 IIFE，它就是单例模式的一个实现。

Singleton 的存在往往表明系统中的模块要么是系统紧密耦合，要么是其逻辑过分松散于各个代码库中。

本章我们学习到的这个案例很有价值，此外，我们还可以将其中更繁杂的部分进行再次封装和抽离，比如 `document.querySelector()` 这个方法，我们就可以将其封装为：

```javascript
function $(DOMString){
  return typeof DOMString === 'string'
  	? document.querySelector(DOMString)
  	: throw new Error('please check out the TagName');
}
```

我们就可以使用它了：

```javascript
$('#open').addEventListener('click', () => {
    const instance = createInstance();
    instance.create();
});
```

另外，`const instance = createInstance();` 也被重复使用，我们是否可以再定义一个函数或对象作为代理（Proxy）控制是否创建实例呢？答案当然是可以，不过这个任务我暂时不回答，留给你做思考。