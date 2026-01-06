# Concurrent Utilities (Java Concurrent Utilities)

The Java Concurrent Utilities (`java.util.concurrent`, abbreviated as JUC) is a set of powerful concurrency programming tools introduced in Java 5.0. These tools provide more advanced concurrency control mechanisms than traditional `synchronized` and `wait()/notify()`.

## Atomic Classes

Atomic classes provide efficient, lock-free, thread-safe operations, enabling atomic read-write access to variables in a multi-threaded environment. This avoids the overhead of traditional synchronization (`synchronized`) mechanisms, while offering better performance.

### Atomic Operations

* An atomic operation either fully executes or fully fails without being interrupted by other threads.
* In Java, atomic classes use underlying hardware instructions to implement these atomic operations.
* Atomic operations ensure data consistency in a multi-threaded environment, ensuring that modifications to shared variables are not interrupted by other threads.

### CAS (Compare-And-Swap)

CAS is a common atomic operation:

1. **Compare**: CAS reads the value of a variable and compares it to an expected value.
2. **Swap**: If the value in memory is equal to the expected value, it is updated with a new value; if not, it means the value has been modified by another thread, and no operation is performed.

CAS operations are typically hardware-supported, providing efficient concurrency control at the CPU level. Java’s atomic classes internally use CAS to ensure atomicity.

### Atomic Wrapper Classes

These classes provide atomic operations on primitive data types, such as `int`, `long`, `boolean`, etc., supporting atomic addition, subtraction, setting, and getting operations.

* **AtomicInteger**: Atomic operations on `int` type.
* **AtomicLong**: Atomic operations on `long` type.
* **AtomicBoolean**: Atomic operations on `boolean` type.
* **AtomicReference< T >**: Atomic operations on object references (e.g., `T`), using CAS to ensure atomicity.
* **AtomicStampedReference< T >**: Atomic reference supporting a `stamp` (version tag) mechanism to prevent the ABA problem.
* **AtomicMarkableReference< T >**: Atomic reference with a boolean marker, also preventing the ABA problem.

#### Example: Using Atomic Classes

```java
public class Atomic {
    public static void main(String[] args) {
        // Create an atomic reference
        AtomicInteger atomicInteger = new AtomicInteger(0);

        // Get current value
        int value = atomicInteger.get();
        System.out.println("value = " + value); // value = 0

        // Set current value
        atomicInteger.set(9);
        value = atomicInteger.get();
        System.out.println("value = " + value); // value = 9

        // Get current value and set a new one
        int andSet = atomicInteger.getAndSet(18);
        System.out.println("oldValue = " + andSet); // oldValue = 9
        System.out.println("value = " + atomicInteger.get());   // value = 18

        // Increment/Decrement
        value = atomicInteger.incrementAndGet();    
        System.out.println("value = " + value); // value = 19
        value = atomicInteger.decrementAndGet();
        System.out.println("value = " + value); // value = 18

        // Add/Subtract a number
        value = atomicInteger.addAndGet(3);
        System.out.println("value = " + value); // value = 21

        // Compare and replace
        boolean compared = atomicInteger.compareAndSet(9, 1);
        System.out.println("compared = " + compared);   // compared = false
    }
}
```

```java
public class Atomic {
    public static void main(String[] args) {
        // Can be any type of wrapper class
        AtomicReference<String> atomicReference = new AtomicReference<>("Mercedes");
        System.out.println("atomicReference = " + atomicReference.get());

        atomicReference.set("BMW");
        System.out.println("atomicReference = " + atomicReference.get());

        String stringValue = atomicReference.getAndSet("Audi");
        System.out.println("stringValue = " + stringValue);
        System.out.println("atomicReference = " + atomicReference.get());

        // AtomicMarkableReference
        AtomicMarkableReference<String> atomicMarkableReference = new AtomicMarkableReference<>("Mercedes", true);
        System.out.println("atomicMarkableReference = " + atomicMarkableReference.getReference());
        System.out.println("mark = " + atomicMarkableReference.isMarked());

        atomicMarkableReference.set("BMW", false);
        System.out.println("atomicMarkableReference = " + atomicMarkableReference.getReference());
        System.out.println("mark = " + atomicMarkableReference.isMarked());

        boolean compareAndSet = atomicMarkableReference.weakCompareAndSet("BMW", "Audi", true, false);
        System.out.println("compareAndSet = " + compareAndSet);
        System.out.println("atomicMarkableReference = " + atomicMarkableReference.getReference());
        System.out.println("mark = " + atomicMarkableReference.isMarked());

        atomicMarkableReference.attemptMark("BMW", true);
        System.out.println("atomicMarkableReference = " + atomicMarkableReference.getReference());
        System.out.println("mark = " + atomicMarkableReference.isMarked());
    }
}
```

### Atomic Arrays

Atomic classes provide thread-safe operations on arrays.

```java
public class Atomic {
    public static void main(String[] args) {
        // Create an atomic array with length 10
        AtomicIntegerArray atomicIntegerArray = new AtomicIntegerArray(10);

        // Set array elements
        atomicIntegerArray.set(0, 3);
        atomicIntegerArray.set(1, 4);
        atomicIntegerArray.set(3, 5);
        atomicIntegerArray.set(6, 6);

        // Get array and array elements
        System.out.println(atomicIntegerArray);
        System.out.println(atomicIntegerArray.get(0));
        System.out.println(atomicIntegerArray.get(1));

        // Increment an element
        atomicIntegerArray.addAndGet(1, 10);
        System.out.println(atomicIntegerArray.get(1));

        // Compare and swap
        boolean compared = atomicIntegerArray.compareAndSet(3, 3, 100);
        System.out.println(compared);
        System.out.println(atomicIntegerArray.get(3));
    }
}
```

