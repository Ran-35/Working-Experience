### 多线程（Thread）

多线程可以通过同时执行多个线程来提高程序的并行性和性能。线程是程序执行的基本单元，而进程包含多个线程。在 Java 中，有多种方式实现线程，可以根据实际需求选择最合适的方式。

---

### 1. 基本概念

* **线程**：一个正在执行的程序。
* **进程**：进程内的多个线程构成了一个执行单元。

#### 线程生命周期

* **新建状态（New）**：线程被创建，但尚未启动。
* **就绪状态（Runnable）**：线程准备好执行，操作系统尚未调度执行。
* **运行状态（Running）**：线程正在执行任务。
* **阻塞状态（Blocked）**：线程由于某些条件（如 I/O 操作）被阻塞，等待某个条件满足。
* **终止状态（Terminated）**：线程执行完毕或被终止。

---

### 2. 多线程的实现

#### 2.1 继承 `Thread` 类

创建一个继承 `Thread` 类的子类，并重写 `run()` 方法，将线程任务放在 `run()` 方法中。

**常用方法：**

* **start()**：启动线程，调用 `start()` 后线程进入就绪状态（待 CPU 调度）。
* **run()**：线程执行的任务，`run()` 方法需要被重写。
* **sleep(long millis)**：使线程暂停指定的时间（毫秒）。
* **join()**：等待线程执行完毕，当前线程会等待调用它的线程执行完成后再继续执行。
* **setPriority(int priority)**：设置线程优先级。
* **getName()**：获取线程名称。

**使用步骤：**

1. 创建一个继承 `Thread` 类的线程类。
2. 重写 `run()` 方法定义线程任务。
3. 创建线程对象，并启动线程。
4. 调用start() 方法启动线程。
5. 创建多个线程对象，并启动线程。

 ```java 
 // 创建线程类，继承Thread类
 class Mythread extends Thread {
    // 重新run方法，编写线程要执行的任务
    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println(Thread.currentThread().getName());
            System.out.println(Thread.currentThread().getState());
            System.out.println(Thread.currentThread().getId());
            System.out.println("i = " + i);
            System.out.println();
        }
    }
}

// 主程序创建线程对象，启动线程
public class Main6 {
    public static void main(String[] args) {
        Thread t1 = new Mythread();
        t1.start();

        Thread t2 = new Mythread();
        t2.start();

        // 不能为run()，否则当前线程对象始终为main
    //    t1.run();
    }
}
 ```

---

#### 2.2 实现 `Runnable` 接口

与继承 `Thread` 类不同，`Runnable` 接口提供了更大的灵活性。实现 `Runnable` 接口的类并重写 `run()` 方法。通过 `Thread` 类的构造方法，将 `Runnable` 对象传入，启动线程。

**使用步骤：**

1. 创建一个实现 `Runnable` 接口的线程类。
2. 实现 `run()` 方法定义线程任务。
3. 创建 `Thread` 对象，并将 `Runnable` 对象作为参数传入。
4. 调用 `start()` 启动线程。

```java
class MyRunnable implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println(Thread.currentThread().getName());
            System.out.println("i = " + i);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        MyRunnable myRunnable = new MyRunnable();
        Thread t1 = new Thread(myRunnable);
        t1.start();

        Thread t2 = new Thread(myRunnable);
        t2.start();
    }
}
```

| 特性        | 继承 `Thread` 类          | 实现 `Runnable` 接口    |
| --------- | ---------------------- | ------------------- |
| **继承**    | 只能继承 `Thread` 类（单继承限制） | 可以继承其他类，并且可以实现多个接口  |
| **任务和线程** | 任务和线程绑定在同一个类中          | 任务和线程分离，任务可以由多个线程共享 |
| **性能**    | 适用于简单场景                | 性能稍好，适用于线程池等场景      |
| **线程池**   | 不适合与线程池配合使用            | 与线程池配合使用更为方便，适合高并发场景        |
| **灵活性**   | 不太灵活                   | 任务和线程可以解耦，多个线程共享任务  |

---

#### 2.3 实现 `Callable` 接口 + `Future` 接口

`Callable` 和 `Future` 接口常与线程池（`ExecutorService`）结合使用，它们提供了比 `Runnable` 更强大的功能，特别是在任务有返回值的场景。

