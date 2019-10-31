---
layout: post
title: 构建分布式配置中心阿波罗
categories: [Java]
tags: [springBoot]
summary: 分布式配置中心阿波罗是国内携程框架部门研发的分布式配置中心。
---

## 前文
分布式配置中心阿波罗是国内携程框架部门研发的分布式配置中心，能够集中化管理应用不同环境、不同集群的配置，配置修改后能够实时推送到应用端，并且具备规范的权限、流程治理等特性，适用于微服务配置管理场景。

## 使用
搭建时需要`Java`环境和`Mysql`数据库

### 搭建分布式配置中心阿波罗
1. 去往Github下载[apollo](https://github.com/nobodyiam/apollo-build-scripts)

1. 上传apollo-build-scripts-master配置文件到服务器中，然后解压配置文件  
```sh
$ unzip apollo-build-scripts-master.zip 
// 如果没有unzip命令的话，安装zip插件 
$ yum -y install zip unzip
```

1. 配置数据策略
```
修改demo.sh中的数据库host、root、密码
修改config_server_url、admin_server_url、portal_url的ip为本机ip（建议修改）
```

1. 启动阿波罗 
```
$ ./demo.sh start
$ systemctl stop firewalld.service  
```

1. 8070登陆界面-----默认账号密码 Apollo  admin


### 服务客户端集成配置文件

1. 将本地配置存入到阿波罗平台中。`yml` -> `prop` [转换工具](http://www.toyaml.com/index.html)
1. 引入Maven依赖
    ```xml
    <dependency>
        <groupId>com.ctrip.framework.apollo</groupId>
        <artifactId>apollo-client</artifactId>
        <version>1.0.0</version>
    </dependency>
    <dependency>
        <groupId>com.ctrip.framework.apollo</groupId>
        <artifactId>apollo-core</artifactId>
        <version>1.0.0</version>
    </dependency>
    ```

1. 创建 application.properties
```
$ app.id=对应的应用id
$ apollo.meta=http://Apollo运行ip:8080
```

1. 项目启动开启阿波罗配置文件
```
添加注解 @EnableApolloConfig
修改/opt/data/user/server.properties（Mac/Linux）或C:\opt\data\server.properties（Windows）文件
设置env为DEV：
env=DEV
```

> `注意`：不是所有的配置文件都会在阿波罗平台修改后，就会立马生效，因为没有采用监听刷新配置文件。
