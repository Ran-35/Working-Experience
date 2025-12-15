### Input/Output

#### Traditional I/O

**Definition:** Data is read and written through byte streams and character streams. This method is based on the Stream model, where data is read one byte or one character at a time in sequence.

##### Basic Components

**Byte Streams**

1. **FileInputStream:** Byte input stream for reading byte data from an input source (such as a file or network).
   **Constructor:**

   ```java
   FileInputStream fis = new FileInputStream(String path);
   FileInputStream fis = new FileInputStream(File file);
   ```

   **Common Methods:**

   * `read()`: Reads one byte from the input stream.
   * `skip(long n)`: Skips a specified number of bytes.
   * `close()`: Closes the stream and releases all related resources.
   * `read(byte[] b)`: Reads byte data from the input stream into a byte array.

   ```java
   public static void main(String[] args) {
       try {
           int data;
           FileInputStream fileInputStream = new FileInputStream("C:\\Users\\ranxi\\Desktop\\test.txt");
           // Read one byte at a time until no more bytes are available
           while ((data = fileInputStream.read()) != -1) {
               System.out.print((char) data);
           }
           fileInputStream.close();
       } catch (IOException e) {
           throw new RuntimeException(e);
       }
   }
   ```

2. **FileOutputStream:** Byte output stream for writing byte data to an output target (such as a file or network).
   **Constructor:**

   ```java
   FileOutputStream fos = new FileOutputStream(String path);
   FileOutputStream fos = new FileOutputStream(File file);
   FileOutputStream fos = new FileOutputStream(String path, boolean append);
   ```

   **Common Methods:**

   * `close()`: Closes the output stream.
   * `write(int b)`: Writes a single byte to the file.
   * `write(byte[] b)`: Writes a byte array to the file.
   * `write(byte[] b, int off, int len)`: Writes a specified length of bytes from the byte array starting at a given offset.

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

3. **BufferedInputStream:** Buffered byte input stream that improves read performance through a buffer.
   **Constructor:**

   ```java
   BufferedInputStream bis = new BufferedInputStream(FileInputStream fileInputStream);
   ```

   **Common Methods:**

   * `read()`: Reads one byte from the buffer.
   * `read(byte[] b)`: Reads data from the buffer into a byte array.
   * `close()`: Closes the stream and releases all related resources.

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

4. **BufferedOutputStream:** Buffered byte output stream.
   **Constructor:**

   ```java
   BufferedOutputStream bos = new BufferedOutputStream(FileOutputStream fileOutputStream);
   ```

   **Common Methods:**

   * `write(int b)`: Writes a single byte to the buffer.
   * `write(byte[] b)`: Writes a byte array to the buffer.
   * `close()`: Flushes the buffer to the target file and closes the stream.
   * `write(byte[] b, int off, int len)`: Writes a specified length of bytes from the byte array into the buffer.

   ```java
   public static void main(String[] args) {
       try {
           FileOutputStream fileOutputStream = new FileOutputStream("C:\\Users\\ranxi\\Desktop\\test.txt", true);
           BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(fileOutputStream);
           bufferedOutputStream.write("\n".getBytes());
           bufferedOutputStream.write("Used for testing file input and output streams".getBytes());
           bufferedOutputStream.close();
           fileOutputStream.close();
       } catch (IOException e) {
           throw new RuntimeException(e);
       }
   }
   ```

**Character Streams**

1. **FileReader:** Character input stream for reading character data from an input source (such as a file or network).
   **Constructor:**

   ```java
   FileReader fr = new FileReader(String path);
   FileReader fr = new FileReader(File file);
   ```

   **Common Methods:**

   * `close()`: Closes the stream.
   * `skip(long n)`: Skips n characters.
   * `read()`: Reads one character, returns -1 if the end of the file is reached.
   * `read(char[] cbuf)`: Reads characters and stores them in a character array, returning the actual number of characters read.

   ```java
   static void fileReader() {
       try (FileReader fr = new FileReader("C:\\Users\\ranxi\\Desktop\\test.txt")) {
           int data;
           while ((data = fr.read()) != -1) {
               System.out.print((char) data);
           }
       } catch (IOException e) {
           throw new RuntimeException(e);
       }
   }
   ```