**常用方法：**

* **call()**：`Callable` 的任务方法，与 `run()` 不同，`call()` 能返回值。
* **cancel()**：取消任务执行。
* **get()**：获取任务的执行结果。
* **get(long timeout, TimeUnit unit)**：指定时间内未完成会抛出 `TimeoutException`。
* **isDone()**：判断任务是否完成。
* **isCancelled()**：判断任务是否被取消。

**使用步骤：**

1. 创建一个实现 `Callable` 接口的任务类。
2. 使用 `ExecutorService` 提交 `Callable` 任务。
3. 通过 `Future` 对象获取任务的执行结果或状态。

```java 
 // 创建线程类，实现 Callable 接口
class FactorialTask implements Callable<Long> {
    private long n;

    public FactorialTask(long n) {
        this.n = n;
    }

    // 实现 call() 方法
    @Override
    public Long call() {
        long result = 1;
        for (long i = 1; i <= n; i++) {
            result *= i;
        }
        return result;
    }
}

public class Main6 {
    public static void main(String[] args) {
        // 创建一个线程池
        ExecutorService executor = Executors.newFixedThreadPool(5);

        // 创建任务
        FactorialTask task1 = new FactorialTask(5);
        FactorialTask task2 = new FactorialTask(10);

        // 提交任务获取Future对象
        Future<Long> future1 = executor.submit(task1);
        Future<Long> future2 = executor.submit(task2);

        // 获取任务结果
        try {
            long result1 = future1.get();
            long result2 = future2.get();

            System.out.println("Result1: " + result1);
            System.out.println("Result2: " + result2);
        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
```

---

#### 2.4 使用 `Executor` 框架

`Executor` 框架通过线程池来管理线程，避免了直接创建和销毁线程的麻烦。`ExecutorService` 提供了更高效的线程管理。

**使用步骤：**

1. 创建 `ExecutorService` 线程池。
2. 提交任务（`Runnable` 或 `Callable`）到线程池。
3. 管理线程池的生命周期，如关闭线程池等。

```java
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName() + " is running");
    }
}

public class Main {
    public static void main(String[] args) {
        ExecutorService executorService = Executors.newFixedThreadPool(2);  // 创建线程池
        
        executorService.submit(new MyRunnable());  // 提交任务
        executorService.submit(new MyRunnable());
        
        executorService.shutdown();  // 关闭线程池
    }
}
```

---

#### 2.5 使用 `CompletableFuture`

`CompletableFuture` 是 Java 8 引入的异步编程工具，可以简化多线程任务的组合与管理，支持回调、非阻塞执行等功能。它可以与 `Future` 结合使用，但提供了更多的功能，适合复杂的异步任务处理。

**常用方法：**

* **supplyAsync()**：异步执行一个 `Supplier`。
* **runAsync()**：异步执行一个 `Runnable`。
* **thenApply()**：任务完成后对结果进行处理。
* **thenAccept()**：任务完成后执行副作用操作。
* **exceptionally()**：处理任务中的异常。
* **allOf()**：等待所有任务完成。
* **anyOf()**：等待任何一个任务完成。

**使用步骤：**

1. 创建 `CompletableFuture` 对象。
2. 提交异步任务。
3. 使用 `thenApply()`, `thenAccept()`, `thenCompose()` 等方法对结果进行处理。

* **thenAccept()：** 接受一个 Consumer< T > 函数，它在任务完成后执行，但不返回结果。常用于打印或执行一些副作用操作。  
```java
public class Main {
    public static void main(String[] args) {
        CompletableFuture.supplyAsync(() -> {
            return "Hello, World!";
        }).thenAccept(result -> {
            System.out.println(result);
        });
    }
}
```

* **thenApply()**：对结果进行处理并返回一个新的 `CompletableFuture`。

```java
public class Main {
    public static void main(String[] args) {
        CompletableFuture.supplyAsync(() -> 5)
                .thenApply(result -> result * 2)
                .thenAccept(System.out::println);  // 输出：10
    }
}
```

* **exceptionally()**：处理异常。

