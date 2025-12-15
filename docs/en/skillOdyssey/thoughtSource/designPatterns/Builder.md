### Builder Pattern (建造者模式)

The Builder Pattern is a creational design pattern that separates the construction of a complex object from its representation, allowing the same construction process to create different representations.

#### **Core Concept**

1. **Separation of the Construction Process**: The construction process of a complex object is abstracted, decoupling the building process from the actual implementation of individual components.
2. **Step-by-Step Construction**: The object is built step by step, allowing finer control over the building process.
3. **Flexible Configuration**: The same construction process can create different product representations.

---

### **Main Roles**

1. **Product (产品)**: The complex object to be created.
2. **Builder (抽象建造者)**: Defines the abstract interface for creating various parts of the product.
3. **ConcreteBuilder (具体建造者)**: Implements the builder interface and defines the specific construction of each part.
4. **Director (指挥者)**: Constructs the object using the builder interface and controls the construction process.
5. **Client (客户端)**: Uses the director and builder to create the object.

---

### **Example Code**

#### 1. **Define the Product Class**

The product class (e.g., a computer) consists of multiple components (e.g., CPU, memory, storage, graphics card):

```java
@Data
public class Computer {
    private String cpu;
    private String memory;
    private String storage;
    private String graphicsCard;
}
```

#### 2. **Define the Abstract Builder Interface**

This interface includes methods to build each part of the product:

```java
public interface ComputerInterface {
    void buildCpu();
    void buildMemory();
    void buildStorage();
    void buildGraphicsCard();
    Computer getResult();
}
```

#### 3. **Implement Concrete Builders**

Each concrete builder implements the construction of the individual parts. For example, building gaming computers and office computers:

```java
// Build gaming computer
public class GamingComputerBuilder implements ComputerInterface {
    private final Computer computer;

    public GamingComputerBuilder() {
        this.computer = new Computer();
    }

    @Override
    public void buildCpu() {
        computer.setCpu("Intel i9-14900K");
    }

    @Override
    public void buildMemory() {
        computer.setMemory("DDR5 64GB");
    }

    @Override
    public void buildStorage() {
        computer.setStorage("2T SSD NVME");
    }

    @Override
    public void buildGraphicsCard() {
        computer.setGraphicsCard("Nvidia RTX 5090");
    }

    @Override
    public Computer getResult() {
        return computer;
    }
}
```

```java
// Build office computer
public class OfficeComputerBuilder implements ComputerInterface {
    private Computer computer;

    public OfficeComputerBuilder() {
        this.computer = new Computer();
    }

    @Override
    public void buildCpu() {
        computer.setCpu("Intel i5-14600K");
    }

    @Override
    public void buildMemory() {
        computer.setMemory("DDR5 32GB");
    }

    @Override
    public void buildStorage() {
        computer.setStorage("1T SSD NVME");
    }

    @Override
    public void buildGraphicsCard() {
        computer.setGraphicsCard("Nvidia RTX 5060");
    }

    @Override
    public Computer getResult() {
        return computer;
    }
}
```

#### 4. **Define the Director**

The director controls the construction process:

```java
public class ComputerDirector {
    public Computer computerDirector(ComputerInterface computer) {
        computer.buildCpu();
        computer.buildMemory();
        computer.buildStorage();
        computer.buildGraphicsCard();
        return computer.getResult();
    }
}
```

#### 5. **Client Code**

The client uses the director to construct objects:

```java
public class Main {
    public static void main(String[] args) {
        // Create computer manufacturing director
        ComputerDirector computerDirector = new ComputerDirector();

        // Choose a specific builder
        ComputerInterface gameBuilder = new GamingComputerBuilder();
        // The director assigns the builder to construct the product
        Computer gamePc = computerDirector.computerDirector(gameBuilder);
        System.out.println(gamePc + ": " + gamePc);

        ComputerInterface officeBuilder = new OfficeComputerBuilder();
        Computer officePc = computerDirector.computerDirector(officeBuilder);
        System.out.println(officePc + ": " + officePc);
    }
}
```

