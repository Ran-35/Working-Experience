### Lock Mechanisms

Locks are a commonly used synchronization mechanism to ensure that multiple threads can access shared resources in a mutually exclusive manner, preventing issues such as inconsistent data when multiple threads access or modify shared resources simultaneously.

---

## 1. Synchronized (Built-in Lock)

The most basic locking mechanism: the `synchronized` keyword.

### 1.1 Synchronized Code Block

**Purpose:** Synchronizes only part of the code in a method, rather than the entire method. By locking a specific object, only the thread that acquires the lock on that object can execute the code within the block. For example: the double-checked locking pattern in Singleton design utilizes this principle.

**Principle:** The code inside the `synchronized` block will lock the `this` object when executed.

```java
public void increment() {
    synchronized (this) {
        count++;
    }
}
```

### 1.2 Synchronized Class Methods (Static Methods)

**Purpose:** When the `synchronized` keyword is applied to a static method, it locks the class object, i.e., the `Class` instance.

**Principle:** By locking the **class object**, only one thread can access the static synchronized methods of the class at any given time.

```java
public class MyClass {
    private static void increment() {}
    private static synchronized void decrement1() {}
    private static synchronized void decrement2() {}
}
```

| Thread A     | Thread B     | Result         | Reason                                                          |
| ------------ | ------------ | -------------- | --------------------------------------------------------------- |
| increment()  | increment()  | Can execute    | `increment()` is not locked                                     |
| increment()  | decrement1() | Cannot execute | Locking the class object, must wait for one to release the lock |
| decrement1() | decrement1() | Cannot execute | Locking the class object, must wait for one to release the lock |
| decrement1() | decrement2() | Cannot execute | Locking the class object, must wait for one to release the lock |

### 1.3 Synchronized Instance Methods (Methods of Class Objects)

**Purpose:** When the `synchronized` keyword is applied to an instance method, it locks the instance of the current object (`this`), ensuring that only one thread can access the instance method at a time.

**Principle:** The method that is synchronized uses the current object instance as a lock. That is, if one thread is executing this method, other threads need to wait until the current thread completes before they can enter the method.

```java
public class MyClass {
    private void increment() {}
    private synchronized void decrement() {}
}
```

| Thread A    | Thread B    | Result         | Reason                                                         |
| ----------- | ----------- | -------------- | -------------------------------------------------------------- |
| increment() | increment() | Can execute    | `increment()` is not locked                                    |
| increment() | decrement() | Can execute    | Different methods are executed, locking is done on the methods |
| decrement() | decrement() | Cannot execute | Both methods are locked, must wait for one to release the lock |

---

## 2. ReentrantLock (Reentrant Lock / Explicit Lock)

Introduced in Java 5, the `ReentrantLock` is an explicit lock that provides more flexibility and functionality than `synchronized`. It allows programmers to explicitly control lock acquisition and release and provides additional features like try-lock, lock with a timeout, and interruptible lock.

### 2.1 Create, Acquire, and Release

**Create:** `ReentrantLock lock = new ReentrantLock();`
**Acquire:** `lock.lock()`
**Release:** `lock.unlock()`

```java
public class MyClass {
    private final ReentrantLock lock = new ReentrantLock();

    public void test() {
        lock.lock();
        try {
            // Access shared resources
        } finally {
            lock.unlock();
        }
    }
}
```

### 2.2 Reentrancy

A thread can acquire the same lock multiple times. If a thread has already acquired a lock, it can acquire the same lock again without causing a deadlock.

```java
public class MyClass {
    private final ReentrantLock lock = new ReentrantLock();

    public void methodA() {
        lock.lock();
        try {
            methodB(); // Calling methodB within methodA
        } finally {
            lock.unlock();
        }
    }

    public void methodB() {
        lock.lock();  // The current thread acquires the lock again
        try {
            System.out.println("Executing methodB...");
        } finally {
            lock.unlock();
        }
    }
}
```

### 2.3 Try Lock

`ReentrantLock` provides the `tryLock()` method, which does not block the current thread. If the lock is not available, it immediately returns `false`.
**Use case:** To avoid blocking scenarios.

* `tryLock()` - Tries to acquire the lock, returns `false` if it’s not available.
* `tryLock(long timeout, TimeUnit unit)` - Tries to acquire the lock within a specified timeout. Returns `false` if the lock is not acquired within the time limit.

