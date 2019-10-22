---
layout: post
title: Docker安装各个应用
categories: [Docker]
tags: [docker]
summary: Linux环境下使用docker快速安装各个应用教程
---

## Docker安装
请观看之前的博客内容Docker安装教程

## 应用安装

### 安装 Mysql
1. 拉取镜像
```sh
$ docker pull mysql:5.7
```

1. 运行并挂载在本机
```sh
$ mkdir /data
$ docker run --name mysql5.7 -p 3306:3306 -v /data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7
```


### 安装 RabbitMQ
1. 安装官方的镜像
```sh
$ docker run -d --hostname my-rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3.7.3-management
```

1. 后台admin界面(**账号密码**默认是`guest`)
```sh
http://127.0.0.1:15672
```


### 安装 ActiveMQ
1. 搜索镜像
```sh
$ docker search activemq
NAME                                     DESCRIPTION                                     STARS               OFFICIAL            AUTOMATED
webcenter/activemq                       ActiveMQ 5.14.3 with OpenJDK-jre-8-headless …   170                                     [OK]
rmohr/activemq                           Various versions of ActiveMQ neatly packet i…   90                                      [OK]
vromero/activemq-artemis                 ActiveMQ Artemis image (Debian and Alpine ba…   18                                      [OK]
cloudesire/activemq                      Latest activemq                                 4                                       [OK]
aterreno/activemq-dockerfile                                                             3                                       [OK]
andreptb/activemq                        Debian Jessie based image with ActiveMQ inst…   3                                       [OK]
```

1. 安装webcenter/activemq中最新版本
```sh
$ docker run -d --name myactivemq \
-p 61616:61616 \
-p 8161:8161 \
webcenter/activemq
```

1. 后台admin界面(**账号密码**默认是`admin`)
```
http://127.0.0.1:8161/admin/topics.jsp
```


### 安装 RocketMQ
1. 搜索RocketMQ的镜像,并没有官方的镜像
```sh
$ docker search rocketmq
NAME                            DESCRIPTION                                     STARS               OFFICIAL            AUTOMATED
styletang/rocketmq-console-ng   rocketmq-console-ng                             18
foxiswho/rocketmq               rocketmq                                        14
rocketmqinc/rocketmq            Image repository for Apache RocketMQ            13
laoyumi/rocketmq                                                                10                                      [OK]
xlxwhy/rocketmq                 alibaba's rocketmq                              4
huanwei/rocketmq-broker                                                         2
2019liurui/rocketmq-broker      RocketMQ broker image for RocketMQ-Operator     1
2019liurui/rocketmq-namesrv     RocketMQ name service image for RocketMQ-Ope…   1
slpcat/rocketmq-console-ng                                                      0
coder4/rocketmq                 rocketmq                                        0                                       [OK]
```

1. 安装 `foxiswho/rocketmq` 镜像
```sh
$ curl https://registry.hub.docker.com/v1/repositories/foxiswho/rocketmq/tags\
| tr -d '[\[\]" ]' | tr '}' '\n'\
| awk -F: -v image='foxiswho/rocketmq' '{if(NR!=NF && $3 != ""){printf("%s:%s\n",image,$3)}}'
```

1. 启动`nameserver`
```sh
$ docker run -d -p 9876:9876 --name rmqserver foxiswho/rocketmq:server-4.5.1
```

1. 启动`broker`
    ```sh
    $ docker run -d -p 10911:10911 -p 10909:10909\
    --name rmqbroker --link rmqserver:namesrv\
    -e "NAMESRV_ADDR=namesrv:9876" -e "JAVA_OPTS=-Duser.home=/opt"\
    -e "JAVA_OPT_EXT=-server -Xms128m -Xmx128m"\
    foxiswho/rocketmq:broker-4.5.1

    # Broker容器中默认的配置文件的路径为：
    /etc/rocketmq/broker.conf
    ```

1. 安装rocketmq console工具, 通过上面查询的方式找到需要启动的版本，启动方式如下：
```sh
$ docker run -d --name rmqconsole -p 8180:8080 --link rmqserver:namesrv\
 -e "JAVA_OPTS=-Drocketmq.namesrv.addr=namesrv:9876\
 -Dcom.rocketmq.sendMessageWithVIPChannel=false"\
 -t styletang/rocketmq-console-ng
```

1. 命令检查一下启动情况, 后台admin界面访问`http://127.0.0.1:8180`
```sh
$ docker ps|grep rocketmq
```