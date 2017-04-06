function ownKeys(object) {
  return Object.getOwnPropertyNames(object).concat(
    Object.getOwnPropertySymbols(object)
  );
}

const uid = Symbol('uid');
const obj = {
  a: 1,
  b: 2,
};

obj[uid] = Math.random();

console.log(Object.getOwnPropertyNames(obj));  // [ 'a', 'b' ]
console.log(ownKeys(obj));  // [ 'a', 'b', Symbol(uid) ]
