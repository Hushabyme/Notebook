# 第十五章 Flyweight（享元）模式

享元模式从字面上翻译是“蝇量级模式”，其实并不太好理解。这个模式的作用就是在一个系统当中有很多很多的对象，而这些对象很相似，有细微地方不同，单数数量太大，影响系统性能，为了避免系统中出现大量相同或相似的对象，同时又不影响客户端程序通过面向对象的方式对这些对象进行操作，享元模式横空出世。

好比一个系统里面的字符，有非常之多，每个字符在显示的时候有的颜色不一样，有的大小不一样，有的字体不一样，享元模式通过共享技术实现相同或相似对象的重用，在逻辑上每一个出现的字符都有一个对象与之对应，然而在物理上它们却共享同一个享元对象，这个对象可以出现在一个字符串的不同地方，相同的字符对象都指向同一个实例。而享元模式里面一个重要的地方是享元池，里面装满了各种享元对象。这里可以看出享元模式的“享”是共享，“元”代表公共对象的最原始的状态。

看起来很迷茫，这都是什么啊，但是其实我们来举一个例子就好了。比如在页面上有很多很多按钮，它们在点击时都会弹出一个提示框，那么，我们就将这些公有的部分抽象出来，作为共享的功能使用。

```javascript
function message(el, message) {
  const elem = document.querySelector(el);
  return elem.addEventListener('click', () => alert(message));
}
```

HTML：

```html
<button id="btn1">1</button>
<button id="btn2">2</button>
<button id="btn3">3</button>
<button id="btn4">4</button>

<script>
  message('#btn1', 'Hello');
  message('#btn2', 'Dude');
  message('#btn3', 'Welcome');
  message('#btn4', 'Here');
</script>
```

这样，它们就拥有共享的一个函数了，如果还有其他的变化，我们就可以再为它们抽象出别的函数来，其实享元模式的最终意义就在于抽离共同部分。

可以用于函数的复用中。

享元模式的主要优点如下：

1. 可以极大减少内存中对象的数量，使得相同或相似对象在内存中只保存一份，从而可以节约系统资源，提高系统性能。
2. 享元模式的外部状态相对独立，而且不会影响其内部状态，从而使得享元对象可以在不同的环境中被共享。

享元模式的主要缺点如下：

1. 享元模式使得系统变得复杂，需要分离出内部状态和外部状态，这使得程序的逻辑复杂化。
2. 为了使对象可以共享，享元模式需要将享元对象的部分状态外部化，而读取外部状态将使得运行时间变长。

该模式使用频率不高，场合不多，在以下情况下可以考虑使用享元模式：

1. 一个系统有大量相同或者相似的对象，造成内存的大量耗费。
2. 对象的大部分状态都可以外部化，可以将这些外部状态传入对象中。
3.  在使用享元模式时需要维护一个存储享元对象的享元池，而这需要耗费一定的系统资源，因此，应当在需要多次重复使用享元对象时才值得使用享元模式。