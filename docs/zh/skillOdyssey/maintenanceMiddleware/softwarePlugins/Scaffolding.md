# Spring 脚手架搭建
<br>

## 1. 创建一个Maven项目
1. New Project -> Java -> maven -> 命名为：custome-framework

2. 移除 SRC 文件夹

### 1.1 引入全局依赖
1. 在 custome-framework 下的pom.xml中添加常用依赖：
```xml
<!-- 声明依赖版本 -->
<properties>
    <maven.compiler.source>21</maven.compiler.source>
    <maven.compiler.target>21</maven.compiler.target>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>

    <spring-boot.version>3.5.10</spring-boot.version>
    <spring-cloud.version>2025.0.1</spring-cloud.version>
    <lombok.version>1.18.42</lombok.version>
    <knife4j.version>4.5.0</knife4j.version>
    <springdoc.version>2.8.0</springdoc.version>
    <baomidou.version>3.5.15</baomidou.version>
    <mysql.version>9.5.0</mysql.version>
    <druid.version>1.2.27</druid.version>
    <hutool.version>5.8.43</hutool.version>
    <redisson.version>4.1.0</redisson.version>
    <mapstruct.version>1.5.5.Final</mapstruct.version>
    <snakeyaml.version>2.5</snakeyaml.version>
</properties>

实际依赖省略...
```

## 2. 创建admin模块 / common模块
### 2.1 custome-admin模块
1. 在创建的项目下(custome-framework)新增一个admin模块,其parent为(custome-framework),其中Main为主启动类

2. 修改主启动类名为：AdminApplication，并修改主启动类：
```java
@EnableScheduling
@SpringBootApplication(scanBasePackages = "com.custome")
public class AdminApplication {
    public static void main(String[] args) {
        SpringApplication.run(AdminApplication.class, args);
    }
}
```

### 2.2 custome-common模块
1. 在创建的项目下(custome-framework)新增一个common模块,其parent为(custome-framework)

2. 在custome-admin模块中必须引入该模块，即在custome-admin/pom.xml中要加入：
```xml
<dependencies>
    <dependency>
        <groupId>com.custome</groupId>
        <artifactId>custome-common</artifactId>
        <version>${project.version}</version>
    </dependency>
</dependencies>
```

3. 同时，还需要指定SpringBoot的编译和打包，即在custome-admin/pom.xml中加入：
```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
        </plugin>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

## 3. 创建配置文件
### 3.1 主配置文件
1. 在custome-admin/resources下新建一个application.yml
```yml
server:
  port: 9042
  servlet:
    # 设置 Web 访问的上下文路径
    context-path: /custome-admin
spring:
  # 应用名称
  application:
    name: Custome-Framework
  # 环境(dev-开发 / test-测试 / prod-生产)
  profiles:
    active: dev
  # Java 21 开启虚拟线程
  threads:
    virtual:
      enabled: true

```

### 3.2 多环境配置文件
1. 为开发环境/测试环境/生产环境定义自己的配置(需命名为application-dev,application-test)
```yml
spring:
  #  Mysql数据库配置
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://127.0.0.1:13306/test_database?useUnicode=true&useSSL=false&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai
    username: root
    password: 12456
  #  Redis配置
  data:
    redis:
      host: 127.0.0.1
      port: 16379
      database: 15
      # 如果有密码
      password: 123456
      timeout: 6000ms  # 连接超时时长（毫秒）
      jedis:
        pool:
          max-active: 1000  # 连接池最大连接数（使用负值表示没有限制）
          max-wait: -1ms      # 连接池最大阻塞等待时间（使用负值表示没有限制）
          max-idle: 10      # 连接池中的最大空闲连接
          min-idle: 5       # 连接池中的最小空闲连接

```

## 4. 配置国际化
### 4.1 创建资源文件
1. 在custome-common/resources下新建一个文件夹：i18n

2. 在i18n文件夹下新增两个资源文件：messages.properties 和 messages_en_US.properties
messages.properties: 
```properties
user.account.frozen=用户账户被冻结
user.account.invalid=用户账户已作废
user.password.error=用户密码错误
user.password.retry.limit=用户输入密码错误次数超限
user.id.verify.failed=用户身份校验失败
```

messages_en_US.properties:
```properties
user.account.frozen=User account frozen
user.account.invalid=User account invalidated
user.password.error=Incorrect user password
user.password.retry.limit=Password retry limit exceeded
user.id.verify.failed=Identity verification failed
```
### 4.2 编写国际化功能类
```java
@Slf4j
@Component
public class I18nUtils {
    private static MessageSource messageSource;

