class EventBus {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  }

  unsubscribe(eventName, fn) {
    if(this.events[eventName]) {
      for( let i = 0; i < this.events[eventName].length; i++) {
        if(this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  }

  publish(eventName, ...args) {
    if(this.events[eventName]) {
      this.events[eventName].forEach(fn => fn(args));
    }
  }
}