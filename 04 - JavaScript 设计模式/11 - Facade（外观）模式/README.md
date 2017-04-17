# 第十一章 Facade（外观）模式

什么是外观模式，我们不妨先想一下，自己出门会不会考虑今天穿什么衣服才好看呢？

外观模式就是如此，它是一个提供方便接口的高层次 API，能够隐藏其底层的真实的复杂性，目的也是为了开发人员能使用简化的 API 方便工作。

举一个例子：

```javascript
document.querySelector('#btn').addEventListener('click', callback);
```

以上是我们原生 JavaScript 的写法，接下来我们使用 jQuery 的写法：

```javascript
$('#btn').on('click', callback);
```

是不是看起来和写起来都舒服多了呢？

而 Vue 就更加的简便了：

```javascript
<button @click="click()"></button>
```

直接写在了 HTML 文档中，这多方便啊。

这就是外观模式的内涵，虽然我们写出来的样子不一样，但是我们都是实现了一件事 —— 那就是为鼠标的点击增加事件。

当然，如果你使用过 jQuery 中的 Ajax 方法，你就知道了，原生的 XMLHttpRequest() 写起来是多么痛苦。

```javascript
function on(el, event, callback) {
  if(el.addEventListener) {
    on = document.querySelector(el).addEventListener(event, callback);
  } else if(el.attachEvent) {
    on = document.querySelector(el).attachEvent('on' + event, callback);
  } else {
    on = document.querySelector(el)['on' + event] = callback;
  }
}

function remove(el, event, callback) {
  if(el.addEventListener) {
    remove = document.querySelector(el).removeEventListener(event, callback);
  } else if(el.attachEvent) {
    remove = document.querySelector(el).detachEvent('on' + event, callback);
  } else {
    remove = document.querySelector(el)['on' + event] = null;
  }
}
```

HTML 结构：

```html
<button id="btn">点击</button>

<script>
  on('#btn', 'click', () => alert('Welcome'));
</script>
```

最终会弹出带有 "Welcome" 的对话框。

其实这里呢，我全部使用 `document.querySelector` 方法是不对的，因为这是只有在 IE9+ 才支持的属性。这里是出于方便期间，就避免了处理这些逻辑的问题。

这就是外观模式，使我们平时最常使用的方法，我们所使用的所有的库或框架，都是采用了这种模式，隐藏底层细节，只暴露最易用的 API。