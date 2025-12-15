### Adapter Pattern (适配器模式)

The Adapter Pattern is a structural design pattern that converts one class’s interface into another interface that the client expects. This pattern allows classes that couldn’t normally work together due to incompatible interfaces to work together.

---

### **Core Principle**

The Adapter Pattern uses an adapter class to convert the interface of the existing class. The adapter class typically holds a reference to the source class (Adaptee) and calls methods of the source class via this reference to achieve compatibility with the target interface.

---

### **Structure**

* **Target Interface (目标接口)**: The interface that the client expects to use, typically a standard interface defined by us.
* **Adaptee (源接口)**: The class that needs to be adapted, usually an external class that we cannot modify.
* **Adapter (适配器)**: The class that adapts the source interface to the target interface. It’s the core of the adapter pattern, often wrapping the methods of the source interface.

---

### **Implementation Methods**

#### 1. **Class Adapter (Through Inheritance)**

The class adapter pattern implements the target interface by inheriting from the source class.

```java
// Target interface: Touring, includes long-distance and short-distance touring
public interface Touring {
    void longDistance();
    void shortDistance();
}

// Source interface: MountainRiding, includes leisure riding and aggressive riding
public class MountainRiding {
    public void leisureRiding() {
        System.out.println("休闲骑");
    }

    public void aggressiveRiding() {
        System.out.println("拼八字骑行");
    }
}

// Adapter: Inherit from the source class, implement the target interface, and adapt the source methods to the target methods
public class Adapter extends MountainRiding implements Touring {
    @Override
    public void longDistance() {
        System.out.println("长途摩旅");
    }

    @Override
    public void shortDistance() {
        System.out.println("短途摩旅");
    }
}

// Using the adapter
public class AdapterTest {
    public static void main(String[] args) {
        Adapter adapter = new Adapter();
        adapter.leisureRiding();  // Use the source interface method
        adapter.aggressiveRiding();  // Use the source interface method
        adapter.longDistance();  // Use the target interface method
        adapter.shortDistance();  // Use the target interface method
    }
}
```

#### 2. **Object Adapter (Through Delegation)**

The object adapter pattern implements the target interface by using delegation, injecting the source interface as a dependency into the adapter.

```java
// Target interface: Touring, includes long-distance and short-distance touring
public interface Touring {
    void longDistance();
    void shortDistance();
}

// Source interface: MountainRiding, includes leisure riding and aggressive riding
public class MountainRiding {
    public void leisureRiding() {
        System.out.println("休闲骑");
    }

    public void aggressiveRiding() {
        System.out.println("拼八字骑行");
    }
}

// Adapter: Implement the target interface and inject the source interface as a dependency
public class Adapter implements Touring {
    private MountainRiding mountainRiding;

    public Adapter(MountainRiding mountainRiding) {
        this.mountainRiding = mountainRiding;
    }

    @Override
    public void longDistance() {
        System.out.println("长途摩旅");
    }

    @Override
    public void shortDistance() {
        System.out.println("短途摩旅");
    }
}

// Using the adapter
public class AdapterTest {
    public static void main(String[] args) {
        MountainRiding mountainRiding = new MountainRiding();
        Adapter adapter = new Adapter(mountainRiding);
        adapter.leisureRiding();  // Use the source interface method
        adapter.aggressiveRiding();  // Use the source interface method
        adapter.longDistance();  // Use the target interface method
        adapter.shortDistance();  // Use the target interface method
    }
}
```

---

### **Advantages and Disadvantages**

#### **Advantages**:

1. **Decoupling**: The Adapter Pattern decouples the client from the target interface, so the client does not need to know the implementation details of the source class, only the adapted target interface.
2. **Flexibility**: The Adapter Pattern allows us to adapt incompatible interfaces without modifying existing code.
3. **Reusability**: The adapter enables the reuse of existing classes across different systems by making them compatible, facilitating their cooperation.

#### **Disadvantages**:

1. **Increased Code Complexity**: Introducing adapter classes increases the number of classes in the system, which can make the code structure more complex, especially when there are multiple source interfaces to adapt.
2. **Performance Issues**: Although the Adapter Pattern typically has minimal performance impact, it introduces an additional layer of indirection due to the adapter, which may incur a slight performance overhead.

---

### **Application Scenarios**

1. **When the Interface of an Existing Class Doesn’t Match Requirements**: The Adapter Pattern solves the issue of incompatible interfaces when integrating multiple classes with incompatible interfaces in the system.
2. **Interface Incompatibility During System Integration**: For example, when integrating multiple payment gateways (like Alipay, WeChat Pay, Stripe, PayPal), an adapter can be used to unify these payment interfaces.
3. **Old and New System Integration**: An adapter can map the interfaces of an old system to the new system, reducing the need for modifying existing code.
4. **When You Need to Encapsulate Complex Interfaces**: If certain interfaces are complex and hard to use directly, an adapter can simplify them into more user-friendly interfaces.

---

### **Summary**

The Adapter Pattern primarily solves the problem of incompatible interfaces. By using an adapter, the client can use the target interface without needing to understand the specific implementation of the source class. The Adapter Pattern enhances the flexibility and scalability of the system, making it especially useful in system integration and when dealing with incompatible interfaces.
