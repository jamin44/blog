---
layout: post
title: Docker搭建Maven私服
categories: [Docker]
tags: [springBoot, docker]
summary: 私服是架设在局域网的一种特殊的远程仓库，目的是代理远程仓库及部署第三方构件。
---

## 前言

Maven私服应用场景 ：
1. 缓存企业级jar
1. 微服务开发中，实现对微服务接口实现发布与调用。
1. 正常在微服务开发中，不会直接引入到其他接口源码项目。引入接口jar包进行调用。

## 流程

### 下载&&启动
1. Docker拉取一个`nexus3`的镜像
```sh
$ docker pull sonatype/nexus3
```
1. 将容器内部`/var/nexus-data`挂载到主机`/root/nexus-data`目录
```sh
$ docker run -d -p 8081:8081 --name nexus -v /root/nexus-data:/var/nexus-data --restart=always sonatype/nexus3
```
1. 关闭防火墙，根据`服务器ip`访问 http://ip:8081
```sh
$ systemctl stop firewalld.service
```
> Maven 私服`启动容器`稍微比较慢，等待1分钟即可。

### 登陆
使用默认账号密码 admin admin123 登陆时，发现登陆不了。这是更改这种admin123`固定密码`登陆方式。需要进入容器里面寻找密码。
1. 查看进行的容器，并进入容器
```sh
$ docker ps
CONTAINER ID      IMAGE             
9c9b18024931      sonatype/nexus3    
$ docker exec -it 9c9b18024931 bash
```
1. 查看密码(`bash-4.4$`前面的字符串即是`密码`)
```sh
bash-4.4$ cat /nexus-data/admin.password
3rhu2s4g-34d5-34d5-fs9d-we2fh8242wh3bash-4.4$ 
#退出容器用 exit 命令
```
1. 在登陆界面进行登陆，再根据提示重置密码即可

### 创建Maven私服仓库

1. 创建私服仓库
创建仓库，点击`Create repository`,然后选择`maven2(hosted)`然后输入仓库名称`（test-release）`。在`version policy`中选择这个仓库的类型，这里选择`release`,在`Deployment policy`中选择`Allow redeploy`（这个很重要）.

1. 创建私服账号
点击左侧菜单栏的`Users`菜单，然后点击`Create local user`.我这里创建了一个用户，账号密码都是：`testUser`  
`testUser-release`

1. 修改本地settings.xml  
    ```xml
    <servers>
        <server>
            <id>testUser</id>
            <username>testUser</username>
            <password>testUser</password>
        </server>	
    </servers>
    ```
1. 创建一个Maven工程
> **`注意`** 限定版本一定为RELEASE,因为上传的对应仓库的存储类型为`RELEASE`  

    ```xml
        <!--指定仓库地址 -->
        <distributionManagement>
            <repository>
                <!--此名称要和.m2/settings.xml中设置的ID一致 -->
                <id>testUser</id>
                <url>http://192.168.162.22:8081/repository/testUser-release/</url>
            </repository>
        </distributionManagement>
    
        <build>
            <plugins>
                <!--发布代码Jar插件 -->
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-deploy-plugin</artifactId>
                    <version>2.7</version>
                </plugin>
                <!--发布源码插件 -->
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-source-plugin</artifactId>
                    <version>2.2.1</version>
                    <executions>
                        <execution>
                            <phase>package</phase>
                            <goals>
                                <goal>jar</goal>
                            </goals>
                        </execution>
                    </executions>
                </plugin>
            </plugins>
        </build>
    ```

1. 发布`jar包`到Maven私服
```sh
$ mvn deploy
```

## 参考文献
[Nexus3 Docker](https://hub.docker.com/r/sonatype/nexus3/)
