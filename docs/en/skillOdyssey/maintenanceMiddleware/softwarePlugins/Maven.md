# Maven 模块详解及依赖推荐
<br>

### 模块介绍
**一、基本结构**
1. 父模块（Parent Module）  
 (1)父模块是一个聚合模块（packaging 为 pom 类型），它不包含业务逻辑和功能代码，而是包含一些通用的配置、插件和依赖管理。  
 (2)父模块通常用于管理多个子模块的版本和依赖，并提供共享的配置
<br>

2. 子模块（Child Module）  
 (1)每个子模块都是一个独立的 Maven 项目，可以有自己的功能。  
 (2)子模块通过父模块的标签进行聚合，并可以继承父模块的配置。
<br>

**二、常见的模块类型**
1. Pom 模块  
描述：pom 模块通常是父模块，用于聚合其他子模块。它没有实际的代码功能，只负责管理多个子模块的依赖和插件配置。  
用途：管理项目的全局配置、插件版本、仓库、依赖等。通过 pom 模块，多个模块可以共享相同的版本配置和构建设置。
2. Jar 模块  
描述：jar 模块通常用于实现功能，并生成 jar 包。  
用途：实现功能，生成 jar 包。
3. War 模块  
描述：war 模块通常用于生成 web 应用程序，并生成 war 包。  
用途：生成 web 应用程序，生成 war 包。
4. EAR 模块  
描述：ear 模块通常用于生成 Java EE 应用程序，并生成 ear 包。  
用途：生成 Java EE 应用程序，生成 ear 包。
5. Maven-Plugin 模块  
描述：maven-plugin 模块用于创建自定义 Maven 插件。通过这个模块，开发者可以扩展 Maven 的功能，编写自定义的构建过程。  
用途：用于定义构建任务、生命周期管理等。
6. Site 模块
描述：site 模块用于生成项目的官方网站或文档，生成 .xml 文件，并通过 Maven Site 插件生成静态网页。  
用途：通常用于生成项目文档、发布信息、报告等。
7. Dependency 模块
描述：dependency 模块用于管理项目的依赖关系，并生成 pom.xml 文件。  
用途：集中管理版本和依赖，简化版本控制和升级。  

注：典型的的Maven项目类型：
~~~md
project-root
│
├── pom.xml                 (父项目的 pom 文件，聚合所有子模块)
├── eiwis-common            (子模块：公共模块，包含共享的工具类和代码)
│   └── pom.xml             (该子模块的 pom 文件，依赖父项目)
│
├── eiwis-dynamic-datasource (子模块：动态数据源模块，负责多数据源管理)
│   └── pom.xml             (该子模块的 pom 文件，依赖父项目)
│
├── eiwis-admin             (子模块：管理后台模块，负责管理界面和权限控制)
│   └── pom.xml             (该子模块的 pom 文件，依赖父项目)
│
└── pom.xml                 (父项目的 pom 文件，聚合所有子模块)
~~~
示例：一个Pom.xml文件
~~~xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <!-- 指定了当前 pom.xml 文件遵循的 Maven POM 模型版本。在 Maven 中，4.0.0 是默认的版本 -->
    <modelVersion>4.0.0</modelVersion>

    <!-- groupId: 这是当前项目的唯一标识符，通常是组织或公司的域名倒写形式 -->
    <!-- artifactId: 当前项目的名称，用于标识这个构件（artifact） -->
    <!-- version: 当前构件的版本号 -->
    <!-- packaging: 指定构件的打包类型 -->
    <groupId>com.wec</groupId>
    <artifactId>eiwis</artifactId>
    <version>2.4.0</version>
    <packaging>pom</packaging>

    <!-- 指定了当前项目的父 POM，继承自 spring-boot-starter-parent，这是 Spring Boot 的默认父 POM。通过继承父 POM，当前项目可以继承 Spring Boot 提供的许多默认配置，如插件版本、编码设置等。 -->
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.4.13</version>
	</parent>

    <!-- 列出了该父项目包含的多个子模块。每个子模块都有自己的 pom.xml 文件，并通过父 POM 进行统一的版本管理和依赖管理 -->
    <modules>
        <module>eiwis-common</module>
		<module>eiwis-dynamic-datasource</module>
        <module>eiwis-admin</module>
    </modules>

    <!-- 用于定义项目的属性 -->
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <!-- 列出当前项目需要的依赖。在这里，依赖的是 spring-boot-starter-test，它是 Spring Boot 的一个用于单元测试的起始依赖（starter） -->
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <!-- 阿里云maven仓库 -->
    <repositories>
        <repository>
            <id>public</id>
            <name>aliyun nexus</name>
            <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
            <releases>
                <enabled>true</enabled>
            </releases>
        </repository>

    </repositories>

    <!-- 定义 Maven 插件仓库 -->
    <pluginRepositories>
        <pluginRepository>
            <id>public</id>
            <name>aliyun nexus</name>
            <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
            <releases>
                <enabled>true</enabled>
            </releases>
            <snapshots>
                <enabled>false</enabled>
            </snapshots>
        </pluginRepository>
    </pluginRepositories>
