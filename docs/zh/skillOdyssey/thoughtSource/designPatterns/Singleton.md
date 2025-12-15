### 单例模式（Singleton Pattern）

单例模式是一种创建型设计模式，其核心思想是确保某个类只有一个实例，并且提供一个全局访问点来访问该实例。使用单例模式可以避免不必要的资源消耗和避免多个实例带来的不一致性问题。

#### **核心思想：**

* 确保一个类只有一个实例。
* 提供一个全局访问点来访问这个实例。
* 防止外部通过构造函数直接创建多个实例。

#### **特性对比**

| 特性       | 静态内部类     | 双重检查锁定              | 饿汉式        | 懒汉式-线程安全 | 懒汉式-线程不安全 |
| -------- | --------- | ------------------- | ---------- | -------- | --------- |
| **线程安全** | 是，依赖类加载机制 | 是，通过加锁              | 是          | 是        | 否         |
| **懒加载**  | 是         | 是                   | 否          | 是        | 是         |
| **性能**   | 高效（无加锁）   | 高效（但加锁有性能开销）        | 性能较差（无懒加载） | 性能较差（加锁） | 高效        |
| **复杂度**  | 简单        | 较复杂，涉及锁和 `volatile` | 简单         | 简单       | 简单        |
| **适用场景** | 推荐使用      | 适用于高并发时             | 适用于简单场景    | 适用于简单场景  | 适用于简单场景   |

---

### **特点**

#### 1. **一个类只有一个实例**

单例类只会创建一个实例，所有的客户端都共享这个实例。例如，在下面的代码中，`MyClass` 只会有一个实例，`instance1` 和 `instance2` 都会指向同一个对象。

```java
// 单例类实现
public class MyClass {
    private static MyClass instance; // 保存唯一实例
    private String name;

    // 私有化构造函数，防止外部通过new创建实例
    private MyClass() { }

    // 提供公共静态方法获取唯一实例
    public static MyClass getInstance() {
        if (instance == null) {
            instance = new MyClass();  // 第一次访问时创建实例
        }
        return instance;
    }

    // getter和setter方法。注：单例模式无需有参数构造函数，无参构造也需要设为私有，防止通过构造直接创建多个实例
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

```java
// 使用单例
public class TestSingleton {
    public static void main(String[] args) {
        MyClass instance1 = MyClass.getInstance();
        MyClass instance2 = MyClass.getInstance();

        instance1.setName("John");
        System.out.println(instance1.getName()); // 输出 "John"
        System.out.println(instance2.getName()); // 输出 "John"
        
        instance2.setName("Alice");
        System.out.println(instance1.getName()); // 输出 "Alice"
        System.out.println(instance2.getName()); // 输出 "Alice"
    }
}
```

---

#### 2. **实例的创建由单例类自行控制**

* 单例类在第一次调用 `getInstance()` 时才会创建实例，之后的调用都会返回同一个实例。
* 这个过程由类内部控制，外部无法通过构造函数直接创建多个实例。
* 单例类内部会管理实例的生命周期，只会在第一次调用时创建实例，并且确保整个应用程序中只有一个实例存在。

---

#### 3. **全局访问点**

* 通过一个静态方法来获取实例，无需实例化类对象即可访问。
* 这样可以确保单例类的实例唯一性，避免多个实例带来的不一致性。

---

### **应用场景**
1. 配置管理类：确保整个应用程序使用同一配置

2. 日志管理类：统一管理日志输出

3. 数据库连接池：避免频繁创建和销毁连接

4. 线程池：统一管理线程资源

5. 缓存系统：全局共享缓存数据

---

### **实现方式**

#### 1. **懒汉式**（Lazy Initialization）

* **懒加载**：实例在第一次访问时才会创建，保证只有在需要该实例时才进行创建，避免在程序启动时创建不必要的对象(提高程序的启动速度和资源的使用效率)。
* **非线程安全和线程安全实现**：

  * **非线程安全**：多个线程可能会同时调用 `getInstance()`，导致创建多个实例。
  * **线程安全**：使用同步来确保多线程环境下只创建一个实例。
```
1. 声明：声明一个 静态变量，用于保存唯一实例
2. 构造：私有的 无参构造，防止外部创建实例
3. 获取：提供一个 静态方法，用于获取唯一实例
```
##### 1.1 非线程安全的懒汉式

```java
// 建设构造函数
public class MyClass {
    // 1. 声明一个静态变量来保存唯一实例
    private static MyClass instance;
    private String name;

    // 2. 私有化构造函数，防止外部创建实例
    private MyClass() {
        // 可以在此初始化一些数据或执行其他操作
    }

    // 3. 提供公共静态方法来获取唯一实例
    public static MyClass getInstance() {
        if (instance == null) {
            // 通过类自己来创建唯一实例
            instance = new MyClass(); 
        }
        return instance;
    }
    
    // getter和setter方法

    // 注：单例模式无需有参数构造函数，无参构造也需要设为私有，防止通过构造直接创建多个实例
}
```

**问题：** 多线程环境下，可能导致 `instance` 被多次创建。

##### 1.2 线程安全的懒汉式

```java
// 建设构造函数
public class MyClass {
    // 1. 声明一个静态变量来保存唯一实例
    private static MyClass instance;
    private String name;

