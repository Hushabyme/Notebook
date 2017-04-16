class pubSub {
  constructor() {
    this.handlers = {};
  }

  subscribe(name, handler) {
    this.handlers[name] = this.handlers[name] || [];
    this.handlers[name].push(handler);
  }

  unsubscribe(name, handler) {
    this.handlers[name] = this.handlers[name].filter(storeHandle => storeHandle !== handler);
  }

  publish(name, args) {
    this.handlers[name].map(handler => handler(args));
  }
}