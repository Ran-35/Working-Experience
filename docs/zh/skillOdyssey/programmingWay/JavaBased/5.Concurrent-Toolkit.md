# 并发工具包（Java Concurrent Utilities）

Java并发工具包（`java.util.concurrent`，简称 JUC）是Java 5.0引入的一组强大的并发编程工具类，提供了比传统的 `synchronized` 和 `wait()/notify()` 更高级的并发控制机制。

## 原子类（Atomic Classes）

原子类提供了高效、无锁的线程安全操作，用于在多线程环境中以原子操作的方式对变量进行读写，避免了传统的同步（`synchronized`）机制的开销，同时提供了更高的性能。

### 原子操作

* 要么完全执行，要么完全不执行，不会被其他线程中断。
* Java 中的原子类使用底层的硬件指令来实现这些原子操作。
* 在多线程环境下，原子操作可以保证数据一致性，确保共享变量的修改不会被其他线程打断。

### CAS（Compare-And-Swap）

CAS 是一种非常常见的原子操作：

1. **比较**：CAS 读取一个变量的值，并和期望的值进行比较。
2. **交换**：如果内存中的值与预期值相等，就更新为新值；如果不相等，说明值已经被其他线程修改过，则不进行任何操作。

CAS 操作通常是硬件支持的，可以在 CPU 级别进行高效的并发控制。Java 中的原子类都在内部使用 CAS 来确保操作的原子性。

### 原子类型包装类

提供对基本数据类型的原子操作，主要封装了 `int`、`long`、`boolean` 等数据类型，支持原子加减、设置、获取等操作。

* **AtomicInteger**：对 `int` 类型的原子操作。
* **AtomicLong**：对 `long` 类型的原子操作。
* **AtomicBoolean**：对 `boolean` 类型的原子操作。
* **AtomicReference< T >**：对对象引用（例如 `T`）的原子操作，使用 CAS 保证原子性。
* **AtomicStampedReference< T >**：支持 `stamp`（版本标记）机制的原子引用，防止 ABA 问题。
* **AtomicMarkableReference< T >**：支持布尔标记的原子引用，也可以避免 ABA 问题。

#### 示例：原子类的使用

```java
public class Atomic {
    public static void main(String[] args) {
        // 创建原子引用
        AtomicInteger atomicInteger = new AtomicInteger(0);

        // 返回当前值
        int value = atomicInteger.get();
        System.out.println("value = " + value); // value = 0

        // 设置当前值
        atomicInteger.set(9);
        value = atomicInteger.get();
        System.out.println("value = " + value); // value = 9

        // 获取当前值并设置新值
        int andSet = atomicInteger.getAndSet(18);
        System.out.println("oldValue = " + andSet); // oldValue = 9
        System.out.println("value = " + atomicInteger.get());   // value = 18

        // 自增/自减
        value = atomicInteger.incrementAndGet();    
        System.out.println("value = " + value); // value = 19
        value = atomicInteger.decrementAndGet();
        System.out.println("value = " + value); // value = 18

        // 加/减 一个数
        value = atomicInteger.addAndGet(3);
        System.out.println("value = " + value); // value = 21

        // 比较并替换
        boolean compared = atomicInteger.compareAndSet(9, 1);
        System.out.println("compared = " + compared);   // compared = false
    }
}
```