```java
public class Main {
    public static void main(String[] args) {
        CompletableFuture.supplyAsync(() -> {
            throw new RuntimeException("Something went wrong");
        }).exceptionally(ex -> {
            System.out.println("Error: " + ex.getMessage());
            return -1;
        }).thenAccept(System.out::println);  // 输出：Error: Something went wrong
    }
}
```

* **thenRun()：** 接受一个 Runnable 函数，它会在任务完成后执行，但不会接收任务的结果。

```java
public class Main6 {
    public static void main(String[] args) {
        thenRun();      // 输出：done
    }

    static void thenRun(){
        CompletableFuture.supplyAsync(() -> 5)
                .thenRun(() -> System.out.println("done"));
    }
}
```  

* **thenCombine()：** 组合两个独立的异步计算，它接受另一个 CompletableFuture，并将两个结果传递给一个合并函数。   

```java
public class Main6 {
    public static void main(String[] args) {
        thenCombine();      // 输出：15
    }

    static void thenCombine(){
        CompletableFuture<Integer> future1 = CompletableFuture.supplyAsync(() -> 5);
        CompletableFuture<Integer> future2 = CompletableFuture.supplyAsync(() -> 10);

        CompletableFuture<Integer> future = future1.thenCombine(future2, (a, b) -> a + b);
        future.thenAccept(System.out::println);
    }
}
```

* **thenCompose()：** 处理依赖于另一个异步任务结果的任务。它接收一个 Function<T, CompletableFuture< U >> 类型的函数，并返回一个新的 CompletableFuture< U >。  

```java
public class Main6 {
    public static void main(String[] args) {
        thenCompose();
    }

    static void thenCompose(){
        CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> 5);
        CompletableFuture<Integer> futureNew = future.thenCompose(a -> CompletableFuture.supplyAsync(() -> a * 2));

        futureNew.thenAccept(System.out::println);
    }
}
```

* **whenComplete()：** 在任务完成时（无论成功还是失败）执行一些操作。它接收一个 BiConsumer<T, Throwable>，第一个参数是任务的结果，第二个是异常（如果有的话）。  

```java
public class Main6 {
    public static void main(String[] args) {
        whenComplete();
    }

    static void whenComplete() {
        CompletableFuture.supplyAsync(() -> 5)
                .whenComplete((result, exception) -> {
                    if (exception == null) {
                        System.out.println("Result: " + result);
                    } else {
                        System.out.println("Error: " + exception);
                    }
                });
    }
}
```

* **join()：** 获取任务的执行结果，与 get() 方法类似，但它不会抛出 checked 异常，而是抛出一个CompletionException。  

```java
public class Main6 {
    public static void main(String[] args) {
        join();
    }

    static void join() {
        Integer result = CompletableFuture.supplyAsync(() -> 10).join();
        System.out.println("Result: " + result);
    }
}
```

* **allOf()：** 组合多个 CompletableFuture，并等待它们都完成。它返回一个新的 CompletableFuture< Void >，表示所有任务完成。  

```java
public class Main6 {
    public static void main(String[] args) {
        allOf();       // 输出：All tasks completed
    }

    static void allOf() {
        CompletableFuture<Void> allOf = CompletableFuture.allOf(
                CompletableFuture.supplyAsync(() -> 5),
                CompletableFuture.supplyAsync(() -> 10)
        );
        
        allOf.thenRun(() -> System.out.println("All tasks completed"));
    }
}
```

* **anyOf()：** 组合多个 CompletableFuture，并等待它们都完成。它返回一个新的 CompletableFuture< Void >，表示所有任务完成。  

```java
public class Main6 {
    public static void main(String[] args) {
        anyOf();
    }

    static void anyOf() {
        CompletableFuture<Object> anyOf = CompletableFuture.anyOf(
                CompletableFuture.supplyAsync(() -> 5),
                CompletableFuture.supplyAsync(() -> 10)
        );
        anyOf.thenAccept(result -> System.out.println("First completed: " + result));
    }
}
```
---

### 总结

Java 提供了多种实现多线程的方式：通过


继承 `Thread` 类、实现 `Runnable` 接口、使用 `Callable` 接口与 `Future` 接口，或者通过 `Executor` 框架来管理线程池，最后通过 `CompletableFuture` 处理异步任务。每种方法根据任务需求和复杂度有不同的适用场景，可以选择最合适的方式来提高并发性和程序性能。
