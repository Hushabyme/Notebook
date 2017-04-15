class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    const index = this.observers.indexOf(observer);
    if(index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObserver(observer) {
    const index = this.observers.indexOf(observer);
    if(index > -1) {
      this.observers[index].notify(index);
    }
  }

  notifyAllObservers() {
    for(let i = 0; i < this.observers.length; i++) {
      this.observers[i].notify(i);
    }
  }
}

class Observer {
  constructor(number) {
    this.number = number;
  }

  notify() {
    console.log(`Observer: ${this.number} is notified!`);
  }
}

const subject = new Subject();

const observer1 = new Observer(1);
const observer2 = new Observer(2);
const observer3 = new Observer(3);
const observer4 = new Observer(4);

subject.addObserver(observer1);
subject.addObserver(observer2);
subject.addObserver(observer3);
subject.addObserver(observer4);

console.log(subject.notifyObserver(observer2));
subject.removeObserver(observer2);

console.log(subject.notifyAllObservers());