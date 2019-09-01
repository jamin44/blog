---
layout: post
title: crontab的使用
categories: [Linux]
tags: [centos, crontab]
summary: Linux crontab命令Linux 命令大全Linux crontab是用来定期执行程序的命令。当安装完成操作系统之后，默认便会启动此任务调度命令。
---

## 介绍

### crontab 定时任务
通过crontab 命令，我们可以在固定的间隔时间执行指定的系统指令或 shell script脚本。时间间隔的单位可以是分钟、小时、日、月、周及以上的任意组合。这个命令非常适合周期性的日志分析或数据备份等工作。

### 命令参数
```sh
-u user：用来设定某个用户的crontab服务；
file：file是命令文件的名字,表示将file做为crontab的任务列表文件并载入crontab。如果在命令行中没有指定这个文件，crontab命令将接受标准输入（键盘）上键入的命令，并将它们载入crontab。
-e：编辑某个用户的crontab文件内容。如果不指定用户，则表示编辑当前用户的crontab文件。
-l：显示某个用户的crontab文件内容，如果不指定用户，则表示显示当前用户的crontab文件内容。
-r：从/var/spool/cron目录中删除某个用户的crontab文件，如果不指定用户，则默认删除当前用户的crontab文件。
-i：在删除用户的crontab文件时给确认提示。
```

### 命令格式
1. 一个标准的 crontab 配置需要符合如下 :  
`分 时 日 月 星期` 要运行的命令
```sh
*     *     *     *     *     command to be executed
-     -     -     -     -
|     |     |     |     |
|     |     |     |     +----- day of week (0 - 6) (Sunday=0)
|     |     |     +------- month (1 - 12)
|     |     +--------- day of month (1 - 31)
|     +----------- hour (0 - 23)
+------------- min (0 - 59)
```
1. 一个 crontab 的配置文件，通过前五个域来表示时刻，时期，甚至是时间段。每一个域中，可以包含 * 或者逗号分割的数字，或者 - 连接的数字。
```sh
 * 号表示任意
 , 逗号分割表示时刻， separator
 - 短横线连接，表示时间段， range of values
 / 表示间隔， 如果第一个域为 /2 ，则表示每隔两分钟， step value  
```
1. 而空格分割的六个域分别表示：
- 第 1 列分钟，取值范围 0～59
- 第 2 列小时 0～23（0 表示子夜）
- 第 3 列日 1～31
- 第 4 列月 1～12
- 第 5 列星期 0～7（0 和 7 表示星期天）
- 第 6 列要运行的命令  

> `注意事项`:  
> 重复格式 /2 表示没两分钟执行一次 或者 /10 表示每 10 分钟执行一次，这样的语法格式并不是被所有系统支持。  
> 具体某一天的指定，可以由第三项（month day）和第五项（weekday）指定，如果两项都被设定，那么 cron 都会执行。  

## 安装&使用

### crontab 安装 
1. 检查是否安装了crontab，如果提示未安装请自行安装，crontab安装包在系统光盘里面的pacekage文件夹crontabs安装包。
```sh
$ rpm -qa | grep crontab
crontabs-1.11-6.20121102git.el7.noarch # 已安装
```

1. crontabs安装包进行安装
```sh
$ yum install -y cronie crontabs
```

1. 检查crond服务是否安装及启动
```sh
$ yum list crontabs && which crontab && crontab -l
```

### crontab 使用
1. `systemctl` 操作crontab
```sh
# 设置开机自启动
$ systemctl enable crond 
# 开启
$ systemctl start crond 
# 停止
$ systemctl stop crond
# 重启
$ systemctl restart crond
# 查看当前状态
$ systemctl status crond 
```

1. 使用-l参数列出crontab文件:
```sh
$ crontab -l
10 0 * 1 * /usr/local/certbot/certbot-auto --force-renew --pre-hook "systemctl stop nginx" --post-hook "systemctl start nginx"
```

1. 可以使用这种方法在 $HOME 目录中对 crontab 文件做一备份：
```sh
$ crontab -l > $HOME/mycron
```
这样，一旦不小心误删了 crontab 文件，可以用上面所讲述的方法迅速恢复。

1. 添加crontab任务
```sh
$ crontab -e
```

1. 删除 crontab 文件
```sh
crontab -r
```
> **`注意`** 千万别乱运行`crontab -r`。它从Crontab目录 `/var/spool/cron` 中删除用户的Crontab文件。删除了该用户的所有crontab都没了。

1. 给某一个用户新建 crontab 任务 
```sh
sudo crontab -u test -e     # 给test的用户设定定时任务，需要管理员权限
```

1. crontab配置文件
```sh
$ vim /etc/crontab
```

1. crontab日志
```sh
$ tail -n 5 /var/log/cron // 查看最近五次日志
```

1. 清理系统日志
在`/var/log`路径，查看当前目录文件大小`du -sh *`
```sh
* * 1 * * cat /dev/null > /var/log/messages
```