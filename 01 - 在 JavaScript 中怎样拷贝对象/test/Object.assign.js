const a = {};
const b = { a: { b: true }, 'b': 2 };
const c = { a: { c: true }, 'c': 3 };

Object.assign(a, b, c);

console.log(a.b);  // 2
console.log(a.c);  // 3

console.log(a.a === c.a);  // true

a.a.test = 'Will it blend?';

console.log(c.a.test);  // "Will it blend?"