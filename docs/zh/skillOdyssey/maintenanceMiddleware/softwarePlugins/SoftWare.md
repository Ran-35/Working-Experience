# 必装软件  

## Win11 + WSL2
### WSL2 安装
1️⃣：鼠标右键点击 开始 图标，选择 终端（管理员） 或 PowerShell（管理员）。安装成功后，输入管理员密码。
```PowerShell
# 默认安装最新版的Ubuntu
wsl --install
```
2️⃣ 更新系统软件包，以确保软件环境是最新的
```bash
sudo apt update && sudo apt upgrade -y
```
3️⃣ 配置WSL开机即启动
```
方法一：Windows “启动”文件夹
1. 按下 Win + R 键，输入 shell:startup 并回车，这会打开 启动 文件夹。
2. 在文件夹空白处点击右键，选择 新建 > 快捷方式。
3. 在“请键入对象的位置”中输入：
    wsl.exe -d Ubuntu
4. 给快捷方式起个名字（如 WSL-AutoStart），点击完成。
```
```
方法二：Windows 任务计划程序
1. 搜索并打开 任务计划程序。
2. 点击右侧的 创建基础任务。
3. 名称：设置为 WSL_Auto_Start。
4. 触发器：选择 当前用户登录时。
5. 操作：选择 启动程序。
6. 程序或脚本：输入 wsl.exe。
7. 添加参数：
    如果你只想启动默认发行版：--distribution <你的Linux名称> --user <你的用户名>
    如果你希望它保持在后台：--exec dbus-launch (或其他长驻进程)。
8. 完成后，在任务列表中双击该任务，在“条件”选项卡中，取消勾选“只有在计算机使用交流电源时才启动此任务”，以防笔记本不插电时不生效。
```
4️⃣ 配置WSL随Win启动而启动，并且永不休眠
① 创建启动脚本。（在 Windows 任意位置（例如 D:\Scripts\keep_wsl_alive.vbs）创建一个 VBS 脚本。使用 VBS 是为了实现完全静默启动，不弹黑窗口。）

原理：tail -f /dev/null 是一个几乎不占 CPU 但永远不会停止的任务。只要这个进程在，WSL 就认为它正在被“使用”，从而不会触发自动关机。
```VBScript
Set WshShell = CreateObject("WScript.Shell")
' 启动 WSL 并在后台运行一个永远不会退出的命令 (tail -f)
WshShell.Run "wsl.exe -d Ubuntu -u root -- exec tail -f /dev/null", 0
Set WshShell = Nothing
```
② 设置随 Windows 启动 (任务计划程序)
同3️⃣的方法二，只不过配置不一样。
```
1~6步同上

7. 程序或脚本
    wscript.exe（这是运行 VBS 的解释器）。
8. 添加参数
    "D:\Scripts\keep_wsl_alive.vbs"（填写你刚才脚本的绝对路径，注意加双引号）。
```
③. 配置内存上限
```
1. 在 Windows 下按下 Win + R，输入 %UserProfile%。
2. 在该目录下新建一个名为 .wslconfig 的文件（注意前面有个点）。
3. 写入以下内容（具体配置随计算机而定）
    [wsl2]
    # 内存分配：32G内存建议分配 16G-20G 给 WSL2
    memory=16GB

    # 处理器分配：U7-255H 有 16 个核心
    # 建议分配 8 到 12 个核心，留出足够的性能给 Windows 桌面和 IDE
    processors=12

    # 开启自动内存回收（Win11 核心功能）
    # gradual 会随着 Linux 内部内存压力的减轻，平滑地将内存还给 Windows
    autoMemoryReclaim=gradual

    # 开启镜像网络模式（强烈推荐）
    # 让 WSL2 与 Windows 共享同一个 IP 地址，解决开发中复杂的端口映射和代理问题
    networkingMode=mirrored

    # 自动清理临时存储
    sparseVhd=true

    [experimental]
    # 开启自适应内存分配，进一步配合 autoMemoryReclaim
    autoMemoryReclaim=gradual
    # 允许 WSL2 使用 Windows 的代理设置（如果你有开启的话）
    bestEffortProxy=true

4. 重启WSL：wsl --shutdown
```

