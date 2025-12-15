### Bridge Pattern (桥接模式)

The Bridge Pattern is a structural design pattern that separates the abstraction from its implementation, allowing both to vary independently. By decoupling abstraction and implementation, the Bridge Pattern solves the problem of an overly complex inheritance structure.

---

### **Pattern Definition**

* **Abstraction (抽象)**: Provides an interface for operations, but does not care about the actual implementation.
* **Implementor (实现)**: Defines the interface for implementing the abstract part, which the concrete implementation classes will implement.
* **Bridge (桥接)**: If you modify the abstract part of the code, you don’t need to modify the implementation part, and vice versa.

---

### **Pattern Structure**

1. **Abstract Class (抽象类)**: Defines the abstract class and includes a reference to the concrete implementation class.
2. **Refined Abstraction (扩展抽象类)**: A subclass of the abstract class that extends the abstract interface.
3. **Implementor Interface (实现接口)**: Defines the implementation interface, which is used by the abstract class.
4. **Concrete Implementor (具体实现类)**: Implements the implementation interface and provides specific implementation of the abstract methods in the abstract class.

---

### **Steps to Implement**

1. Define the implementation interface.
2. Define concrete implementation classes.
3. Define the abstract class and include a reference to the concrete implementation class.
4. Create the refined abstraction class and implement the abstract methods of the abstract class.

---

### **Example Code**

#### 1. Define the Implementation Interface (Transmission)

```java
// Define the implementation interface - Transmission
public interface Transmission {
    // A method for transmission
    void transmit();
}
```

#### 2. Concrete Implementation Classes (Manual Transmission and Automatic Transmission)

```java
// Concrete implementation class - Manual Transmission
public class ManualTransmission implements Transmission {
    @Override
    public void transmit() {
        System.out.println("Manual Transmission");
    }
}

// Concrete implementation class - Automatic Transmission
public class AutomaticTransmission implements Transmission {
    @Override
    public void transmit() {
        System.out.println("Automatic Transmission");
    }
}
```

#### 3. Define the Abstract Class (Porsche Car)

```java
// Define the abstract class - Porsche Car
public abstract class Porsche {
    // Porsche has a transmission
    protected Transmission transmission;

    public Porsche(Transmission transmission) {
        this.transmission = transmission;
    }

    // Method to perform transmission using the transmission
    public abstract void transmit();
}
```

#### 4. Refined Abstraction Classes (Porsche 911 GT2 RS and 911 GT3)

```java
// Refined abstraction class (subclass of abstract class) - Porsche 911 GT2 RS
public class Gt2Rs_911 extends Porsche {
    public Gt2Rs_911(Transmission transmission) {
        super(transmission);
    }

    @Override
    public void transmit() {
        System.out.println("Gt2Rs_911 transmit: ");
        transmission.transmit();
    }
}

// Refined abstraction class (subclass of abstract class) - Porsche 911 GT3
public class Gt3_911 extends Porsche {
    public Gt3_911(Transmission transmission) {
        super(transmission);
    }
    
    @Override
    public void transmit() {
        System.out.println("Gt3_911 transmit");
        transmission.transmit();
    }
}
```

#### 5. Test Class

```java
// Test Class
public class BridgeTest {
    public static void main(String[] args) {
        Porsche porsche1 = new Gt2Rs_911(new AutomaticTransmission());
        porsche1.transmit();    // Gt2Rs_911 transmit:Automatic Transmission

        Porsche porsche2 = new Gt2Rs_911(new ManualTransmission());
        porsche2.transmit();    // Gt2Rs_911 transmit:Manual Transmission

        Porsche porsche3 = new Gt3_911(new AutomaticTransmission());
        porsche3.transmit();    // Gt3_911 transmit:Automatic Transmission

        Porsche porsche4 = new Gt3_911(new ManualTransmission());
        porsche4.transmit();    // Gt3_911 transmit:Manual Transmission
    }
}
```

---

### **Advantages**

1. **Decouples Abstraction and Implementation**: The abstraction and the implementation can change independently without affecting each other.
2. **Strong Extensibility**: If new features need to be added or implementations need to be changed, the Bridge Pattern reduces the impact and makes these changes easier to implement.
3. **Increased Flexibility**: By combining different abstraction layers and implementation layers, new variations can be quickly created.

---

### **Practical Applications**

1. **Database Connection Bridging**: The Bridge Pattern can be used to create a database connection bridge, separating the database connection abstraction from its implementation, allowing dynamic switching of database connections.

2. **Message Sender Bridge**: The Bridge Pattern can be used to create a message sender bridge, separating the implementation of the message sender from its abstraction, allowing for dynamic switching between different message senders.

---

### **Summary**

The core idea of the Bridge Pattern is to separate the abstraction from the implementation so that both can change independently. It makes the system more flexible, avoids overly deep class inheritance hierarchies, and allows for easy combination of different abstraction and implementation layers, making it highly adaptable to changes.
