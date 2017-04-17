class Prototype {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayName() {
    console.log(this.name);
  }
}

class Person extends Prototype {
  constructor(name, age, gender) {
    super(name, age);
    this.gender = gender;
  }

  sayGender() {
    console.log(this.gender);
  }
}

const xiaoMing = new Person('小明', 20, '男');

xiaoMing.sayName();
xiaoMing.sayGender();