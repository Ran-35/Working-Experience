### Prototype Pattern (原型模式)

The Prototype Pattern is a creational design pattern that creates new objects by copying existing ones, rather than creating new instances through constructors.

---

### **Basic Concepts**

1. **Clone Method**: Declare a `clone()` method through an abstract class or interface, which all implementing classes inherit or implement.
2. **Copy Creation**: The `clone()` method is used to create a copy of the current object.
3. **Client**: The client creates new objects using the `clone()` method without needing to know the details of how the objects are created.

---

### **Structure**

* **Prototype (原型)**: An abstract class or interface that declares the clone method.
* **ConcretePrototype (具体原型)**: A class that inherits from the `Prototype` class and implements the `clone()` method.
* **Client (客户端)**: The client uses the `Prototype` interface to get a new instance.

---

### **Implementation Steps**

1. **Define the Prototype Interface**: Define a `clone()` method for cloning the current object.
2. **Implement the Concrete Prototype Class**: A specific class inherits the prototype interface and implements the `clone()` method, often using shallow or deep copying to clone the object.
3. **Client Calls the Clone Method**: The client calls the clone method to obtain a new object, without knowing how it is created.

---

### **Example Code**

#### 1. **Define the Prototype Interface**

```java
// Define a prototype interface with a clone() method
public interface Motor {
    Motor clone();
}
```

#### 2. **Implement the Concrete Prototype Class**

```java
// Implement a concrete class that inherits from the prototype interface and overrides the clone() method
@Getter
public class KawasakiMotor implements Motor {
    private final String model;
    private final int displacement;

    public KawasakiMotor(String model, int displacement) {
        this.model = model;
        this.displacement = displacement;
    }

    @Override
    public Motor clone() {
        return new KawasakiMotor(model, displacement);  // Simple shallow copy
    }
}
```

#### 3. **Client Calls the Clone Method**

```java
// Client class calls the clone method
public class PrototypeTest {
    public static void main(String[] args) {
        KawasakiMotor motorA = new KawasakiMotor("Ninja", 1000);
        KawasakiMotor motorB = (KawasakiMotor) motorA.clone();  // Clone a new object

        System.out.println(motorA);  // Print the original object
        System.out.println(motorB);  // Print the cloned object
    }
}
```

---

### **Advantages and Disadvantages**

#### **Advantages**:

1. **Performance Advantage**: Cloning objects to create new ones is more efficient than creating new objects via constructors, especially when the object construction process is complex.
2. **Avoiding Redundant Creation of Complex Objects**: If the object construction process is complicated or resource-intensive (e.g., involving database connections, network communication), the Prototype Pattern can help reduce resource wastage.
3. **Dynamic Expansion**: Clients can quickly create new objects by copying existing ones, without needing to know the details of how the object is created.

#### **Disadvantages**:

1. **Shallow Copy vs Deep Copy Issues**: If the object contains complex reference types, shallow copying might lead to shared references, which can cause potential issues. Deep copying requires more implementation work and can increase complexity.
2. **Complexity of Implementing Clone**: Implementing the `clone()` method is not always straightforward, especially when the object has many complex properties or dependencies.
3. **Potential for Class Bloat**: If many different types of objects need cloning, each class must implement the clone method, which may result in bloated code.

---

### **Application Scenarios**

1. **Cloning Characters in Game Development**: In game development, the Prototype Pattern can be used to quickly generate identical game character objects, avoiding the need to repeatedly create complex objects.
2. **Style Copying in Document Editors**: In document editors, when copying the styles of text, images, or other objects, the Prototype Pattern can be used to avoid reapplying styles each time.
3. **Filter Preset Copying in Image Editing Software**: The Prototype Pattern can be used to clone pre-configured filter settings, allowing easy creation of identical image effects.

---

### **Summary**

The Prototype Pattern is suitable for scenarios where new objects need to be created by copying existing ones, especially when the object creation process is complex or resource-intensive. By using the Prototype Pattern, the client does not need to be concerned with the details of object creation and can simply clone an existing object to obtain a new one.
