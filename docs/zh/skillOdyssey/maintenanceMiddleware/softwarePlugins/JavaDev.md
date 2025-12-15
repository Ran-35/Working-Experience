# Java 开发环境搭建  
<br>

### JDK 
JDK（Java Development Kit）是开发 Java 应用程序的基础步骤

1. 下载 JDK  
官网：[https://www.oracle.com/java/technologies/javase-downloads.html](https://www.oracle.com/java/technologies/javase-downloads.html)  
<br>
在页面中，选择适合你操作系统的 JDK 版本，下载最新版本的 JDK（建议选择 LTS 版本，像 JDK 17 或 JDK 11）。  

2. 安装 JDK
下载完成后，打开安装程序（例如 .exe 文件）。  
<br>
按照默认设置安装 JDK，建议安装路径不要含有空格或特殊字符，最好是: C:\Program Files\Java\jdk-版本号  

3. 配置环境变量
- 右键点击 此电脑（或 计算机），选择 属性。
- 点击 高级系统设置，然后点击 环境变量。
- 在 系统变量 区域，点击 新建，添加以下变量：
- 变量名：JAVA_HOME
- 变量值：C:\Program Files\Java\jdk-版本号（注意替换为你实际安装的路径）
- 在 系统变量 区域，找到并选择 Path，然后点击 编辑。
- 在 Path 的末尾添加以下路径（确保路径是你安装的 JDK 文件夹下的 bin 目录）：C:\Program Files\Java\jdk-版本号\bin
- 点击 确定，保存设置。

4. 验证安装
打开命令提示符（cmd），输入 java -version，如果显示版本信息，则表示 JDK 安装成功。
<br>


### Maven
Maven 是一个流行的构建自动化工具，广泛用于 Java 项目的构建和管理依赖。
1. 下载 Maven  
官网：[https://maven.apache.org/download.cgi](https://maven.apache.org/download.cgi)  
<br>
在页面中，选择适合你操作系统的 Maven 压缩包（Binary zip archive），点击下载 .zip 文件（例如：apache-maven-3.x.x-bin。zip）。
<br>

2. 解压 Maven
将下载的 Maven 压缩包解压到任意目录，例如 C:\Maven。

3. 配置环境变量
- 右键点击 此电脑（或 计算机），选择 属性。
- 点击 高级系统设置，然后点击 环境变量。
- 在 系统变量 区域，点击 新建，添加以下变量：
- 变量名：MAVEN_HOME
- 变量值：C:\Maven
- 在 系统变量 区域，找到并选择 Path，然后点击 编辑。
- 在 Path 的末尾添加以下路径（确保路径是你解压的 Maven 文件夹下的 bin 目录）：C:\Maven\bin
- 点击 确定，保存设置。

4. 验证安装
打开命令提示符（cmd），输入 mvn -version，如果显示版本信息，则表示 Maven 安装成功。
<br>

5. 配置 Maven
maven中央仓库的下载速度过慢，可以使用国内镜像加速。
- 找到全局配置文件：MAVEN_HOME/conf/settings.xml
- 在 settings.xml 文件中配置阿里云镜像，添加以下内容：
~~~xml
<mirrors>
    <!-- 阿里云 Maven 仓库镜像 -->
    <mirror>
        <id>aliyun</id>
        <mirrorOf>central</mirrorOf> <!-- 表示镜像的源是 central 仓库 -->
        <url>https://maven.aliyun.com/nexus/content/groups/public/</url>
        <blocked>false</blocked>
    </mirror>
</mirrors>
~~~
- 若想配置aliyun的远程仓库
~~~xml
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
~~~
- 保存并测试
<br>
### IDEA
IDEA（IntelliJ IDEA）是一个用于 Java 开发的集成开发环境（IDE）。
1. 下载 IDEA  
官网：[https://www.jetbrains.com/idea/download/](https://www.jetbrains.com/idea/download/)  
<br>
在页面中，选择适合你操作系统的 IDEA 专业版（Ultimate Edition），下载 .zip 文件（例如：IntelliJ IDEA 2023.1.2.zip）。
<br>
2. 解压 IDEA
将下载的 IDEA 压缩包解压到任意目录，例如 C:\IntelliJ IDEA。

3. 配置IDEA  
配置JDK
~~~xml
- 找到项目设置文件：Project -> Project Settings -> Modules -> Dependencies -> SDK Location
- 选择项目使用的JDK
~~~
<br>

配置Maven使用自己的仓库  
~~~xml
1. Settings -> Build, Execution, Deployment -> Build Tools -> Maven
2. Maven home path：maven解压文件夹的路径（例如：E:\DevelopTools\Maven\apache-maven-3.9.9）
3. User settings file：settings.xml文件所在路径（例如：E:\DevelopTools\Maven\apache-maven-3.9.9\conf\settings.xml）
4. Local repository：maven本地仓库路径（例如：E:\DevelopTools\Maven\repository）
~~~


