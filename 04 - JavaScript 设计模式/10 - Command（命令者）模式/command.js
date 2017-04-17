class Calculate {
  constructor(number) {
    this.number = number;
  }

  run(command, value) {
    this.number = command(this.number, value);
    return this;
  }

  result() {
    console.log(this.number);
  }
}

const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;
const div = (a, b) => a / b;

const num = new Calculate(100);

num
  .run(add, 5)
  .run(sub, 10)
  .run(mul, 2)
  .result();  // 190

