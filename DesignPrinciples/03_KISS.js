/**
 * KISS - Keep It Simple Stupid
 * 
 * The KISS principle states that most systems work best if they are kept simple rather than made complicated; 
 * therefore, simplicity should be a key goal in design and unnecessary complexity should be avoided.
 * 
 * Benefits of KISS:
 * - Easier to understand and maintain code.
 * - Reduced likelihood of bugs and errors.
 * - Faster development and debugging processes.
 * - Improved collaboration among team members.
 * 
 * Examples of KISS in practice:
 * - Using clear and descriptive variable and function names.
 * - Breaking down complex problems into smaller, manageable parts.
 * - Avoiding over-engineering solutions.
 * - Writing clean and concise code.
 */

// Example of KISS:
class Database {
    constructor() {
        if (Database._instance) {
            return Database._instance; // Return existing instance if already created
        }
        this.connection = null; // Simulate a database connection
        Database._instance = this; // Store the instance
    }

    connect() {
        if (!this.connection) {
            this.connection = "Database Connection Established"; // Simulate establishing a connection
        }
        return this.connection;
    }
}

// Usage
const db1 = new Database();
console.log(db1.connect()); // Output: Database Connection Established  
const db2 = new Database();
console.log(db1 === db2); // Output: true (both variables point to the same instance)   
// This example demonstrates the KISS principle by implementing a simple singleton pattern for a database connection.