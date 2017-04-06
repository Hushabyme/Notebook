const uid = Symbol('uid');

const special = {
  get next() {
    return ++this.counter;
  },
  counter: 0
};

special[uid] = Math.random();


const notSpecial = Object.assign({}, special);

console.log(notSpecial.counter);  // 1

console.log(notSpecial.next);  // 1

console.log(notSpecial[uid]);  // 随机数