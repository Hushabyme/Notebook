class Human {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  print() {
    console.log(`${this.name}: ${this.age}`);
  };
}

class Person extends Human {
  constructor(name, age, gender) {
    super(name, age);
    this.gender = gender;
  }
}

const Alice = new Person('Alice', 15, 'female');

Alice.print = function() {
  console.log(`${this.name} is ${this.gender} and this year ${this.age} years old.`);
};

Alice.print();  // Alice is female and this year 15 years old.

const Bob = new Person('Bob', 18, 'male');
Bob.print();  // Bob: 18
