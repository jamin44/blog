---
layout: post
title: Linux搭建Docker环境
categories: [Docker]
tags: [Docker]
summary: Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的镜像中，然后发布到任何流行的 Linux或Windows 机器上，也可以实现虚拟化。容器是完全使用沙箱机制，相互之间不会有任何接口。
---

## 前置条件
### 版本问题和卸载旧版本
**64-bit 系统 kernel 3.10+**
1. 检查内核版本，返回的值大于3.10即可。
```sh
$ uname -r
3.10.0-693.el7.x86_64 # 64-bit 系统 kernel 3.10+
```
1. 使用 sudo 或 root 权限的用户登入终端。
1. 卸载旧版本(如果安装过旧版本的话)
```sh
$ yum remove docker \
      docker-common \
      docker-selinux \
      docker-engine
```

## 安装
### 安装包和其他驱动依赖
1. 安装需要的软件包驱动依赖
```sh
$ yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2
```
1. 设置yum源
$ yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo

1.安装docker
- `第一种`: 直接安装最新本
```sh
$ yum install -y docker-ce
```
- `第二种`: 安装指定版本
查询版本列表
```sh
$ yum list docker-ce --showduplicates | sort -r
docker-ce.x86_64            3:19.03.1-3.el7                    docker-ce-stable
docker-ce.x86_64            18.03.1.ce-1.el7.centos            docker-ce-stable
docker-ce.x86_64            18.03.0.ce-1.el7.centos            docker-ce-stable
docker-ce.x86_64            17.12.1.ce-1.el7.centos            docker-ce-stable
```
指定版本安装(这里的例子是安装上面列表中的第一个)
```sh
$ yum install -y docker-ce-3:19.03.1
```

## Docker的使用
### 启动与验证
- 启动 docker 服务
```sh
$ sudo systemctl start docker
$ sudo systemctl enable docker # 如果想添加到开机启动
```
- 验证安装是否成功(有client和service两部分表示docker安装启动都成功了)
    ```yml
    Version:           19.03.1
    API version:       1.40
    Go version:        go1.12.5
    Git commit:        74b1e89
    Built:             Thu Jul 25 21:21:07 2019
    OS/Arch:           linux/amd64
    Experimental:      false

    Server: Docker Engine - Community
    Engine:
    Version:          19.03.1
    API version:      1.40 (minimum version 1.12)
    Go version:       go1.12.5
    Git commit:       74b1e89
    Built:            Thu Jul 25 21:19:36 2019
    OS/Arch:          linux/amd64
    Experimental:     false
    containerd:
    Version:          1.2.6
    GitCommit:        894b81a4b802e4eb2a91d1ce216b8817763c29fb
    runc:
    Version:          1.0.0-rc8
    GitCommit:        425e105d5a03fabd737a126ad93d62a9eeede87f
    docker-init:
    Version:          0.18.0
    GitCommit:        fec3683
    ```

### Docker 镜像加速地址

1. 添加编辑daemon.json
```sh
$ vim /etc/docker/daemon.json
{
	"registry-mirrors": ["https://fy707np5.mirror.aliyuncs.com"]
}
```
1. 重新加载并`重启`Docker 
```sh
$ systemctl daemon-reload
$ systemctl restart docker
```

### Docker更新和卸载

- 更新 Docker CE
```sh
$ sudo yum update docker-ce
```
- 卸载 Docker CE
```sh
$ sudo yum remove docker-ce
```
- 删除本地文件
```sh
$ sudo rm -rf /var/lib/docker
```
> **`注意`** docker 的本地文件，包括镜像(images), 容器(containers), 存储卷(volumes)等，都需要手工删除。默认目录存储在 /var/lib/docker。


## 安装 docker-compose

### `CURL`安装出错

**按照官方文档，使用`curl`方式安装`docker-compose`后，验证是否安装成功时出错**
1. 安装时使用的命令
```sh
curl -L https://github.com/docker/compose/releases/download/1.14.0-rc2/docker-compose-`uname -s`-`ur/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```
1. 如果启动时报如下错误,说明curl安装方式下载的包不完整。
[1814] Cannot open self /usr/local/bin/docker-compose or archive /usr/local/bin/docker-compose.pkg

### `安装包`手动下载
1. 进入[官网](https://github.com/docker/compose/releases), 选择最新版手动下载。当前最新`1.25.0-rc2`的`docker-compose-Linux-x86_64`
1. 然后将文件上传到`/usr/local/bin/ 文件夹下`，然后将其重命名为`docker-compose`，修改此文件的`权限`，增加可执行：
```sh
chmod +x /usr/local/bin/docker-compose
```
1. 然后再运行 
```sh
$ docker-compose version
docker-compose version 1.25.0-rc2, build 661ac20e
docker-py version: 4.0.1
CPython version: 3.7.4
OpenSSL version: OpenSSL 1.1.0k  28 May 2019
```