### Field Updaters

`AtomicReferenceFieldUpdater` is used for atomic updates to specific fields of an object.

```java
public class Atomic {
    public static void main(String[] args) {
        Computer computer = new Computer();

        // Create an atomic field updater
        AtomicReferenceFieldUpdater<Computer, String> updater = 
            AtomicReferenceFieldUpdater.newUpdater(Computer.class, String.class, "cpu");

        System.out.println(computer.cpu);

        updater.compareAndSet(computer, "i9-14900k", "i7-14700k");
        System.out.println(computer.cpu);
    }

    static class Computer {
        volatile String cpu = "i9-14900k";
    }
}
```

### Accumulators

`LongAdder` and `DoubleAdder` are classes designed for high concurrency, providing more efficient accumulation than `AtomicLong`. They reduce contention under high concurrency by using segmentation (striping).

* **LongAdder**: Used for `long` type addition.
* **DoubleAdder**: Used for `double` type addition.

These classes are suitable for high-concurrency scenarios, especially when frequently performing accumulation operations on shared variables.

```java
public class Atomic {
    public static void main(String[] args) {
        LongAdder adder = new LongAdder();
        
        // Accumulation operation
        adder.add(10);
        adder.add(20);
        
        System.out.println("Sum: " + adder.sum());  // Output 30
    }
}
```

---

## Synchronizers

Synchronizers are used to coordinate the execution order and shared resource access among multiple threads. They are typically used to control synchronization and communication between threads, ensuring that data can be shared safely or tasks executed properly in a concurrent environment.

### CountDownLatch (Countdown Timer)

`CountDownLatch` is a synchronization tool that controls multiple threads' execution until all threads complete certain tasks, after which the main thread proceeds. It requires an integer parameter indicating the number of threads to wait for.

**Usage**: It is often used when waiting for multiple threads to complete their tasks before proceeding with some operations. For example, waiting for multiple threads to finish their work before consolidating results.

**How it works**: `CountDownLatch` maintains a counter, initially set to the number of threads. Each time a thread finishes its task, the counter is decremented. Once the counter reaches zero, waiting threads are awakened to continue execution.

```java
public class CountDownLatchTest {
    public static void main(String[] args) {
        // Create a CountDownLatch with an initial counter value of 3
        CountDownLatch countDownLatch = new CountDownLatch(3);

        // Start 3 threads, each will call countDownLatch
        for (int i = 0; i < 3; i++) {
            new Thread(new MyThread(countDownLatch), "Worker-" + i).start();
        }

        // Main thread waits until latch counter reaches 0
        System.out.println("Main thread waiting for other threads to complete...");
        try {
            // Block until counter reaches 0
            countDownLatch.await();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        System.out.println("All threads have completed, main thread continues...");
    }

    // Simulate a thread operation
    static class MyThread extends Thread {
        private
```


final CountDownLatch countDownLatch;

```
    public MyThread(CountDownLatch countDownLatch) {
        this.countDownLatch = countDownLatch;
    }

    @Override
    public void run() {
        try {
            System.out.println(Thread.currentThread().getName() + " starting task...");
            // Simulate task delay
            Thread.sleep((int) (Math.random() * 1000) + 500);
            System.out.println(Thread.currentThread().getName() + " task completed.");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        } finally {
            // Each task calls countDown when finished
            countDownLatch.countDown();
        }
    }
}
```

}

````

### CyclicBarrier (Cyclic Barrier)

`CyclicBarrier` is used to make a group of threads wait at a common barrier point until all threads reach that point. Unlike `CountDownLatch`, `CyclicBarrier` allows threads to reuse the same barrier multiple times, making it suitable for repeated use.

**Usage**: When multiple threads must perform a task together, `CyclicBarrier` can be used to synchronize them. It's commonly used in parallel computations where multiple sub-tasks must complete before the results can be merged.

**How it works**: A `CyclicBarrier` is initialized with a counter (i.e., the number of threads). Each thread calls the `await()` method to wait. Once all threads reach the barrier, they are released to continue execution.

```java
public class CyclicBarrierTest {
    public static void main(String[] args) {
        // Set the barrier for 5 threads to reach before continuing
        CyclicBarrier cyclicBarrier = new CyclicBarrier(5);

        // Assume there are 3 threads; they will not continue until all 5 threads reach the barrier
        for (int i = 0; i < 3; i++) {
            new Thread(new Mythread(cyclicBarrier)).start();
        }
    }

    static class Mythread extends Thread {
        private final CyclicBarrier cyclicBarrier;

        public Mythread(CyclicBarrier cyclicBarrier) {
            this.cyclicBarrier = cyclicBarrier;
        }

        @Override
        public void run() {
            try {
                // Simulate task execution
                Thread.sleep((int) (Math.random() * 1000) + 500);
                System.out.println(Thread.currentThread().getName() + " task completed, ready to reach barrier...");

                // Thread reaches the barrier
                cyclicBarrier.await();

                // After barrier is triggered, continue with the remaining task
                System.out.println(Thread.currentThread().getName() + " continues with remaining tasks...");
            } catch (Exception e) {
                Thread.currentThread().interrupt();
            }
        }
    }
}
````

### Semaphore (Semaphore)

`Semaphore` is a synchronization tool that controls the number of threads accessing a shared resource. It uses a counter to limit the number of threads that can access the resource concurrently.

**Usage**: Semaphore is used to limit the number of threads accessing a specific resource, such as controlling thread pool sizes or database connection pools.

**How it works**: When initialized, a `Semaphore` is assigned a counter (typically representing the number of available resources). Every `acquire()` operation decreases the counter, indicating that a thread has taken a resource. Every `release()` operation increases the counter, indicating that a resource has been released.

---
