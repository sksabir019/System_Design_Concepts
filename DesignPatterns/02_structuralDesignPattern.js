/*
 * 2. Structural Design Patterns.
 *  a. Adapter Pattern.
 *  b. Composite Pattern.
 *  c. Proxy Pattern.
 *  d. Bridge Pattern.
 *  e. Decorator Pattern.
 *  f. Facade Pattern.
 *  g. Flyweight Pattern.
 */

/********************************************************************
 * Example: a. Adapter Pattern:                                     *
 * Purpose: Converts one interface into another that clients expect.*
 ********************************************************************/
class OldSystem {
  specificRequest() {
    return "Old system's specific request.";
  }
}

class NewSystem {
  request() {
    return "New system's request.";
  }
}

// Adapter
class Adapter {
  constructor(oldSystem) {
    this.oldSystem = oldSystem;
  }

  request() {
    return this.oldSystem.specificRequest();
  }
}

// Usage
const oldSystem = new OldSystem();
const adapter = new Adapter(oldSystem);
console.log(adapter.request()); // Old system's specific request.

// Another Example:
class OldAPI {
  getData() {
    return 'legacy data';
  }
}

class NewAPI {
  constructor(oldApi) {
    this.oldApi = oldApi;
  }

  fetch() {
    return this.oldApi.getData();
  }
}

const adapt = new NewAPI(new OldAPI());
console.log(adapter.fetch()); // 'legacy data'

/*****************************************************************
 * Example: b. Composite Pattern:                                *
 * Purpose: Treats individual objects and compositions uniformly.*
 *****************************************************************/
class Leaf {
  constructor(name) {
    this.name = name;
  }

  display(indent) {
    console.log(`${' '.repeat(indent)}- ${this.name}`);
  }
}

class Composite {
  constructor(name) {
    this.name = name;
    this.children = [];
  }

  add(child) {
    this.children.push(child);
  }

  display(indent) {
    console.log(`${' '.repeat(indent)}+ ${this.name}`);
    this.children.forEach(child => child.display(indent + 2));
  }
}

// Usage
const root = new Composite('Root');
const child1 = new Composite('Child 1');
const child2 = new Leaf('Child 2');
const grandChild1 = new Leaf('GrandChild 1');

child1.add(grandChild1);
root.add(child1);
root.add(child2);

root.display(0);
/*
Output:
+ Root
  + Child 1
    - GrandChild 1
  - Child 2
*/

// other example:
class Component {
  render() {
    throw new Error('Must implement render()');
  }
}

class Text extends Component {
  render() {
    return 'Text';
  }
}

class Container extends Component {
  constructor() {
    super();
    this.children = [];
  }

  add(child) {
    this.children.push(child);
  }

  render() {
    return this.children.map(c => c.render()).join(' ');
  }
}

const container = new Container();
container.add(new Text());
container.add(new Text());
console.log(container.render()); // 'Text Text'


/*****************************************************************************************
 * Example: c. Proxy Pattern:                                                            *
 * Purpose: Controls access to another object, adding security, caching, or lazy loading.*
 *****************************************************************************************/
class RealSubject {
  request() {
    return "RealSubject: Handling request.";
  }
}

class Proxy {
  constructor(realSubject) {
    this.realSubject = realSubject;
  }

  request() {
    // Additional behavior can be added here
    return this.realSubject.request();
  }
}

// Usage
const realSubject = new RealSubject();
const prox = new Proxy(realSubject);
console.log(prox.request()); // RealSubject: Handling request.

// another example
class RealService {
  request() {
    return 'Sensitive data';
  }
}

class ProxyService {
  constructor(user) {
    this.user = user;
    this.realService = new RealService();
  }

  request() {
    if (this.user.role === 'admin') {
      return this.realService.request();
    }
    return 'Access denied';
  }
}

const proxx = new ProxyService({ role: 'guest' });
console.log(proxx.request()); // 'Access denied'


/*******************************************************************************************
 * Example: d. Bridge Pattern:                                                             *
 * Purpose: Decouple an abstraction from its implementation so both can vary independently.*
 ******************************************************************************************/
class RemoteControl {
  constructor(device) {
    this.device = device;
  }

  togglePower() {
    if (this.device.isEnabled()) {
      this.device.disable();
    } else {
      this.device.enable();
    }
  }
}

class TV {
  constructor() {
    this.power = false;
  }

  isEnabled() {
    return this.power;
  }

  enable() {
    this.power = true;
    console.log('TV is now ON');
  }

  disable() {
    this.power = false;
    console.log('TV is now OFF');
  }
}

// Usage
const tv = new TV();
const remote = new RemoteControl(tv);
remote.togglePower(); // TV is now ON
remote.togglePower(); // TV is now OFF

// another example
// Implementation layer
class Renderer {
  renderCircle(radius) {
    throw new Error("Must implement renderCircle()");
  }
}

