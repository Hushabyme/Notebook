const myModule = (function ($, _) {
  function privateMethod1() {
    $('.container').html('text');
  }

  function privateMethod2() {
    console.log(_.min([1, 2, 3, 4]));
  }

  return {
    publicMethod() {
      privateMethod1();
    }
  }
// 用于引入 jQuery 和 underscore
}(jQuery, _));