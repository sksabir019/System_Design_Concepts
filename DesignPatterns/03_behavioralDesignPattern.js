/* 3. Behavioral Design Patterns.
 *  a. Observer Pattern.
 *  b. Strategy Pattern.
 *  c. Command Pattern.
 *  d. State Pattern.
 *  e. Mediator Pattern.
 *  f. Chain of Responsibility Pattern.
 *  g. Visitor Pattern.
 *  h. Interpreter Pattern.
 *  i. Template Method Pattern.
 *  j. Memento Pattern.
 *  k. Iterator Pattern.
 */

/**************************************************************************************************
 * a. Observer Pattern.                                                                           *
 * Purpose: Define a one-to-many dependency between objects so that when one object changes state,*
 *          all its dependents are notified and updated automatically.                            *
 * ************************************************************************************************/
class Subject {
  constructor() {
    this.observers = [];
    this.state = null;
  }
  attach(observer) {
    this.observers.push(observer);
  }
  detach(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  notify() {
    this.observers.forEach((observer) => observer.update(this.state));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }
  update(state) {
    console.log(`Observer ${this.name} notified of state change: ${state}`);
  }
}

// Example usage:
const subject = new Subject();
const observer1 = new Observer("A");
const observer2 = new Observer("B");

subject.attach(observer1);
subject.attach(observer2);

subject.state = "New State";
subject.notify(); // Both observers are notified of the state change

/**************************************************************************************************
 * b. Strategy Pattern.                                                                           *
 * Purpose: Define a family of algorithms, encapsulate each one, and make them interchangeable.  *
 *          Strategy lets the algorithm vary independently from clients that use it.             *
 * ************************************************************************************************/
class Strategy {
  execute(_a, _b) {
    throw new Error("Strategy#execute needs to be overridden");
  }
}

class Addition extends Strategy {
  execute(a, b) {
    return a + b;
  }
}

class Subtraction extends Strategy {
  execute(a, b) {
    return a - b;
  }
}

class Context {
  constructor(strategy) {
    this.strategy = strategy;
  }
  setStrategy(strategy) {
    this.strategy = strategy;
  }
  executeStrategy(a, b) {
    return this.strategy.execute(a, b);
  }
}

// Example usage:
const context = new Context(new Addition());
console.log(context.executeStrategy(5, 3)); // Outputs: 8

context.setStrategy(new Subtraction());
console.log(context.executeStrategy(5, 3)); // Outputs: 2

/**************************************************************************************************
 * c. Command Pattern.                                                                           *
 * Purpose: Encapsulate a request as an object, thereby letting you parameterize clients with    *
 *          different requests, queue or log requests, and support undoable operations.          *
 * ************************************************************************************************/
class Command {
  execute() {
    throw new Error("Command#execute needs to be overridden");
  }
}

class Light {
  constructor() {
    this.state = "off";
  }
  turnOn() {
    this.state = "on";
    console.log("Light is on");
  }
  turnOff() {
    this.state = "off";
    console.log("Light is off");
  }
}

class LightOnCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }
  execute() {
    this.light.turnOn();
  }
}

class LightOffCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }
  execute() {
    this.light.turnOff();
  }
}

// Client code
const light = new Light();
const lightOnCommand = new LightOnCommand(light);
const lightOffCommand = new LightOffCommand(light);

lightOnCommand.execute(); // Light is on
lightOffCommand.execute(); // Light is off

/**************************************************************************************************
 * d. State Pattern.                                                                              *
 * Purpose: Allow an object to alter its behavior when its internal state changes. The object will*
 *          appear to change its class.                                                           *
 * ************************************************************************************************/
class State {
  handle(_context) {
    throw new Error("State#handle needs to be overridden");
  }
}

class ConcreteStateA extends State {
  handle(context) {
    console.log("State A handling request and transitioning to State B");
    context.setState(new ConcreteStateB());
  }
}

class ConcreteStateB extends State {
  handle(context) {
    console.log("State B handling request and transitioning to State A");
    context.setState(new ConcreteStateA());
  }
}

class Context {
  constructor(state) {
    this.state = state;
  }
  setState(state) {
    this.state = state;
  }
  request() {
    this.state.handle(this);
  }
}

// Example usage:
const context1 = new Context(new ConcreteStateA());
context1.request(); // State A handling request and transitioning to State B
context1.request(); // State B handling request and transitioning to State A

/**************************************************************************************************
 * e. Mediator Pattern.                                                                           *
 * Purpose: Define an object that encapsulates how a set of objects interact. Mediator promotes   *
 *          loose coupling by keeping objects from referring to each other explicitly, and it     *
 *          lets you vary their interaction independently.                                        *
 * ************************************************************************************************/

class Mediator {
  constructor() {
    this.colleagues = [];
  }
  register(colleague) {
    this.colleagues.push(colleague);
    colleague.setMediator(this);
  }
  send(message, sender) {
    for (const colleague of this.colleagues) {
      if (colleague !== sender) {
        colleague.receive(message);
      }
    }
  }
}