    /**
     * 构造函数
     *
     * @param messageSource 消息源
     */
    public I18nUtils(MessageSource messageSource) {
        I18nUtils.messageSource = messageSource;
    }

    /**
     * 获取国际化消息
     *
     * @param code 消息键 (如 user.login.success)
     * @return 翻译后的字符串
     */
    public static String get(String code) {
        try {
            return messageSource.getMessage(code, null, LocaleContextHolder.getLocale());
        } catch (NoSuchMessageException e) {
            log.error("No message found for code: " + code);
            return null;
        }
    }

    /**
     * 带参数的国际化消息
     */
    public static String get(String code, Object... args) {
        try {
            return messageSource.getMessage(code, args, LocaleContextHolder.getLocale());
        } catch (NoSuchMessageException e) {
            log.error("No message found for code: " + code);
            return null;
        }
    }
}

```

### 4.3 在配置文件中开启国际化
```yml
spring:
  # 应用名称
  application:
    name: Custome-Framework
  # 环境(dev-开发 / test-测试 / prod-生产)
  profiles:
    active: dev
  # 国际化
  messages:
    basename: i18n/messages # 对应 resources/i18n/messages.properties
    encoding: UTF-8
    fallback-to-system-locale: true # 找不到对应语言时是否使用系统默认语言
```

## 5. 编写常用常量 及 错误码的枚举
### 5.1 常量
```java
public interface Constant {
    /**
     * 通用字段
     */
    String ID = "id";
    String INSERT = "insert";
    String UPDATE = "update";
    String DELETE = "delete";
}
```
### 5.2 状态码枚举
```java
@Getter
@AllArgsConstructor
public enum ErrorCode {
    // 用户端通用错误
    USER_ERROR("A0001", "user.error"),
    // 用户注册模块
    USER_REG_ERROR("A0100", "user.reg.error"),
    PRIVACY_NOT_AGREED("A0101", "user.reg.privacy.not.agreed"),
    REGION_RESTRICTED("A0102", "user.reg.region.restricted");


