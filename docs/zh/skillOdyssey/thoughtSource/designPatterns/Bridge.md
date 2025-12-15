# 桥接模式
桥接模式（Bridge Pattern）是结构型设计模式，它将抽象部分与它的实现部分分离，使它们都可以独立地变化。

## 模式定义
**·** 抽象（Abstraction）：提供一个接口用于操作，而不关心其具体的实现。  
**·** 实现（Implementor）：定义抽象部分的实现接口，供具体实现类去实现。  
**·** 桥接（Bridge）：如果你修改了抽象部分的代码，不必修改实现部分的代码，反之亦然。

## 模式结构
`1.`**抽象类（Abstraction）：**定义抽象类，并包含对具体实现类的引用。  
`2.`**扩展抽象类（Abstraction）：**抽象接口的子类，扩展抽象接口。
`3.`**实现接口（Implementor）：**定义实现接口，供抽象类调用。
`4.`**具体实现类（Concrete Implementor）：**实现实现接口，并实现抽象类中的抽象方法。

## 使用步骤
`1.` 定义实现接口  
`2.` 定义具体实现类  
`3.` 定义抽象类，并包含对具体实现类的引用  
`4.` 创建扩展抽象类，并实现抽象类中的抽象方法  

## 示例代码
```Java
// 定义实现接口-变速箱
public interface Transmission {
    // 有一个方法-变速
    void transmit();
}
```
```Java
// 具体实现类-手动变速箱
public class ManualTransmission implements Transmission {
    @Override
    public void transmit() {
        System.out.println("Manual Transmission");
    }
}

// 具体实现类-自动变速箱
public class AutomaticTransmission implements Transmission {
    @Override
    public void transmit() {
        System.out.println("Automatic Transmission");
    }
}
```
```Java
// 定义一个抽象类-保时捷汽车
public abstract class Porsche {
    // 保时捷有变速箱
    protected Transmission transmission;

    public Porsche(Transmission transmission) {
        this.transmission = transmission;
    }

    // 其具备变速箱的变速方法
    public abstract void transmit();
}
``` 
```Java
// 扩展抽象类（抽象类的子类）-保时捷911GT2RS
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
```
```Java
// 扩展抽象类（抽象类的子类）-保时捷911GT3
public class Gt3_911 extends Porsche {
    public Gt3_911(Transmission transmission) {
        super(transmission);
    }
    @Override
    public void transmit() {
        System.out.println("Gt3Rs_911 transmit");
        transmission.transmit();
    }
}
```
```Java
// 测试类
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

## 优点
**·** **解耦抽象与实现：**可以独立地改变抽象层和实现层，而不相互影响。

**·** **扩展性强：**如果需要添加新的功能或改变实现，桥接模式可以大大减少影响。

**·** **增加了灵活性：**通过组合不同的抽象层和实现层，可以快速增加新的变体。

## 实际应用
`1.` 数据库连接桥接：桥接模式可以用来创建数据库连接桥，将数据库连接的实现与数据库连接的抽象分离，从而实现数据库连接的动态切换。
`2.` 消息发送器桥接：桥接模式可以用来创建消息发生器的桥，将消息发生器的实现与消息发生器的抽象分离，从而实现消息发生器的动态切换。