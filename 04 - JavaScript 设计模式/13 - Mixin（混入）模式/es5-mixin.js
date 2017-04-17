function Human(name, age) {
  this.name = name;
  this.age = age;
}

Human.prototype.print = function() {
  console.log(this.name + ':' +  this.age);
};

function Person(name, age, gender) {
  Human.call(this, name, age);
  this.gender = gender;
}

// 手动改变 Person 的原型链指向
Person.prototye = Object.create(Human.prototype);

Person.prototype.print = function() {
  console.log(this.name + ' is ' + this.gender + ' and this year ' + this.age + ' years old.')
};

const person = new Person('Alice', 12, 'female');
person.print();  // Alice is female and this year 12 years old.
