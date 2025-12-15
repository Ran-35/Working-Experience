### 适配器模式（Adapter Pattern）

适配器模式是一种结构型设计模式，它将一个类的接口转换成客户希望的另一个接口。适配器模式使得原本由于接口不兼容而不能一起工作的类可以一起工作。

---

### **核心原理**

通过一个适配器类来实现对原有类接口的转换。适配器类通常会持有一个对源类（Adaptee）的引用，并通过该引用调用源类的方法来实现与目标接口的兼容。

---

### **组成结构**

* **目标接口（Target）**：客户端希望使用的接口，通常是我们定义的标准接口。
* **源接口（Adaptee）**：我们需要适配的类，它通常是我们无法修改的外部类。
* **适配器（Adapter）**：用来实现将源接口适配到目标接口的类，它是适配模式的核心，通常是对源接口方法的包装。

---

### **实现方式**

#### 1. **类适配器（通过继承）**

类适配器模式通过继承源类来实现目标接口。

```java
// 目标接口：旅行，包含长途旅行和短途旅行
public interface Touring {
    void longDistance();
    void shortDistance();
}

// 源接口：跑山，包含休闲骑和拼八字骑
public class MountainRiding {
    public void leisureRiding() {
        System.out.println("休闲骑");
    }

    public void aggressiveRiding() {
        System.out.println("拼八字骑行");
    }
}

// 适配器：继承源接口，实现目标接口，并实现源接口的方法，将源接口的方法适配到目标接口的方法中
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

// 使用适配器
public class AdapterTest {
    public static void main(String[] args) {
        Adapter adapter = new Adapter();
        adapter.leisureRiding();  // 使用源接口的方法
        adapter.aggressiveRiding();  // 使用源接口的方法
        adapter.longDistance();  // 使用目标接口的方法
        adapter.shortDistance();  // 使用目标接口的方法
    }
}
```

#### 2. **对象适配器（通过委托）**

对象适配器模式通过委托的方式实现目标接口，将源接口作为依赖注入到适配器中。

```java
// 目标接口：旅行，包含长途旅行和短途旅行
public interface Touring {
    void longDistance();
    void shortDistance();
}

// 源接口：跑山，包含休闲骑和拼八字骑
public class MountainRiding {
    public void leisureRiding() {
        System.out.println("休闲骑");
    }

    public void aggressiveRiding() {
        System.out.println("拼八字骑行");
    }
}

// 适配器：实现目标接口，将源接口的方法作为依赖注入到适配器中
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

// 使用适配器
public class AdapterTest {
    public static void main(String[] args) {
        MountainRiding mountainRiding = new MountainRiding();
        Adapter adapter = new Adapter(mountainRiding);
        adapter.leisureRiding();  // 使用源接口的方法
        adapter.aggressiveRiding();  // 使用源接口的方法
        adapter.longDistance();  // 使用目标接口的方法
        adapter.shortDistance();  // 使用目标接口的方法
    }
}
```

---

### **优缺点**

#### **优点**：

1. **解耦**：适配器模式使得客户端与目标接口解耦，客户端无需知道源类的实现细节，只关心适配后的目标接口。
2. **灵活性**：适配器模式可以帮助我们在不修改现有代码的情况下，适配不兼容的接口。
3. **重用性**：通过适配器，可以在不同系统间复用已有的类，使得它们能够协同工作。

#### **缺点**：

1. **增加代码复杂度**：引入适配器类会增加系统的类数量，可能使得代码结构变得更复杂，尤其是在有多个源接口需要适配时。
2. **性能问题**：虽然适配器模式通常对性能影响较小，但由于需要通过适配器进行间接调用，它可能会引入一些额外的性能开销。

---

### **适用场景**

1. **现有类的接口与需求不匹配**：当系统需要集成多个接口不兼容的类时，适配器模式可以解决接口不一致的问题。
2. **系统集成时的接口不兼容**：例如集成多个支付网关（支付宝、微信支付、Stripe、PayPal等），可以使用适配器将这些支付接口统一。
3. **新老系统对接**：适配器可以将老系统的接口适配到新系统中，减少修改现有代码的需要。
4. **需要封装复杂接口**：当某些接口复杂且难以直接使用时，可以通过适配器将其简化为更易用的接口。

---

### **总结**

适配器模式主要解决接口不兼容的问题。通过使用适配器，客户端可以使用目标接口，而不需要了解源类的具体实现。适配器模式提高了系统的灵活性和可扩展性，尤其在系统集成和接口不兼容的场景中非常有效。