### Docker安装
1️⃣ 卸载旧的docker版本
```bash
sudo apt-get remove docker docker-engine docker.io containerd runc
```

2️⃣ 设置存储库
```bash
# 更新索引并安装基础依赖
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release

# 添加 Docker 官方 GPG 密钥
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# 设置存储库
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

3️⃣ 安装docker
```bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

4️⃣ 解决权限问题(需关闭重启WSL)
```bash
sudo usermod -aG docker $USER
```

5️⃣ Docker手动启动
```bash
# 手动启动 Docker
sudo service docker start
```
6️⃣ Docker自动启动
① 配置sudo免密

```bash
# 在 Ubuntu 终端输入
sudo visudo
```

在文件末尾添加以下内容（将 cxtan 替换为你的实际用户名）：
```Plaintext
cxtan ALL=(ALL) NOPASSWD: /usr/sbin/service docker start
```

② 修改windows启动脚本(之前创建的.vbs启动脚本)
```VBScript
Set WshShell = CreateObject("WScript.Shell")

' 1. 启动 WSL 实例并保持后台运行
WshShell.Run "wsl.exe -d Ubuntu -u root -- exec tail -f /dev/null", 0

' 2. 延迟 2 秒确保 WSL 已就绪（可选）
WScript.Sleep 2000

' 3. 启动 Docker 服务
' 这里使用你赋权后的用户执行
WshShell.Run "wsl.exe -d Ubuntu -u cxtan sudo service docker start", 0

' 4. 如果你有 PM2 任务，也可以顺便拉起来
WshShell.Run "wsl.exe -d Ubuntu -u cxtan pm2 resurrect", 0

Set WshShell = Nothing
```

③ 验证配置
```
1. 执行 wsl --shutdown 关闭当前所有实例。

2. 双击运行你的 .vbs 脚本。

3. 进入Ubuntu，输入：docker ps
```

### Docker部署Mysql/Redis/Nginx
1️⃣ 拉取Mysql/Redis/Nginx
```bash
docker pull mysql:latest
docker pull redis:latest
docker pull nginx:latest
```

2️⃣ 建立规范的目录结构
```bash
# 创建统一管理目录
mkdir -p ~/middleware/mysql/data ~/middleware/mysql/conf
mkdir -p ~/middleware/redis/data
mkdir -p ~/middleware/nginx/conf/conf.d ~/middleware/nginx/html ~/middleware/nginx/log

# 进入目录
cd ~/middleware
```

3️⃣ 编写 docker-compose.yml
```yaml
version: '3.8'

services:
  # MySQL 数据库
  mysql:
    image: mysql:latest
    container_name: mysql_server
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root  # 建议修改为你自己的密码
      TZ: Asia/Shanghai
    ports:
      - "3306:3306"
    volumes:
      - ./mysql/data:/var/lib/mysql
      - ./mysql/conf:/etc/mysql/conf.d
    deploy:
      resources:
        limits:
          memory: 4G

  # Redis 缓存
  redis:
    image: redis:latest
    container_name: redis_server
    restart: always
    ports:
      - "6379:6379"
    volumes:
      - ./redis/data:/data
    command: redis-server --appendonly yes --requirepass root # 这里的 root 是 Redis 密码
    deploy:
      resources:
        limits:
          memory: 2G

  # Nginx 网关
  nginx:
    image: nginx:latest
    container_name: nginx_server
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/conf/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/conf/conf.d:/etc/nginx/conf.d
      - ./nginx/html:/usr/share/nginx/html
      - ./nginx/log:/var/log/nginx
    deploy:
      resources:
        limits:
          memory: 512M
```