#### 6. **Common Use: Chain of Method Calls**

You can also create the object using method chaining:

```java
@Data
public class Computer {
    private String cpu;
    private String memory;
    private String storage;
    private String graphicsCard;

    // Internal Builder class
    public static class Builder {
        private String cpu;
        private String memory;
        private String storage;
        private String graphicsCard;

        public Builder setCpu(String cpu) {
            this.cpu = cpu;
            return this;
        }

        public Builder setMemory(String memory) {
            this.memory = memory;
            return this;
        }

        public Builder setStorage(String storage) {
            this.storage = storage;
            return this;
        }

        public Builder setGraphicsCard(String graphicsCard) {
            this.graphicsCard = graphicsCard;
            return this;
        }

        public Computer build() {
            if (cpu == null || memory == null || storage == null) {
                throw new IllegalStateException("CPU, Memory and Storage are required");
            }
            return new Computer(this);
        }
    }

    // Private constructor
    private Computer(Builder builder) {
        this.cpu = builder.cpu;
        this.memory = builder.memory;
        this.storage = builder.storage;
        this.graphicsCard = builder.graphicsCard;
    }
}
```

#### 7. **Use Method Chaining**

Creating objects via method chaining:

```java
public class Main {
    public static void main(String[] args) {
        // Create an object using method chaining
        Computer computer = new Computer.Builder()
                .setCpu("Intel i7-13700K")
                .setMemory("32GB DDR5")
                .setStorage("1TB NVMe SSD")
                .setGraphicsCard("NVIDIA RTX 4070")
                .build();

        System.out.println(computer);

        // Create a basic computer
        Computer basicComputer = new Computer.Builder()
                .setCpu("Intel i5-13400")
                .setMemory("16GB DDR4")
                .setStorage("512GB SSD")
                .build(); // Using the default graphics card

        System.out.println(basicComputer);
    }
}
```

---

### **Advantages**

* **Encapsulation**: The builder is independent, making it easy to extend.
* **Control over the details**: The process can be broken down and controlled step by step, giving more precise control over object construction.
* **Separation of construction and representation**: The building process is separated from the product itself, allowing the same building process to create different product representations.
* **Improved readability**: Method chaining makes the code more readable and clear.

### **Disadvantages**

* **Complex construction process**: Requires creating multiple concrete builder classes.
* **Products need commonality**: If the products vary too much, the builder pattern may not be suitable.

---

### **Use Cases**

* **Creating complex objects**: When the algorithm for constructing an object is independent of the object’s components and their assembly.
* **Allowing different representations**: The construction process allows objects to have different representations.
* **Step-by-step creation of objects**: When an object needs to be created in several steps, and the order of these steps may affect the final result.

#### Examples of Use Cases

1. **Creating complex objects**: Particularly when creating objects with different configurations.
2. **Building complex UI interfaces**: The builder pattern can be used to construct various types of UI interfaces.

---

### **Builder Pattern vs Traditional `set` Methods**

| Feature                      | **Builder Pattern**                                           | **Traditional `set` Methods**                                                        |
| ---------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **Code Readability**         | Clearer, with method chaining and explicit steps              | Shorter but less readable with multiple `set` calls                                  |
| **Construction Consistency** | Ensures no inconsistency during object construction           | Objects may be in an inconsistent state; careful handling of `set` is needed         |
| **Extensibility**            | Easy to extend by modifying builders                          | Poor extensibility; adding properties requires modifying the class and `set` methods |
| **Thread Safety**            | Thread-safe with independent builders                         | May have thread safety issues and require synchronization                            |
| **Applicable Scenarios**     | Complex objects, many optional attributes, and default values | Simple object construction with fewer attributes                                     |

---

### **Summary**

The Builder Pattern is useful for constructing complex objects when the construction process involves multiple steps. By separating the construction process from the object's representation, it allows the same process to create different product representations. The pattern provides a more flexible and extensible solution, especially for complex objects with configurable parts.
