# Java 开发环境搭建

---

### **JDK 安装与配置**

**JDK（Java Development Kit）** 是开发 Java 应用程序的基础。以下是 JDK 的安装步骤：

#### 1. 下载 JDK

官网：[JDK 下载](https://www.oracle.com/java/technologies/javase-downloads.html)
在页面中选择适合操作系统的 JDK 版本，建议选择 **LTS 版本**（如 JDK 17 或 JDK 11）。

#### 2. 安装 JDK

* 下载完成后，打开安装程序（例如 `.exe` 文件）。
* 按照默认设置安装 JDK，建议安装路径不要包含空格或特殊字符，推荐路径为：`C:\Program Files\Java\jdk-版本号`。

#### 3. 配置环境变量

* 右键点击 **此电脑**（或 **计算机**），选择 **属性**。
* 点击 **高级系统设置**，然后点击 **环境变量**。
* 在 **系统变量** 区域，点击 **新建**，添加以下变量：

  * 变量名：`JAVA_HOME`
  * 变量值：`C:\Program Files\Java\jdk-版本号`（替换为实际安装路径）
* 在 **系统变量** 区域，找到并选择 **Path**，然后点击 **编辑**。
* 在 Path 的末尾添加以下路径：`C:\Program Files\Java\jdk-版本号\bin`。
* 点击 **确定** 保存设置。

#### 4. 验证安装

打开命令提示符（cmd），输入 `java -version`，如果显示版本信息，则表示 JDK 安装成功。

---

### **Maven 安装与配置**

**Maven** 是一个流行的构建自动化工具，广泛用于 Java 项目的构建和依赖管理。以下是 Maven 的安装步骤：

#### 1. 下载 Maven

官网：[Maven 下载](https://maven.apache.org/download.cgi)
选择适合操作系统的 Maven 压缩包（Binary zip archive），点击下载 `.zip` 文件（例如：`apache-maven-3.x.x-bin.zip`）。

#### 2. 解压 Maven

将下载的 Maven 压缩包解压到任意目录，例如：`C:\Maven`。

#### 3. 配置环境变量

* 右键点击 **此电脑**（或 **计算机**），选择 **属性**。
* 点击 **高级系统设置**，然后点击 **环境变量**。
* 在 **系统变量** 区域，点击 **新建**，添加以下变量：

  * 变量名：`MAVEN_HOME`
  * 变量值：`C:\Maven`（替换为实际解压路径）
* 在 **系统变量** 区域，找到并选择 **Path**，然后点击 **编辑**。
* 在 Path 的末尾添加以下路径：`C:\Maven\bin`。
* 点击 **确定** 保存设置。

#### 4. 验证安装

打开命令提示符（cmd），输入 `mvn -version`，如果显示版本信息，则表示 Maven 安装成功。

#### 5. 配置 Maven 镜像

为了提高 Maven 下载速度，可以配置国内镜像。

* 找到 Maven 的全局配置文件：`MAVEN_HOME/conf/settings.xml`。
* 在 `settings.xml` 文件中添加阿里云镜像配置：

```xml
<mirrors>
    <!-- 阿里云 Maven 仓库镜像 -->
    <mirror>
        <id>aliyun</id>
        <mirrorOf>central</mirrorOf>
        <url>https://maven.aliyun.com/nexus/content/groups/public/</url>
        <blocked>false</blocked>
    </mirror>
</mirrors>
```

* 配置阿里云远程仓库：

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

* 保存配置并测试。

---

### **IDEA 安装与配置**

**IDEA（IntelliJ IDEA）** 是一个用于 Java 开发的集成开发环境（IDE）。以下是 IDEA 的安装与配置步骤：

#### 1. 下载 IDEA

官网：[IDEA 下载](https://www.jetbrains.com/idea/download/)
选择适合操作系统的 **IDEA 专业版**（Ultimate Edition），下载 `.zip` 文件（例如：`IntelliJ IDEA 2023.1.2.zip`）。

#### 2. 解压 IDEA

将下载的 IDEA 压缩包解压到任意目录，例如：`C:\IntelliJ IDEA`。

#### 3. 配置 IDEA

* **配置 JDK**

  * 打开 IDEA，进入项目设置：`Project -> Project Settings -> Modules -> Dependencies -> SDK Location`。
  * 选择你使用的 JDK。

* **配置 Maven 使用自定义仓库**

  * 进入 **Settings** -> **Build, Execution, Deployment** -> **Build Tools** -> **Maven**。
  * 配置 **Maven home path**，设置为你解压的 Maven 文件夹路径（例如：`E:\DevelopTools\Maven\apache-maven-3.9.9`）。
  * 配置 **User settings file**，设置为 `settings.xml` 文件所在路径（例如：`E:\DevelopTools\Maven\apache-maven-3.9.9\conf\settings.xml`）。
  * 配置 **Local repository**，设置为 Maven 本地仓库路径（例如：`E:\DevelopTools\Maven\repository`）。

---

以上是 Java 开发环境的搭建过程，包含了 JDK、Maven 和 IDEA 的安装与配置。通过这些步骤，你可以顺利地进行 Java 开发并配置构建工具与 IDE。
