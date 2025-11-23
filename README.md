# 📦 EventEmitter

A lightweight implementation of an **EventEmitter** similar to Node.js or the DOM EventTarget interface. This class allows subscribing to events, emitting events, and unsubscribing listeners.

---

## ⚙️ API

### `new EventEmitter()`

Creates a new EventEmitter instance.

---

### `subscribe(eventName: string, callback: Function): { unsubscribe: Function }`

Registers a listener for the specified event.

#### Parameters:

* **eventName** — The name of the event to listen to.
* **callback** — A function that will be executed when the event is emitted.

#### Returns:

* An object containing an `unsubscribe()` method. Calling it removes the callback from the event listener list and returns `undefined`.

---

### `emit(eventName: string, args?: any[]): any[]`

Executes all listeners subscribed to the event and returns their results.

#### Parameters:

* **eventName** — The name of the event to emit.
* **args** — (Optional) Array of arguments passed to every callback.

#### Returns:

* An array of results returned by each callback, in the order they were subscribed.
* Returns an empty array if the event has no listeners.

---

## 🚀 Example Usage

```javascript
const EventEmitter = require('./eventEmitter');

const emitter = new EventEmitter();

const sub1 = emitter.subscribe('firstEvent', () => 5);
const sub2 = emitter.subscribe('firstEvent', () => 6);

console.log(emitter.emit('firstEvent')); // [5, 6]

sub1.unsubscribe();
console.log(emitter.emit('firstEvent')); // [6]
```

---

## 🧪 Example Test (Jest)

```javascript
test('emit returns callback results in order', () => {
  const emitter = new EventEmitter();
  emitter.subscribe('ev', () => 1);
  emitter.subscribe('ev', () => 2);
  expect(emitter.emit('ev')).toEqual([1, 2]);
});
```

---

## 🔧 Implementation Notes

* Events are stored using a `Map<string, Function[]>` structure.
* Listeners are removed using `Array.prototype.splice` inside `unsubscribe()`.
* No two callbacks are assumed to be referentially identical, as per problem conditions.
