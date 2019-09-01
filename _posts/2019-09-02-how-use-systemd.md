---
layout: post
title: Systemctl的使用
categories: [Linux]
tags: [centos]
summary: Systemd 是 Linux 系统工具，用来启动守护进程，已成为大多数发行版的标准配置。
---


## 前言

该篇学习于阮老师的[Systemd 入门教程：命令篇](http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html)和余泽楠的[CentOS 7 Systemd 入门](https://zhuanlan.zhihu.com/p/29217941)

### Systemd 概述
Systemd 就是为了解决这些问题而诞生的。它的设计目标是，为系统的启动和管理提供一套完整的解决方案。根据 Linux 惯例，字母d是守护进程（daemon）的缩写。 Systemd 这个名字的含义，就是它要守护整个系统。
```sh
$ systemctl --version
systemd 219
+PAM +AUDIT +SELINUX +IMA -APPARMOR +SMACK +SYSVINIT +UTMP +LIBCRYPTSETUP +GCRYPT +GNUTLS +ACL +XZ +LZ4 -SECCOMP +BLKID +ELFUTILS +KMOD +IDN
```
### Systemd 优缺点
Systemd 的`优点`是功能强大，使用方便，而`缺点`是体系庞大，非常复杂。事实上，现在还有很多人反对使用 `Systemd`，理由就是它过于复杂，与操作系统的其他部分强耦合，违反`keep simple, keep stupid`的Unix 哲学。


## 使用
Systemd 并不是一个命令，而是一组命令，涉及到系统管理的方方面面。

### systemctl 命令
`systemctl` 是 Systemd 的主命令，用于管理系统。
```sh
# 重启系统
$ sudo systemctl reboot

# 关闭系统，切断电源
$ sudo systemctl poweroff

# CPU停止工作
$ sudo systemctl halt

# 暂停系统
$ sudo systemctl suspend

# 让系统进入冬眠状态
$ sudo systemctl hibernate

# 让系统进入交互式休眠状态
$ sudo systemctl hybrid-sleep

# 启动进入救援状态（单用户状态）
$ sudo systemctl rescue
```

### 服务的管理
```sh
# 启动服务
$ systemctl start <服务项名称>

# 停止服务
$ systemctl stop <服务项名称>

# 重启服务
$ systemctl restart <服务项名称>

# 重新读取配置文件(如果该服务不能重启，但又必须使用新的配置，这条命令会很有用)
$ systemctl reload <服务项名称>

# 使服务开机自启动
$ systemctl enable <服务项名称>

# 使服务不要开机自启动
$ systemctl disable <服务项名称>

# 禁用服务(这可以防止服务被其他服务间接启动，也无法通过 start 或 restart 命令来启动服务)
$ systemctl mask <服务项名称>

# 启用服务(仅针对于已禁用的服务)
$ systemctl unmask <服务项名称>

# 重新读取所有服务项(修改、添加、删除服务项之后需要执行以下命令)
$ systemctl daemon-reload

```

### Unit
Systemd 可以管理所有系统资源。不同的资源统称为 Unit（单位）。
1. Unit 一共分成12种。
```sh
Service unit：系统服务
Target unit：多个 Unit 构成的一个组
Device Unit：硬件设备
Mount Unit：文件系统的挂载点
Automount Unit：自动挂载点
Path Unit：文件或路径
Scope Unit：不是由 Systemd 启动的外部进程
Slice Unit：进程组
Snapshot Unit：Systemd 快照，可以切回某个快照
Socket Unit：进程间通信的 socket
Swap Unit：swap 文件
Timer Unit：定时器
```

1. `systemctl list-units`命令可以查看当前系统的所有 Unit  
    ```sh  
    # 列出正在运行的 Unit
    $ systemctl list-units

    # 列出所有Unit，包括没有找到配置文件的或者启动失败的
    $ systemctl list-units --all

    # 列出所有没有运行的 Unit
    $ systemctl list-units --all --state=inactive

    # 列出所有加载失败的 Unit
    $ systemctl list-units --failed

    # 列出所有正在运行的、类型为 service 的 Unit
    $ systemctl list-units --type=service
    ```
1. 除了 `status` 命令，`systemctl` 还提供了三个查询状态的简单方法，主要供脚本内部的判断语句使用。
    ```sh
    # 显示某个 Unit 是否正在运行
    $ systemctl is-active application.service

    # 显示某个 Unit 是否处于启动失败状态
    $ systemctl is-failed application.service

    # 显示某个 Unit 服务是否建立了启动链接
    $ systemctl is-enabled application.service
    ```


## 参考文献
1. [Systemd 入门教程：命令篇](http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html)
1. [CentOS 7 Systemd 入门](https://zhuanlan.zhihu.com/p/29217941)