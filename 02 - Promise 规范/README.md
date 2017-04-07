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

2.1.1. **当处于 pending 状态时，promise 拥有下述行为：** 

　2.1.1.1. 可以过渡到 fulfilled 或 rejected 两种状态中的一种。

2.1.2. **当处于 fulfilled 状态时，promise 拥有下述行为：** 

　2.1.2.1. 一定不会再过渡到其它两个状态中的一种。

　2.1.2.2. 一定拥有一个值，并且该值不会改变。

2.1.3. **当处于 rejected 状态时，promise 拥有下述行为：** 

　2.1.3.1. 一定不会再过渡到其它两个状态中的一种。

​　2.1.3.2. 一定会返回原因，并且同样不会再改变。

上述中的 **不会改变** 指的是不变的标识（例如 `===`），而不是不变量。

### 2.2. `then` 方法（The `then` Method）

一个 promise 一定会提供一个 `then` 方法，以接收它目前或最终的值或原因。

一个 promise 的 `then` 方法接受两个参数：

```
promise.then(onFulfilled, onRejected)
```

2.2.1. 其中 `onFulfilled` 和 `onRejected` 都是可选的参数：

　2.2.1.1. 如果 `onFulfilled` 不是一个函数，那么就会被忽略。

　2.2.1.2. 如果 `onRejected` 不是一个函数，那么就会被忽略。

2.2.2. 如果 `onFulfilled` 是一个函数，那么：

　2.2.2.1. 在 `promise` 完成后，它就会被调用，而  `promise` 的值就是它的第一个参数。

　2.2.2.2. 在 `promise` 完成之前，该函数一定不会被调用。

　2.2.2.3. 该函数只会被调用一次。

2.2.3. 如果 `onRejected` 是一个函数，那么：

　2.2.3.1. 在 `promise` 失败后，它就会被调用，而  `promise` 失败的原因就是它的第一个参数。

　2.2.3.2. 在 `promise` 失败之前，该函数一定不会被调用。

　2.2.3.3. 该函数只会被调用一次。

