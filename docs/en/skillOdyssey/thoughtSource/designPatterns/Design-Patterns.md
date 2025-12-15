# Design Patterns

## What is a Design Pattern?

A design pattern is a reusable solution to a common problem encountered in software development. These patterns are not directly code implementations but rather design strategies or ideas that provide general solutions to optimize system architecture.

## Types of Design Patterns

### 1. Creational Design Patterns

Creational design patterns focus on the **process of object creation**, aiming to control how objects are instantiated to meet specific requirements.

* **Singleton Pattern**: Ensures that a class has only one instance and provides a global access point.
* **Factory Method Pattern**: Defines an interface for creating objects, but allows subclasses to decide which class to instantiate.
* **Abstract Factory Pattern**: Creates a set of related or dependent objects without specifying the exact concrete classes.
* **Builder Pattern**: Breaks down the construction process of a complex object into multiple steps, allowing users to choose different steps to create different representations.
* **Prototype Pattern**: Creates new objects by copying existing ones rather than using constructors.

#### Comparison of Applicable Scenarios for Creational Patterns

| **Applicable Scenarios** | **Direct `new` Object**                                                           | **Factory Pattern**                                                                           |
| ------------------------ | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Project Size**         | Simple projects with uncomplicated requirements                                   | Large projects needing a good architecture                                                    |
| **Requirements**         | No need for polymorphism or interface switching                                   | Need to support multiple implementations or easy extensibility                                |
| **Object Creation**      | Few objects, simple creation logic                                                | Complex object creation logic                                                                 |
| **Development Style**    | Prototyping or quick validation                                                   | Need for unified management of object creation                                                |
| **Design Principles**    | No emphasis on design principles, focusing on simplicity and quick implementation | Follows design principles such as Open/Closed Principle, Dependency Inversion Principle, etc. |

### 2. Structural Design Patterns

Structural design patterns mainly focus on **the composition of classes and objects**, combining existing classes and objects to achieve new functionalities.

* **Adapter Pattern**: Converts the interface of a class into another interface expected by the client.
* **Bridge Pattern**: Separates the abstraction from the implementation, allowing both to vary independently.
* **Composite Pattern**: Combines objects into tree-like structures to represent part-whole hierarchies.
* **Decorator Pattern**: Dynamically adds additional responsibilities to an object.
* **Facade Pattern**: Provides a simplified interface for a complex subsystem.
* **Flyweight Pattern**: Supports the efficient use of a large number of fine-grained objects by sharing them.
* **Proxy Pattern**: Provides a surrogate or placeholder for another object to control access to it.

### 3. Behavioral Design Patterns

Behavioral design patterns focus on **communication and responsibility distribution between objects**, optimizing interactions and processes between them.

* **Chain of Responsibility Pattern**: Passes a request along a chain of handlers until one object processes it.
* **Command Pattern**: Encapsulates a request as an object, allowing parameterization of clients with different requests.
* **Interpreter Pattern**: Defines an interpreter for a language's grammar rules.
* **Iterator Pattern**: Provides sequential access to elements in a collection without exposing its internal representation.
* **Mediator Pattern**: Defines an intermediary object to coordinate interactions between different objects.
* **Memento Pattern**: Saves an object's state without exposing its internal structure.
* **Observer Pattern**: Notifies all dependent objects automatically when the state of one object changes.
* **State Pattern**: Allows an object to change its behavior when its internal state changes.
* **Strategy Pattern**: Defines a family of algorithms and allows them to be interchangeable, letting the algorithm vary independently of the clients that use it.
* **Template Method Pattern**: Defines the skeleton of an algorithm, letting subclasses redefine certain steps without changing the overall structure.
* **Visitor Pattern**: Allows new operations to be added to classes without modifying them.

---

## Advantages of Design Patterns

1. **Encapsulation of Changes**: By separating abstraction and implementation, changes in the implementation do not affect the abstraction, thus reducing system coupling.
2. **High Reusability**: Design patterns are proven best practices that can be reused across different projects, minimizing redundant development work.
3. **Improved Code Maintainability**: Using design patterns makes code structures clearer, easier to understand and modify, reducing system complexity.
4. **Solving Complex Problems**: Design patterns provide standard solutions to common software design problems, preventing the issue of "reinventing the wheel."

---

Design patterns are not just code implementations; they represent **standardized solutions** to specific problems. By following these patterns, systems can be more maintainable, extensible, and reusable, while team development becomes more efficient and consistent.
