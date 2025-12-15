### Singleton Pattern(单例模式)

The Singleton Pattern is a creational design pattern whose core idea is to ensure that a class has only one instance and provide a global access point to access that instance. By using the Singleton Pattern, unnecessary resource consumption can be avoided, and issues caused by multiple instances (such as inconsistency) can be prevented.

#### **Core Concept:**

* Ensure that a class has only one instance.
* Provide a global access point to this instance.
* Prevent external creation of multiple instances via constructors.

#### **Feature Comparison**

| Feature           | Static Inner Class                     | Double-Checked Locking                            | Hungry Style                  | Lazy Style - Thread Safe      | Lazy Style - Not Thread Safe  |
| ----------------- | -------------------------------------- | ------------------------------------------------- | ----------------------------- | ----------------------------- | ----------------------------- |
| **Thread Safety** | Yes, relies on class loading mechanism | Yes, through locking                              | Yes                           | Yes                           | No                            |
| **Lazy Loading**  | Yes                                    | Yes                                               | No                            | Yes                           | Yes                           |
| **Performance**   | Efficient (no locking)                 | Efficient (but locking has performance overhead)  | Poor (no lazy loading)        | Poor (locking)                | Efficient                     |
| **Complexity**    | Simple                                 | Relatively complex, involves locks and `volatile` | Simple                        | Simple                        | Simple                        |
| **Use Case**      | Recommended                            | Suitable for high concurrency                     | Suitable for simple scenarios | Suitable for simple scenarios | Suitable for simple scenarios |

---

### **Characteristics**

#### 1. **A Class Has Only One Instance**

A singleton class creates only one instance, and all clients share that instance. For example, in the following code, `MyClass` will only have one instance, and both `instance1` and `instance2` will point to the same object.

```java
// Singleton class implementation
public class MyClass {
    private static MyClass instance; // Holds the unique instance
    private String name;

    // Private constructor to prevent instantiation via "new"
    private MyClass() { }

    // Public static method to get the unique instance
    public static MyClass getInstance() {
        if (instance == null) {
            instance = new MyClass();  // Create instance the first time it's accessed
        }
        return instance;
    }

    // Getter and setter methods. Note: Singleton pattern does not need a constructor with parameters, even the default constructor must be private to prevent creating multiple instances.
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

```java
// Using Singleton
public class TestSingleton {
    public static void main(String[] args) {
        MyClass instance1 = MyClass.getInstance();
        MyClass instance2 = MyClass.getInstance();

        instance1.setName("John");
        System.out.println(instance1.getName()); // Outputs "John"
        System.out.println(instance2.getName()); // Outputs "John"
        
        instance2.setName("Alice");
        System.out.println(instance1.getName()); // Outputs "Alice"
        System.out.println(instance2.getName()); // Outputs "Alice"
    }
}
```

---

#### 2. **The Instance Creation is Controlled by the Singleton Class**

* The Singleton class creates the instance only when the `getInstance()` method is called for the first time. Subsequent calls will return the same instance.
* This process is controlled within the class, and external code cannot create multiple instances directly via the constructor.
* The Singleton class manages the instance's lifecycle, ensuring only one instance exists throughout the entire application.

---

#### 3. **Global Access Point**

* A static method provides access to the instance, meaning no need to instantiate the class object directly.
* This ensures the uniqueness of the Singleton class instance and prevents inconsistencies that might arise from multiple instances.

---

### **Use Cases**

1. **Configuration Management:** Ensures the entire application uses the same configuration.
2. **Logging Management:** Unified management of log output.
3. **Database Connection Pool:** Avoids the overhead of frequently creating and destroying connections.
4. **Thread Pool:** Manages thread resources centrally.
5. **Caching System:** Shares cached data globally.

---

### **Implementation Styles**

#### 1. **Lazy Initialization**

* **Lazy Loading**: The instance is created only when it is first accessed, ensuring that the object is only created when needed, which optimizes program startup time and resource usage.
* **Thread-Safe and Non-Thread-Safe Implementations:**

  * **Non-Thread-Safe**: Multiple threads may call `getInstance()`, leading to multiple instances being created.
  * **Thread-Safe**: Synchronization ensures that only one instance is created in a multithreaded environment.

```
1. Declaration: Declare a static variable to hold the unique instance.
2. Constructor: Private no-argument constructor to prevent external creation of instances.
3. Access: Provide a static method to access the unique instance.
```

##### 1.1 Non-Thread-Safe Lazy Initialization

```java
// Class constructor
public class MyClass {
    // 1. Declare a static variable to hold the unique instance
    private static MyClass instance;
    private String name;

    // 2. Private constructor to prevent external instantiation
    private MyClass() {
        // Initialization can be done here if needed
    }

    // 3. Public static method to access the unique instance
    public static MyClass getInstance() {
        if (instance == null) {
            instance = new MyClass();  // Create the unique instance
        }
        return instance;
    }
    
