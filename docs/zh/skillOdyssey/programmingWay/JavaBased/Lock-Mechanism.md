### 锁机制

锁是一种常用的同步机制，用于确保多线程在执行共享资源访问时，能够以互斥的方式进行，防止多个线程同时访问或修改共享资源导致的不一致性。

---

## 1. Synchronized（内置锁）

最基本的锁机制：`Synchronized`关键字

### 1.1 同步代码块

**作用**：同步方法中的一部分代码，而不是整个方法。通过锁定特定的对象，只有当线程获得该对象的锁时，它才可以执行代码块中的内容。例如：单例模式-双重检查锁就利用该原理。

**原理**：只有在 `synchronized` 块中的代码被执行时，才会锁定 `this` 对象。

```java
public void increment() {
    synchronized (this) {
        count++;
    }
}
```

### 1.2 同步类方法（静态方法）

**作用**：`synchronized` 关键字修饰的是静态方法时，它会锁住该类的类对象，即 `Class` 实例。

**原理**：通过锁住**类对象**，多个线程在同一时刻只允许一个线程访问该类的静态同步方法。

```java
public class MyClass {
    private static void increment() {}
    private static synchronized void decrement1() {}
    private static synchronized void decrement2() {}
}
```

| 线程A          | 线程B          | 结果   | 原因                |
| ------------ | :----------- | :--- | :---------------- |
| increment()  | increment()  | 可以执行 | increment()未加锁    |
| increment()  | increment1() | 无法执行 | 锁到了类，需要等其中一个进程释放锁 |
| decrement1() | decrement1() | 无法执行 | 锁到了类，需要等其中一个进程释放锁 |
| decrement1() | decrement2() | 无法执行 | 锁到了类，需要等其中一个进程释放锁 |

### 1.3 同步实例方法（类对象中的方法）

**作用**：`synchronized` 关键字加在实例方法上时，它会锁住当前对象的实例（this），确保同一时间只有一个线程可以访问该实例的方法。

**原理**：修饰的方法会使用当前对象的实例作为锁。也就是说，如果一个线程正在执行该方法，其他线程需要等待当前线程执行完毕才能进入该方法。

```java
public class MyClass {
    private void increment() {}
    private synchronized void decrement() {}
}
```

| 线程A         | 线程B         | 结果   | 原因                          |
| ----------- | :---------- | :--- | :-------------------------- |
| increment() | increment() | 可以执行 | increment()未加锁              |
| increment() | decrement() | 可以执行 | 锁加到的是方法，执行的是不同的方法           |
| decrement() | decrement() | 无法执行 | decrement()被锁定，需要等其中一个进程释放锁 |

---

## 2. ReentrantLock（可重入锁 / 显示锁）

Java 5 引入的显式锁，比 `synchronized` 提供了更加灵活和强大的功能，允许程序员显式地控制锁的获取和释放，并提供了一些附加功能，如尝试获取锁、超时获取锁、可中断锁等。

### 2.1 创建、获取与释放

**创建**：`ReentrantLock lock = new ReentrantLock();`
**获取**：`lock.lock()`
**释放**：`lock.unlock()`

```java
public class MyClass {
    private final ReentrantLock lock = new ReentrantLock();

    public void test() {
        lock.lock();
        try {
            // 访问共享资源
        } finally {
            lock.unlock();
        }
    }
}
```

### 2.2 可重入性

同一个线程可以多次获得同一把锁。如果线程已经获得了锁，它仍然可以再次获取这把锁而不会发生死锁。

```java
public class MyClass {
    private final ReentrantLock lock = new ReentrantLock();

    public void methodA() {
        lock.lock();
        try {
            methodB(); // 在 methodA 内部调用 methodB
        } finally {
            lock.unlock();
        }
    }

    public void methodB() {
        lock.lock();  // 当前线程再次获得锁
        try {
            System.out.println("Executing methodB...");
        } finally {
            lock.unlock();
        }
    }
}
```

### 2.3 尝试获取锁

`ReentrantLock` 提供了 `tryLock()` 方法，它不会阻塞当前线程，如果锁不可用，它会立刻返回 `false`。
**使用场景**：需要避免阻塞的场景。

* `tryLock()`：尝试获取锁，如果锁不可用，则立即返回 `false`。
* `tryLock(long timeout, TimeUnit unit)`：尝试获取锁，如果锁不可用，则等待指定的时间。若在指定时间内还无法获得，则返回 `false`。

