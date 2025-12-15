# 输入/输出
## 传统IO
**定义：**通过字节流和字符流进行数据的读写。这种方式基于流（Stream）的模型，数据按顺序一个字节或一个字符一个字节地读取。

### 基本组成
**字节流**  
1. **FileInputStream**：字节输入流，用于从输入源（如文件、网络）读取字节数据。  

**(1)函数构造：**  
FileInputStream fis = new FileInputStream(String path)  
FileInputStream fis = new FileInputStream(File file)

**(2)方法：**  
read()： 从输入流中读取一个字节。    
skip(long n)： 跳过指定数量的字节。  
close()： 关闭流并释放所有相关资源。
read(byte[] b)： 从输入流中读取字节数据到字节数组。
```java 
public static void main(String[] args) {
    try {
        int data;
        FileInputStream fileInputStream = new FileInputStream("C:\\Users\\ranxi\\Desktop\\test.txt")
        // 读取一个字节，直到读不到字节
        while ((data = fileInputStream.read()) != -1) {
                System.out.print((char) data);
        }
        fileInputStream.close();
    } catch (IOException e) {
        throw new RuntimeException(e);
    }
}
```
2. **FileOutputStream**：字节输出流，用于向输出目标（如文件、网络）写入字节数据。

**(1)函数构造：**  
FileOutputStream fos = new FileOutputStream(String path)  
FileOutputStream fos = new FileOutputStream(File file)  
FileOutputStream fos = new FileOutputStream(String path, boolean append)：append 如果为 true，则数据追加到文件末尾。

**(2)方法：**  
void close()：关闭文件输出流。  
void write(int b)：将单个字节写入文件。  
void write(byte[] b)：将字节数组写入文件。  
void write(byte[] b, int off, int len)：从字节数组指定偏移量处写入指定长度的字节。  
```java 
public static void main(String[] args) {
    try {
        FileOutputStream fileOutputStream = new FileOutputStream("C:\\Users\\ranxi\\Desktop\\test.txt");
        fileOutputStream.write("Now is the time for all good men to come.".getBytes());
        fileOutputStream.close();
    } catch (IOException e) {
        throw new RuntimeException(e);
    }
}
```
3. **BufferedInputStream**：缓冲字节输入流，它通过一个缓冲区提高读取性能。

**(1)函数构造：**  
BufferedInputStream bis = new BufferedInputStream(FileInputStream fileInputStream);

**(2)方法：**  
int read()：从缓冲区读取一个字节。  
int read(byte[] b)：从缓冲区读取数据到字节数组中。  
void close()：关闭流并释放相关资源。 
```java 
public static void main(String[] args) {
    try {
        int data;
        FileInputStream fileInputStream = new FileInputStream("C:\\Users\\ranxi\\Desktop\\test.txt");
        BufferedInputStream bufferedInputStream = new BufferedInputStream(fileInputStream);
        while ((data = bufferedInputStream.read()) != -1) {
            System.out.print((char) data);
        }
    } catch (IOException e) {
        throw new RuntimeException(e);
    }
}
```
4. **BufferedOutputStream**：缓冲字节输出流。

**(1)函数构造：**  
BufferedOutputStream bos = new BufferedOutputStream(FileOutputStream fileOutputStream);  

**(2)方法：**  
void write(int b)：将单个字节写入缓冲区。  
void write(byte[] b)：将字节数组写入缓冲区。   
void close()：将缓冲区中的数据刷新到目标文件，并关闭流。  
void write(byte[] b, int off, int len)：将字节数组的部分数据写入缓冲区。 
```java 
public static void main(String[] args) {
    try {
        FileOutputStream fileOutputStream = new FileOutputStream("C:\\Users\\ranxi\\Desktop\\test.txt",true);
        BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(fileOutputStream);
        bufferedOutputStream.write("\n".getBytes());
        bufferedOutputStream.write("Used for testing file input and output streams".getBytes());
        bufferedOutputStream.close();
        fileOutputStream.close();
    }catch (IOException e){
        throw new RuntimeException(e);
    }
}
```

**字符流**  
1. **FileReader**：字符输入流，用于从输入源（如文件、网络）读取字符数据。  
**(1)函数构造：**  
FileReader fr = new FileReader(String path)  
FileReader fr = new FileReader(File file)
**(2)方法：**
void close()：关闭流。  
long skip(long n)：跳过 n 个字符。  
int read()：读取一个字符，如果到达文件末尾，返回 -1。  
int read(char[] cbuf)：读取字符并存入字符数组，返回实际读取的字符数。  

