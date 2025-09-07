/**
 * Solid Principles:
 * S - Single Responsibility Principle (SRP)
 *    :A class should have one and only one reason to change.
 * O - Open/Closed Principle (OCP)
 *    :Software entities should be open for extension but closed for modification.
 * L - Liskov Substitution Principle (LSP)
 *    :Subtypes must be substitutable for their base types without altering the correctness of the program.
 * I - Interface Segregation Principle (ISP)
 *    :Clients should not be forced to depend on interfaces they do not use.
 * D - Dependency Inversion Principle (DIP)
 *    :High-level modules should not depend on low-level modules. Both should depend on abstractions.
 *
 * Benefits:
 * - Improved code maintainability and readability.
 * - Easier to understand and manage complex systems.
 * - Enhanced flexibility and scalability.
 * - Reduced risk of bugs and errors.
 */

/** 1. Abstract Base Class (LSP + DIP)
 * LSP: All subclasses must implement render() and save() consistently.
 * DIP: Consumers depend on the abstract DocumentComponent, not concrete types.
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

/** 2. SRP: Each Subclass Has One Responsibility
 * Each class handles only one type of content — Single Responsibility Principle.
 */

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

/** OCP: Open for Extension, Closed for Modification
 * You can add new block types without touching existing code:
 * No changes to TextBlock or ImageBlock — just extend the base class.
 */

class VideoBlock extends DocumentComponent {
  constructor(videoUrl) {
    super();
    this.videoUrl = videoUrl;
  }

  render() {
    return `<video src="${this.videoUrl}" controls></video>`;
  }

  save() {
    console.log("Saving video block:", this.videoUrl);
  }
}

/** 4. ISP: Split Interfaces via Mixins
 * Interface Segregation Principle: Only implement what’s needed.
 */

const IFormattable = (Base) =>
  class extends Base {
    format(style) {
      // Use the 'style' parameter to avoid unused variable warning
      throw new Error(
        `Method 'format()' must be implemented for style: ${style}`
      );
    }
  };

const ISyncable = (Base) =>
  class extends Base {
    sync() {
      throw new Error("Method 'sync()' must be implemented");
    }
  };

class FormattableTextBlock extends IFormattable(TextBlock) {
  format(style) {
    console.log(`Applying ${style} to text: ${this.content}`);
  }
}

class SyncableImageBlock extends ISyncable(ImageBlock) {
  sync() {
    console.log(`Syncing image block: ${this.url}`);
  }
}

/** 5. DIP: Depend on Abstractions, Not on Concrete Implementations
 * DIP: Dependency Inversion via Composition
 * DIP: DocumentManager depends on abstractions (DocumentComponent), not concrete implementations.
 */

class DocumentManager {
  constructor(components = []) {
    this.components = components;
  }

  renderAll() {
    return this.components.map((c) => c.render()).join("\n");
  }

  saveAll() {
    this.components.forEach((c) => c.save());
  }
}

// Usage Example
const doc = new DocumentManager([
  new FormattableTextBlock("Hello, AzaM!"),
  new SyncableImageBlock("https://example.com/image.png"),
  new VideoBlock("https://example.com/video.mp4"),
]);

console.log(doc.renderAll());
doc.saveAll();

/** Summary of SOLID Compliance
 * SRP: Each class has a single responsibility.
 * OCP: New block types can be added without modifying existing code.
 * LSP: Subclasses can be used interchangeably with the base class.
 * ISP: Classes implement only the interfaces they need via mixins.
 * DIP: High-level modules depend on abstractions, not concrete implementations.
 */
