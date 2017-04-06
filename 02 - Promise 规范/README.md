# Promises/A+ 规范

**An open standard for sound, interoperable JavaScript promises—by implementers, for implementers.**

*Promise* 表示的是一个异步操作的最终结果。与 promise 最基本的交互方式是使用 `then` 方法，该方法注册一个回调函数用于接收 promise 的最终值或者 promise 不能完成的原因。

本规范会详尽的叙述 `then` 方法的行为，提供所有的 Promises/A+ 的可交互基础来符合 promise 的依赖。因此，本规范会考虑的十分周全。尽管 Promises/A+ 组织可能会修改本规范，并对次要的向后兼容的情况进行修改，但只有经过仔细考虑、讨论和测试的内容，才会进行整合或对向后兼容进行必要的修改。

简单谈谈历史，Promises/A+ 阐明了更早的 Promise/A 提案的行为条款，扩展了事实上的一些行为，并省略了被指定有问题的部分。

最终，Promises/A+ 规范的核心不再处理怎样创建、完成或中止 promises，而是选择提供了可交互的 `then` 方法来替代。未来将会伴随该规范的条目进行。

## 1. 术语（Terminology）

1.1.  "promise" 是一个对象或带有 `then` 方法的函数，该函数拥有符合本规范的行为。

1.2. "thenable" 是一个对象或定义了一个 `then` 方法的函数。

1.3. "value" 是 JavaScript 中任意的合法的值（其中包括 `undefined` 、`thenable` 或一个 `promise`）。

1.4. "exception" 是一个值，使用 `throw` 语句可以抛出错误信息。

1.5. "reason" 是一个值，用于指示一个 promise 被中止的原因。

## 2. 要求（Requirements）

### 2.1. Promise 的状态（Promise States）

一个 promise 一定拥有下述三种状态中的一种：**pending** 、**fulfilled** 或 **rejected** 。

2.1.1. 当处于 pending 状态时，promise 拥有下述行为：

　2.1.1.1. 可以过渡到 fulfilled 或 rejected 两种状态中的一种。

2.1.2. 当处于 fulfilled 状态时，promise 拥有下述行为：

　2.1.2.1. 一定不会再过渡到其它两个状态中的一种。

　2.1.2.2. 一定拥有一个值，并且该值不会改变。

2.1.3. 当处于 rejected 状态时，promise 拥有下述行为：

　2.1.3.1. 一定不会再过渡到其它两个状态中的一种。

​　2.1.3.2. 一定会返回原因，并且同样不会再改变。

上述中的 **不会改变** 指的是不变的标识（例如 `===`），而不是不变量。

### 2.2. `then` 方法（The `then` Method）

一个 promise 一定会提供一个 `then` 方法，以接收它目前或最终的值或原因。

一个 promise 的 `then` 方法接受两个参数：

```
promise.then(onFulfilled, onRejected)
```

