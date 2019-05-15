export default class EventEmitter {
  // create our listeners object
  constructor () {
    this.listeners = {};
  }

  // register a callback for an event
  on (event, callback) {
    // ensure the events registered array exists
    this.listeners[event] = this.listeners[event] || [];
    // add new event
    this.listeners[event].push(callback);
  }

  // call all callbacks registered with an event
  emit (event, ...args) {
    const events = this.listeners[event] || [];
    events.forEach((callback) => {
      callback(...args);
    });
  }
}