class Colleague {
  constructor(name) {
    this.name = name;
    this.mediator = null;
  }
  setMediator(mediator) {
    this.mediator = mediator;
  }
  send(message) {
    console.log(`${this.name} sends message: ${message}`);
    this.mediator.send(message, this);
  }
  receive(message) {
    console.log(`${this.name} receives message: ${message}`);
  }
}

// Example usage:
const mediator = new Mediator();
const colleague1 = new Colleague("Colleague 1");
const colleague2 = new Colleague("Colleague 2");

mediator.register(colleague1);
mediator.register(colleague2);

colleague1.send("Hello from Colleague 1"); // Colleague 2 receives the message
colleague2.send("Hello from Colleague 2"); // Colleague 1 receives the message

/**************************************************************************************************
 * f. Chain of Responsibility Pattern.                                                            *
 * Purpose: Avoid coupling the sender of a request to its receiver by giving more than one object *
 *          a chance to handle the request.Chain the receiving objects and pass the request along *
 *          the chain until an object handles it.                                                 *
 * ************************************************************************************************/

class Handler {
  setNext(handler) {
    this.next = handler;
    return handler;
  }
  handle(request) {
    if (this.next) {
      return this.next.handle(request);
    }
    return null;
  }
}

class ConcreteHandlerA extends Handler {
  handle(request) {
    if (request === "A") {
      return `Handler A processed request: ${request}`;
    }
    return super.handle(request);
  }
}

class ConcreteHandlerB extends Handler {
  handle(request) {
    if (request === "B") {
      return `Handler B processed request: ${request}`;
    }
    return super.handle(request);
  }
}

// Example usage:
const handlerA = new ConcreteHandlerA();
const handlerB = new ConcreteHandlerB();
handlerA.setNext(handlerB);

console.log(handlerA.handle("A"));
// Outputs: Handler A processed request: A
console.log(handlerA.handle("B"));
// Outputs: Handler B processed request: B
console.log(handlerA.handle("C"));
// Outputs: null (no handler for request 'C')

/**************************************************************************************************
 * g. Visitor Pattern.                                                                           *
 * Purpose: Represent an operation to be performed on the elements of an object structure.       *
 *          Visitor lets you define a new operation without changing the classes of the elements *
 *          on which it operates.                                                                *
 * ************************************************************************************************/

class Visitor {
  visitConcreteElementA(_element) {
    throw new Error("Visitor#visitConcreteElementA needs to be overridden");
  }
  visitConcreteElementB(_element) {
    throw new Error("Visitor#visitConcreteElementB needs to be overridden");
  }
}

class ConcreteVisitor1 extends Visitor {
  visitConcreteElementA(_element) {
    console.log("ConcreteVisitor1 visiting ConcreteElementA");
  }
  visitConcreteElementB(_element) {
    console.log("ConcreteVisitor1 visiting ConcreteElementB");
  }
}

class ConcreteVisitor2 extends Visitor {
  visitConcreteElementA(_element) {
    console.log("ConcreteVisitor2 visiting ConcreteElementA");
  }
  visitConcreteElementB(_element) {
    console.log("ConcreteVisitor2 visiting ConcreteElementB");
  }
}

class Element {
  accept(_visitor) {
    throw new Error("Element#accept needs to be overridden");
  }
}

class ConcreteElementA extends Element {
  accept(visitor) {
    visitor.visitConcreteElementA(this);
  }
}

class ConcreteElementB extends Element {
  accept(visitor) {
    visitor.visitConcreteElementB(this);
  }
}
// Example usage:
const elements = [new ConcreteElementA(), new ConcreteElementB()];
const visitor1 = new ConcreteVisitor1();
const visitor2 = new ConcreteVisitor2();

elements.forEach((element) => {
  element.accept(visitor1);
  element.accept(visitor2);
});
// Outputs:
// ConcreteVisitor1 visiting ConcreteElementA
// ConcreteVisitor2 visiting ConcreteElementA
// ConcreteVisitor1 visiting ConcreteElementB
// ConcreteVisitor2 visiting ConcreteElementB

/**************************************************************************************************
 * h. Interpreter Pattern.                                                                       *
 * Purpose: Given a language, define a representation for its grammar along with an interpreter  *
 *          that uses the representation to interpret sentences in the language.                 *
 * ************************************************************************************************/
class Expression {
  interpret(_context) {
    throw new Error("Expression#interpret needs to be overridden");
  }
}

class TerminalExpression extends Expression {
  constructor(value) {
    super();
    this.value = value;
  }
  interpret(context) {
    return context[this.value];
  }
}

class NonTerminalExpression extends Expression {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
  }
  interpret(context) {
    return this.left.interpret(context) + this.right.interpret(context);
  }
}

