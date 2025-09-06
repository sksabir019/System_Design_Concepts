/** Option 1:
 * Abstract class representing a generic shape.
 */
class Shape {
    /**
     * Calculates the area of the shape.
     * @abstract
     * @returns {number} The area of the shape.
     */
    getArea() {
        console.log("Calculating area for a generic shape.");
        throw new Error("Method 'getArea()' must be implemented.");
    }
}

/**
 * Class representing a rectangle.
 */

class Rectangle extends Shape {

  /**
   * Creates a rectangle.
   * @param {number} width - The width of the rectangle.
   * @param {number} height - The height of the rectangle.
   */
    
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    /**
     * Calculates the area of the rectangle.
     * @returns {number} The area of the rectangle.
     */
    getArea() {
        return this.width * this.height;
    }
}

/**
 * Class representing a circle.
 */
class Circle extends Shape {

    /**
     * Creates a circle.
     * @param {number} radius - The radius of the circle.
     */

    constructor(radius) {
        super();
        this.radius = radius;
    }

    /**
     * Calculates the area of the circle.
     * @returns {number} The area of the circle.
     */
    getArea() {
        return Math.PI * this.radius * this.radius;
    }
}

// Example usage:
const shapes = [
    // new Shape(),
    new Rectangle(5, 10),
    new Circle(7)
];

shapes.forEach(shape => {
    console.log(`Area: ${shape.getArea()}`);
});

console.log("===========================================");

/**  Option 2:  use ES6 feature to implement abstract class and method
 * Step 1: Define an Abstract Base Class
 * new.target ensures the class is not instantiated directly.
 * Abstract methods throw errors unless overridden.
 */

class DocumentComponent {
  constructor() {
    if (new.target === DocumentComponent) {
      throw new Error("Cannot instantiate abstract class DocumentComponent");
    }
  }

  render() {
    throw new Error("Abstract method 'render()' must be implemented");
  }

  save() {
    throw new Error("Abstract method 'save()' must be implemented");
  }
}
// Step 2: Extend the Abstract Class
class TextBlock extends DocumentComponent {
  constructor(content) {
    super();
    this.content = content;
  }

  render() {
    return `<p>${this.content}</p>`;
  }

  save() {
    console.log("Saving text block:", this.content);
  }
}

class ImageBlock extends DocumentComponent {
  constructor(url) {
    super();
    this.url = url;
  }

  render() {
    return `<img src="${this.url}" />`;
  }

  save() {
    console.log("Saving image block:", this.url);
  }
}

// Step 3: Usage Example
const blocks = [
  // new DocumentComponent("This will throw an error"),
  new TextBlock("Hello, world!"),
  new ImageBlock("https://example.com/image.png")
];

blocks.forEach(block => {
  // console.log(block.render());
  block.save();
});
