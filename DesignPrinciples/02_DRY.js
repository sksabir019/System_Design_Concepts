/**
 * DRY: Don't Repeat Yourself
 * 
 * Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.
 * 
 * The principle is aimed at reducing the repetition of software patterns, replacing them with abstractions 
 * or using data normalization to avoid redundancy.
 * 
 * DRY is a principle of software development aimed at reducing repetition of information of all kinds, 
 * especially useful in multi-tier architectures.
 * 
 * The DRY principle is stated as "Every piece of knowledge must have a single, unambiguous, authoritative 
 * representation within a system".
 * 
 * The DRY principle is about reducing duplication. Duplication can lead to inconsistencies and errors 
 * when one instance of the duplicated information is changed but others are not.
 * 
 * The DRY principle can be applied to various aspects of software development, including:
 * - Code: Avoiding code duplication by using functions, classes, and modules.
 * - Data: Normalizing databases to eliminate redundant data.
 * - Documentation: Keeping documentation up-to-date and avoiding duplicate information.
 * 
 * Benefits of DRY:
 * - Improved maintainability: Changes need to be made in only one place.
 * - Reduced risk of errors: Less chance of inconsistencies.
 * - Enhanced readability: Clearer and more concise code.
 */

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  getDetails() {
    return `Name: ${this.name}, Email: ${this.email}`;
  }
}

class Admin extends User {
  constructor(name, email, adminLevel) {
    super(name, email);
    this.adminLevel = adminLevel;
  }

  getDetails() {
    return `${super.getDetails()}, Admin Level: ${this.adminLevel}`;
  }
}

// Usage
const user = new User("John Doe", "john.doe@example.com");
const admin = new Admin("Jane Smith", "jane.smith@example.com", "super");

console.log(user.getDetails());
console.log(admin.getDetails());

// another example
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  getInfo() {
    return `Product ID: ${this.id}, Name: ${this.name}, Price: $${this.price}`;
  }
}

class Order {
  constructor(orderId, product, quantity) {
    this.orderId = orderId;
    this.product = product; // Product is a direct collaborator
    this.quantity = quantity;
  }

  getOrderDetails() {
    return `Order ID: ${this.orderId}, ${this.product.getInfo()}, Quantity: ${this.quantity}`;
  }
}

// Usage
const product = new Product(1, "Laptop", 999.99);
const order = new Order(101, product, 2);

console.log(order.getOrderDetails());

// In these examples, the DRY principle is applied by avoiding code duplication 
// through inheritance and composition.
// The User and Admin classes share common functionality, and the Product class is reused 
// in the Order class without duplicating its logic. 