// Example usage:
const context2 = {
  a: 5,
  b: 10,
};

const expression = new NonTerminalExpression(
  new TerminalExpression("a"),
  new TerminalExpression("b")
);

console.log(expression.interpret(context2)); // Outputs: 15

/**************************************************************************************************
 * i. Template Method Pattern.                                                                   *
 * Purpose: Define the skeleton of an algorithm in an operation, deferring some steps to         *
 *          subclasses. Template Method lets subclasses redefine certain steps of an algorithm   *
 *          without changing the algorithm's structure.                                          *
 * ************************************************************************************************/
class AbstractClass {
  templateMethod() {
    this.baseOperation1();
    this.requiredOperation1();
    this.baseOperation2();
    this.hook1();
    this.requiredOperation2();
    this.baseOperation3();
    this.hook2();
  }
  baseOperation1() {
    console.log("AbstractClass: Base Operation 1");
  }
  baseOperation2() {
    console.log("AbstractClass: Base Operation 2");
  }
  baseOperation3() {
    console.log("AbstractClass: Base Operation 3");
  }
  requiredOperation1() {
    throw new Error("AbstractClass#requiredOperation1 needs to be overridden");
  }
  requiredOperation2() {
    throw new Error("AbstractClass#requiredOperation2 needs to be overridden");
  }
  hook1() {}
  hook2() {}
}

class ConcreteClass1 extends AbstractClass {
  requiredOperation1() {
    console.log("ConcreteClass1: Required Operation 1");
  }
  requiredOperation2() {
    console.log("ConcreteClass1: Required Operation 2");
  }
}

class ConcreteClass2 extends AbstractClass {
  requiredOperation1() {
    console.log("ConcreteClass2: Required Operation 1");
  }
  requiredOperation2() {
    console.log("ConcreteClass2: Required Operation 2");
  }
}
// Example usage:
const concrete1 = new ConcreteClass1();
concrete1.templateMethod();
// Outputs:
// AbstractClass: Base Operation 1
// ConcreteClass1: Required Operation 1
// AbstractClass: Base Operation 2
// ConcreteClass1: Required Operation 2
// AbstractClass: Base Operation 3

const concrete2 = new ConcreteClass2();
concrete2.templateMethod();
// Outputs:
// AbstractClass: Base Operation 1
// ConcreteClass2: Required Operation 1
// AbstractClass: Base Operation 2
// ConcreteClass2: Required Operation 2
// AbstractClass: Base Operation 3

/**************************************************************************************************
 * j. Memento Pattern.                                                                           *
 * Purpose: Without violating encapsulation, capture and externalize an object's internal state  *
 *          so that the object can be restored to this state later.                              *
 * ***********************************************************************************************/

class Memento {
  constructor(state) {
    this.state = state;
  }
  getState() {
    return this.state;
  }
}
class Originator {
  constructor() {
    this.state = null;
  }
  setState(state) {
    this.state = state;
    console.log(`Originator: State set to ${state}`);
  }
  save() {
    return new Memento(this.state);
  }
  restore(memento) {
    this.state = memento.getState();
    console.log(`Originator: State restored to ${this.state}`);
  }
}
class Caretaker {
  constructor() {
    this.mementos = [];
  }
  addMemento(memento) {
    this.mementos.push(memento);
  }
  getMemento(index) {
    return this.mementos[index];
  }
}
// Example usage:
const originator = new Originator();
const caretaker = new Caretaker();

originator.setState("State1");
caretaker.addMemento(originator.save());

originator.setState("State2");
caretaker.addMemento(originator.save());
originator.setState("State3");

originator.restore(caretaker.getMemento(0)); // Restores to State1
originator.restore(caretaker.getMemento(1)); // Restores to State2

/**************************************************************************************************
 * k. Iterator Pattern.                                                                          *
 * Purpose: Provide a way to access the elements of an aggregate object sequentially without     *
 *          exposing its underlying representation.                                              *
 * ************************************************************************************************/
class Iterator {
  constructor(collection) {
    this.collection = collection;
    this.index = 0;
  }
  next() {
    return this.collection[this.index++];
  }
  hasNext() {
    return this.index < this.collection.length;
  }
  reset() {
    this.index = 0;
  }
}
class Aggregate {
  constructor() {
    this.items = [];
  }
  add(item) {
    this.items.push(item);
  }
  createIterator() {
    return new Iterator(this.items);
  }
}
// Example usage:
const aggregate = new Aggregate();
aggregate.add("Item 1");
aggregate.add("Item 2");
aggregate.add("Item 3");

const iterator = aggregate.createIterator();
while (iterator.hasNext()) {
  console.log(iterator.next());
}
// Outputs:
// Item 1
// Item 2
// Item 3

iterator.reset();
console.log("After reset:");
while (iterator.hasNext()) {
  console.log(iterator.next());
}
// Outputs:
// Item 1
// Item 2
// Item 3
