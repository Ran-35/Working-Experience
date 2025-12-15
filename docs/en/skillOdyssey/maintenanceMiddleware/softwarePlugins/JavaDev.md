# Java Development Environment Setup

---

### **JDK Installation and Configuration**

**JDK (Java Development Kit)** is the foundation for developing Java applications. Below are the steps for installing the JDK:

#### 1. Download JDK

Official website: [JDK Download](https://www.oracle.com/java/technologies/javase-downloads.html)

On the page, choose the JDK version suitable for your operating system. It's recommended to select an **LTS version** (such as JDK 17 or JDK 11).

#### 2. Install JDK

* After the download is complete, run the installer (e.g., `.exe` file).
* Install the JDK following the default settings. It's recommended to install it in a path without spaces or special characters, for example: `C:\Program Files\Java\jdk-version`.

#### 3. Set Up Environment Variables

* Right-click on **This PC** (or **Computer**) and select **Properties**.
* Click on **Advanced system settings**, then click **Environment Variables**.
* In the **System variables** section, click **New**, and add the following variables:

  * Variable name: `JAVA_HOME`
  * Variable value: `C:\Program Files\Java\jdk-version` (replace with the actual installation path)
* In the **System variables** section, find and select **Path**, then click **Edit**.
* At the end of the Path variable, add the following: `C:\Program Files\Java\jdk-version\bin`.
* Click **OK** to save the settings.

#### 4. Verify Installation

Open Command Prompt (cmd), type `java -version`, and if the version information is displayed, it means the JDK is installed successfully.

---

### **Maven Installation and Configuration**

**Maven** is a popular build automation tool widely used for building Java projects and managing dependencies. Below are the steps for installing Maven:

#### 1. Download Maven

Official website: [Maven Download](https://maven.apache.org/download.cgi)

Choose the Maven binary zip archive suitable for your operating system, then download the `.zip` file (e.g., `apache-maven-3.x.x-bin.zip`).

#### 2. Extract Maven

Extract the downloaded Maven zip file to any directory, for example: `C:\Maven`.

#### 3. Set Up Environment Variables

* Right-click on **This PC** (or **Computer**) and select **Properties**.

* Click on **Advanced system settings**, then click **Environment Variables**.

* In the **System variables** section, click **New**, and add the following variables:

  * Variable name: `MAVEN_HOME`
  * Variable value: `C:\Maven` (replace with the actual extraction path)

* In the **System variables** section, find and select **Path**, then click **Edit**.

* At the end of the Path variable, add the following: `C:\Maven\bin`.

* Click **OK** to save the settings.

#### 4. Verify Installation

Open Command Prompt (cmd), type `mvn -version`, and if the version information is displayed, it means Maven is installed successfully.

#### 5. Configure Maven Mirror

To improve Maven download speed, you can configure a domestic mirror.

* Find Maven's global configuration file: `MAVEN_HOME/conf/settings.xml`.
* Add the Aliyun mirror configuration to the `settings.xml` file:

```xml
<mirrors>
    <!-- Aliyun Maven repository mirror -->
    <mirror>
        <id>aliyun</id>
        <mirrorOf>central</mirrorOf>
        <url>https://maven.aliyun.com/nexus/content/groups/public/</url>
        <blocked>false</blocked>
    </mirror>
</mirrors>
```

* Configure the Aliyun remote repository:

```xml
<repositories>
    <repository>
        <id>aliyun-central</id>
        <url>https://maven.aliyun.com/nexus/content/groups/public/</url>
        <releases><enabled>true</enabled></releases>
        <snapshots><enabled>true</enabled></snapshots>
    </repository>
</repositories>

<pluginRepositories>
    <pluginRepository>
        <id>aliyun-central</id>
        <url>https://maven.aliyun.com/nexus/content/groups/public/</url>
    </pluginRepository>
</pluginRepositories>
```

* Save the configuration and test it.

---

### **IDEA Installation and Configuration**

**IDEA (IntelliJ IDEA)** is an integrated development environment (IDE) for Java development. Below are the steps for installing and configuring IDEA:

#### 1. Download IDEA

Official website: [IDEA Download](https://www.jetbrains.com/idea/download/)

Choose the **IDEA Ultimate Edition** suitable for your operating system and download the `.zip` file (e.g., `IntelliJ IDEA 2023.1.2.zip`).

#### 2. Extract IDEA

Extract the downloaded IDEA zip file to any directory, for example: `C:\IntelliJ IDEA`.

#### 3. Configure IDEA

* **Configure JDK**

  * Open IDEA, and go to the project settings: `Project -> Project Settings -> Modules -> Dependencies -> SDK Location`.
  * Select the JDK you are using.

* **Configure Maven to Use Custom Repositories**

  * Go to **Settings** → **Build, Execution, Deployment** → **Build Tools** → **Maven**.
  * Configure **Maven home path**, set it to the folder where you extracted Maven (e.g., `E:\DevelopTools\Maven\apache-maven-3.9.9`).
  * Configure **User settings file**, set it to the path of the `settings.xml` file (e.g., `E:\DevelopTools\Maven\apache-maven-3.9.9\conf\settings.xml`).
  * Configure **Local repository**, set it to the Maven local repository path (e.g., `E:\DevelopTools\Maven\repository`).

---

This concludes the setup process for the Java development environment, including the installation and configuration of JDK, Maven, and IDEA. With these steps, you can successfully begin Java development and configure your build tools and IDE.
