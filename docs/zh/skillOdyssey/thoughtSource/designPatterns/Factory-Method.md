### 工厂方法模式（Factory Method Pattern）

工厂方法模式是一种创建型设计模式，它定义了一个用于创建对象的接口，由子类决定要实例化哪一个类。工厂方法将类的实例化推迟到子类，从而避免了在类内部直接通过 `new` 来创建对象。

#### **核心思想**

将对象的创建过程封装到一个方法中，而不是直接在类内部通过 `new` 来实例化对象。这使得客户端代码可以依赖工厂方法来获取对象，而不需要关注对象的具体创建过程。

---

### **组成部分**

1. **产品接口（Product）**：

   * 定义产品的抽象接口，具体产品会实现这个接口。

2. **具体产品（ConcreteProduct）**：

   * 实现了产品接口的具体类，代表了工厂方法模式中需要创建的对象。

3. **抽象工厂（Creator）**：

   * 提供一个抽象的工厂方法，声明了 `factoryMethod()`，用于创建产品对象。这个类可能包含一些默认的实现，但核心的创建逻辑交给子类来实现。

4. **具体工厂（ConcreteCreator）**：

   * 实现了工厂方法并返回具体的产品对象。不同的具体工厂可以创建不同的产品。

---

### **工作流程**

#### 1. **定义产品接口类**

假设我们有一个摩托车生产部门，定义一个摩托车生产接口：

```java
// 创建摩托车生产接口
public interface MotorInterface {
    // 生产摩托车的方法
    void product();
}
```

#### 2. **定义具体产品类**

每个具体的摩托车类实现产品接口，并定义生产方法：

```java
// 定义Honda摩托车
public class HondaMotor implements MotorInterface {
    @Override
    public void product() {
        System.out.println("Honda CBR-1000RR");
    }
}

// 定义Kawasaki摩托车
public class KawasakiMotor implements MotorInterface {
    @Override
    public void product() {
        System.out.println("Kawasaki ZX-10RR");
    }
}
```

#### 3. **定义工厂接口**

创建一个工厂接口，生产不同的摩托车产品：

```java
public interface MotorFactoryInterface {
    MotorInterface createMotor();
}
```

#### 4. **定义具体工厂类**

每个具体工厂类实现工厂接口，负责生产不同的摩托车：

```java
// 创建Honda工厂，负责生产Honda摩托车
public class HondaFactory implements MotorFactoryInterface {
    @Override
    public MotorInterface createMotor() {
        return new HondaMotor();
    }
}

// 创建Kawasaki工厂，负责生产Kawasaki摩托车
public class KawasakiFactory implements MotorFactoryInterface {
    @Override
    public MotorInterface createMotor() {
        return new KawasakiMotor();
    }
}
```

#### 5. **使用工厂类**

客户端代码通过工厂来获取产品，而无需直接创建产品对象：

```java
public class Main {
    public static void main(String[] args) {
        // 创建Honda工厂，生产Honda摩托车
        MotorFactoryInterface hondaFactory = new HondaFactory();
        MotorInterface hondaMotor = hondaFactory.createMotor();
        hondaMotor.product();

        // 创建Kawasaki工厂，生产Kawasaki摩托车
        MotorFactoryInterface kawasakiFactory = new KawasakiFactory();
        MotorInterface kawasakiMotor = kawasakiFactory.createMotor();
        kawasakiMotor.product();
    }
}
```

#### 6. **扩展功能**

如果要扩展新的摩托车和工厂，可以按照以下方式进行：

```java
// 新增产品：Yamaha摩托车
public class YamahaMotor implements MotorInterface {
    @Override
    public void product() {
        System.out.println("Yamaha YZF-R1");
    }
}

// 新增工厂：Yamaha工厂
public class YamahaFactory implements MotorFactoryInterface {
    @Override
    public MotorInterface createMotor() {
        return new YamahaMotor();
    }
}
```

在客户端中添加新的工厂和产品：

```java
public class Main {
    public static void main(String[] args) {
        MotorFactoryInterface hondaFactory = new HondaFactory();
        MotorInterface hondaMotor = hondaFactory.createMotor();
        hondaMotor.product();

        MotorFactoryInterface kawasakiFactory = new KawasakiFactory();
        MotorInterface kawasakiMotor = kawasakiFactory.createMotor();
        kawasakiMotor.product();

        // 新增 Yamaha摩托车
        MotorFactoryInterface yamahaFactory = new YamahaFactory();
        MotorInterface yamahaMotor = yamahaFactory.createMotor();
        yamahaMotor.product();
    }
}
```

---

### **工作原理**

1. 客户端代码不直接创建具体的对象，而是调用工厂方法来获取对象。这样，客户端代码对对象的具体类没有依赖，增强了灵活性。
2. 工厂方法由具体工厂类实现，工厂类通过该方法创建具体的产品对象。
3. 具体工厂类负责选择适当的产品类型并返回它。每个工厂可能创建不同的产品，具体工厂可以决定所需产品的具体类。

---

### **优点**

1. **解耦：** 客户端不需要知道对象的具体实现类，只需要知道工厂方法即可。这样减少了类之间的耦合度。
2. **增强灵活性和扩展性：** 可以通过扩展子类来创建不同的产品，而不需要修改现有的客户端代码。可以轻松地引入新产品。
3. **遵循开闭原则：** 通过扩展新的具体工厂来生产新的产品，而不需要修改已有的代码，符合开闭原则。

---

### **应用场景**

1. **图形界面系统：** 在图形界面设计中，不同操作系统可能需要不同风格的窗口、按钮、文本框等组件。工厂方法可以根据操作系统类型创建对应的组件，而不需要改变系统的其他部分。

2. **数据库连接池：** 根据不同数据库类型（如 MySQL、Oracle）创建不同类型的数据库连接。

3. **日志系统：** 不同的日志记录方式（如文件日志、数据库日志、控制台日志）可以使用工厂方法模式来根据配置动态创建不同的日志记录器。

---

### **总结**

工厂方法模式通过将对象的创建推迟到子类，从而允许客户端代码依赖于接口而非具体的类实现。它不仅解耦了客户端与产品的具体实现，还遵循了开闭原则，方便进行扩展。适用于在产品种类较多，并且在不同情况下需要创建不同类型的产品时使用。
