class Calculate {
  constructor(number) {
    this.number = number;
  }

  add(val) {
    this.number += val;
    return this;
  }

  sub(val) {
    this.number -= val;
    return this;
  }

  result() {
    console.log(this.number);
  }
}

const num = new Calculate(100);
num.add(10).sub(5).add(20).sub(6).result();  // 119