### Multithreading (Thread)

Multithreading can improve a program's parallelism and performance by executing multiple threads simultaneously. A thread is the basic unit of program execution, and a process contains multiple threads. In Java, there are various ways to implement threads, and the most suitable method can be chosen based on actual requirements.

---

### 1. Basic Concepts

* **Thread**: A program that is currently executing.
* **Process**: A process consists of multiple threads that form an execution unit.

#### Thread Lifecycle

* **New (New)**: The thread has been created but has not started yet.
* **Runnable (Runnable)**: The thread is ready to execute, but the operating system has not scheduled it yet.
* **Running (Running)**: The thread is executing the task.
* **Blocked (Blocked)**: The thread is blocked due to some condition (such as an I/O operation), waiting for a condition to be met.
* **Terminated (Terminated)**: The thread has completed execution or has been terminated.

---

### 2. Implementing Multithreading

#### 2.1 Inheriting the `Thread` Class

Create a subclass that inherits from the `Thread` class and override the `run()` method to define the thread task within the `run()` method.

**Common Methods:**

* **start()**: Starts the thread. After calling `start()`, the thread enters the runnable state (awaiting CPU scheduling).
* **run()**: The task executed by the thread. The `run()` method needs to be overridden.
* **sleep(long millis)**: Pauses the thread for a specified amount of time (in milliseconds).
* **join()**: Waits for the thread to finish. The current thread will wait until the thread that calls `join()` completes before continuing.
* **setPriority(int priority)**: Sets the thread's priority.
* **getName()**: Retrieves the thread's name.

**Steps to Use:**

1. Create a thread class that inherits from `Thread`.
2. Override the `run()` method to define the thread's task.
3. Create a thread object and start the thread.
4. Call `start()` to initiate the thread.
5. Create multiple thread objects and start them.

```java
// Create a thread class, inherit from Thread
class MyThread extends Thread {
    // Override the run method to define the thread's task
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

// Main program creates thread objects and starts threads
public class Main6 {
    public static void main(String[] args) {
        Thread t1 = new MyThread();
        t1.start();

        Thread t2 = new MyThread();
        t2.start();

        // Do not call run() directly, otherwise, the current thread object will always be main
    //    t1.run();
    }
}
```

---

#### 2.2 Implementing the `Runnable` Interface

Unlike inheriting from the `Thread` class, implementing the `Runnable` interface offers greater flexibility. A class that implements `Runnable` overrides the `run()` method. The `Runnable` object is passed to the `Thread` constructor to start the thread.

**Steps to Use:**

1. Create a class that implements the `Runnable` interface.
2. Implement the `run()` method to define the thread's task.
3. Create a `Thread` object and pass the `Runnable` object as an argument.
4. Call `start()` to start the thread.

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

| Feature             | Inheriting `Thread` Class                                 | Implementing `Runnable` Interface                                                 |
| ------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Inheritance**     | Can only inherit from `Thread` (single inheritance limit) | Can inherit from other classes and implement multiple interfaces                  |
| **Task and Thread** | Task and thread are bound in the same class               | Task and thread are separated, and tasks can be shared by multiple threads        |
| **Performance**     | Suitable for simple scenarios                             | Slightly better performance, suitable for thread pools and high concurrency       |
| **Thread Pool**     | Not suitable for thread pool usage                        | More convenient to use with thread pools, suitable for high concurrency scenarios |
| **Flexibility**     | Not very flexible                                         | Task and thread decoupled, tasks can be shared by multiple threads                |

---

#### 2.3 Implementing `Callable` Interface + `Future` Interface

The `Callable` and `Future` interfaces are commonly used with thread pools (`ExecutorService`). They offer more powerful functionality compared to `Runnable`, especially when tasks return a result.

**Common Methods:**

* **call()**: The task method for `Callable`. Unlike `run()`, `call()` can return a value.
* **cancel()**: Cancels task execution.
* **get()**: Retrieves the task's execution result.
* **get(long timeout, TimeUnit unit)**: Throws `TimeoutException` if the task is not completed within the specified time.
* **isDone()**: Checks if the task is finished.
* **isCancelled()**: Checks if the task was canceled.

**Steps to Use:**

1. Create a class that implements the `Callable` interface.
2. Submit the `Callable` task using `ExecutorService`.
3. Use the `Future` object to retrieve the task's execution result or status.

```java
// Create a thread class, implement the Callable interface
class FactorialTask implements Callable<Long> {
    private long n;

    public FactorialTask(long n) {
        this.n = n;
    }

    // Implement call() method
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
        // Create a thread pool
        ExecutorService executor = Executors.newFixedThreadPool(5);

        // Create tasks
        FactorialTask task1 = new FactorialTask(5);
        FactorialTask task2 = new FactorialTask(10);

        // Submit tasks and get Future objects
        Future<Long> future1 = executor.submit(task1);
        Future<Long> future2 = executor.submit(task2);

        // Get task results
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

#### 2.4 Using the `Executor` Framework

The `Executor` framework manages threads through a thread pool, avoiding the trouble of directly creating and destroying threads. `ExecutorService` offers more efficient thread management.

**Steps to Use:**

1. Create an `ExecutorService` thread pool.
2. Submit tasks (`Runnable` or `Callable`) to the thread pool.
3. Manage the lifecycle of the thread pool, such as shutting it down.

```java
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName() + " is running");
    }
}