    private final String code;
    private final String i18nKey;
    /**
     * 获取国际化消息
     * @return 翻译后的字符串
     */
    public String getI18nKey() {
        return I18nUtils.get(this.i18nKey);
    }
}
```

## 6. 配置Swagger

### 6.1 yml中配置Swagger
```yml
# 由于Knife4j还未支持最新版本的SpringBoot,会报错，只能使用Swagger + knife4j的界面
springdoc:
  api-docs:
    enabled: true
    path: /v3/api-docs
    version: openapi_3_1
  # 这一行很关键：强制开启并配置分组
  group-configs:
    - group: default
      paths-to-match: /**
  # 确保拦截器不影响 API 资源路径解析
  writer-with-default-pretty-printer: true
  swagger-ui:
    path: /swagger-ui.html
    tags-sorter: alpha
    operations-sorter: alpha
  # 解决 ControllerAdvice 扫描冲突的关键配置
  override-with-generic-response: false

knife4j:
  enable: true
  # 开启增强配置
  setting:
    language: zh-CN
    enableSwaggerModels: false
    enableDynamicParameter: false
    # 禁用扩展，这通常能跳过报错的方法调用
    enableExtension: false
```

```java
@Configuration
public class Knife4jConfig {
    @Bean
    public OpenAPI customOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("自定义框架 - 接口文档")
                        .version("1.0")
                        .description("基于 Java 21 + Spring Boot 3 的企业级快速开发脚手架")
                        .contact(new Contact().name("Xran").email("ranxion07@163.com")));
    }

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("default")
                .pathsToMatch("/**")
                .build();
    }
}
```

## 7. 统一响应与异常拦截
### 7.1 定义统一返回对象 (Result)
```java
@Schema(description = "通用工具-响应结果")
public record R<T>(
        @Schema(description = "状态码", example = "SUCCESS_CODE")
        Integer code,

        @Schema(description = "消息内容 (给用户看)", example = "操作成功")
        String msg,

        @Schema(description = "错误标识/码 (给开发/国际化用)", example = "A0111")
        String error,

        @Schema(description = "业务数据")
        T data
) implements Serializable {
    public static <T> R<T> ok() {
        return ok(null);
    }

    public static <T> R<T> fail() {
        return fail(Constant.FAILURE_CODE, Constant.FAILURE, (ErrorCode) null, null);
    }
}
```

### 7.2 自定义异常
```java
@Data
@EqualsAndHashCode(callSuper = true)
public class CustomeException extends RuntimeException implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private final Integer code;
    private final String msg;
    private final ErrorCode errorCode;


    public CustomeException(String msg) {
        super(msg);
        this.code = 500;
        this.msg = msg;
        this.errorCode = null;
    }

    public CustomeException(String msg,Throwable e) {
        super(msg);
        this.code = 500;
        this.msg = msg;
        this.errorCode = null;
    }
}
```

### 7.3 自定义全局异常处理器
```java
@Slf4j
@RestControllerAdvice
public class CustomeExceptionHandler {
    /**
     * 处理自定义业务异常
     */
    @ExceptionHandler(CustomeException.class)
    public R<Void> handleCustomeException(CustomeException e) {
        log.error("业务异常: {}", e.getErrorCode().getI18nKey());
        return R.fail(e.getMsg(), e.getErrorCode());
    }

    /**
     * 处理数据库主键或唯一索引冲突异常
     */
    @ExceptionHandler(DuplicateKeyException.class)
    public R<Void> handleDuplicateKeyException(DuplicateKeyException ex) {
        log.error("数据库主键或唯一索引冲突: {}", ex.getMessage());
        return R.fail(ErrorCode.DUPLICATE_KEY);
    }
}
```

## 8. Mybatis-Plus配置
### 8.1 yml配置
```yml
mybatis-plus:
  global-config:
    db-config:
      # 插入策略：只有不为 null 的字段才加入 INSERT 语句
      insert-strategy: not_null
      # 更新策略：只有不为 null 的字段才加入 UPDATE 语句
      update-strategy: not_null
      # 查询策略：只有不为 null 的字段才加入 WHERE 条件（可选）
      where-strategy: not_null
  # 如果你的 XML 文件在 resources/mapper 下
  mapper-locations: classpath:/mapper/**/*.xml
  # 实体类所在包，配置后在 XML 中可以直接写类名，不需要写全类名
  type-aliases-package: com.example.entity
  configuration:
    # 开启驼峰命名转换（数据库的 user_id 对应实体的 userId）
    map-underscore-to-camel-case: true
    # 打印 SQL 日志，开发阶段很有用
    log-impl: org.apache.ibatis.logging.slf4j.Slf4jImpl
    # 默认的枚举处理器，会将枚举存为字符串
    default-enum-type-handler: org.apache.ibatis.type.EnumTypeHandler

```

### 8.2 配置分页插件
```java
@Configuration
public class MybatisPlusConfig {
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        // 如果配置多个插件, 切记分页最后添加
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
        // 如果有多数据源可以不配具体类型, 否则都建议配上具体的 DbType
        return interceptor;
    }
}
```

### 8.3 配置自动填充
```java
@Configuration
public class MybatisPlusHandler implements MetaObjectHandler {
    @Override
    public void insertFill(MetaObject metaObject) {
        if (metaObject.hasSetter("createTime")) {
            this.strictInsertFill(metaObject, "createTime", LocalDateTime.class, LocalDateTime.now());
        }
        if (metaObject.hasSetter("updateTime")) {
            this.strictInsertFill(metaObject, "updateTime", LocalDateTime.class, LocalDateTime.now());
        }
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        if (metaObject.hasSetter("updateTime")) {
            this.strictUpdateFill(metaObject, "updateTime", LocalDateTime.class, LocalDateTime.now());
        }
    }
}
```

## 9. 配置Redis
### 9.1 yml中配置
```yml
spring:
  #  Redis配置
  data:
    redis:
      host: 127.0.0.1
      port: 16379
      database: 15
      # 如果有密码
      password: 123456
      timeout: 6000ms  # 连接超时时长（毫秒）
      jedis:
        pool:
          max-active: 1000  # 连接池最大连接数（使用负值表示没有限制）
          max-wait: -1ms      # 连接池最大阻塞等待时间（使用负值表示没有限制）
          max-idle: 10      # 连接池中的最大空闲连接
          min-idle: 5       # 连接池中的最小空闲连接
