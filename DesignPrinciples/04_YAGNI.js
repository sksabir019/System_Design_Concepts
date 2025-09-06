/**
 * YAGNI: You Aren't Gonna Need It
 * 
 * The YAGNI principle states that a programmer should not add functionality until it is necessary.
 * This helps to avoid over-engineering and keeps the codebase simpler and more maintainable.
 * 
 * Benefits of YAGNI:
 * - Reduced complexity in the codebase.
 * - Faster development time by focusing on current requirements.
 * - Easier maintenance and fewer bugs due to less code.
 * - Encourages iterative development and refactoring.  
 */
class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  getTotal() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }
}

// Usage
const cart = new ShoppingCart();
cart.addItem({ name: "Laptop", price: 1000 });
cart.addItem({ name: "Phone", price: 500 });
console.log("Total:", cart.getTotal()); // Output: Total: 1500

// In this example, we only implement the basic functionality of a shopping cart without 
// adding features like discounts or tax calculations until they are actually needed. 