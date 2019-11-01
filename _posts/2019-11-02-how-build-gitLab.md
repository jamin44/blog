---
layout: post
title: 搭建GitLab私服
categories: [Git, Docker]
tags: [springBoot, git, docker]
summary: 基于Docker部署GitLab环境搭建，搭建自己的 git 服务器。
---

## 前言

> 由于GitLab运行的占用内存较大，所以建议服务器内存2G以上  

## 运行搭建
1. 下载镜像文件
```sh
$ docker pull beginor/gitlab-ce:11.0.1-ce.0
```
**`注意`** 如果下载速度慢的话，需要配置一下阿里云的镜像`加速地址`   
```sh
Docker 镜像加速地址
$ vim /etc/docker/daemon.json
{
	"registry-mirrors": ["https://fy707np5.mirror.aliyuncs.com"]
}
$ systemctl daemon-reload # 令daemon.json生效
$ systemctl restart docker # 重启Docker
```

1. 创建GitLab 的`配置(config)` 、 `日志(logs)` 、`数据(data)` 放到`容器之外`， 便于日后升级， 因此请先准备这三个目录。
```sh
$ mkdir -p /srv/gitlab/config
$ mkdir -p /srv/gitlab/logs
$ mkdir -p /srv/gitlab/data
```

1. 运行GitLab容器（注意机器是否关了`SELinux`）
```sh
docker run --detach \
--publish 8443:443 \
--publish 8090:80 \
--name gitlab \
--restart always \
--volume /srv/gitlab/config:/etc/gitlab \
--volume /srv/gitlab/logs:/var/log/gitlab \
--volume /srv/gitlab/data:/var/opt/gitlab \
gitlab/gitlab-ce:latest
```
如果机器没关`SELinux`(一般的服务器默认是关的，虚拟机可能没关)
```sh
$ vi /etc/selinux/config
将SELINUX=enforcing改为SELINUX=disabled    
设置后需要重启机器才能生效
```

1. 修改/srv/gitlab/config/gitlab.rb
```sh
把external_url改成部署机器的域名或者IP地址
$ vi /srv/gitlab/config/gitlab.rb
external_url 'http://10.71.29.81'
```

1. 修改/srv/gitlab/data/gitlab-rails/etc/gitlab.yml
```sh
$ vi /srv/gitlab/data/gitlab-rails/etc/gitlab.yml
找到关键字 * ## Web server settings * 
将host的值改成映射的外部主机ip地址和端口，这里会显示在gitlab克隆地址
```

1. 修改后需要停止docker容器，并且删除，后重启docker, 最后再运行GitLab容器
```sh
docker stop 容器id
docker rm 容器id
systemctl restart docker 
docker run  …
```

1. gitlab的web管理页面就可以正常访问`http://10.71.29.81:8090`

## 参考文献
[GitLab文档](https://docs.gitlab.com/omnibus/docker/)