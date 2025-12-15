# 线程池
管理和执行线程的一种机制。它通过预先创建和管理一组线程来提高程序的性能，避免了频繁创建和销毁线程的开销。

## 基本作用
· **降低资源消耗：**重复利用已创建的线程，减少线程创建和销毁的开销  
· **提高响应速度：**任务到达时，无需等待线程创建即可立即执行  
· **提高线程可管理性：**统一分配、调优和监控线程  
· **提供更多功能：**支持定时执行、定期执行等功能  

## 核心参数
```java
public ThreadPoolExecutor(
    int corePoolSize,      // 核心线程数： 线程池中保持的最小线程数
    int maximumPoolSize,   // 最大线程数：线程池能够容纳的最大线程数
    long keepAliveTime,    // 空闲线程存活时间：非核心线程空闲时的存活时间
    TimeUnit unit,         // 时间单位
    BlockingQueue<Runnable> workQueue, // 工作队列：存放任务的队列
    ThreadFactory threadFactory,       // 线程工厂：创建线程的工厂
    RejectedExecutionHandler handler   // 拒绝策略：拒绝任务时使用的策略
)
```

## 工作流程
1. 线程池初始化，创建 **核心线程数** 个线程
2. 若提交的任务数量超过了核心线程数，线程池会将任务放入队列
3. 若队列已满且当前线程数还未达到 **最大线程数**，则新建线程来执行任务
4. 若队列已满且当前线程数已达到 **最大线程数**，则执行拒绝策略
5. 非核心线程在空闲超过 **空闲线程存活时间** 后会被销毁

```Java
public class Main {
    public static void main(String[] args) {
        ThreadPoolExecutor executor = new ThreadPoolExecutor(
                2,
                5,
                60,
                TimeUnit.SECONDS,
                new ArrayBlockingQueue<>(10),
                Executors.defaultThreadFactory(),
                new ThreadPoolExecutor.AbortPolicy()
        );

        // 提交任务
        for (int i = 0; i < 15; i++) {
            final int taskId = i;
            executor.execute(() -> {
                System.out.println("执行任务: " + taskId + ", 线程: " +
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

## 常见线程池的类型
1. **newFixedThreadPool()**：创建一个固定大小的线程池，线程数不会超出设定值，空闲线程会继续存在，直到显式关闭线程池。如果任务数量大于线程池容量，任务会被放入任务队列中等待执行。
```Java
public static void main(String[] args) {
    ExecutorService executor = Executors.newFixedThreadPool(10);

    // 提交任务
    for (int i = 0; i < 15; i++) {
        final int taskId = i;
        executor.submit(() -> {
            System.out.println("执行任务: " + taskId + ", 线程: " +
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

2. **newCachedThreadPool()**：创建一个可缓存的线程池，线程池中的线程可以根据需要动态创建，空闲的线程会在60秒后被回收，当任务较多且执行频繁时，可能会创建大量的线程，适用于执行数量不固定的任务。  
```Java
public static void main(String[] args) {
    ExecutorService executor = Executors.newCachedThreadPool();

    // 提交任务
    for (int i = 0; i < 15; i++) {
        final int taskId = i;
        executor.submit(() -> {
            System.out.println("执行任务: " + taskId + ", 线程: " +
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

3. **newSingleThreadExecutor()**：创建一个单线程的线程池，只会有一个工作线程，所有任务都是串行执行，如果某个任务抛出异常，线程池会终止，后续任务不会执行，适用于执行任务顺序执行的任务。  
```Java
public static void main(String[] args) {
    ExecutorService executor = Executors.newCachedThreadPool();

    // 提交任务
    for (int i = 0; i < 15; i++) {
        final int taskId = i;
        executor.submit(() -> {
            System.out.println("执行任务: " + taskId + ", 线程: " +
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

4. **newScheduledThreadPool()**：支持定时任务和周期性任务的调度，支持定时任务和周期性任务的调度，适用于执行定时任务和周期性任务。
```Java
public static void main(String[] args) {
    ScheduledExecutorService executor = Executors.newScheduledThreadPool(2);
    // 延迟1秒后执行
    executor.schedule(() -> System.out.println("Delayed task executed!"), 1, TimeUnit.SECONDS);
    // 延迟0秒后，每2秒执行一次
    executor.scheduleAtFixedRate(() -> System.out.println("Scheduled task executed!"), 0, 3, TimeUnit.SECONDS);
    executor.shutdown();
}
```

5. **newWorkStealingPool()**：适用于大规模并行计算场景，多个任务被拆分为多个子任务，通过工作窃取算法来平衡负载。
```Java
public static void main(String[] args) {
    ExecutorService executor = Executors.newWorkStealingPool();
    // 提交任务
    for (int i = 0; i < 15; i++) {
        final int taskId = i;
        executor.submit(() -> {
            System.out.println("执行任务: " + taskId + ", 线程: " +
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

6. **newThreadPool()**：创建一个自定义的线程池，适用于执行数量不固定的任务。
```Java
public static void main(String[] args) {
    // 任务队列最大容量100
    BlockingQueue<Runnable> workQueue = new LinkedBlockingQueue<>(100);
    // 核心线程数4、最大线程数10、空闲线程存活时间60
    ThreadPoolExecutor executor = new ThreadPoolExecutor(4, 10, 60, TimeUnit.SECONDS, workQueue);

    // 提交任务
    for (int i = 0; i < 15; i++) {
        final int taskId = i;
        executor.submit(() -> {
            System.out.println("执行任务: " + taskId + ", 线程: " +
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

7. **newForkJoinPool()**：适用于分治算法，如将任务拆分成多个子任务并行执行，最后合并结果。  
· 通过ForkJoinPool，任务可以被分解为子任务，独立执行，然后再合并结果
· ForkJoinPool用于支持并行计算，尤其适用于递归任务
```Java
public static void main(String[] args) {
    ForkJoinPool pool = new ForkJoinPool();
    ForkJoinTask<Integer> task = new RecursiveTask<Integer>() {
        @Override
        protected Integer compute() {
            // 分治计算任务
            return 1;
        }
    };
    Integer result = pool.invoke(task);
    System.out.println(result);
    pool.shutdown();
}
```

8. **newVirtualThreadPool()**：创建一个虚拟线程的线程池(java 19引入)，适用于执行数量不固定的任务。