class SVGRenderer extends Renderer {
  renderCircle(radius) {
    console.log(`<circle r="${radius}" />`);
  }
}

class CanvasRenderer extends Renderer {
  renderCircle(radius) {
    console.log(`Canvas: draw circle with radius ${radius}`);
  }
}

// Abstraction layer
class Shape {
  constructor(renderer) {
    this.renderer = renderer;
  }

  draw() {
    throw new Error("Must implement draw()");
  }
}

class Circle extends Shape {
  constructor(renderer, radius) {
    super(renderer);
    this.radius = radius;
  }

  draw() {
    this.renderer.renderCircle(this.radius);
  }
}

// Usage
const svgCircle = new Circle(new SVGRenderer(), 10);
svgCircle.draw(); // <circle r="10" />

const canvasCircle = new Circle(new CanvasRenderer(), 20);
canvasCircle.draw(); // Canvas: draw circle with radius 20

/*************************************************************************
 * Example: e. Decorator Pattern:                                        *
 * Purpose: Add behavior to objects dynamically without affecting others.
 *************************************************************************/
class Coffee {
  cost() {
    return 5;
  }
}

class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost() + 1;
  }
}

class SugarDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost() + 0.5;
  }
}

// Usage
let myCoffee = new Coffee();
console.log(myCoffee.cost()); // 5

myCoffee = new MilkDecorator(myCoffee);
console.log(myCoffee.cost()); // 6

myCoffee = new SugarDecorator(myCoffee);
console.log(myCoffee.cost()); // 6.5

// another example
class TextBlock {
  render() {
    return 'Hello';
  }
}

class BoldDecorator {
  constructor(component) {
    this.component = component;
  }

  render() {
    return `<b>${this.component.render()}</b>`;
  }
}

const boldText = new BoldDecorator(new TextBlock());
console.log(boldText.render()); // <b>Hello</b>

/*****************************************************************
 * Example: f. Facade Pattern:                                   *
 * Purpose: Provide a simplified interface to a complex subsystem.
 *****************************************************************/
class CPU {
  freeze() {
    console.log('CPU frozen');
  }

  jump(position) {
    console.log(`Jumping to position ${position}`);
  }

  execute() {
    console.log('Executing instructions');
  }
}

class Memory {
  load(position, data) {
    console.log(`Loading data "${data}" into memory at position ${position}`);
  }
}

class HardDrive {
  read(lba, size) {
    return `Data from sector ${lba} of size ${size}`;
  }
}

// Facade
class Computer {
  constructor() {
    this.cpu = new CPU();
    this.memory = new Memory();
    this.hardDrive = new HardDrive();
  }

  start() {
    this.cpu.freeze();
    const data = this.hardDrive.read(0, 1024);
    this.memory.load(0, data);
    this.cpu.jump(0);
    this.cpu.execute();
  }
}

// Usage
const computer = new Computer();
computer.start();
/*
Output:
CPU frozen
Loading data "Data from sector 0 of size 1024" into memory at position 0
Jumping to position 0
Executing instructions
*/

// another example
class AuthService {
  login() { return 'Logged in'; }
}

class BillingService {
  charge() { return 'Charged'; }
}

class SaaSFacade {
  constructor() {
    this.auth = new AuthService();
    this.billing = new BillingService();
  }

  onboardUser() {
    return `${this.auth.login()} & ${this.billing.charge()}`;
  }
}

const app = new SaaSFacade();
console.log(app.onboardUser()); // 'Logged in & Charged'

/*********************************************************************************
 * Example: g. Flyweight Pattern:                                                *
 * Purpose: Share objects to support large numbers of similar objects efficiently.
 *********************************************************************************/
class Tree {
  constructor(type) {
    this.type = type; // intrinsic state
  }

  display(x, y) {
    console.log(`Displaying ${this.type} tree at (${x}, ${y})`);
  }
}

class TreeFactory {
  constructor() {
    this.trees = {};
  }

  getTree(type) {
    if (!this.trees[type]) {
      this.trees[type] = new Tree(type);
    }
    return this.trees[type];
  }
}

// Usage
const factory = new TreeFactory();
const tree1 = factory.getTree('Oak');
tree1.display(10, 20);
const tree2 = factory.getTree('Pine');
tree2.display(30, 40);
const tree3 = factory.getTree('Oak');
tree3.display(50, 60);
console.log(tree1 === tree3); // true, same instance


// another example
class Character {
  constructor(value) {
    this.value = value; // intrinsic state
  }

  display(position) {
    console.log(`Character ${this.value} at position ${position}`);
  }
}

class CharacterFactory {
  constructor() {
    this.pool = {};
  }

  getCharacter(value) {
    if (!this.pool[value]) {
      this.pool[value] = new Character(value);
    }
    return this.pool[value];
  }
}

// Usage
const fact = new CharacterFactory();
const charA = fact.getCharacter('A');
const charB = fact.getCharacter('B');
charA.display(1);
charB.display(2);
charA.display(3); // reused instance
