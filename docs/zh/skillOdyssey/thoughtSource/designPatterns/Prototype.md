# 原型模式
原型模式（Prototype Pattern）是创建型设计模式之一，通过复制现有的对象来创建新的对象，而不是通过类构造新对象。。

## 基本概念
`1.` 有一个抽象类或接口声明了一个Clone()方法，所有实现类都继承或实现这个抽象类或接口。  
`2.` clone()方法用于创建当前对象的副本。  
`3.` 客户端可以通过clone()方法来创建对象，而不需要知道对象创建的细节。  

## 组成结构
**·** Prototype（原型）: 抽象类或接口，声明了克隆方法。  

**·** ConcretePrototype（具体原型）: 继承自 Prototype 类，具体实现克隆方法。  

**·** Client（客户端）: 通过 Prototype 接口来获取一个新的实例。  

## 实现步骤
`1.` **定义原型接口：**定义一个 clone() 方法，用于克隆当前对象。  
`2.` **实现具体原型类：**具体类继承原型接口并实现 clone() 方法，通常使用浅拷贝或深拷贝来复制对象。  
`3.` **客户端调用克隆方法：**客户端不需要知道如何创建对象，只需调用克隆方法来获得对象。 

## 示例代码
```java
// 有一个原型接口，里面有clone()方法
public interface Motor{
    Motor clone();
}

// 有一个实现类，继承自原型接口，重写clone()方法
@Getter
public class KawasakiMotor implements Motor{
    private final String model;
    private final int displacement;

    public KawasakiMotor(String model, int displacement){
        this.model = model;
        this.displacement = displacement;
    }

    @Override
    public Motor clone() {
        return new KawasakiMotor(model, displacement);
    }
}

// 创建客户端类，调用克隆方法
public class PrototypeTest {
    public static void main(String[] args) {
        KawasakiMotor motorA = new KawasakiMotor("Ninja",1000);
        KawasakiMotor motorB = (KawasakiMotor) motorA.clone();

        System.out.println(motorA);
        System.out.println(motorB);
    }
}
```

## 优缺点
优点：  
``1.``**性能优势：**通过复制对象来创建新对象，比通过构造函数实例化要高效，尤其是当对象的构建过程复杂时。  
``2.``**避免重复创建复杂对象：**如果对象构造过程非常繁琐或涉及大量资源消耗（如数据库连接、网络通信等），使用原型模式能有效减少资源浪费。  
``3.``**动态扩展：**客户端通过复制现有对象，可以快速产生新对象，而不需要知道创建的具体细节。  

缺点：  
``1.``**原型的深拷贝和浅拷贝：**如果对象包含了复杂的引用类型，浅拷贝可能会导致共享引用，产生潜在的问题。深拷贝则需要更多的实现工作，可能会增加复杂性。  
``2.``**需要考虑对象的克隆实现：**有时实现对象的克隆方法并不是那么简单，特别是当对象中含有很多复杂属性或者依赖关系时。  
``3.``**可能会导致类膨胀：**如果需要实现许多类型的对象克隆，则每个类都必须实现克隆方法，可能导致代码冗长。  

## 应用场景
1. 游戏开发中的角色克隆  
2. 文档编辑器中的样式复制  
3. 图片编辑软件中的滤镜预设复制  