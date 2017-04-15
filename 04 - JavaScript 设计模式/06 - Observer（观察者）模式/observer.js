const isFunction = function(obj) {
  return typeof obj === 'function' || false;
};

class EventEmitter {
  constructor() {
    this.observerList = new Map();
  }
  add(label, callback) {
    this.observerList.has(label) || this.observerList.set(label, []);
    this.observerList.get(label).push(callback);
  }

  remove(label, callback) {
    let observerList = this.observerList.get(label),
      index;

    if (observerList && observerList.length) {
      index = observerList.reduce((i, listener, index) => {
        return (isFunction(listener) && listener === callback)
          ? i = index
          : i;
      }, -1);

      if (index > -1) {
        observerList.splice(index, 1);
        this.observerList.set(label, observerList);
        return true;
      }
    }
    return false;
  }

  emit(label, ...args) {
    let observerList = this.observerList.get(label);

    if (observerList && observerList.length) {
      observerList.forEach((listener) => {
        listener(...args);
      });
      return true;
    }
    return false;
  }
}