4️⃣ 初始化Nginx配置文件
创建主配置文件：nano ~/middleware/nginx/conf/nginx.conf
```Nginx
user  nginx;
worker_processes  auto;
error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;
events {
    worker_connections  1024;
}
http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    include /etc/nginx/conf.d/*.conf; # 包含子配置
}
```
创建一个子配置文件：nano ~/middleware/nginx/conf/conf.d/default.conf
```Nginx
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    # 默认首页
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    # 重点：配置 /works 路径转发
    location /works {
        # 注意：这里的路径必须与 docker-compose.yml 中冒号右边的路径一致
        alias /usr/share/nginx/html/works/; 
        index index.html index.htm;
        autoindex on;       # 如果没有 index.html，会列出文件列表
        charset utf-8;      # 避免中文文件名乱码
    }

    # 错误页面配置
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # 未来如果你有 Java 项目跑在 8080，可以取消下面注释进行转发
    # location /api/ {
    #    proxy_pass http://localhost:8080/;
    #    proxy_set_header Host $host;
    # }
}

```

5️⃣ 启动docker
进入~/middleware
```bash
docker compose up -d
```





## Linux
### ELK (Elasticsearch, Logstash, Kibana) 日志采集分析系统
1️⃣ 修改系统配置(请允许单个进程拥有更多的虚拟内存映射区域)
原因：
```bash
sudo sysctl -w vm.max_map_count=262144
# 永久生效：
echo "vm.max_map_count=262144" | sudo tee -a /etc/sysctl.conf
```

2️⃣ 编写配置文件(使用docker compose)
在docker-compose.yml中：
```yml
services:
  elasticsearch:
    image: elasticsearch:9.3.2
    container_name: elasticsearch_server
    environment:
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m" # 限制 JVM 内存，防止 WSL2 崩溃
    volumes:
      - ./elk/elasticsearch/data:/usr/share/elasticsearch/data
    ports:
      - "9200:9200"
    deploy:
      resources:
        limits:
          memory: 2G

  logstash:
    image: logstash:9.3.2
    container_name: logstash_server
    volumes:
      - ./elk/logstash/conf/logstash.conf:/usr/share/logstash/pipeline/logstash.conf
    ports:
      - "5044:5044"
      - "9600:9600"
    depends_on:
      - elasticsearch
    deploy:
      resources:
        limits:
          memory: 1G

  kibana:
    image: kibana:9.3.2
    container_name: kibana_server
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    ports:
      - "5601:5601"
    depends_on:
      - elasticsearch
    deploy:
      resources:
        limits:
          memory: 1G
```

3️⃣ 配置Logstash
编辑logstash.conf：
```conf
# 1. 输入：监听 5044 端口（你在 docker-compose 里暴露的端口）
input {
  tcp {
    port => 5044
    codec => json_lines
  }
}

# 2. 过滤：这里可以进行格式化、过滤掉不必要的日志（暂时留空）
filter {
  # 例如：如果你想给日志加一个标记
  mutate {
    add_field => { "cluster_name" => "my_wsl_elk" }
  }
}

# 3. 输出：将处理后的数据发送给 Elasticsearch
output {
  elasticsearch {
    hosts => ["http://elasticsearch_server:9200"] # 注意：这里使用 container_name
    index => "app-logs-%{+YYYY.MM.dd}"             # 索引名称按日期切分
  }
  
  # 同时在控制台打印一份，方便你 docker logs 查看调试
  stdout {
    codec => rubydebug
  }
}
```

4️⃣ 运行容器后，访问可视化界面
http://<服务器IP>:5601 可进入 Kibana 控制台。

```yml
# 9.3.2 这种高版本，它进入了“交互式安全设置”模式。

1. 进入 http://<服务器IP>:5601 后会要求输入 Enrollment Token。

2. 获取 Token
  docker exec -it elasticsearch_server /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana

3. 获取验证码，如果网页要求输入 Verification Code
  docker exec -it kibana_server bin/kibana-verification-code
  或者
  docker exec -it kibana bin/kibana-verification-code
```


5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 🔟





1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 🔟