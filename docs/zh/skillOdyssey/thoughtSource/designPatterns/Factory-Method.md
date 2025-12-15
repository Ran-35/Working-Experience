# 工厂方法模式
工厂方法模式定义了一个用于创建对象的接口，但由子类决定要实例化哪一个类。工厂方法让类的实例化推迟到子类。  

**核心思想**：将对象的创建过程封装到一个方法中，而不是直接在类内部通过 new 来实例化对象。

## 组成部分
### 1. 产品接口（Product）：
定义产品的抽象接口，具体产品会实现这个接口。
### 2. 具体产品（ConcreteProduct）：
实现了产品接口的具体类，代表了工厂方法模式中需要创建的对象。

### 3. 抽象工厂（Creator）：
提供一个抽象的工厂方法，声明了factoryMethod()，用于创建产品对象。这个类可能包含一些默认的实现，但核心的创建逻辑是交给子类来实现的。

### 4. 具体工厂（ConcreteCreator）：
实现了工厂方法并返回具体的产品对象。不同的具体工厂可以创建不同的产品。

## 工作流程
1. 定义一个摩托接口类（假设一个产品研发部门，其中有一个方法就是生产产品）
```java
// 创建摩托车生产接口
public interface MotorInterface {
    // 生产摩托车的方法
    void product();
}
```

2. 定义具体产品类，并实现摩托接口（假设每一个类代表一个类型的产品，其中使用研发部门设计的生产方法）
```java
// 定义CBR-1000RR，其使用研发部门提供的生产方法
public class HondaMotor implements MotorInterface {
    @Override
    public void product() {
        System.out.println("Honda CBR-1000RR");
    }
}
// 定义ZX-10RR，其使用研发部门提供的生产方法
public class KawasakiMotor implements MotorInterface {
    @Override
    public void product() {
        System.out.println("Kawasaki ZX-10RR");
    }
}
```

3. 定义工厂接口（假设工厂接口就是一个生产部门，生产部门包含一条流水线）
```java 
public interface MotorFactoryInterface {
    MotorInterface createMotor();
}
```

4. 定义具体工厂类，并实现工厂接口（假设工厂类是生产部门的生产车间，每个车间都包含生产部门要求的流水线）
```java
// 创建Honda工厂，负责生产 HondaMotor
public class HondaFactory implements MotorFactoryInterface {
    @Override
    public MotorInterface createMotor() {
        return new HondaMotor();
    }
}
// 创建Kawasaki工厂，负责生产 KawasakiMotor
public class KawasakiFactory implements MotorFactoryInterface {
    @Override
    public MotorInterface createMotor() {
        return new KawasakiMotor();
    }
}
```

5. 创建工厂类，并传入具体工厂类
```java
public class Main {
    public static void main(String[] args) {
        // 创建Honda工厂，负责生产 HondaMotor
        MotorFactoryInterface hondaFactory = new HondaFactory();
        // Honda工厂使用生产部门的生产方法，弄出一个Honda产品
        MotorInterface hondaMotor = hondaFactory.createMotor();
        // Honda产品再使用研发部门的方法，输出产品信息
        hondaMotor.product();

        KawasakiFactory kawasakiFactory = new KawasakiFactory();
        MotorInterface kawasakiMotor = kawasakiFactory.createMotor();
        kawasakiMotor.product();
    }
}
```

6. 若要扩展
```java
// 研发部门设计新产品
public class YamahaMotor implements MotorInterface {
    @Override
    public void product() {
        System.out.println("Yamaha YZF-R1");
    }
}

// 生产部门新建车间
public class YamahaFactory implements MotorFactoryInterface {
    @Override
    public MotorInterface createMotor() {
        return new YamahaMotor();
    }
}
```
```java
public class Main {
    public static void main(String[] args) {
        MotorFactoryInterface hondaFactory = new HondaFactory();
        MotorInterface hondaMotor = hondaFactory.createMotor();
        hondaMotor.product();

        KawasakiFactory kawasakiFactory = new KawasakiFactory();
        MotorInterface kawasakiMotor = kawasakiFactory.createMotor();
        kawasakiMotor.product();

        // 新增 YamahaMotor
        YamahaFactory yamahaFactory = new YamahaFactory();
        MotorInterface yamahaMotor = yamahaFactory.createMotor();
        yamahaMotor.product();
    }
}
```

## 工作原理
1. 客户端代码不直接创建具体的对象，而是调用工厂方法来获取对象。这样客户端代码对对象的具体类没有依赖。  
2. 工厂方法由具体工厂类实现，工厂类通过该方法创建具体的产品对象。  
3. 具体工厂类负责选择适当的产品类型并返回它。每个工厂可能创建不同的产品，具体工厂可以决定所需产品的具体类

## 优点
1. **解耦：**客户端不需要知道对象的具体实现类，只需要知道工厂方法即可。这大大减少了系统中类之间的耦合度。
2. **增强灵活性和扩展性：**可以通过扩展子类来创建不同的产品，而不需要修改现有的客户端代码。可以更容易地引入新产品。
3. **遵循开闭原则：**可以通过扩展新的具体工厂来生产新的产品，而不需要修改已有的代码，符合开闭原则。


## 应用场景
1. 图形界面系统：在图形界面设计中，不同操作系统可能需要不同风格的窗口、按钮、文本框等组件。工厂方法可以根据操作系统类型创建对应的组件，而不需要改变系统的其他部分。

2. 数据库连接池：根据不同数据库类型（如 MySQL、Oracle）创建不同类型的数据库连接。

3. 日志系统：不同的日志记录方式（如文件日志、数据库日志、控制台日志）可以使用工厂方法模式来根据配置动态创建不同的日志记录器。