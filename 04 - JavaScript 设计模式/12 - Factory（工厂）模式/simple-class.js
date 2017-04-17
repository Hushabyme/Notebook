class Dog {
  constructor() {
    this.sound = 'woof';
  }

  bark() {
    console.log(this.sound);
  }
}

const create = function (Class, ...args) {
  return new Class(args);
};