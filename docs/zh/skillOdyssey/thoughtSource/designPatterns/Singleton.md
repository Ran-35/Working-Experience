# 单例模式
单例模式（Singleton）是一种创建型模式，确保一个类只有一个实例，并提供一个全局的访问点来访问这个实例。  

**核心思想**：确保类只有一个实例，并且防止外部通过构造函数直接创建多个实例。

| 特性       | 静态内部类     | 双重检查锁定            | 饿汉式        |懒汉式-线程安全|懒汉式-线程不安全|
| ---------- | --------- | ----------------- | ---------- |---------- |---------- |
| **线程安全**| 是，依赖类加载机制 | 是，通过加锁            | 是          |是          |否|
| **懒加载**  | 是         | 是                 | 否          |是          |是|
| **性能**    | 高效（无加锁）   | 高效（但加锁有性能开销）      | 性能较差（无懒加载） |性能较差（加锁）|高效|
| **复杂度**  | 简单        | 较复杂，涉及锁和 volatile | 简单         |简单|简单|
| **适用场景**| 推荐使用      | 适用于高并发时           | 适用于简单场景    |适用于简单场景    |适用于简单场景    |
## 特点
### 1. 一个类只有一个实例。  
即：全局所建的对象都是同一个。
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
```java
// 使用构造函数
public class TestSingleton {
    public static void main(String[] args) {
        // 获取单例对象
        MyClass instance1 = MyClass.getInstance();
        MyClass instance2 = MyClass.getInstance();

        // 设置 name 属性
        instance1.setName("John");

        // 输出 name 属性，应该都为 "John"
        System.out.println(instance1.getName());  // 输出 "John"
        System.out.println(instance2.getName());  // 输出 "John"

        // 修改 instance2 的 name 属性
        instance2.setName("Alice");

        // 输出 name 属性，应该都为 "Alice"
        System.out.println(instance1.getName());  // 输出 "Alice"
        System.out.println(instance2.getName());  // 输出 "Alice"
    }
}
```
### 2. 该实例必须由单例类自行创建。  
(1) **Instance 的创建由类内部来完成**：实例 instance 只有在第一次调用 getInstance() 时才会被创建。外部代码无法直接通过 new MyClass() 来创建实例。  

(2) **类自己控制实例的生命周期**：单例类内部会管理实例的生命周期，只会在第一次调用时创建实例，并且确保整个应用程序中只有一个实例存在。

### 3. 单例类必须提供一个全局访问点来获取该实例。
(1) **全局访问点**：意味着无论在程序的哪个地方，都可以通过一个固定的方法来访问到单例类的实例。这个方法通常是 静态的，也就是说，你不需要实例化单例类对象就可以调用这个方法来获取实例。

(2) **确保单例唯一性**：通过全局访问点，单例类能确保它只会被创建一次，并且所有的客户端代码都共享同一个实例。这是单例模式的核心要求之一，目的是避免多个实例的创建。


## 应用场景
1. 配置管理类：确保整个应用程序使用同一配置

2. 日志管理类：统一管理日志输出

3. 数据库连接池：避免频繁创建和销毁连接

4. 线程池：统一管理线程资源

5. 缓存系统：全局共享缓存数据




## 实现方式
### 1. 懒汉式
- **懒加载**：实例在程序启动时不会立即创建，只有在第一次调用 getInstance() 方法时才会创建实例。
- **延迟创建**：只有在需要该实例时才进行创建，有助于提高程序的启动速度和资源的使用效率。
- **非线程安全和线程安全实现方式**：懒汉式有非线程安全版本和线程安全版本。非线程安全版本容易出现多线程访问时创建多个实例的风险，线程安全版本则通过加锁机制确保多线程环境下只有一个实例。
```
1. 声明：声明一个 静态变量，用于保存唯一实例
2. 构造：私有的 无参构造，防止外部创建实例
3. 获取：提供一个 静态方法，用于获取唯一实例
```

#### (1) 线程不安全的懒汉式
**缺点：**实例在第一次访问时被创建，但是由于没有同步机制，可能会导致 多线程环境下 多次创建实例的问题。  
**原因：**多线程环境下，多个线程同时调用 getInstance()，可能会同时进入 if (instance == null) 判断语句并各自创建一个实例
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

#### (2) 线程安全的懒汉式
懒汉式单例模式虽然线程安全，但效率很低，因为每次调用getInstance()方法时，都需要进行同步，这会阻塞线程。  
**缺点：**性能问题。  
**原因：**(1) 每次访问 getInstance() 时都会进行同步。（2）即使 instance 已经创建，锁的开销也会影响性能。（3）特别是在实例已经创建之后，频繁的同步会导致不必要的性能损失。
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

### 2. 饿汉式
- **实例在类加载时就创建**：与懒汉式不同，饿汉式在类加载时就创建好单例实例，不需要等到第一次使用时再创建。
- **线程安全**：因为实例是在类加载时就创建的，所以不存在线程安全问题。类加载过程本身是线程安全的。
- **缺点**：如果单例实例的创建过程很复杂，或者在某些情况下从未使用该实例，则饿汉式会浪费资源，因为即使从未使用到该实例，它也会在类加载时创建。

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

### 3. 双重检查锁定
双重检查锁定（Double-Check Locking）是一种优化的 懒汉式，保证 线程安全的前提下提升性能。  
**线程安全的饿汉式：**加锁 来确保只有一个线程能够创建实例，但多次调用会导致性能损失。  
**双重检查锁定：**只有在第一次实例化时才加锁，且通过双重检查的方式，避免每次访问时都需要加锁，从而减少了性能开销

- **第一次检查：**在进入同步块之前，先检查实例是否已经存在。如果实例已经创建，则直接返回，无需加锁。
- **加锁：**如果实例尚未创建，进入同步块，确保只有一个线程能够创建实例。
- **第二次检查：**在加锁的同步块内部，再次检查实例是否已经被其他线程创建。第二次检查是为了避免在多个线程同时等待锁时，多个线程都进入同步块并创建多个实例。

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

### 4. 静态内部类
一种通过利用 类加载机制 来实现懒加载和线程安全的单例模式。  

**类加载机制：**Java 的类加载是 线程安全 的，因此类加载时实例化静态内部类时是线程安全的。  
**懒加载：**静态内部类只有在第一次访问时才会被加载，从而创建单例实例，避免了饿汉式中的资源浪费。  
**线程安全：**由于类加载是线程安全的，并且实例的创建只发生一次，保证了单例的唯一性。

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
#### 优点
1. **线程安全**：由类加载机制保证线程安全。
2. **延迟加载（懒加载）**：只有在第一次调用 getInstance() 时，实例才会被创建，而不像饿汉式那样一开始就创建，保证了资源的利用率。
3. **简单高效**：不需要加锁，性能优越，代码清晰。

