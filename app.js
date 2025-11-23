class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  subscribe(eventName, callback) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }

    const listeners = this.events.get(eventName);
    listeners.push(callback);

    return {
      unsubscribe: () => {
        const idx = listeners.indexOf(callback);
        if (idx !== -1) {
          listeners.splice(idx, 1);
        }
        return undefined;
      }
    };
  }

  emit(eventName, args = []) {
    if (!this.events.has(eventName)) return [];

    const results = [];
    for (const cb of this.events.get(eventName)) {
      results.push(cb(...args));
    }
    return results;
  }
}
