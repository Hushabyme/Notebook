class Coffee {
  constructor() {
    this.cost = () => 5;
  };

  samll() {
    let cost = this.cost;
    return cost + '$';
  }

  medium() {
    let cost = this.cost;
    return cost + 3 + '$';
  }

  large() {
    let cost = this.cost();
    return cost + 5 + '$';
  }
}

const coffee = new Coffee();
console.log(coffee.large());  // 10$