class Prototype {
  constructor() {

  }
}

class ConcretePrototype1 extends Prototype {
  constructor() {
    console.log("ConcretePrototype1 created");
    super();
    this.feature = 'feature1';
  }

  setFeature(key, val) {
    this[key] = val;
  }

  Clone() {
    console.log('custom clone');
    let clone = new ConcretePrototype1();
    let keys = Object.keys(this);
    keys.forEach(key => clone.setFeature(key, this[key]));

    console.log('ConcretePrototype1 cloned');
    return clone;
  }
}

function init() {
  const proto1 = new ConcretePrototype1();
  proto1.setFeature('feature', 'feature2');
  const clone1 = proto1.Clone();
  console.log(clone1.feature);
}

init();

/*
ConcretePrototype1 created
custom clone
ConcretePrototype1 created
ConcretePrototype1 cloned
feature2
*/