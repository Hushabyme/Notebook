# 在 JavaScript 中怎样拷贝对象？

在 JavaScript 中有许许多多拷贝对象的方式，但是大多数时候的操作都不是我们所期望的那样。

所有属性的拷贝都是通过引用？子属性合并时会被替换掉？利用 getter / setter 存取器来保存？那么 Symbol 类型或不可枚举的属性怎么处理？

# 浅拷贝 vs 深拷贝

无论何时，我们使用 `a.prop = b.prop` 进行拷贝，我们都是在使用 **浅拷贝** ，这意味着如果 `b.prop` 是一个对象，通过 `a.prop` 修改它时 `b,prop` 也将会被修改。我们只是拷贝了它们的引用关系而不是它的值。

来看一个例子：

```javascript
const b = {shallow: {test: 'OK'}};

const a = {};
a.shallow = b.shallow;

// 假如我们修改它
a.shallow.tets = 'NOPE';

// 在 b 中也就会被修改
b.shallow.test;  // "NOPE"
```

为了获得一个 `b.shallow` 的深拷贝，我们可以简单的执行下列的操作：

```javascript
const b = {shallow: {test: 'OK'}};

// 深拷贝举例
const a = {};
a.shallow = {};
a.shallow.test = "NOPE";

// 这时，对象 b 就不会受到影响
b.shallow.test;  // "OK"
```

每个不是原始值的属性创建一个新对象也比浅拷贝更昂贵。

但是，如果我们关心数据一致性和所有权，一旦我们有另一个对象的副本，我们就不想反映我们在那里的变化。

那么现在的 JavaScript 中，我们可以采取哪些操作呢？

## Object.assign(target, source1[, sourceN])

下面的 ES6/2015 的规范，`Object.assign` **执行浅拷贝** 并且 **合并** 自身可枚举的对象，它的方向是**从右到左**开始的。

```javascript
const a = {};
const b = { a: { b: true }, 'b': 2 };
const c = { a: { c: true }, 'c': 3 };

Object.assign(a, b, c);

a.b;            // 2
a.c;            // 3

a.a === c.a;    // true

a.a.test = 'Will it blend?';

c.a.test;      // "Will it blend?"
```

### Object.assign 的副作用

这里有至少两点小问题可能大多数开发者都没有注意到，就是当属性使用 `Object.assign` 拷贝时。

- 所有的存取器，包含 getter 和 setter，都将作为数据拷贝，在拷贝期间，调用 getter 将不会设置所有的描述符。
- 所有 `Symbol` 键都默认是可枚举的，也是会被拷贝的，保证 Symbols 作为对象私有属性或者被保护起来不被拷贝也是我们所要思考的。

```javascript
const uid = Symbol('uid');

const special = {
  get next() {
    return ++this.counter
  },
  counter: 0;
};

special[uid] = Math.random();

const notSpecial = Object.assign({}, special);

notSpecial.counter;  // 如果 `counter` 在 `next` 之前被拷贝则为 1

notSpecial.next;     // 1

notSpecial[uid];     // 随机数
```

我们可以看出复制我们定义的数据属性而不是一个存取器是一个多么糟糕的主意，可能这是**唯一的例子**在整个程序失败或改变时。

```javascript
const special = {
  counter: 0,
  get next() {
    return ++this.counter;
  }
};

const notSpecial = Object.assign({}, special);

notSpecial.counter;  // 注意！这里是 0 而不是 1

notSpecial.next;     // 这里还是 1
```

总而言之，使用 `Object.assign`，我们会丢失访问器，最糟糕的部分是调用最终的 getter 来分配结果数据，定义属性的顺序可能会危及不同引擎的结果，加上一切都还只是浅复制。

这是一种灾难，如果你问我，原因是什么？那就是标准中或常见的情况是不考虑 ES5 描述符的，它是基于旧的 ES3 世界所充满的 `for/in` 循环，并以及`hasOwnProperty` 检查，世界上的访问者已经是事实上的非标准，但很少使用，因为 IE8 不兼容。

如果你想要一个建议的话：不要使用 `Object.assign` 进行任意的浅复制或合并数据，因为我们知道，它在拷贝时是不会包含存取器的。在每一个库中都避免使用它是一个广泛的认知了，这是一个不可预测的错误倾向的方法。

## Object.assign 的补丁版本

```javascript
function assign(target) {
  for(let hOP = Object.prototype.hasOwnProperty,
          copy = function (key) {
            if(!hOP.call(target, key)) {
              Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(this, key))
              }
            }
        , i = arguments.length;
        1 < i--;
        Object.keys(arguments[i]).forEach(copy, arguments[i])
  ){}

  return target;
}
```

这样，对象的存取器将会被保留下来，我们在操作时将不会调用它。

```java
var special = {
  get next() {
    return ++this.counter;
  },
  counter: 0
};

var reSpecial = assign({}, special);
reSpecial.counter;  // 0
reSpecial.next;     // 1
reSpecial.next;     // 2
reSpecial.next;     // 3

special.counter;    // 0 ... nope
special.next;       // 1
special.next;       // 2 ... and so on
```

## 拷贝自身的键

在最近的 ECMAScript 标准中，有一个 `Reflect.ownKeys` 的方法，等价于下列的操作：

```javascript
function ownKeys(object) {
  return Object.getOwnPropertyNames(object).concat(
    Object.getOwnPropertySymbols(object)
  );
}
```

以上的函数可以使我们能够检索每个自己的描述符，并模拟下一个 ECMAScript 规范的 `Object.getOwnPropertyDescriptors` 提议。

```javascript
Object.defineProperties(
  target,
  getOwnPropertyDescriptors(source)
);
```



# 深拷贝

没有内置机制来执行 JavaScript 的深拷贝，其中一个原因是它是相当复杂的。例如，在 JavaScript 中的函数仍然是一个对象，但不能以任何方式进行拷贝。因为这可能会导致一个副作用的产生。

可能会有循环引用，通常很难在合并中加以处理，这可能是一个相当慢的操作。

这里，我创建了一个 cloner 的 `npm` 工具。

它的算法已经经过了 es-class 和 dom-class 的测试，它看起来工作的很不错。

这里有最基础的两个子模块：`shallow` 和 `deep` 。每一个模块又有两个方法：**copy** 和 **merge** 。

```javascript
// 用以替代 Object.assign(a, b)
const a = cloner.shallow.copy(b);

// 用于代替递归合并
const a = {a: 1, b: 2};
const b = cloner.shallow.merge({a: 3}, a);
b; // {a: 3, b: 2}

// 用于代替手动的深拷贝
const a = {test: {a: 1}};
const b = cloner.deep.copy(a);
b.test.a = 2;
a.test.a; // 1

// 深合并
const b = cloner.deep.merge({a: 3}, a);
```

现在，每个单一的键都被复制或克隆在目标上，而不仅仅是自己的属性，而且不仅可以枚举，这使得实用程序也可以方便地合并本机类原型或增加 mixins。

至少现在我们都学会了，在我们将一个对象的属性拷贝到另一个中的时候，我们所需要知道的东西。