2.2.4.  `onFulfilled` 或 `onRejected` 都不会被调用，直到[执行上下文栈](https://es5.github.io/#x10.3)只包含平台代码（platform code） [3.1]。

2.2.5. `onFulfilled` 或 `onRejected` 必须作为函数被调用（例如：没有 `this` 值）[3.2]。

2.2.6. `then` 方法在同一个 promise 中可以被调用多次。

　2.2.6.1. 当 `promise` 为完成状态时，`then`方法被调用时，所有各自的 `onFulfilled` 回调函数就会依次执行。

　2.2.6.2. 当 `promise` 为完成状态时，`then`方法被调用时，所有各自的 `onRejected` 回调函数就会依次执行。

2.2.7. `then` 方法一定会返回一个 promise [3.3]。

```
promise2 = promise1.then(onFulfilled, onRejected);
```

　2.2.7.1. 如果`onFulfilled` 或 `onRejected` 返回一个值 `x` ，Promise Resolution Procedure（Promise 执行程序）`[[Resolve]](promise2, x) `将会运行。 

　2.2.7.2. 如果`onFulfilled` 或 `onRejected` 抛出一个异常 `e` ，`promise2` 会带着 `e` 作为失败的原因返回。

　2.2.7.3. 如果`onFulfilled` 不是一个函数，并且 `promise1` 为完成状态，`promise2` 也一定是完成状态，并和 `promise1` 拥有相同的值。

　2.2.7.4. 如果` onRejected` 不是一个函数，并且 `promise1` 为失败状态，`promise2` 也一定是失败状态，并和 `promise1` 拥有相同的值。

###  Promise 执行程序（The Promise Resolution Procedure）

**Promise 执行程序** 是一个抽象操作，作为输入的 promise 和值，我们表示它为 `[[Resolve]](promise, x)` 的形式。如果 `x` 是一个 thenable，那么它就会试图使 `promise` 采取 `x` 的状态，在此之下， `x` 的行为至少就像是一个 `promise` 了。否则，它就会带着 `x` 的值完成此 `promise` 。

thenable 将允许 promise 实现互相操作的能力，只要它们是符合 Promises/A+ 中的 `then` 方法。另外，它还允许 Promises/A+ 实现以合理的 `then`  方法“合并”不合规的实现。

当 `[[Resolve]](promise, x)` 运行时，将执行下列步骤：

2.3.1. 如果 `promise` 和 `x` 为同一个对象的引用，`promise` 将会抛出 `TypeError` 作为失败原因。

2.3.2. 如果 x 是一个 promise，那么会采取其状态 [3.4]：

　2.3.2.1. 如果 `x` 是 pending 状态时，`promise` 将一直维持该状态直到 `x` 转换为 fulfilled 或 rejected。

　2.3.2.2. 当 `x` 为 fulfilled 状态时， `promise` 将会带着相同的值完成。

　2.3.2.3. 当 `x` 为 rejected 状态时， `promise` 将会带着相同的值失败。

2.2.3. 否则，如果 `x` 是一个对象或函数：

　2.2.3.1. 使 `then` 变为 `x.then` [3.5]。

　2.2.3.2. 如果检索属性 `x.then` 会导致抛出异常 `e` ，那么会以 `e` 作为原因失败返回。

　2.3.3.3. 如果 `then` 为一个函数，将带着 `x` 调用它作为 `this` ，第一个参数为  `resolvePromise` ，并且第二个参数为 `rejectPromise` ，以下为具体细节：

　　2.3.3.3.1. 如果当 `resolvePromise`  带着值 `y` 被调用，那么运行 ` [[Resolve]](promise, y)` 。

　　2.3.3.3.2.  如果当 `rejectPromise` 带着原因 `r` 被调用，那么 `promise` 会带着 ` r` 作为失败原因返回。

　　2.3.3.3.3.  如果当  `resolvePromise` 和 `rejectPromise`  都调用时，或者同一参数被多次调用时，第一个调用将优先执行，并且后面的调用都将被忽略。

　　2.3.3.3.4. 如果执行 `then` 方法时抛出一个异常 `e` ，那么：

　　　2.3.3.3.4.1. 如果 `resolvePromise` 或 `rejectPromise` 被调用，就忽略它。

　　　2.3.3.3.4.2. 否则，将 `e` 作为失败原因返回。

　2.3.3.4. 如果 `then` 不是一个函数，`promise` 将带着 `x` 完成。

2.3.4 如果 `x` 不是一个对象或函数，`promise` 将带着 `x` 完成。

如果 promise 带着 thenable 完成的话，那么就会参与到 thenable  链的循环中，这样递归地 `[[Resolve]](promise, thenable)` ，最终 `[[Resolve]](promise, thenable)` 会被再一次调用，遵循上述算法将导致无限递归。鼓励实现，但不是必须的，检测这种递归和拒绝 `promise` 带着 `TypeError` 作为原因返回 [3.6]。

## 3. 注意事项（Notes）

3.1 上文中的“平台代码（platform code）”译为机器、环境，以及 promise 内置的代码。在实践中，就是要确保`onFulfilled` and `onRejected` 执行是异步的，也就是在事件环（event loop）执行完后 `then` 方法才被会调用，并且还需保证这是空的栈（fresh stack）。这可以被实现，在 “macro-task” 机制中，例如  [`setTimeout`](https://html.spec.whatwg.org/multipage/webappapis.html#timers) 或 [`setImmediate`](https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/setImmediate/Overview.html#processingmodel) ，或者 “micro-task” 机制中的 [`MutationObserver`](https://dom.spec.whatwg.org/#interface-mutationobserver) or [`process.nextTick`](http://nodejs.org/api/process.html#process_process_nexttick_callback) 。一旦 promise 实现时被作为平台代码，它本身可能包含调用处理程序的任务调度队列或“蹦床（trampoline）”。

3.2 也就是说，在严格模式下，`this` 默认指向 `undefined` ；在松散模式中，`this` 默认指向`global` 。

3.3 实现可能允许 `promise2 === promise1`，只要实现满足所有要求。每个实现应该记录它是否可以产生 `promise2 === promise1` 以及在什么样的条件下实现。

3.4 一般来说，只有当 `x` 来自当前的实现时，`x `才是真正的 promise。本规范允许使用实现特定手段采用已知符合 promise 的状态。

3.5 首先存储对 `x.then` 的引用，然后测试该引用，然后再调用该引用，避免对 `x.then` 属性的多次访问。这种预防措施对于确保访问者属性的一致性很重要，访问者属性的值可能在检索之间发生变化。

3.6 实现不应该对可能的链的深度设置任意限制，并且假设超出任意限制，递归将是无限的。只有真正的循环才能导致 `TypeError` ；如果遇到无穷无尽的链接，则永远是循序渐进的行为。