```java
public class MyClass {
    private final ReentrantLock lock = new ReentrantLock();

    public void test() {
        if (lock.tryLock()) {
            try {
                // Access shared resources
            } finally {
                lock.unlock();
            }
        } else {
            // Execute other operations if the lock is not available
        }
    }
}
```

### 2.4 Interruptible Lock

Interruptible locks allow a thread to be interrupted while waiting for a lock and throw an exception.
**Use case:** In high-concurrency situations or when waiting for a lock for a long time, it's useful to be able to interrupt the thread.

* `lockInterruptibly()` - Allows a thread to be interrupted while waiting for the lock. If the thread is interrupted before acquiring the lock, it throws an `InterruptedException`.

```java
public class MyClass {
    private final ReentrantLock lock = new ReentrantLock();

    public void test() {
        try {
            lock.lockInterruptibly();
        } catch (InterruptedException e) {
            // Handle the interruption exception
        } finally {
            lock.unlock();
        }
    }
}
```

### 2.5 Fair vs Non-fair Lock

By default, `ReentrantLock` is a non-fair lock, meaning the order of thread acquisition is arbitrary. The first thread to execute gets the lock.

**Fair Lock:** Guarantees that threads acquire the lock in the order they requested it, preventing starvation but may be less performant.
**Non-fair Lock:** The order of acquisition is arbitrary, and a thread that executes first may acquire the lock first.

```java
ReentrantLock fairLock = new ReentrantLock();     // Default is non-fair lock
ReentrantLock fairLock = new ReentrantLock(true); // `true` means fair lock
```

### 2.6 Use Cases

* **High concurrency:** `ReentrantLock` offers more flexible control over locking, such as interruptible locks and timed locks, compared to `synchronized`.
* **Complex synchronization requirements:** When multiple locking mechanisms (e.g., fairness, try-lock, interruptible locks) are needed, `ReentrantLock` offers more options.
* **Deadlock prevention:** By controlling lock order and using `tryLock()`, `ReentrantLock` helps to avoid deadlocks.

---

## 3. ReadWriteLock (Read/Write Lock)

Java provides a locking interface that splits the lock into **read locks (readLock)** and **write locks (writeLock)** to improve performance.
**Design Goal:** Allow multiple threads to read data concurrently, but prevent reading or writing when a thread is writing data.

### 3.1 Read Lock, Write Lock, and Creating Read/Write Lock

* `readLock()` - Read lock.
* `writeLock()` - Write lock.
* **Creating a Read/Write Lock:** `ReentrantReadWriteLock lock = new ReentrantReadWriteLock();`

```java
public class MyClass {
    private final ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();
}
```

### 3.2 Read Lock

**Principle:**

* The read lock is a shared lock, meaning multiple threads can acquire the same read lock as long as no thread holds the write lock.
* The read lock is non-exclusive, so multiple threads can read concurrently, improving performance.
* Read locks and write locks cannot exist at the same time. If a thread holds a read lock, other threads cannot acquire the write lock.

**Usage:**

```java
public class MyClass {
    private final ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();

    public void test() {
        rwLock.readLock().lock();
        try {
            // Perform read operations
        } finally {
            rwLock.readLock().unlock();
        }
    }
}
```

### 3.3 Write Lock

**Principle:**

* The write lock is an exclusive lock, meaning when a thread holds a write lock, no other thread can acquire either a read lock or another write lock.
* The write lock will block all read locks and other write locks until the write operation is complete.
* Write locks have higher priority, as they ensure data consistency.

**Usage:**

```java
public class MyClass {
    private final ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();

    public void test() {
        rwLock.writeLock().lock();
        try {
            // Perform write operations
        } finally {
            rwLock.writeLock().unlock();
        }
    }
}
```

### 3.4 Lock Upgrading

* **Read Lock to


Write Lock:** Cannot be upgraded. Read locks are shared, while write locks are exclusive, which could lead to deadlock.

* **Write Lock to Read Lock:** A thread holding a write lock can release it and then acquire a read lock.

### 3.5 Features

* **Shared Read Lock:** Multiple threads can hold the read lock simultaneously.
* **Exclusive Write Lock:** Only one thread can hold the write lock, and write lock waiting will block other write and read locks.
* **Blocking:** If a read thread tries to acquire the read lock while a write lock is held, the read thread will block until the write lock is released.
* **Deadlock:** Not inherently prone to deadlock but can cause it if not managed carefully, such as a thread holding a write lock trying to acquire a read lock.
* **Fairness:** By default, it is a non-fair lock. To make it a fair lock, pass `true` to the constructor.

```java
ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock(true);  // Fair lock
```
