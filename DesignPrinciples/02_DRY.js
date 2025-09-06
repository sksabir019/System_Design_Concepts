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
class Database {
  static instance = null;

  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.connection = null; // Simulate a database connection
    Database.instance = this;
  }

  connect() {
    if (!this.connection) {
      this.connection = "Database Connection Established";
    }
    return this.connection;
  }
}

// Usage
const db1 = new Database();
console.log(db1.connect());

const db2 = new Database();
console.log(db2.connect());

console.log(db1 === db2); // true, both are the same instance

/**
 * In this example, the User and Admin classes demonstrate code reuse through inheritance, 
 * adhering to the DRY principle by avoiding code duplication in the getDetails method.
 * 
 * The Database class implements the Singleton pattern to ensure that only one instance 
 * of the database connection exists, preventing redundant connections and adhering to the DRY principle.
 */