public class Main {
    public static void main(String[] args) {
        ExecutorService executorService = Executors.newFixedThreadPool(2);  // Create thread pool
        
        executorService.submit(new MyRunnable());  // Submit task
        executorService.submit(new MyRunnable());
        
        executorService.shutdown();  // Shut down the thread pool
    }
}
```

---

#### 2.5 Using `CompletableFuture`

`CompletableFuture`, introduced in Java 8, is a tool for asynchronous programming. It simplifies the combination and management of multithreaded tasks, supporting callbacks, non-blocking execution, and more. It can be combined with `Future`, but offers additional features suitable for complex asynchronous task handling.

**Common Methods:**

* **supplyAsync()**: Asynchronously executes a `Supplier`.
* **runAsync()**: Asynchronously executes a `Runnable`.
* **thenApply()**: Processes the result once the task is complete.
* **thenAccept()**: Executes a side-effect operation once the task is complete.
* **exceptionally()**: Handles exceptions in the task.
* **allOf()**: Waits for all tasks to complete.
* **anyOf()**: Waits for any one of the tasks to complete.

**Steps to Use:**

1. Create a `CompletableFuture` object.
2. Submit asynchronous tasks.
3. Use methods like `thenApply()`, `thenAccept()`, `thenCompose()` to process the results.

* **thenAccept()**: Accepts a `Consumer<T>` function, which executes after the task completes but does not return a result. Common for printing or performing


side-effect operations.

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

* **thenApply()**: Processes the result and returns a new `CompletableFuture`.

```java
public class Main {
    public static void main(String[] args) {
        CompletableFuture.supplyAsync(() -> 5)
                .thenApply(result -> result * 2)
                .thenAccept(System.out::println);  // Output: 10
    }
}
```

* **exceptionally()**: Handles exceptions.

```java
public class Main {
    public static void main(String[] args) {
        CompletableFuture.supplyAsync(() -> {
            throw new RuntimeException("Something went wrong");
        }).exceptionally(ex -> {
            System.out.println("Error: " + ex.getMessage());
            return -1;
        }).thenAccept(System.out::println);  // Output: Error: Something went wrong
    }
}
```

* **thenRun()**: Accepts a `Runnable` function to execute after the task is complete, but does not receive the result.

```java
public class Main6 {
    public static void main(String[] args) {
        thenRun();      // Output: done
    }

    static void thenRun(){
        CompletableFuture.supplyAsync(() -> 5)
                .thenRun(() -> System.out.println("done"));
    }
}
```

* **thenCombine()**: Combines two independent asynchronous computations and passes both results to a merging function.

```java
public class Main6 {
    public static void main(String[] args) {
        thenCombine();      // Output: 15
    }

    static void thenCombine(){
        CompletableFuture<Integer> future1 = CompletableFuture.supplyAsync(() -> 5);
        CompletableFuture<Integer> future2 = CompletableFuture.supplyAsync(() -> 10);

        CompletableFuture<Integer> future = future1.thenCombine(future2, (a, b) -> a + b);
        future.thenAccept(System.out::println);
    }
}
```

* **thenCompose()**: Handles tasks dependent on the result of another asynchronous task. It takes a function of type `Function<T, CompletableFuture<U>>` and returns a new `CompletableFuture<U>`.

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

* **whenComplete()**: Executes some operation when the task completes (whether successfully or with failure). It takes a `BiConsumer<T, Throwable>`, where the first parameter is the result of the task, and the second is the exception (if any).

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

* **join()**: Retrieves the task result, similar to `get()`, but does not throw checked exceptions; instead, it throws a `CompletionException`.

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

* **allOf()**: Combines multiple `CompletableFuture`s and waits for all of them to complete. It returns a new `CompletableFuture<Void>` indicating all tasks are complete.

```java
public class Main6 {
    public static void main(String[] args) {
        allOf();       // Output: All tasks completed
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

* **anyOf()**: Combines multiple `CompletableFuture`s and waits for any of them to complete. It returns a new `CompletableFuture` indicating the first task that completes.

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

### Summary

Java offers multiple ways to implement multithreading: by inheriting from the `Thread` class, implementing the `Runnable` interface, using the `Callable` and `Future` interfaces, or managing thread pools with the `Executor` framework. Finally, `CompletableFuture` handles asynchronous tasks. Each method has its own application scenario based on the complexity and requirements of the task, and the best approach can be chosen to improve concurrency and program performance.