</project>
~~~
### 依赖推荐
**一、查询依赖**
1. 找到Maven中央仓库：https://mvnrepository.com/
2. 搜索需要的依赖
3. 复制依赖的坐标信息
4. 在项目 pom.xml 文件中添加依赖

**二、常用依赖**
##### 1. SpringBoot相关：  
- spring-boot-starter-web(构建 Web 应用程序的基础功能)
- spring-boot-starter-aop(提供 AOP 功能，支持切面编程)
- spring-boot-starter-validation(提供基于 JSR-303/JSR-380 的 Bean 验证支持)
- spring-boot-starter-test (提供 Spring Boot 应用的测试支持)
- spring-boot-starter-data-redis(集成 Redis 数据库，提供 Redis 的自动配置和客户端)
- spring-boot-configuration-processor(支持 Spring Boot 配置文件中的元数据生成)
- spring-cloud-starter-openfeign(简化微服务之间的 HTTP 调用)
<br>

##### 2. shiro相关：
- shiro-core(Shiro 核心) 
- shiro-spring(Shiro 的 Spring 集成)

3. Websocket相关：
- spring-boot-starter-websocket(Spring WebSocket 支持)
- Java-WebSocket(在 Java 中实现 WebSocket 协议)

4. 数据库相关：
- mysql-connector-java(MySQL 的官方 JDBC 驱动)
- jedis(Redis 的 Java 客户端)
- druid-spring-boot-starter(高性能的数据库连接池)
- mybatis-plus-boot-starter()(MyBatis 的增强功能，如分页、条件构造等)
- postgresql(PostgreSQL 的官方 JDBC 驱动)

5. 报表相关：
- easypoi-base(EasyPoi 的基础功能，如 Excel 导入导出等)
- easypoi-web(EasyPoi 的 Web 支持)
- easypoi-annotation(定义 Excel 文件中字段的映射关系)

6. 文件上传和文件处理
- commons-fileupload(处理文件上传的 Java 库)
- commons-io(常用的 I/O 操作工具类)
- commons-codec(编码和解码工具)

7. PDF
- itext-asian(引入中文字体支持)

8. 第三方服务SDK
- minio(高性能的对象存储服务)
- qiniu-java-sdk(七牛云对象存储服务)
- cos_api(阿里云对象存储服务)

9. 验证码相关
- kaptcha(验证码生成工具)

10. 邮件相关
- javax.mail(Java 邮件 API)

11. 安全与加密相关
- bcprov-jdk15on(Bouncy Castle 提供的 Java 密钥库)

12. 工具库
- hutool-all(Java 工具库)
- jsoup(解析、清理和处理 HTML 文档)
- lombok(提供了 JavaBean 的操作工具类)

13. Json
- gson(Google 提供的一个 JSON 处理库)
- fastjson(阿里巴巴提供的 JSON 处理库)

14. Swagger & Knife4j
- knife4j-spring-boot-starter(增强版的 Swagger)
- springfox-swagger2(生成 API 文档的工具)
- springfox-swagger-ui(Swagger 的 UI 界面)

15. 其他
- snakeyaml(YAML 解析库)
- easyexcel(阿里巴巴提供的一个高性能 Excel 读写工具)
- spring-context-support(提供 Spring 框架的扩展功能)