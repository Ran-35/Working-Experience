### Factory Method Pattern(工厂方法模式)

The Factory Method Pattern is a creational design pattern that defines an interface for creating objects, allowing subclasses to decide which class to instantiate. It defers the instantiation of the class to subclasses, thus avoiding the direct use of `new` within the class to create objects.

#### **Core Concept**

The object creation process is encapsulated in a method, rather than directly instantiating objects via `new` within the class. This allows client code to rely on the factory method to get objects without needing to worry about the specific creation process of the object.

---

### **Components**

1. **Product Interface (Product)**:

   * Defines the abstract interface for the product, which will be implemented by concrete products.

2. **Concrete Product (ConcreteProduct)**:

   * A concrete class that implements the product interface, representing the actual objects that the factory method will create.

3. **Abstract Factory (Creator)**:

   * Provides an abstract factory method, usually named `factoryMethod()`, for creating product objects. This class may contain default implementations, but the core creation logic is left to subclasses to implement.

4. **Concrete Factory (ConcreteCreator)**:

   * Implements the factory method and returns a concrete product object. Different concrete factories may create different products.

---

### **Workflow**

#### 1. **Define the Product Interface**

Assume we have a motorcycle manufacturing department and define an interface for motorcycle production:

```java
// Create a motorcycle production interface
public interface MotorInterface {
    // Method to produce motorcycles
    void product();
}
```

#### 2. **Define Concrete Product Classes**

Each concrete motorcycle class implements the product interface and defines the production method:

```java
// Define Honda motorcycle
public class HondaMotor implements MotorInterface {
    @Override
    public void product() {
        System.out.println("Honda CBR-1000RR");
    }
}

// Define Kawasaki motorcycle
public class KawasakiMotor implements MotorInterface {
    @Override
    public void product() {
        System.out.println("Kawasaki ZX-10RR");
    }
}
```

#### 3. **Define the Factory Interface**

Create a factory interface for producing different motorcycle products:

```java
public interface MotorFactoryInterface {
    MotorInterface createMotor();
}
```

#### 4. **Define Concrete Factory Classes**

Each concrete factory class implements the factory interface, responsible for producing different motorcycles:

```java
// Create Honda factory, responsible for producing Honda motorcycles
public class HondaFactory implements MotorFactoryInterface {
    @Override
    public MotorInterface createMotor() {
        return new HondaMotor();
    }
}

// Create Kawasaki factory, responsible for producing Kawasaki motorcycles
public class KawasakiFactory implements MotorFactoryInterface {
    @Override
    public MotorInterface createMotor() {
        return new KawasakiMotor();
    }
}
```

#### 5. **Use the Factory Classes**

Client code uses the factory to obtain products without directly creating product objects:

```java
public class Main {
    public static void main(String[] args) {
        // Create Honda factory to produce Honda motorcycle
        MotorFactoryInterface hondaFactory = new HondaFactory();
        MotorInterface hondaMotor = hondaFactory.createMotor();
        hondaMotor.product();

        // Create Kawasaki factory to produce Kawasaki motorcycle
        MotorFactoryInterface kawasakiFactory = new KawasakiFactory();
        MotorInterface kawasakiMotor = kawasakiFactory.createMotor();
        kawasakiMotor.product();
    }
}
```

#### 6. **Extend the Functionality**

If you want to extend with new motorcycles and factories, you can do so as follows:

```java
// Add new product: Yamaha motorcycle
public class YamahaMotor implements MotorInterface {
    @Override
    public void product() {
        System.out.println("Yamaha YZF-R1");
    }
}

// Add new factory: Yamaha factory
public class YamahaFactory implements MotorFactoryInterface {
    @Override
    public MotorInterface createMotor() {
        return new YamahaMotor();
    }
}
```

In the client, add new factories and products:

```java
public class Main {
    public static void main(String[] args) {
        MotorFactoryInterface hondaFactory = new HondaFactory();
        MotorInterface hondaMotor = hondaFactory.createMotor();
        hondaMotor.product();

        MotorFactoryInterface kawasakiFactory = new KawasakiFactory();
        MotorInterface kawasakiMotor = kawasakiFactory.createMotor();
        kawasakiMotor.product();

        // Add new Yamaha motorcycle
        MotorFactoryInterface yamahaFactory = new YamahaFactory();
        MotorInterface yamahaMotor = yamahaFactory.createMotor();
        yamahaMotor.product();
    }
}
```

---

### **How It Works**

1. Client code does not directly create concrete objects; instead, it calls the factory method to get objects. This means client code does not depend on the specific class of the object, enhancing flexibility.
2. The factory method is implemented by concrete factory classes, and it creates concrete product objects.
3. The concrete factory class is responsible for selecting the appropriate product type and returning it. Each factory may create a different product, and the concrete factory decides the specific class of the product.

---

### **Advantages**

1. **Decoupling:** The client does not need to know the concrete implementation class of the product; it only needs to know the factory method. This reduces the coupling between classes.
2. **Increased Flexibility and Extensibility:** New products can be created by extending subclasses without modifying existing client code. It is easy to introduce new products.
3. **Adherence to the Open/Closed Principle:** New products can be created by extending specific factories without modifying existing code, aligning with the open/closed principle.

---

### **Use Cases**

1. **Graphical User Interface Systems:** Different operating systems may require different styles of components such as windows, buttons, textboxes, etc. The Factory Method can be used to create the corresponding components based on the operating system type, without changing other parts of the system.

2. **Database Connection Pool:** The Factory Method can be used to create different types of database connections based on the database type (e.g., MySQL, Oracle).

3. **Logging Systems:** Different logging mechanisms (such as file logging, database logging, or console logging) can use the Factory Method Pattern to dynamically create different loggers based on configuration.

---

### **Summary**

The Factory Method Pattern defers the creation of objects to subclasses, allowing client code to rely on interfaces rather than concrete class implementations. This not only decouples the client from the concrete product but also adheres to the Open/Closed Principle, making the system easier to extend. It is suitable for situations where there are many types of products and different circumstances require the creation of different types of products.
