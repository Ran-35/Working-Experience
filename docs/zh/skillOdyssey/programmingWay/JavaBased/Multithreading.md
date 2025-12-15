# 多线程
同时执行多个线程（程序的最小执行单元）以提高程序的并行性和性能。

## 基本概念
**线程**：一个正在执行的程序。  
**进程**：进程内的一个执行单元。  

**线程的生命周期：**  
**新建状态（New）：**线程被创建后，尚未启动。

**就绪状态（Runnable）：**线程准备好执行，但操作系统尚未调度执行。

**运行状态（Running）：**线程正在执行任务。

**阻塞状态（Blocked）：**线程被阻塞，等待某个条件满足（如 I/O 操作）。

**终止状态（Terminated）：**线程的执行完成或被中止，生命周期结束。

## 多线程的实现
### 1. 继承 Thread 类
创建一个继承 Thread 类的子类，并覆盖 Thread 类的 run() 方法，将线程任务放在 run() 方法中。  
**常用方法：**  
 
**start()：**启动线程，调用 start() 方法会使线程进入就绪状态（待 CPU 调度）。  
**run()：**定义线程的任务，是线程执行时调用的方法。在继承 Thread 类时，我们需要覆盖 run() 方法来定义线程执行的内容。  
**sleep(long millis)：**使当前线程暂停指定的时间（毫秒）。  
**join()：**等待当前线程执行结束，当前线程会等待调用它的线程执行完成后再继续执行。  
**setPriority(int priority)：**设置线程的优先级。  
**getName()：**获取线程的名字。

**使用步骤：**  
 **1. 创建一个线程类，继承 Thread 类**  
 **2. 重写 run() 方法，编写线程要执行的任务**  
 **3. 创建一个线程对象，并启动线程**  
 **4. 调用start() 方法启动线程**  
 **5. 创建多个线程对象，并启动线程**

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

 ### 2. 实现 Runnable 接口
创建一个实现 Runnable 接口的类，并实现接口的 run() 方法，将线程任务放在 run() 方法中。  

**使用步骤：**  
 **1. 创建一个线程类，实现 Runnable 接口**  
 **2. 实现 run() 方法，定义线程要执行的任务**  
 **3. 创建 Thread 对象，并将 Runnable 对象作为参数传入 Thread 的构造函数**  
 **4. 调用start() 方法启动线程**  
 **5. 创建多个线程对象，并启动线程**

 ```java 
 // 创建线程类，实现 Runnable 接口
class MyRunnable implements Runnable {
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

// 主程序创建 Thread 对象，并将 Runnable 对象作为参数传入 Thread 的构造函数
public class Main6 {
    public static void main(String[] args) {
        MyRunnable myRunnable = new MyRunnable();
        Thread t1 = new Thread(myRunnable);
        t1.start();

        Thread t2 = new Thread(myRunnable);
        t2.start();
    }
}
 ```
 | 特性        | 继承 `Thread` 类          | 实现 `Runnable` 接口      |
| --------- | ---------------------- | --------------------- |
| **继承**    | 只能继承 `Thread` 类（单继承限制） | 可以继承其他类，并且可以实现多个接口    |
| **任务和线程** | 任务和线程绑定在同一个类中          | 任务和线程分离，任务可以由多个线程共享   |
| **性能**    | 性能没有本质差异，适用于简单的场景      | 性能稍好，适用于线程池等高级多线程管理场景 |
| **线程池**   | 不适合与线程池配合使用            | 与线程池配合使用更为方便，适合高并发场景  |
| **灵活性**   | 线程的任务与线程绑定，不太灵活        | 灵活，任务与线程可以解耦，多个线程共享任务 |



 ### 3. 实现 Callable 接口 + Future 接口
Callable 和 Future 接口是用于执行并获取异步任务结果的工具，它们主要用于与线程池（ExecutorService）结合使用，比 Runnable 和 Thread 更强大。  

**常用方法：**  

Callable：  
**call()：**执行任务的方法。call() 方法会返回任务的执行结果。与run()相比，可以抛出异常  

Future：  
**cancel()：**取消任务执行  
**get()：**获取任务执行结果  
**get(long timeout, TimeUnit unit)：**指定时间内任务没有完成，会抛出 TimeoutException。  
**isDone()：**判断任务是否完成  
**isCancelled()**判断任务是否被取消  



**使用步骤：**  
 **1. 创创建实现 Callable 接口的任务类，并实现 call() 方法，定义任务要执行的逻辑**  
 **2. 使用 ExecutorService 提交 Callable 任务**  
 **3. 通过 Future 对象获取任务的执行结果或状态**  

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



 ### 4. 使用 Executor 框架
Executor 框架是 Java 5 引入的一个高效的多线程管理机制。它提供了更高层次的线程池管理，通过线程池来管理线程的生命周期，避免了手动创建和销毁线程的麻烦。  

