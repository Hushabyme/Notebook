const myNamespace = (function () {
  // 私有变量
  let privateVar = 0;

  // 记录参数的私有变量
  const privateMethod = foo => console.log(foo);

  return {
    // 公有变量
    publicVar: 'foo',

    // 可供调用的公有方法
    publicFn(bar) {
      console.log(privateVar++);
      privateMethod(bar);
    }
  }
}());

console.log(myNamespace.publicVar);  // foo
myNamespace.publicFn('good');  // 0 good
myNamespace.publicFn('good');  // 1 good