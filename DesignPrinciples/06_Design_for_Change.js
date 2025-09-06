/**
 * Design for Change:
 * * Designing systems with the expectation that requirements will evolve over time.
 *
 * Benefits of Designing for Change:
 * - Improved adaptability to new requirements.
 * - Reduced cost and effort for future modifications.
 * - Enhanced system longevity and relevance.
 * - Better alignment with business goals and user needs.
 *
 * Strategies for Designing for Change:
 * - Modular architecture: Break down the system into independent modules.
 * - Use of interfaces and abstractions: Decouple components to allow easy replacement or modification.
 * - Embrace design patterns: Utilize patterns that promote flexibility, such as Strategy, Observer, or Factory.
 * - Continuous refactoring: Regularly revisit and improve the codebase to accommodate changes.
 */

// Example of Designing for Change:
class PaymentProcessor {
  constructor(strategy) {
    this.strategy = strategy; // Strategy pattern for payment methods
  }

  setStrategy(strategy) {
    this.strategy = strategy; // Allow changing the payment strategy at runtime
  }

  processPayment(amount) {
    return this.strategy.pay(amount); // Delegate payment processing to the chosen strategy
  }
}

class CreditCardPayment {
  pay(amount) {
    console.log(`Processing credit card payment of $${amount}`);
    // Logic for credit card payment
  }
}

class PayPalPayment {
  pay(amount) {
    console.log(`Processing PayPal payment of $${amount}`);
    // Logic for PayPal payment
  }
}

// Usage
const creditCardPayment = new CreditCardPayment();
const paypalPayment = new PayPalPayment();

const paymentProcessor = new PaymentProcessor(creditCardPayment);
paymentProcessor.processPayment(100); // Output: Processing credit card payment of $100

// Later, if we need to change the payment method
paymentProcessor.setStrategy(paypalPayment);
paymentProcessor.processPayment(200); // Output: Processing PayPal payment of $200

// In this example, the PaymentProcessor class is designed to accommodate changes in payment methods easily by using
// the Strategy pattern.  This allows for flexibility and adaptability as new payment methods can be added or existing
// ones modified without impacting the overall system.
// This demonstrates the principle of Designing for Change by anticipating future requirements and building a system
// that can evolve accordingly.
