# Thread Pool

A thread pool is a mechanism for managing and executing threads. It improves program performance by pre-creating and managing a set of threads, avoiding the overhead of frequently creating and destroying threads.

## Basic Functions

* **Reduce resource consumption**: Reuse created threads, reducing the overhead of thread creation and destruction.
* **Improve response speed**: Tasks can be executed immediately without waiting for thread creation when they arrive.
* **Improve thread manageability**: Provides unified allocation, tuning, and monitoring of threads.
* **Provide additional features**: Supports features such as scheduled execution and periodic execution.

## Core Parameters

```java
public ThreadPoolExecutor(
    int corePoolSize,      // Core thread count: the minimum number of threads the thread pool will keep
    int maximumPoolSize,   // Maximum thread count: the maximum number of threads the thread pool can accommodate
    long keepAliveTime,    // Idle thread lifetime: the time non-core threads will remain idle
    TimeUnit unit,         // Time unit
    BlockingQueue<Runnable> workQueue, // Work queue: a queue to hold tasks
    ThreadFactory threadFactory,       // Thread factory: factory to create threads
    RejectedExecutionHandler handler   // Rejection policy: the strategy used when tasks are rejected
)
```

## Workflow

1. The thread pool is initialized and creates **core threads**.
2. If the number of submitted tasks exceeds the core thread count, tasks are placed in the queue.
3. If the queue is full and the current thread count has not yet reached **maximum threads**, new threads are created to execute tasks.
4. If the queue is full and the current thread count has reached **maximum threads**, the rejection policy is applied.
5. Non-core threads are destroyed if idle for longer than the **keep-alive time**.

```java
public class Main {
    public static void main(String[] args) {
        ThreadPoolExecutor executor = new ThreadPoolExecutor(
                2,  // Core thread count
                5,  // Maximum thread count
                60, // Idle thread lifetime
                TimeUnit.SECONDS,
                new ArrayBlockingQueue<>(10),  // Work queue
                Executors.defaultThreadFactory(),  // Thread factory
                new ThreadPoolExecutor.AbortPolicy()  // Rejection policy
        );

        // Submit tasks
        for (int i = 0; i < 15; i++) {
            final int taskId = i;
            executor.execute(() -> {
                System.out.println("Executing task: " + taskId + ", Thread: " +
                        Thread.currentThread().getName());
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            });
        }
        executor.shutdown();
    }
}
```

## Common Thread Pool Types

### 1. **newFixedThreadPool()**

Creates a fixed-size thread pool where the number of threads never exceeds the specified value. Idle threads remain in the pool until it is explicitly shut down. If the number of tasks exceeds the thread pool capacity, tasks will be placed in a queue and wait for execution.

```java
public static void main(String[] args) {
    ExecutorService executor = Executors.newFixedThreadPool(10);

    // Submit tasks
    for (int i = 0; i < 15; i++) {
        final int taskId = i;
        executor.submit(() -> {
            System.out.println("Executing task: " + taskId + ", Thread: " +
                    Thread.currentThread().getName());
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
    }
    executor.shutdown();
}
```

### 2. **newCachedThreadPool()**

Creates a cached thread pool where threads are created dynamically as needed, and idle threads are reclaimed after 60 seconds. It is suitable for executing a variable number of tasks and frequent task execution.

```java
public static void main(String[] args) {
    ExecutorService executor = Executors.newCachedThreadPool();

    // Submit tasks
    for (int i = 0; i < 15; i++) {
        final int taskId = i;
        executor.submit(() -> {
            System.out.println("Executing task: " + taskId + ", Thread: " +
                    Thread.currentThread().getName());
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
    }
    executor.shutdown();
}
```

### 3. **newSingleThreadExecutor()**

Creates a single-threaded thread pool with one worker thread. All tasks will be executed sequentially. If a task throws an exception, the thread pool terminates and subsequent tasks will not be executed. This is suitable for tasks that need to be executed in order.

```java
public static void main(String[] args) {
    ExecutorService executor = Executors.newSingleThreadExecutor();

    // Submit tasks
    for (int i = 0; i < 15; i++) {
        final int taskId = i;
        executor.submit(() -> {
            System.out.println("Executing task: " + taskId + ", Thread: " +
                    Thread.currentThread().getName());
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
    }
    executor.shutdown();
}
```

### 4. **newScheduledThreadPool()**

Supports scheduling tasks for delayed or periodic execution, suitable for executing scheduled or recurring tasks.

```java
public static void main(String[] args) {
    ScheduledExecutorService executor = Executors.newScheduledThreadPool(2);

    // Execute after a delay of 1 second
    executor.schedule(() -> System.out.println("Delayed task executed!"), 1, TimeUnit.SECONDS);

    // Execute every 3 seconds after an initial delay of 0 seconds
    executor.scheduleAtFixedRate(() -> System.out.println("Scheduled task executed!"), 0, 3, TimeUnit.SECONDS);

    executor.shutdown();
}
```

### 5. **newWorkStealingPool()**

Suitable for large-scale parallel computing scenarios where multiple tasks are split into sub-tasks and load is balanced using the work-stealing algorithm.

```java
public static void main(String[] args) {
    ExecutorService executor = Executors.newWorkStealingPool();

    // Submit tasks
    for (int i = 0; i < 15; i++) {
        final int taskId = i;
        executor.submit(() -> {
            System.out.println("Executing task: " + taskId + ", Thread: " +
                    Thread.currentThread().getName());
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
    }
    executor.shutdown();
}
```

### 6. **newThreadPool()**

Creates a custom thread pool suitable for executing a variable number of tasks.

```java
public static void main(String[] args) {
    // Task queue with a max capacity of 100
    BlockingQueue<Runnable> workQueue = new LinkedBlockingQueue<>(100);
    
    // Core thread count 4, max thread count 10, idle thread lifetime 60 seconds
    ThreadPoolExecutor executor = new ThreadPoolExecutor(4, 10, 60, TimeUnit.SECONDS, workQueue);

    // Submit tasks
    for (int i = 0; i < 15; i++) {
        final int taskId = i;
        executor.submit(() -> {
            System.out.println("Executing task: " + taskId + ", Thread: " +
                    Thread.currentThread().getName());
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
    }
    executor.shutdown();
}
```

### 7. **newForkJoinPool()**

Suitable for divide-and-conquer algorithms where tasks are split into sub-tasks for parallel execution and results are merged. `ForkJoinPool` is especially suitable for recursive tasks.

```java
public static void main(String[] args) {
    ForkJoinPool pool = new ForkJoinPool();
    ForkJoinTask<Integer> task = new RecursiveTask<Integer>() {
        @Override
        protected Integer compute() {
            // Divide-and-conquer task
            return 1;
        }
    };
    Integer result = pool.invoke(task);
    System.out.println(result);
    pool.shutdown();
}
```

### 8. **newVirtualThreadPool()**

Creates a virtual thread pool (introduced in Java 19), suitable for executing a variable number of tasks.

---