```

### 9.2 编写redis配置类及工具类
```java
@Configuration
@EnableCaching
public class RedisConfig {
    /**
     * 手动注入 Redis 配置属性（从 application.yml 读取）
     */
    @Value("${spring.data.redis.host:127.0.0.1}")
    private String host;

    @Value("${spring.data.redis.port:6379}")
    private int port;

    @Value("${spring.data.redis.database:0}")
    private int database;

    @Value("${spring.data.redis.password:}")
    private String password;

    /**
     * 构造 RedissonClient（分布式锁的核心）
     */
    @Bean(destroyMethod = "shutdown")
    public RedissonClient redissonClient() {
        Config config = new Config();
        String address = String.format("redis://%s:%d", host, port);

        config.setPassword(StringUtils.isBlank(password) ? null : password);
        config.useSingleServer()
                .setAddress(address)
                .setDatabase(database);
        return Redisson.create(config);
    }

    /**
     * 将 Redisson 适配为 Spring Data Redis 的连接工厂
     */
    @Bean
    public RedisConnectionFactory redisConnectionFactory(RedissonClient redissonClient) {
        return new RedissonConnectionFactory(redissonClient);
    }

    /**
     * 配置 RedisTemplate
     */
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);

        GenericJackson2JsonRedisSerializer jsonSerializer = new GenericJackson2JsonRedisSerializer();
        // 设置 Key 序列化为 String, Value 序列化为 JSON
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(jsonSerializer);
        // 设置 Hash Key 、Value 序列化为 JSON
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setHashValueSerializer(jsonSerializer);

        template.afterPropertiesSet();
        return template;
    }
}
```

## 10. 配置分布式日志
1. 在custome-admin的resources下新建一个logback-spring.xml文件，会自动覆盖掉配置
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <property name="CONSOLE_LOG_PATTERN" value="%d{yyyy-MM-dd HH:mm:ss.SSS} %highlight(%-5level) --- [%thread] %cyan(%logger{36}) : %msg%n"/>

    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>${CONSOLE_LOG_PATTERN}</pattern>
            <charset>UTF-8</charset>
        </encoder>
    </appender>

    <logger name="com.custome" level="DEBUG" />
    <logger name="org.apache.ibatis" level="DEBUG" />

    <logger name="org.mybatis.spring.SqlSessionUtils" level="WARN" />
    <logger name="org.mybatis.spring.transaction.SpringManagedTransaction" level="WARN" />
    <logger name="org.springframework.jdbc.datasource.DataSourceUtils" level="WARN" />
    <logger name="com.zaxxer.hikari" level="WARN" />

    <springProfile name="dev">
        <logger name="com.custome.mapper" level="DEBUG" />

        <root level="INFO">
            <appender-ref ref="CONSOLE" />
        </root>
    </springProfile>

    <springProfile name="prod">
        <logger name="com.custome.mapper" level="WARN" />

        <root level="INFO">
            <appender-ref ref="CONSOLE" />
        </root>
    </springProfile>

</configuration>
```

## 11. 跨域配置
```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

## 12. 基础服务类(都要继承)
### 12.1 Entity
```java
@Data
public class BaseEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @TableId
    @Schema(description = "主键ID")
    private Long id;

    @Schema(description = "创建者ID")
    @TableField(fill = FieldFill.INSERT, insertStrategy = FieldStrategy.NOT_NULL, updateStrategy = FieldStrategy.NOT_NULL, whereStrategy = FieldStrategy.NOT_NULL, select = false)
    private Long creator;

    @Schema(description = "创建时间")
    @TableField(fill = FieldFill.INSERT, insertStrategy = FieldStrategy.NOT_NULL, updateStrategy = FieldStrategy.NOT_NULL, whereStrategy = FieldStrategy.NOT_NULL, select = false)
    private LocalDateTime createTime;

    @Schema(description = "更新者ID")
    @TableField(fill = FieldFill.INSERT_UPDATE, insertStrategy = FieldStrategy.NOT_NULL, updateStrategy = FieldStrategy.NOT_NULL, whereStrategy = FieldStrategy.NOT_NULL, select = false)
    private Long updater;

    @Schema(description = "更新时间")
    @TableField(fill = FieldFill.INSERT_UPDATE, insertStrategy = FieldStrategy.NOT_NULL, updateStrategy = FieldStrategy.NOT_NULL, whereStrategy = FieldStrategy.NOT_NULL, select = false)
    private LocalDateTime updateTime;
}
```

### 12.2 DTO
```java
public class BaseDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String id;

    private Long creator;

    private LocalDateTime createTime;

    private Long updater;

    private LocalDateTime updateTime;

    private Long tenantId;
}
```

### 12.3 Dao
```java
public interface BaseDao<T> extends BaseMapper<T> {
}
```

### 12.4 Page分页
1. 分页结果
```java
@Data
@Schema(description = "分页结果包装")
public class PageResult<T> implements Serializable {
    @Schema(description = "总记录数")
    private long total;