```java
public class Atomic {
    public static void main(String[] args) {
        // 可以是任何类型的包装类
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

### 原子数组

通过原子类对数组进行线程安全的操作。

```java
public class Atomic {
    public static void main(String[] args) {
        // 创建长度为10的原子数组
        AtomicIntegerArray atomicIntegerArray = new AtomicIntegerArray(10);

        // 设置数组元素
        atomicIntegerArray.set(0, 3);
        atomicIntegerArray.set(1, 4);
        atomicIntegerArray.set(3, 5);
        atomicIntegerArray.set(6, 6);

        // 获取数组及数组元素
        System.out.println(atomicIntegerArray);
        System.out.println(atomicIntegerArray.get(0));
        System.out.println(atomicIntegerArray.get(1));

        // 增加元素
        atomicIntegerArray.addAndGet(1, 10);
        System.out.println(atomicIntegerArray.get(1));

        // 比较并交换
        boolean compared = atomicIntegerArray.compareAndSet(3, 3, 100);
        System.out.println(compared);
        System.out.println(atomicIntegerArray.get(3));
    }
}
```

### 字段更新器

`AtomicReferenceFieldUpdater` 用于对对象的特定字段进行原子更新。

```java
public class Atomic {
    public static void main(String[] args) {
        Computer computer = new Computer();

        // 创建一个原子更新器
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

### 累加器

LongAdder 和 DoubleAdder 是专为高并发设计的类，提供了比 `AtomicLong` 更高效的并发累加方式。它们通过分段（striping）来减少高并发下的争用。

* **LongAdder**：用于 `long` 类型的加法。
* **DoubleAdder**：用于 `double` 类型的加法。

这些类适用于高并发场景，尤其是需要频繁对共享变量进行累加操作时。

```java
public class Atomic {
    public static void main(String[] args) {
        LongAdder adder = new LongAdder();
        
        // 累加操作
        adder.add(10);
        adder.add(20);
        
        System.out.println("Sum: " + adder.sum());  // 输出 30
    }
}
```

---

## 同步器（Synchronizer）

同步器用于协调多个线程之间的执行顺序和共享资源访问。它通常用于控制线程间的同步与通信，使线程能够在并发环境中安全地共享数据或执行任务。

### CountDownLatch（计数器倒计时）

`CountDownLatch` 是一种同步工具，用于将多个线程的执行控制在某个点，直到所有线程都完成某些任务才继续执行后续操作，其构造函数需要一个整数参数，表示需要等待的线程数量。

**用途**：通常用于等待多个线程完成各自的任务后再继续执行某个操作。例如，等待多个线程处理完任务后进行结果汇总。

**工作原理**：`CountDownLatch` 维护一个计数器，初始值为线程数量。每当一个线程完成任务时，计数器减一。当计数器值为零时，等待的线程会被唤醒继续执行。

```java
public class CountDownLatchTest {
    public static void main(String[] args) {
        // 创建一个 CountDownLatch，计数器初始值为 3
        CountDownLatch countDownLatch = new CountDownLatch(3);

        // 启动 3 个线程，每个线程都会调用 countDownLatch
        for (int i = 0 ; i < 3; i++) {
			new Thread(new MyThread(countDownLatch), "Worker-" + i).start();
		}

		// 主线程等待，直到 latch 计数器为 0
		System.out.println("主线程等待其他线程完成...");
		try {
			// 阻塞，直到计数器变为 0
			countDownLatch.await();
		} catch (InterruptedException e) {
			throw new RuntimeException(e);
		}
		System.out.println("所有线程已完成，主线程继续执行后续任务...");
	}

	// 模拟一个线程内部的操作
	static class MyThread extends Thread {
		private final CountDownLatch countDownLatch;

		public MyThread(CountDownLatch countDownLatch) {
			this.countDownLatch = countDownLatch;
		}

		@Override
		public void run() {
			try {
				System.out.println(Thread.currentThread().getName() + " 开始执行任务...");
				// 模拟任务执行的延时
				Thread.sleep((int)(Math.random() * 1000) + 500);
				System.out.println(Thread.currentThread().getName() + " 执行完成.");
			} catch (InterruptedException e) {
				Thread.currentThread().interrupt();
			} finally {
				// 每执行完一个任务，调用 countDown() 方法
				countDownLatch.countDown();
			}
		}
	}
}

````

### CyclicBarrier（循环栅栏）

`CyclicBarrier` 用于使一组线程在某个公共屏障点上等待，直到所有线程都到达该屏障点。与 `CountDownLatch` 不同，`CyclicBarrier` 允许线程在同一屏障点循环多次，适用于反复使用的场景。

**用途**：当一组线程必须一起执行某个操作时，可以使用 `CyclicBarrier` 来同步它们，适合用于并行计算中，多个子任务完成后合并结果。

**工作原理**：`CyclicBarrier` 创建时指定一个屏障点计数器（即线程数）。每个线程调用 `await()` 方法进入等待，直到所有线程都到达该屏障点时，所有线程会被唤醒并继续执行。

```java
public class CyclicBarrierTest {
    public static void main(String[] args) {
        // 设定屏障需要 5 个线程到达才能继续
        CyclicBarrier cyclicBarrier = new CyclicBarrier(5);

        // 假定有 3 个线程，此时还不会继续执行
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
                // 模拟任务执行
                Thread.sleep((int) (Math.random() * 1000) + 500);
                System.out.println(Thread.currentThread().getName() + " 已完成任务，准备到达屏障...");

                // 线程到达屏障
                cyclicBarrier.await();

                // 屏障被触发后继续执行的操作
                System.out.println(Thread.currentThread().getName() + " 继续执行后续任务...");
            } catch (Exception e) {
                Thread.currentThread().interrupt();
            }
        }
    }
}
````

### Semaphore（信号量）

`Semaphore` 是一种用于控制多个线程访问共享资源的同步工具。它通过维护一个计数器来限制同时访问资源的线程数。

**用途**：用于限制同时访问某个资源的线程数，适合用于控制线程池大小、数据库连接池等场景。

**工作原理**：`Semaphore` 初始化时指定一个计数器（通常是资源数）。每次 `acquire()` 操作会使计数器减一，表示一个线程获取了资源。`release()` 操作会使计数器加一，表示资源被释放。

---