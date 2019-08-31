---
layout: post
title: crontab的使用
categories: [Linux]
tags: [centos, crontab]
summary: Linux crontab命令Linux 命令大全Linux crontab是用来定期执行程序的命令。当安装完成操作系统之后，默认便会启动此任务调度命令。
---

### 安装
```sh
$ yum install -y cronie crontabs
```

### 检查crond服务是否安装及启动
```sh
$ yum list crontabs && which crontab && crontab -l
```

### crontab架构

```sh
* * * * * my Command  // 分时日月周
* * * * * echo -e "this is a test output" > /home/wwwroot/default/test.out

```

### 添加crontab任务

```sh
$ crontab -e
```

具体是编辑的那个文件呢？

如果是root用户，那么就是`/var/spool/cron/root`

### crontab配置文件

```sh
$ vim /etc/crontab
```

### crontab日志

```sh
$ tail -n 5 /var/log/cron // 查看最近五次日志
```

### 清理系统日志

在`/var/log`路径

查看当前目录文件大小`du -sh *`

```sh
* * 1 * * cat /dev/null > /var/log/messages
```