    @Schema(description = "结果列表")
    private List<T> list;

    public PageResult(long total, List<T> list) {
        this.total = total;
        this.list = list;
    }

    public static <T> PageResult<T> of(IPage<T> page) {
        return new PageResult<>(page.getTotal(), page.getRecords());
    }
}
```

2. 分页查询
```java
@Data
@EqualsAndHashCode(callSuper = false)
public class PageQuery implements Serializable {
    @Schema(description = "当前页码")
    private int page = 1;

    @Schema(description = "每页条数")
    private int limit = 10;

    @Schema(description = "排序字段")
    private String orderField;

    @Schema(description = "排序方向 (asc/desc)")
    private String order;
}
```

### 12.5 MapStruct转换(Entity / DTO)
```java
public interface BaseConverter<E, D> {

    /**
     * 单个对象转换：Entity -> DTO
     */
    D toDto(E entity);

    /**
     * 集合转换：List<Entity> -> List<DTO>
     */
    List<D> toDtoList(List<E> entityList);

    /**
     * 反向转换：DTO -> Entity
     */
    E toEntity(D dto);

    /**
     * 反向集合转换：List<DTO> -> List<Entity>
     */
    List<E> toEntityList(List<D> dtoList);
}
```

### 12.6 Service
```java
public interface BaseService<T, D, Q> extends IService<T> {
    QueryWrapper<T> getWrapper(Q query);

    PageResult<D> page(Q query);

    List<D> list(Q query);

    D getById(Long id);
}
```
```java
public abstract class BaseServiceImpl<M extends BaseMapper<T>, T, D, Q extends PageQuery> extends ServiceImpl<M, T> implements BaseService<T, D, Q> {
    /**
     * 获取转换器
     */
    protected abstract BaseConverter<T, D> getConverter();

    /**
     * 获取查询条件
     */
    @Override
    public QueryWrapper<T> getWrapper(Q query) {
        QueryWrapper<T> wrapper = new QueryWrapper<>();
        wrapper.setEntityClass(getEntityClass());
        return wrapper;
    }

    @Override
    public PageResult<D> page(Q query) {
        Page<T> page = new Page<>(query.getPage(), query.getLimit());

        IPage<T> resultPage = baseMapper.selectPage(page, getWrapper(query));
        return new PageResult<>(resultPage.getTotal(), this.getConverter().toDtoList(resultPage.getRecords()));
    }

    /**
     * 查询
     */
    @Override
    public List<D> list(Q query) {
        List<T> entityList = baseMapper.selectList(getWrapper(query));
        return this.getConverter().toDtoList(entityList);
    }

    @Override
    public D getById(Long id) {
        T entity = baseMapper.selectById(id);
        return this.getConverter().toDto(entity);
    }
}
```

## 13. jasckson配置
```java
@Configuration
public class JacksonConfig {
    /**
     * Jackson 配置：Long 转 String,防止JS收到Long时丢失精度
     */
    @Bean
    public Jackson2ObjectMapperBuilderCustomizer jackson2ObjectMapperBuilderCustomizer() {
        return builder -> {
            builder.serializerByType(Long.class, ToStringSerializer.instance);
            builder.serializerByType(Long.TYPE, ToStringSerializer.instance);
        };
    }
}
```

## 14. 代码生成器配置
### 14.1 引入依赖
```xml
<!-- 读取yml配置文件 -->
<dependency>
    <groupId>org.yaml</groupId>
    <artifactId>snakeyaml</artifactId>
    <version>${snakeyaml.version}</version>
</dependency>
<!-- freemarker模板 -->
<dependency>
    <groupId>org.freemarker</groupId>
    <artifactId>freemarker</artifactId>
    <version>${freemarker.version}</version>
</dependency>
```
### 14.2 编写代码模板
1. 在resources下新建一个文件夹 templates

2. 