2. **FileWriter:** Character output stream for writing character data to an output target (such as a file or network).
   **Constructor:**

   ```java
   FileWriter fw = new FileWriter(String path);
   FileWriter fw = new FileWriter(File file);
   FileWriter fw = new FileWriter(String path, boolean append);
   ```

   **Common Methods:**

   * `close()`: Closes the stream.
   * `write(int c)`: Writes a single character to the file.
   * `write(char[] cbuf)`: Writes a character array to the file.
   * `write(char[] cbuf, int off, int len)`: Writes a portion of the character array to the file.

   ```java
   static void fileReader() {
       try (FileWriter fw = new FileWriter("C:\\Users\\ranxi\\Desktop\\test.txt", true)) {
           fw.write("\n");
           fw.write("This is a test paragraph");
       } catch (IOException e) {
           throw new RuntimeException(e);
       }
   }
   ```

3. **BufferedReader:** Buffered character input stream that improves read performance.
   **Constructor:**

   ```java
   BufferedReader bufferedReader = new BufferedReader(FileReader fileReader);
   ```

   **Common Methods:**

   * `close()`: Closes the stream.
   * `read()`: Reads one character.
   * `read(char[] cbuf)`: Reads characters and stores them in a character array, returning the actual number of characters read.
   * `readLine()`: Reads a line of text (including newline characters), returns null if the end of the file is reached.

   ```java
   static void fileReader() {
       try (FileReader fr = new FileReader("C:\\Users\\ranxi\\Desktop\\test.txt")) {
           BufferedReader bufferedReader = new BufferedReader(fr);
           bufferedReader.lines().forEach(System.out::println);
           bufferedReader.close();
       } catch (IOException e) {
           throw new RuntimeException(e);
       }
   }
   ```

4. **BufferedWriter:** Buffered character output stream for efficient writing of character data.
   **Constructor:**

   ```java
   BufferedWriter bufferedWriter = new BufferedWriter(FileWriter fileWriter);
   ```

   **Common Methods:**

   * `write(int c)`: Writes a single character to the buffer.
   * `write(char[] cbuf)`: Writes a character array to the buffer.
   * `write(char[] cbuf, int off, int len)`: Writes a portion of the character array to the buffer.
   * `newLine()`: Inserts a newline character.
   * `flush()`: Flushes the buffer and writes the data to the file.
   * `close()`: Writes the data in the buffer to the file and closes the stream.

   ```java
   static void fileReader() {
       try (FileWriter fw = new FileWriter("C:\\Users\\ranxi\\Desktop\\test.txt", true)) {
           BufferedWriter bufferedWriter = new BufferedWriter(fw);
           bufferedWriter.write("\n");
           bufferedWriter.write("Now, let's start");
           bufferedWriter.close();
       } catch (IOException e) {
           throw new RuntimeException(e);
       }
   }
   ```

---

#### NIO

**Definition:** A brand-new I/O library introduced in Java 1.4, primarily providing more efficient and flexible file operations, network communication, memory-mapped files, and other functions than traditional I/O streams.

##### Buffer

**Definition:** All data operations in NIO rely on the Buffer class. A buffer is a memory area used to store data read from or written to a channel.

**Buffer Types:**

* `ByteBuffer`: Handles byte data.
*


`CharBuffer`: Handles character data.

* `IntBuffer`, `FloatBuffer`, `LongBuffer`: Handle corresponding primitive data types.

**Common Methods:**

* `get()`: Reads data from the buffer.
* `put()`: Writes data to the buffer.
* `clear()`: Clears the buffer, preparing it to write new data.
* `remaining()`: Returns the number of remaining readable data in the buffer.
* `flip()`: Switches the buffer from write mode to read mode, preparing to read data.

##### Channel

**Definition:** Channels are used for data transfer. A channel is like a stream in traditional I/O, but it is bi-directional, allowing both read and write operations.

**Channel Types:**

* `FileChannel`: Used for reading and writing files.
* `SocketChannel`: Used for TCP network I/O.
* `DatagramChannel`: Used for UDP network I/O.
* `ServerSocketChannel`: Used for listening and accepting TCP connections.

**Common Methods:**

* `close()`: Closes the channel.
* `read(ByteBuffer dst)`: Reads data from the channel into the buffer.
* `write(ByteBuffer src)`: Writes data from the buffer to the channel.

##### Selector

**Definition:** Used to implement non-blocking I/O operations. It allows a single thread to manage multiple channels, detecting which channels are ready for read or write operations, thus enabling efficient network communication or I/O operations.

**Common Methods:**

* `close()`: Closes the Selector.
* `open()`: Opens a new Selector.
* `selectNow()`: Non-blocking select method.
* `selectedKeys()`: Returns the set of selected channels.
* `select()`: Blocks until at least one channel is ready for I/O operations.

---