```java
static void fileReader(){
    // 使用try-with-resources 管理 FileReader,可以无需手动close 流
    try(FileReader fr = new FileReader("C:\\Users\\ranxi\\Desktop\\test.txt")) {
        int data;
        while ((data = fr.read()) != -1) {
            System.out.print((char) data);
        }
    }catch (IOException e){
        throw new RuntimeException(e);
    }
}
```
2. **FileWriter**：字符输出流，用于向输出目标（如文件、网络）写入字符数据。  
**(1)函数构造：**  
FileWriter fw = new FileWriter(String path)  
FileWriter fw = new FileWriter(File file)
FileWriter fw = new FileWriter(String path, boolean append)
**(2)方法：**
void close()：关闭流。  
void write(int c)：将单个字符写入文件。  
void write(char[] cbuf)：将字符数组写入文件。  
void write(char[] cbuf, int off, int len)：将字符数组的部分数据写入文件。 
```java
static void fileReader(){
    try(FileWriter fw = new FileWriter("C:\\Users\\ranxi\\Desktop\\test.txt",true)) {
        fw.write("\n");
        fw.write("This is a test paragraph");
    }catch (IOException e){
        throw new RuntimeException(e);
    }
}
```
3. **BufferedReader**：缓冲字符输入流，用于提高读取字符数据的效率。  
**(1)函数构造：**  
BufferedReader bufferedReader = new BufferedReader(FileReader fileReader); 
**(2)方法：**
void close()：关闭流。  
int read()：读取一个字符。  
int read(char[] cbuf)：读取字符并存入字符数组，返回实际读取的字符数。  
String readLine()：读取一行文本数据（包括换行符），如果文件结束则返回 null。  
```java
static void fileReader(){
    try(FileReader fr = new FileReader("C:\\Users\\ranxi\\Desktop\\test.txt")) {
        BufferedReader bufferedReader = new BufferedReader(fr);
        bufferedReader.lines().forEach(System.out::println);
        bufferedReader.close();
    }catch (IOException e){
        throw new RuntimeException(e);
    }
}
```
4. **BufferedWriter**：缓冲字符输出流，用于提高写入字符数据的效率。  
**(1)函数构造：**  
BufferedWriter bufferedWriter = new BufferedWriter(FileWriter fileWriter);
**(2)方法：**
void write(int c)：将单个字符写入缓冲区。  
void write(char[] cbuf)：将字符数组写入缓冲区。  
void write(char[] cbuf, int off, int len)：将字符数组的部分数据写入缓冲区。  
void newLine()：插入一个换行符。  
void flush()：刷新缓冲区，将缓冲区中的数据写入文件。  
void close()：将缓冲区中的数据写入文件并关闭流。
```java
static void fileReader(){
    try(FileWriter fw = new FileWriter("C:\\Users\\ranxi\\Desktop\\test.txt",true)) {
        BufferedWriter bufferedWriter = new BufferedWriter(fw);
        bufferedWriter.write("\n");
        bufferedWriter.write("Now,let's start");
        bufferedWriter.close();
    }catch (IOException e){
        throw new RuntimeException(e);
    }
}
```
## NIO
**定义：**Java 1.4引入的一个全新的I/O库，主要提供了比传统的I/O流更加高效和灵活的文件操作、网络通信、内存映射文件等功能。

### Buffer（缓冲区）
**定义：**NIO 中的所有数据操作都依赖于 Buffer 类。缓冲区是一块内存区域，它用于存储从通道读取的数据或写入通道的数据。

**缓冲区类型：**  
ByteBuffer：处理字节数据。  
CharBuffer：处理字符数据。  
IntBuffer、FloatBuffer、LongBuffer：处理对应的基本数据类型。  
**主要方法：**  
get()：从缓冲区读取数据。  
put()：向缓冲区写入数据。
clear()：清空缓冲区，准备重新写入数据。   
remaining()：返回缓冲区中剩余的可读数据量。  
flip()：将缓冲区从写模式切换到读模式，准备读取数据。 

### Channel（通道）
**定义：**用于处理数据的传输。通道的作用类似于传统I/O中的流，但是它是双向的，可以进行读取和写入操作。

**通道类型：**  
FileChannel：用于文件的读取和写入。  
SocketChannel：用于TCP连接的网络I/O。  
DatagramChannel：用于UDP连接的网络I/O。  
ServerSocketChannel：用于监听并接收TCP连接的服务器通道。  

**主要方法：**  
close()：关闭通道。  
read(ByteBuffer dst)：从通道读取数据到缓冲区。  
write(ByteBuffer src)：将数据从缓冲区写入通道。  

### Selector（选择器）  
**定义：**用于实现非阻塞I/O操作。它允许单个线程管理多个通道，检测哪些通道准备好进行读写操作，从而实现高效的网络通信或I/O操作。

**主要方法：**  
close()：关闭 Selector。 
open()：打开一个 Selector。    
selectNow()：非阻塞式的 select 方法。  
selectedKeys()：返回已选择的通道集合。  
select()：阻塞等待，直到至少有一个通道可以进行 I/O 操作。