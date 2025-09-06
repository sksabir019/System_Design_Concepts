/**
 * Law of Demeter: "Only talk to your immediate friends"
 * Each unit should only communicate with its direct collaborators.
 * This reduces dependencies and promotes loose coupling.
 *
 * Benefits of the Law of Demeter:
 * - Reduced coupling between components.
 * - Improved maintainability and flexibility.
 * - Easier to understand and reason about code.
 * - Enhanced testability due to fewer dependencies.
 *
 * Examples of the Law of Demeter in practice:
 * - Avoiding method chaining that reaches into nested objects.
 * - Using interfaces or abstractions to limit direct interactions.
 * - Delegating responsibilities to immediate collaborators rather than distant ones.
 * - Keeping methods focused on their own class's responsibilities.
 */

// Example adhering to the Law of Demeter:
class Car {
  constructor(engine) {
    this.engine = engine; // Engine is a direct collaborator
  }

  start() {
    this.engine.start(); // Only interacting with immediate friend (engine)
  }
}

class Engine {
  start() {
    console.log("Engine started");
  }
}

// Usage
const engine = new Engine();
const car = new Car(engine);
car.start(); // Output: Engine started

// In this example, the Car class only interacts with its immediate collaborator, the Engine class,
// adhering to the Law of Demeter by not reaching into any nested objects or structures.

// Another example violating the Law of Demeter:
class Driver {
  constructor(car) {
    this.car = car; // Car is a direct collaborator
  }

  drive() {
    // Violating Law of Demeter by reaching into car's engine
    this.car.engine.start(); // Directly accessing engine, which is not an immediate friend
  }
}

// Correcting the violation by adding a method in Car to start the engine
class ImprovedCar {
  constructor(engine) {
    this.engine = engine; // Engine is a direct collaborator
  }

  start() {
    this.engine.start(); // Only interacting with immediate friend (engine)
  }
}

class ImprovedDriver {
  constructor(car) {
    this.car = car; // Car is a direct collaborator
  }

  drive() {
    this.car.start(); // Now only interacting with immediate friend (car)
  }
}

// Usage
const improvedEngine = new Engine();
const improvedCar = new ImprovedCar(improvedEngine);
const driver = new ImprovedDriver(improvedCar);
driver.drive(); // Output: Engine started

// In this corrected example, the Driver class only interacts with its immediate collaborator, the Car class,
// adhering to the Law of Demeter by not reaching into the Car's engine directly.

// Example implementation for Law of Demeter compliance
class Address {
  constructor(zipCode) {
    this.zipCode = zipCode;
  }
  getZipCode() {
    return this.zipCode;
  }
}

class Profile {
  constructor(address) {
    this.address = address;
  }
  getAddress() {
    return this.address;
  }
}

class User {
  constructor(profile) {
    this.profile = profile;
  }
  // Law of Demeter compliant method
  getZipCode() {
    return this.profile.getAddress().getZipCode();
  }
  getProfile() {
    return this.profile;
  }
}

const address = new Address("12345");
const profile = new Profile(address);
const user = new User(profile);

// ❌ Violates Law of Demeter
// user.getProfile().getAddress().getZipCode();

// ✅ Compliant
console.log(user.getZipCode()); // Output: 12345