```java
public class MyClass {
    private final ReentrantLock lock = new ReentrantLock();

    public void test() {
        if (lock.tryLock()) {
            try {
                // 访问共享资源
            } finally {
                lock.unlock();
            }
        } else {
            // 如果锁不可用，执行其他操作
        }
    }
}
```

### 2.4 可中断锁

可中断锁允许线程在等待锁时被中断，并抛出一个异常。
**使用场景**：在高并发或长时间等待锁时，线程需要在等待锁的时候能够被外部中断。

* `lockInterruptibly()`：让一个线程在等待锁的过程中被中断。如果线程在获取锁之前被中断，它会抛出 `InterruptedException`。

```java
public class MyClass {
    private final ReentrantLock lock = new ReentrantLock();

    public void test() {
        try {
            lock.lockInterruptibly();
        } catch (InterruptedException e) {
            // 处理中断异常
        } finally {
            lock.unlock();
        }
    }
}
```

### 2.5 公平锁与非公平锁

默认情况下，`ReentrantLock` 是非公平锁，即获取锁的顺序是任意的，哪个线程先执行，哪个线程就先获得锁。

**公平锁**：能确保线程按请求顺序获得锁，从而避免“饥饿”问题，但性能可能较差。
**非公平锁**：获取锁的顺序是任意的，哪个线程先执行，哪个线程就先获得锁。

```java
ReentrantLock fairLock = new ReentrantLock();     // 默认是非公平锁
ReentrantLock fairLock = new ReentrantLock(true); // true 表示公平锁
```

### 2.6 使用场景

* **高并发**：多个线程竞争锁时，`ReentrantLock` 提供了比 `synchronized` 更加灵活的控制，如可中断锁、定时锁等。
* **复杂的同步需求**：当需要多种锁定机制（如公平性、尝试锁、可中断锁等）时，`ReentrantLock` 提供了更多选项。
* **避免死锁**：可以通过锁的顺序控制和 `tryLock()` 等方法来避免死锁。

---

## 3. ReadWriteLock（读写锁）

Java 提供的一种锁接口，它通过将锁分为**读锁（readLock）**和**写锁（writeLock）**来提高性能。
设计目标：允许多个线程并发地读取数据。但是在写入数据时，其他线程无法进行读取或写入。

### 3.1 读锁、写锁与创建读写锁

* `readLock()`：读锁。

* `writeLock()`：写锁。

* **创建读写锁**：`ReentrantReadWriteLock lock = new ReentrantReadWriteLock();`

```java
public class MyClass {
    private final ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();
}
```

### 3.2 读锁

**原理**：

* 读锁是共享锁，多个线程可以同时获得同一个读锁，只要没有线程持有写锁。
* 读锁的获取是非独占的，多个线程可以同时读取数据，从而提高性能。
* 读锁不能与写锁同时存在。即如果有线程持有读锁，其他线程不能获取写锁。

**使用**：

```java
public class MyClass {
    private final ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();

    public void test() {
        rwLock.readLock().lock();
        try {
            // 执行读取数据操作
        } finally {
            rwLock.readLock().unlock();
        }
    }
}
```

### 3.3 写锁

**原理**：

* 写锁是排它锁，写锁是独占的，当一个线程持有写锁时，其他线程无法获得写锁或读锁。
* 写锁会阻塞所有读锁和其他写锁，直到写操作完成。
* 写锁具有更高的优先级，因为它需要保证数据的一致性。

**使用**：

```java
public class
```


MyClass {
private final ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();

```
public void test() {
    rwLock.writeLock().lock();
    try {
        // 执行写数据操作
    } finally {
        rwLock.writeLock().unlock();
    }
}
```

}

````

### 3.4 锁升降级
- 读锁不能升级为写锁：读锁是共享锁，而写锁是独占锁，升级可能会导致死锁。
- 写锁可以升级为读锁：在持有写锁的线程内，释放写锁后可以获取读锁。

### 3.5 特性
- **共享读锁**：多个线程可以同时持有读锁。
- **独占写锁**：多个线程不能同时持有写锁，写锁的等待会阻塞其他写锁和读锁。
- **阻塞**：线程尝试获取读锁，而写锁已经被持有时，读线程会阻塞直到写锁被释放。
- **死锁**：本身不会引发死锁，但如果不小心管理锁，可能会导致死锁。例如，持有写锁的线程尝试获取读锁会导致死锁。
- **公平性**：默认是非公平锁，要变为公平锁，需要构造方法传 `true`。

```java
ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock(true);  // 公平锁
````
