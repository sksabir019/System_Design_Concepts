/**
 * 1. Creational Design Patterns.
 *  a. Singleton Pattern.
 *  b. Factory Pattern.
 *  c. Abstract Factory Pattern.
 *  d. Builder Pattern.
 *  e. Prototype Pattern.
 */

/*******************************************************
 * Example: a. Singleton Pattern:                      *
 * Purpose: Ensure a class has only one instance       *
 *          and provide a global point of access to it.*
 *******************************************************/
 class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    // Initialize your singleton properties here
    this.timestamp = Date.now();
    Singleton.instance = this;
    return this;
  }
}

// Usage:
const singletonA = new Singleton();
const singletonB = new Singleton();

console.log(singletonA === singletonB); // true
console.log(singletonA.timestamp); // same timestamp for both
console.log(singletonB.timestamp); // same timestamp for both

// Another Example: Configuration Manager
class Config {
  constructor() {
    if (Config.instance) return Config.instance;
    this.settings = {};
    Config.instance = this;
  }

  set(key, value) {
    this.settings[key] = value;
  }

  get(key) {
    return this.settings[key];
  }
}

const config1 = new Config();
const config2 = new Config();
console.log(config1 === config2); // true
config1.set("apiUrl", "https://api.example.com");
console.log(config2.get("apiUrl")); // 'https://api.example.com'

/*****************************************************************
 * Example: b. Factory Pattern:                                  *
 * Purpose: Define an interface for creating an object, 
 *          but let subclasses decide which class to instantiate.*
 *****************************************************************/
class Car {
  constructor(model) {
    this.model = model;
  }
  drive() {
    return `Driving a ${this.model}`;
  }
}

class Truck {
  constructor(model) {
    this.model = model;
  }
  drive() {
    return `Driving a ${this.model} truck`;
  }
}

class VehicleFactory {
  static createVehicle(type, model) {
    switch (type) {
      case "car":
        return new Car(model);
      case "truck":
        return new Truck(model);
      default:
        throw new Error("Unknown vehicle type");
    }
  }
}

// Usage:
const myCar = VehicleFactory.createVehicle("car", "Toyota");
const myTruck = VehicleFactory.createVehicle("truck", "Ford");

console.log(myCar.drive()); // Driving a Toyota
console.log(myTruck.drive()); // Driving a Ford truck

// and another example: Shape Factory
class Circle {
  draw() {
    return "Drawing a circle";
  }
}

class Square {
  draw() {
    return "Drawing a square";
  }
}

class ShapeFactory {
  static createShape(type) {
    switch (type) {
      case "circle":
        return new Circle();
      case "square":
        return new Square();
      default:
        throw new Error("Unknown shape type");
    }
  }
}

// Usage:
const shape1 = ShapeFactory.createShape("circle");
const shape2 = ShapeFactory.createShape("square");

console.log(shape1.draw()); // Drawing a circle
console.log(shape2.draw()); // Drawing a square 

/*************************************************************************
 * Example: c. Abstract Factory Pattern:                                 *
 * Purpose: Provide an interface for creating families of related or     *
 *          dependent objects without specifying their concrete classes. *
 *************************************************************************/
class FurnitureFactory {
  createChair() {
    throw new Error("This method should be overridden!");
  }
  createSofa() {
    throw new Error("This method should be overridden!");
  }
}

// Concrete Factory 1
class ModernFurnitureFactory extends FurnitureFactory {
  createChair() {
    return new ModernChair();
  }
  createSofa() {
    return new ModernSofa();
  }
}

// Concrete Factory 2
class VictorianFurnitureFactory extends FurnitureFactory {
  createChair() {
    return new VictorianChair();
  }
  createSofa() {
    return new VictorianSofa();
  }
}

// Products
class ModernChair {
  sitOn() {
    return "Sitting on a modern chair";
  }
}
class ModernSofa {
  lieOn() {
    return "Lying on a modern sofa";
  }
}
class VictorianChair {
  sitOn() {
    return "Sitting on a victorian chair";
  }
}
class VictorianSofa {
  lieOn() {
    return "Lying on a victorian sofa";
  }
}

// Usage:
const factory = new ModernFurnitureFactory();
const chair = factory.createChair();
const sofa = factory.createSofa();

console.log(chair.sitOn()); // Sitting on a modern chair
console.log(sofa.lieOn()); // Lying on a modern sofa

/****************************************************************************************
 * Example: d. Builder Pattern:                                                         *
 * Purpose: Separate the construction of a complex object from its representation,      *
 *           so that the same construction process can create different representations.*
 ****************************************************************************************/
class House {
  constructor() {
    this.hasGarage = false;
    this.hasSwimmingPool = false;
    this.hasGarden = false;
  }
}

class HouseBuilder {
  constructor() {
    this.house = new House();
  }

  addGarage() {
    this.house.hasGarage = true;
    return this;
  }

  addSwimmingPool() {
    this.house.hasSwimmingPool = true;
    return this;
  }

  addGarden() {
    this.house.hasGarden = true;
    return this;
  }

  build() {
    return this.house;
  }
}

// Usage:
const myHouse = new HouseBuilder()
  .addGarage()
  .addSwimmingPool()
  .addGarden()
  .build();

console.log(myHouse); // { hasGarage: true, hasSwimmingPool: true, hasGarden: true }

/*********************************************************************************
 * Example: e. Prototype Pattern:                                                *
 * Purpose: Specify the kinds of objects to create using a prototypical instance,*
 *********************************************************************************/
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  clone() {
    return new Person(this.name, this.age);
  }
}

// Usage:
const originalPerson = new Person("Alice", 30);
const clonedPerson = originalPerson.clone();

console.log(clonedPerson); // Person { name: 'Alice', age: 30 }
console.log(clonedPerson === originalPerson); // false

// Another Example: Shape Prototype
class Shape {
  constructor(type) {
    this.type = type;
  }

  draw() {
    return `Drawing a ${this.type}`;
  }

  clone() {
    return new Shape(this.type);
  }
}

// Usage:
const shape3 = new Shape("circle");
const shape4 = shape3.clone();
shape4.type = "square";