    // 2. 私有化构造函数，防止外部创建实例
    private MyClass() {
        // 可以在此初始化一些数据或执行其他操作
    }

    // 3. 提供公共静态方法来获取唯一实例
    public static synchronized MyClass getInstance() {
        if (instance == null) {
            // 通过类自己来创建唯一实例
            instance = new MyClass(); 
        }
        return instance;
    }
    
    // getter和setter方法

    // 注：单例模式无需有参数构造函数，无参构造也需要设为私有，防止通过构造直接创建多个实例
}
```

**缺点：** 每次调用 `getInstance()` 都会进行同步，导致性能开销较大。

---

#### 2. **饿汉式**（Eager Initialization）

* **实例在类加载时创建**，不需要等到第一次访问时。
* **线程安全**：因为类加载过程本身是线程安全的。
* **缺点**：如果实例的创建过程复杂，或者实例从未使用，可能会浪费资源。
```
1. 创建：创建一个唯一实例
2. 构造：私有无参构造
3. 获取：静态方法获取实例
```
```java
// 建设构造函数
public class MyClass {
    // 1. 类加载时创建一个唯一实例
    private static final MyClass INSTANCE = new MyClass();
    private String className;

    // 2. 私有构造函数，若去掉就会导致外部可以new MyClass()
    private MyClass() {}

    // 3.提供公共静态方法获取实例
    public static MyClass getInstance() {
        return INSTANCE;
    }
    // getter和setter方法

    // 注：单例模式无需有参数构造函数，无参构造也需要设为私有，防止通过构造直接创建多个实例
}
```

---

#### 3. **双重检查锁定**（Double-Checked Locking）
一种优化的 懒汉式，保证 线程安全的前提下提升性能：  

* 在高并发的情况下，双重检查锁定能够减少同步的性能开销。
* 第一次检查实例是否已经创建，如果没有创建才进入同步块。
* 加锁：如果实例尚未创建，进入同步块，确保只有一个线程能够创建实例。
* 第二次检查实例是否已经创建，避免在锁的过程中其他线程创建实例。
```
1. 声明：使用volatile声明一个静态变量，确保实例在多线程环境下的 可见性，以及 防止指令重排
    可见性：在多线程环境中，volatile 保证了当一个线程更新 instance 变量时，其他线程能够立即看到这个更新。
    防止指令重排：volatile 确保在多线程环境下，Java虚拟机不会对 instance 的初始化过程进行指令重排，从而避免一些潜在的多线程问题。

2. 构造：私有无参构造
3. 获取：静态方法获取实例
```
```java
// 建设构造函数
public class MyClass {
    // 1. volatile 保证可见性和防止指令重排
    private static volatile MyClass instance;
    private String className;

    // 2. 私有构造函数
    private MyClass() {}

    // 3.提供公共静态方法获取实例
    public static MyClass getInstance() {
        // 第一次检查
        if (instance == null) {
            // 加锁
            synchronized (MyClass.class) {
                // 第二次检查
                if (instance == null) {
                    instance = new MyClass();
                }
            }
        }
        return instance;
    }
    // getter和setter方法

    // 注：单例模式无需有参数构造函数，无参构造也需要设为私有，防止通过构造直接创建多个实例
}
```

**优点：**

* 只有在实例尚未创建时才加锁，减少了锁的竞争。
* 提高了性能。

**缺点：**

* 实现较复杂。
* `volatile` 的使用确保了实例创建的可见性，防止指令重排。

---

#### 4. **静态内部类**（Bill Pugh Singleton）

* 利用类加载机制来保证懒加载和线程安全。
* 静态内部类只有在第一次使用时才会加载，因此可以实现懒加载，并且类加载本身是线程安全的。
```
1. 构造：私有无参构造

2. 静态内部类：静态内部类在类加载时创建实例，并且是线程安全的。
3. 获取：静态方法获取实例
```
```java
// 建设构造函数
public class MyClass {
    private String className;
    // 1. 私有构造函数，确保外部无法通过 new Singleton() 创建多个实例
    private MyClass() {}

    // 2. 静态内部类，只有在第一次访问 getInstance() 方法时才会加载，确保了 懒加载（即实例在需要时才创建）
    private static class MyClassHolder{
        // 类加载时，只有第一次使用时才会初始化，保证了实例的唯一性
        private static final MyClass INSTANCE = new MyClass();
    }

    // 3.提供公共静态方法获取实例
    public static MyClass getInstance() {
        return MyClassHolder.INSTANCE;
    }
    // getter和setter方法

    // 注：单例模式无需有参数构造函数，无参构造也需要设为私有，防止通过构造直接创建多个实例
}
```

**优点：**

* **线程安全**：由于类加载是线程安全的，静态内部类的实例也会在第一次访问时创建。
* **懒加载**：只有在第一次调用 `getInstance()` 时，静态内部类才会被加载，实例才会被创建。
* **性能高效**：避免了不必要的同步，且只有第一次调用时才会创建实例。

---

### **总结**

* **懒汉式**适用于懒加载需求，但线程安全的实现性能较低。
* **饿汉式**适用于实例初始化过程简单且不需要懒加载的场景，性能高，但浪费资源的可能性存在。
* **双重检查锁定**适用于高并发场景，性能相对较高，适合复杂的懒加载需求。
* **静态内部类**是推荐的实现方式，既保证了懒加载，也具有高性能，且实现简单。