**使用步骤：**  
 **1. 使用 ExecutorService 创建线程池。**  
 **2. 提交任务（Runnable 或 Callable）到线程池。**  
 **3. 管理线程池的生命周期，如关闭线程池等。**  

 ```java 
 // 创建线程类，实现 Callable 接口
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName() + " is running");
    }
}

public class Main6 {
    
    public static void main(String[] args) {
        ExecutorService executorService = Executors.newFixedThreadPool(2);  // 创建线程池
        
        executorService.submit(new MyRunnable());  // 提交任务
        executorService.submit(new MyRunnable());
        
        executorService.shutdown();  // 关闭线程池
    }
}
```

### 5.使用 CompletableFuture
CompletableFuture 是 Java 8 引入的一个异步编程工具，可以简化多线程任务的组合与管理。其实现了 Future 接口，并扩展了其功能。与传统的 Future 不同，CompletableFuture 支持 非阻塞的任务执行 和 回调函数链式调用，使得它能够以异步的方式执行任务，并且能在任务完成时得到通知或执行其他操作。

**特点：**  
**支持异步编程：**允许你以非阻塞的方式执行任务，避免了传统 Future 阻塞等待任务完成的方式    
**支持回调函数：**可以为任务完成后指定的操作（如处理任务结果、错误处理等）添加回调函数   
**任务组合：**通过多种方法组合多个异步任务，可以实现任务的并行执行  


**使用步骤：**  

 **1. 创建 CompletableFuture 对象。**  
 **2. 提交异步任务。**  
 **3. 使用 thenApply(), thenAccept(), thenCompose() 等方法对结果进行处理。**

**创建 CompletableFuture 对象：**    

 **1. supplyAsync()：** 接受一个 Supplier < T > 函数，返回一个异步计算的结果。它会在后台线程中异步执行。  
 ``` java
public class Main6 {
    public static void main(String[] args) {
        supplyAsync();
    }
    static void supplyAsync() {
        // 创建一个异步任务
        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> "hello, world!");
        // 获取异步计算结果
        future.thenAccept(System.out::println);
    }
}
```

 **2. runAsync()：**  接受一个 Runnable 函数，它不会返回任何结果，适用于执行一些没有返回值的任务。  
 ``` java
public class Main6 {
    public static void main(String[] args) {
        runAsync();
    }

    static void runAsync() {
        CompletableFuture.runAsync(() -> {
            System.out.println("hello, world!");
        });
    }
}
```
 **3. 手动创建 CompletableFuture：**使用 complete() 方法，可以直接设置任务的结果。
```java
public class Main6 {
    public static void main(String[] args) {
        complete();
    }

    static void complete(){
        CompletableFuture<String> future = new CompletableFuture<>();
        future.complete("Hello World");
        future.thenAccept(System.out::println);
    }
}
```


**常用方法：**  
**thenApply()：** 接受一个 Function<T, U> 函数，将任务的返回结果传递给下一个处理逻辑，并返回一个新的 CompletableFuture。
```java
public class Main6 {
    public static void main(String[] args) {
        thenApply();    // 输出：10
    }
    static void thenApply() {
        // 创建一个CompletableFuture
        CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> 5);
        // future 使用thenApply方法
        CompletableFuture<Integer> futureNew = future.thenApply(value -> value * 2);
        futureNew.thenAccept(System.out::println);
    }
}
```
**thenAccept()：** 接受一个 Consumer< T > 函数，它在任务完成后执行，但不返回结果。常用于打印或执行一些副作用操作。  
```java
public class Main6 {
    public static void main(String[] args) {
        thenAccept();   // 输出：Result: 10
    }

    static void thenAccept(){
        // 直接输出
        CompletableFuture.supplyAsync(() -> 10)
                .thenAccept(result -> System.out.println("Result: " + result));
    }
}
```
**thenRun()：** 接受一个 Runnable 函数，它会在任务完成后执行，但不会接收任务的结果。
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
**thenCombine()：** 组合两个独立的异步计算，它接受另一个 CompletableFuture，并将两个结果传递给一个合并函数。   
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
**thenCompose()：** 处理依赖于另一个异步任务结果的任务。它接收一个 Function<T, CompletableFuture< U >> 类型的函数，并返回一个新的 CompletableFuture< U >。  
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
**exceptionally()：** 用于处理任务执行中的异常。如果任务发生异常，它将执行提供的 Function<Throwable, T> 函数。  
```java
public class Main6 {
    public static void main(String[] args) {
        exceptionally();
    }

    static void exceptionally() {
        CompletableFuture.supplyAsync(() -> {
            throw new RuntimeException("Something went wrong");
        }).exceptionally(ex -> {
            System.out.println("Error: " + ex.getMessage());
            return -1;
        }).thenAccept(System.out::println);
    }
}
```
**whenComplete()：** 在任务完成时（无论成功还是失败）执行一些操作。它接收一个 BiConsumer<T, Throwable>，第一个参数是任务的结果，第二个是异常（如果有的话）。  
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
**join()：** 获取任务的执行结果，与 get() 方法类似，但它不会抛出 checked 异常，而是抛出一个CompletionException。  
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
**allOf()：** 组合多个 CompletableFuture，并等待它们都完成。它返回一个新的 CompletableFuture< Void >，表示所有任务完成。  
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
**anyOf()：** 组合多个 CompletableFuture，并等待它们都完成。它返回一个新的 CompletableFuture< Void >，表示所有任务完成。  
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