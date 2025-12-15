### 建造者模式（Builder Pattern）

建造者模式是一种创建型设计模式，它将复杂对象的构建与其表示分离，使得同样的构建过程可以创建不同的表示。

#### **核心思想**

1. **分离构建过程**：将复杂对象的构建过程抽象出来，使构建过程与具体部件实现解耦。
2. **分步构建**：通过一步步构建最终对象，可以更精细地控制构建过程。
3. **灵活配置**：相同的构建过程可以创建不同的产品表示。

---

### **主要角色**

1. **Product（产品）**：要创建的复杂对象。
2. **Builder（抽象建造者）**：定义创建产品各个部件的抽象接口。
3. **ConcreteBuilder（具体建造者）**：实现 Builder 接口，具体实现各个部件的构建。
4. **Director（指挥者）**：构建使用 Builder 接口的对象，控制构建过程。
5. **Client（客户端）**：使用 Director 和 Builder 创建对象。

---

### **示例代码**

#### 1. **定义产品类**

产品类（如：电脑）包含多个组件（如：CPU、内存、硬盘、显卡等）：

```java
@Data
public class Computer {
    private String cpu;
    private String memory;
    private String storage;
    private String graphicsCard;
}
```

#### 2. **定义抽象建造者接口**

包含所有建造产品中各部件的方法：

```java
public interface ComputerInterface {
    void buildCpu();
    void buildMemory();
    void buildStorage();
    void buildGraphicsCard();
    Computer getResult();
}
```

#### 3. **实现具体建造者**

具体实现各个部件的构建，例如，创建游戏电脑和工作电脑：

```java
// 生产游戏电脑
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
// 生产工作电脑
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

#### 4. **定义指挥者**

控制构建过程的指挥者：

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

#### 5. **客户端代码**

客户端通过指挥者来构建对象：

```java
public class Main {
    public static void main(String[] args) {
        // 创建电脑制造指挥者
        ComputerDirector computerDirector = new ComputerDirector();

        // 指定一个具体的建造者
        ComputerInterface gameBuilder = new GamingComputerBuilder();
        // 指挥者指派建造者建设产品
        Computer gamePc = computerDirector.computerDirector(gameBuilder);
        System.out.println(gamePc + ": " + gamePc);

        ComputerInterface officeBuilder = new OfficeComputerBuilder();
        Computer officePc = computerDirector.computerDirector(officeBuilder);
        System.out.println(officePc + ": " + officePc);
    }
}
```

#### 6. **常用的调用方式：链式调用**

可以通过链式调用的方式来构建对象：

```java
@Data
public class Computer {
    private String cpu;
    private String memory;
    private String storage;
    private String graphicsCard;

    // 内部 Builder 类
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

    // 私有构造函数
    private Computer(Builder builder) {
        this.cpu = builder.cpu;
        this.memory = builder.memory;
        this.storage = builder.storage;
        this.graphicsCard = builder.graphicsCard;
    }
}
```

#### 7. **使用链式调用**

通过链式调用来创建对象：

```java
public class Main {
    public static void main(String[] args) {
        // 链式调用创建对象
        Computer computer = new Computer.Builder()
                .setCpu("Intel i7-13700K")
                .setMemory("32GB DDR5")
                .setStorage("1TB NVMe SSD")
                .setGraphicsCard("NVIDIA RTX 4070")
                .build();

        System.out.println(computer);

        // 创建基础配置电脑
        Computer basicComputer = new Computer.Builder()
                .setCpu("Intel i5-13400")
                .setMemory("16GB DDR4")
                .setStorage("512GB SSD")
                .build(); // 使用默认显卡

        System.out.println(basicComputer);
    }
}
```

---

### **优点**

* **封装性好**：建造者独立，易于扩展。
* **便于控制细节**：可以对构建过程逐步细化，控制构造过程的每一个步骤。
* **解耦构建和表示**：构建过程与产品本身分离，相同的构建过程可以创建不同的产品。
* **更好的可读性**：链式调用使代码更加清晰易读。

### **缺点**

* **创建过程太复杂**：需要创建多个具体的建造者类。
* **产品需要有共同点**：如果产品之间差异性很大，可能不适合使用建造者模式。

---

### **适用场景**

* **创建复杂对象**：构建复杂对象的算法独立于该对象的组成部分以及它们的装配方式。
* **构造过程允许不同表示**：构造过程允许被构造的对象有不同的表示。
* **需要分步创建对象**：创建对象需要多个步骤，且这些步骤的顺序可能影响最终结果。

#### 适用场景的实例

1. **创建复杂对象**：尤其是不同配置的对象创建。
2. **构建复杂的UI界面**：通过建造者模式可以构建多种不同类型的UI界面。

---

### **建造者模式 vs 传统的 `set` 方法**

| 特性        | **建造者模式**                 | **传统 `set` 方法**                  |
| --------- | ------------------------- | -------------------------------- |
| **代码可读性** | 更清晰，链式调用，步骤明确             | 短小简单，但多个 `set` 调用时可读性差           |
| **构建一致性** | 确保对象构建过程中无不一致，避免对象处于半构建状态 | 对象可能处于不一致状态，需小心处理每个 `set` 方法     |
| **扩展性**   | 易于扩展，新增属性或配置只需修改建造者       | 扩展性差，新增属性需修改 `Car` 类，且 `set` 方法多 |
| **线程安全性** | 线程安全，建造过程独立               | 可能存在线程安全问题，需小心同步                 |
| **适用场景**  | 复杂对象、多个可选属性和默认值           | 简单对象构建，属性较少的对象                   |

---

### **总结**

建造者模式适用于需要构建复杂对象且构建过程涉及多个步骤的场景。它通过将构建过程和对象的表示分离，使得相同的构建过程能够生成不同的产品表示。建造者模式提供了更加灵活和可扩展的解决方案，尤其适合复杂对象