    // Getter and setter methods

    // Note: No need for a constructor with parameters; even the default constructor must be private to prevent direct instantiation.
}
```

**Issue:** In a multi-threaded environment, `instance` may be created multiple times.

##### 1.2 Thread-Safe Lazy Initialization

```java
// Class constructor
public class MyClass {
    // 1. Declare a static variable to hold the unique instance
    private static MyClass instance;
    private String name;

    // 2. Private constructor to prevent external instantiation
    private MyClass() {
        // Initialization can be done here if needed
    }

    // 3. Public static method to access the unique instance
    public static synchronized MyClass getInstance() {
        if (instance == null) {
            instance = new MyClass();  // Create the unique instance
        }
        return instance;
    }
    
    // Getter and setter methods

    // Note: No need for a constructor with parameters; even the default constructor must be private to prevent direct instantiation.
}
```

**Drawback:** Every call to `getInstance()` involves synchronization, which adds performance overhead.

---

#### 2. **Eager Initialization**

* **Instance is created when the class is loaded**, not waiting for the first access.
* **Thread-Safe**: Because the class loading process is thread-safe.
* **Disadvantage**: If the instance creation process is complex, or if the instance is never used, resources may be wasted.

```
1. Creation: The unique instance is created.
2. Constructor: Private no-argument constructor.
3. Access: Static method to access the instance.
```

```java
// Class constructor
public class MyClass {
    // 1. Create the unique instance when the class is loaded
    private static final MyClass INSTANCE = new MyClass();
    private String className;

    // 2. Private constructor to prevent external instantiation
    private MyClass() {}

    // 3. Public static method to access the instance
    public static MyClass getInstance() {
        return INSTANCE;
    }
    // Getter and setter methods

    // Note: No need for a constructor with parameters; even the default constructor must be private to prevent direct instantiation.
}
```

---

#### 3. **Double-Checked Locking**

An optimized version of Lazy Initialization that ensures thread safety while improving performance:

* In high concurrency scenarios, double-checked locking reduces the performance overhead of synchronization.
* First, the instance is checked without locking. If it is not created, the method enters a synchronized block to create the instance.
* The second check ensures that no other thread has created the instance during the lock acquisition.

```
1. Declaration: Use `volatile` to declare a static variable, ensuring visibility across threads and preventing instruction reordering.
2. Constructor: Private no-argument constructor.
3. Access: Static method to get the instance.
```

```java
// Class constructor
public class MyClass {
    // 1. volatile ensures visibility and prevents instruction reordering
    private static volatile MyClass instance;
    private String className;

    // 2. Private constructor
    private MyClass() {}

    // 3. Public static method to access the instance
    public static MyClass getInstance() {
        // First check
        if (instance == null) {
            // Locking
            synchronized (MyClass.class) {
                // Second check
                if (instance == null) {
                    instance = new MyClass();
                }
            }
        }
        return instance;
    }
    // Getter and setter methods

    // Note: No need for a constructor with parameters; even the default constructor must be private to prevent direct instantiation.
}
```

**Advantages:**

* Synchronization only occurs when the instance is being created.
* Improves performance by reducing lock contention.

**Disadvantages:**

* Complex implementation.
* `volatile` ensures instance creation visibility and prevents instruction reordering.

---

#### 4. **Static Inner Class**

* Uses the class loading mechanism to ensure lazy loading and thread safety.
* The static inner class is only loaded when `getInstance()` is called, ensuring lazy initialization, and class loading itself is thread-safe.

```
1. Constructor: Private no-argument constructor.
2. Static Inner Class: The instance is created when the inner class is loaded, ensuring thread safety.
3. Access: Static method to access the instance.
```

```java
// Class constructor
public class MyClass {
    private String className;
    
    // 1. Private constructor to prevent instantiation from outside
    private MyClass() {}

    // 2. Static inner class, the instance is created when the inner class is loaded.
    private static class MyClassHolder {
        private static final MyClass INSTANCE = new MyClass();
    }

    // 3. Public static method to access the instance
    public static MyClass getInstance() {
        return MyClassHolder.INSTANCE;
    }
    // Getter and setter methods

    // Note: No need for a constructor with parameters; even the default constructor must be private to prevent direct instantiation.
}
```

**Advantages:**

* **Thread Safety**: The static inner class instance is created the first time it's accessed, ensuring thread safety.
* **Lazy Loading**: The instance is created only when `getInstance()` is called for the first time.
* **High Performance**: No unnecessary synchronization, and the instance is created only once.

---

### **Summary**

* **Lazy Style** is suitable when lazy loading is needed, but thread-safe implementations may have performance issues.
* **Hungry Style** works for simple initialization processes, but it may waste resources if the instance is never used.
* **Double-Checked Locking** is useful for high concurrency, providing better performance with more complex lazy loading needs.
* **Static Inner Class** is the recommended approach, ensuring both lazy loading and high performance with simple implementation.
