---
layout: post
title: Docker部署Java项目
categories: [Docker]
tags: [docker, springBoot]
summary: 介绍使用Docker通过Dockerfile文件定制SpringBoot项目的Jar成镜像，并推送到阿里私有的镜像仓库。
---

## 简介

### Docker介绍
Docker是DotCloud开源的、可以将任何应用包装在Linux container中运行的工具。基于Docker的沙箱环境可以实现轻型隔离，多个容器间不会相互影响；Docker可以自动化打包和部署任何应用，方便地创建一个轻量级私有PaaS云，也可以用于搭建开发测试环境以及部署可扩展的web应用等。

### 阿里容器服务
容器服务提供高性能可伸缩的容器应用管理服务，支持用 Docker 和 Kubernetes 进行容器化应用的生命周期管理，提供多种应用发布方式和持续交付能力并支持微服务架构。容器服务简化了容器管理集群的搭建工作，整合了阿里云虚拟化、存储、网络和安全能力，打造云端最佳容器运行环境。


## 项目打包&&构建镜像

### Java应用打包
1. 将Java应用进行打包(需要进入项目的根目录)
```sh
$ mvn clean package -Dmaven.test.skip=true . 
```
命令解释: `clean`清除之前的包、`-Dmaven.test.skip=true` 跳过测试用例、`.` 表示当前目录下

1. 创建Dockerfile文件定制镜像(Docker运行的脚本)，并编写脚本内容
```sh
$ vi Dockerfile # 在项目根目录下
```
```sh
FROM hub.c.163.com/library/java:8-alpine
ADD target/*.jar app.jar
EXPOSE 8085
ENTRYPOINT ["java", "-jar", "/app.jar"]
# FROM 从hub.c.163.com国内仓库拉取java包，
# ADD 添加相对路径下的某个jar包，并且重命名为app.jar
# EXPOSE 输出端口为8085
# ENTRYPOINT 运行命令为 java -jar app.jar
```

### 镜像构建与运行
1. 构建Docker镜像
```sh
$ docker build -t xiaozhi/doorplate . # 注意最后需要加上 . 
# 构建镜像
# REPOSITORY:TAG 给镜像指定一个名称或版本(不指定时默认为latest)
# 所以这里的镜像名称为doorplate
# . 表示当前目录
```
1. 查看刚刚构建Docker镜像
```sh
$ docker images
REPOSITORY                    TAG            IMAGE ID        CREATED          SIZE
xiaozhi/doorplate            latest        3d7074872868     33 seconds ago    186MB
hub.c.163.com/library/java   8-alpine      d991edd81416      2 years ago      145MB
```

1. 运行Docker镜像
```sh
$ docker run -d -p 8899:8085 xiaozhi/doorplate
# docker run -d -p 主机端口:容器端口 容器的名称
# 8899是本机访问的端口，8085是Docker内部的端口  -d 后台运行
```

1. 查看正在运行的Docker镜像
```sh
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
843bc974634f        xiaozhi/doorplate   "java -jar /doorplat…"   3 seconds ago       Up 2 seconds        0.0.0.0:8085->8085/tcp   nostalgic_thompson
```

## 阿里镜像推送
这里将本地的镜像推送到阿里云的私有库。所以需要先在阿里云的镜像仓库中注册账号。

### 阿里容器镜像服务
1. 登陆阿里云账号，搜索`容器镜像服务`，没开通服务的话需要开通服务。
1. 左侧默认实例下点进命名空间，在右上角创建命名空间
1. 点进镜像仓库，选择命名空间进行创建镜像仓库，代码源选择本地仓库。
1. 点进生成镜像的管理，里面有操作指南，根据提示推送本地镜像即可。

### 本地镜像推送
> **`注意`** 推送的`镜像名称`需要与`阿里私有库上`的命名的镜像名称一致。

1. 先登录阿里云Docker Registry(这里的登陆密码是镜像服务的密码，不是阿里云账号密码)
```sh
$ docker login --username=1355564603@qq.com registry.cn-shenzhen.aliyuncs.com
```

1. 推送前重新打包一下
```sh
$ mvn clean package -Dmaven.test.skip=true .
```

1. 构建一个推送阿里云的镜像
```sh
$ docker build -t registry.cn-shenzhen.aliyuncs.com/zeffon/doorplate .
```

1. 镜像推送到Registry
```sh
$ docker push registry.cn-shenzhen.aliyuncs.com/zeffon/doorplate
```

1. 简化繁琐操作，将上面三条命令写成脚本
```sh
$ vi Build.sh # 在项目根目录下 
#!/usr/bin/env bash
mvn clean package -Dmaven.test.skip=true -U  # 这里使用 -U 强制更新
docker build -t registry.cn-shenzhen.aliyuncs.com/zeffon/doorplate .
docker push registry.cn-shenzhen.aliyuncs.com/zeffon/doorplate
```


